import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import ODatetimepicker from "@/components/datetimepicker/Datetimepicker.vue";

describe("ODatetimepicker tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2000, 0, 0));
        const wrapper = mount(ODatetimepicker, {
            props: { modelValue: new Date(2000, 0, 1) },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("datetimepicker");
        expect(wrapper.html()).toMatchSnapshot();
        vi.useRealTimers();
    });

    test("parses keyboard input", async () => {
        const wrapper = mount(ODatetimepicker);

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.setValue("6.8.2024, 10:51");
        await input.trigger("keyup", { key: "Enter" });

        let date = new Date(2024, 5, 8, 10, 51);

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits?.[0]).toHaveLength(1);
        expect(emits?.[0][0]).toBeInstanceOf(Date);
        expect((emits?.[0][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("08/06/2024, 10:51");

        await input.setValue("21/10/2021 12:23");
        await input.trigger("keyup", { key: "Enter" });

        date = new Date(2021, 9, 21, 12, 23);

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits?.[1]).toHaveLength(1);
        expect(emits?.[1][0]).toBeInstanceOf(Date);
        expect((emits?.[1][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("21/10/2021, 12:23");
    });

    test("uses custom formatter and parser", async () => {
        const parsedDate = new Date(2026, 1, 3, 10, 15);
        const formatter = vi.fn(() => "formatted datetime");
        const parser = vi.fn(() => parsedDate);
        const wrapper = mount(ODatetimepicker, {
            props: {
                modelValue: new Date(2026, 1, 3, 10, 0),
                formatter,
                parser,
            },
        });

        const input = wrapper.get("input");
        expect(input.element.value).toBe("formatted datetime");

        await input.setValue("custom input");
        await input.trigger("keyup", { key: "Enter" });

        expect(parser).toHaveBeenCalledWith("custom input");
        expect(wrapper.emitted("update:modelValue")?.[0]).toStrictEqual([
            parsedDate,
        ]);
    });

    test("preserves the selected time when changing the date", async () => {
        const wrapper = mount(ODatetimepicker, {
            props: {
                modelValue: new Date(2024, 0, 1, 13, 45),
                active: true,
            },
        });
        const nextDate = wrapper
            .findAll(".o-datepicker__table__cell--selectable")
            .find(
                (cell) => !cell.classes("o-datepicker__table__cell--selected"),
            );

        expect(nextDate).toBeDefined();
        await nextDate?.trigger("click");

        const selectedDate = wrapper.emitted("update:modelValue")?.[0][0] as
            Date | undefined;
        expect(selectedDate).toBeInstanceOf(Date);
        expect(selectedDate?.getHours()).toBe(13);
        expect(selectedDate?.getMinutes()).toBe(45);
    });

    test("applies same-day datetime minimum to available time options", () => {
        const wrapper = mount(ODatetimepicker, {
            props: {
                modelValue: new Date(2024, 0, 2, 10, 0),
                minDatetime: new Date(2024, 0, 2, 14, 30),
                timepicker: { hourFormat: "24" },
                active: true,
            },
        });
        const hours = wrapper.get('select[aria-label="Select Hour"]');

        expect(
            hours.find<HTMLOptionElement>('option[value="13"]').element
                .disabled,
        ).toBe(true);
        expect(
            hours.find<HTMLOptionElement>('option[value="14"]').element
                .disabled,
        ).toBe(false);
    });

    test("handles invalid keyboard input", async () => {
        const wrapper = mount(ODatetimepicker, {
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
        expect(input.element.value).toBe("");

        await input.setValue("21/06/wrong");
        await input.trigger("keyup", { key: "Enter" });

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(input.element.value).toBe("");
    });

    test("closes overlay on datetime selection when stayOpen is false", async () => {
        const wrapper = mount(ODatetimepicker, {
            props: {
                modelValue: new Date(2024, 0, 1, 12, 30),
                active: true,
                stayOpen: false,
            },
        });

        // find and click on a selectable date cell from the embedded datepicker
        const cells = wrapper.findAll(".o-datepicker__table__cell");
        const cellToSelect = cells.find(
            (c) =>
                c.classes("o-datepicker__table__cell--selectable") &&
                !c.classes("o-datepicker__table__cell--selected"),
        );
        expect(cellToSelect).toBeDefined();

        // select a date
        await cellToSelect?.trigger("click");

        // check that update:active event was emitted with false (overlay closes)
        const updateActiveEmits = wrapper.emitted("update:active");
        expect(updateActiveEmits).toBeDefined();
        expect(updateActiveEmits?.[0]).toStrictEqual([false]);
    });

    test("keeps overlay open on datetime selection when stayOpen is true", async () => {
        const wrapper = mount(ODatetimepicker, {
            props: {
                modelValue: new Date(2024, 0, 1, 12, 30),
                active: true,
                stayOpen: true,
            },
        });

        // find and click on a selectable date cell from the embedded datepicker
        const cells = wrapper.findAll(".o-datepicker__table__cell");
        const cellToSelect = cells.find(
            (c) =>
                c.classes("o-datepicker__table__cell--selectable") &&
                !c.classes("o-datepicker__table__cell--selected"),
        );
        expect(cellToSelect).toBeDefined();

        // select a date
        await cellToSelect?.trigger("click");

        // check that update:active event was NOT emitted (overlay stays open)
        const updateActiveEmits = wrapper.emitted("update:active");
        expect(updateActiveEmits).toBeUndefined();

        // verify the datepicker content still has the active class
        const contentElement = wrapper.find(".o-datepicker__content");
        expect(contentElement.exists()).toBe(true);
        expect(contentElement.classes("o-datepicker__content--active")).toBe(
            true,
        );
    });
});
