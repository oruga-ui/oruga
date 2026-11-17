import { describe, test, expect, afterEach, vi } from "vitest";
import {
    enableAutoUnmount,
    mount,
    type DOMWrapper,
    type VueWrapper,
} from "@vue/test-utils";

import OTimepicker from "@/components/timepicker/Timepicker.vue";

describe("OTimepicker tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OTimepicker, {
            props: { modelValue: new Date(2000, 0, 1) },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("timepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("parses keyboard input", async () => {
        const wrapper = mount(OTimepicker);

        let input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.setValue("02:45");
        await input.trigger("keyup", { key: "Enter" });

        const date = new Date();
        date.setHours(2);
        date.setMinutes(45);
        date.setSeconds(0);
        date.setMilliseconds(0);

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits?.[0]).toHaveLength(1);
        expect(emits?.[0][0]).toBeInstanceOf(Date);
        expect((emits?.[0][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("02:45");

        input = wrapper.find("input");
        await input.setValue("12:3");
        await input.trigger("keyup", { key: "Enter" });

        date.setHours(12);
        date.setMinutes(3);

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits?.[1]).toHaveLength(1);
        expect(emits?.[1][0]).toBeInstanceOf(Date);
        expect((emits?.[1][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("12:03");
    });

    test("handles invalid keyboard input", async () => {
        const wrapper = mount(OTimepicker, {
            props: { modelValue: new Date() },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.setValue("not-a-date");
        await input.trigger("keyup", { key: "Enter" });

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits?.[0]).toHaveLength(1);
        expect(emits?.[0][0]).toBeUndefined();
        expect(input.element.value).toBe("00:00");

        await input.setValue("21:wrong");
        await input.trigger("keyup", { key: "Enter" });

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(input.element.value).toBe("00:00");
    });

    test("closes overlay on time selection when stayOpen is false", async () => {
        const wrapper = mount(OTimepicker, {
            props: {
                modelValue: new Date(2024, 0, 1, 12, 30),
                active: true,
                stayOpen: false,
            },
        });

        // find the hours select and change its value
        const selects = wrapper.findAll("select");
        expect(selects.length).toBeGreaterThan(0);

        const hoursSelect = selects[0];
        expect(hoursSelect.exists()).toBe(true);

        // select a different hour
        await hoursSelect.setValue(14);
        await hoursSelect.trigger("change");

        // check that update:active event was emitted with false (overlay closes)
        const updateActiveEmits = wrapper.emitted("update:active");
        expect(updateActiveEmits).toBeDefined();
        expect(updateActiveEmits?.[0]).toStrictEqual([false]);
    });

    test("keeps overlay open on time selection when stayOpen is true", async () => {
        const wrapper = mount(OTimepicker, {
            props: {
                modelValue: new Date(2024, 0, 1, 12, 30),
                active: true,
                stayOpen: true,
            },
        });

        // find the hours select and change its value
        const selects = wrapper.findAll("select");
        expect(selects.length).toBeGreaterThan(0);

        const hoursSelect = selects[0];
        expect(hoursSelect.exists()).toBe(true);

        // select a different hour
        await hoursSelect.setValue(14);
        await hoursSelect.trigger("change");

        // check that update:active event was NOT emitted (overlay stays open)
        const updateActiveEmits = wrapper.emitted("update:active");
        expect(updateActiveEmits).toBeUndefined();

        // verify the content still has the active class
        const contentElement = wrapper.find(".o-timepicker__content");
        expect(contentElement.exists()).toBe(true);
        expect(contentElement.classes("o-timepicker__content--active")).toBe(
            true,
        );
    });

    describe("unselectable times", () => {
        const time = (hours: number, minutes = 0): Date =>
            new Date(2024, 0, 1, hours, minutes);

        const range = (from: number, to: number): string[] =>
            Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

        const enabledOptions = (select: DOMWrapper<Element>): string[] =>
            select
                .findAll("option")
                .map((option) => option.element as HTMLOptionElement)
                .filter((option) => !option.disabled)
                .map((option) => option.value);

        const enabledHours = (wrapper: VueWrapper): string[] =>
            enabledOptions(wrapper.find("select[aria-label='Select Hour']"));

        test("disables the hours outside of minTime and maxTime", () => {
            const wrapper = mount(OTimepicker, {
                props: { minTime: time(9), maxTime: time(18) },
            });

            expect(enabledHours(wrapper)).toStrictEqual(range(9, 18));
        });

        test("disables an hour without any selectable minute left", () => {
            const wrapper = mount(OTimepicker, {
                props: { minTime: time(9, 50), incrementMinutes: 15 },
            });

            expect(enabledHours(wrapper)).toStrictEqual(range(10, 23));
        });

        test("disables the hours whose minutes are all unselectable", () => {
            const wrapper = mount(OTimepicker, {
                props: {
                    incrementMinutes: 30,
                    unselectableTimes: [time(10), time(10, 30), time(11)],
                },
            });

            const hours = enabledHours(wrapper);
            expect(hours).not.toContain("10");
            expect(hours).toContain("11");
        });

        test("disables the hours rejected by an unselectableTimes function", () => {
            const wrapper = mount(OTimepicker, {
                props: {
                    unselectableTimes: (date: Date) => date.getHours() >= 12,
                },
            });

            expect(enabledHours(wrapper)).toStrictEqual(range(0, 11));
        });

        test("disables a meridiem without any selectable hour", () => {
            // the meridiem select comes last, the en-GB test locale calls the periods "am" and "pm"
            const enabledMeridiems = (wrapper: VueWrapper): string[] =>
                enabledOptions(wrapper.findAll("select").at(-1)!);

            const morning = mount(OTimepicker, {
                props: { hourFormat: "12", maxTime: time(11) },
            });
            expect(enabledMeridiems(morning)).toStrictEqual(["am"]);

            const afternoon = mount(OTimepicker, {
                props: { hourFormat: "12", minTime: time(13) },
            });
            expect(enabledMeridiems(afternoon)).toStrictEqual(["pm"]);
        });
    });

    describe("attribute placement", () => {
        test("input attributes land on the input only", () => {
            const wrapper = mount(OTimepicker, {
                attrs: {
                    "aria-label": "Start time",
                    name: "when",
                    required: true,
                },
            });
            const input = wrapper.find("input");
            expect(input.attributes("aria-label")).toBe("Start time");
            expect(input.attributes("name")).toBe("when");
            expect(wrapper.attributes("aria-label")).toBeUndefined();
            expect(wrapper.attributes("name")).toBeUndefined();
            expect(wrapper.findAll("[aria-label='Start time']")).toHaveLength(
                1,
            );
        });

        test("class, style and data attributes land on the root only", () => {
            const wrapper = mount(OTimepicker, {
                attrs: {
                    class: "custom",
                    style: "margin: 1px",
                    "data-testid": "picker",
                },
            });
            expect(wrapper.classes("custom")).toBe(true);
            expect(wrapper.attributes("data-testid")).toBe("picker");
            expect(wrapper.attributes("data-oruga")).toBe("timepicker");

            const input = wrapper.find("input");
            expect(input.classes("custom")).toBe(false);
            expect(input.attributes("data-testid")).toBeUndefined();
            expect(input.attributes("style")).toBeUndefined();
        });

        test("listeners are called once", async () => {
            const onKeydown = vi.fn();
            const wrapper = mount(OTimepicker, { attrs: { onKeydown } });
            await wrapper.find("input").trigger("keydown", { key: "a" });
            expect(onKeydown).toHaveBeenCalledTimes(1);
        });

        test("an inline picker keeps all attributes on the root", () => {
            const wrapper = mount(OTimepicker, {
                props: { inline: true },
                attrs: { "aria-label": "Start time" },
            });
            expect(wrapper.find("input").exists()).toBe(false);
            expect(wrapper.attributes("aria-label")).toBe("Start time");
        });
    });
});
