import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

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
        expect(updateActiveEmits?.[0]).toEqual([false]);
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
});
