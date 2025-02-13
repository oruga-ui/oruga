import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mount, enableAutoUnmount } from "@vue/test-utils";

import ODatepicker from "@/components/datepicker/Datepicker.vue";

describe("ODatepicker", () => {
    enableAutoUnmount(afterEach);

    beforeEach(() => {
        // vi.useFakeTimers();
        // vi.setSystemTime(new Date(2000, 0, 1));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("render correctly", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2000, 0, 1));
        const wrapper = mount(ODatepicker, {
            props: { modelValue: new Date(2000, 0, 1) },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("datepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("parses keyboard input", async () => {
        const wrapper = mount(ODatepicker);

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        await input.setValue("2024-04-10");

        let date = new Date(Date.UTC(2024, 3, 10));

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toHaveLength(1);
        expect(emits![0][0]).toBeInstanceOf(Date);
        expect((emits![0][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("10/04/2024");
        await input.setValue("2021-04-18");

        date = new Date(Date.UTC(2021, 3, 18));

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits![1]).toHaveLength(1);
        expect(emits![1][0]).toBeInstanceOf(Date);
        expect((emits![1][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("18/04/2021");
    });

    test("handles invalid keyboard input", async () => {
        const wrapper = mount(ODatepicker, {
            props: { modelValue: new Date() },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        await input.setValue("not-a-date");

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toHaveLength(1);
        expect(emits![0][0]).toBeUndefined();
        expect(input.element.value).toBe("");

        await input.setValue("21/06/wrong");

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(input.element.value).toBe("");
    });

    test("react accordingly when an date is selected with multiple prop", async () => {
        const wrapper = mount(ODatepicker, {
            props: { modelValue: [new Date()], multiple: true },
        });

        // check pre selected date
        const cells = wrapper.findAll(".o-dpck__table__cell");
        let selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        // check only one date is selected
        expect(selectedCells.length).toBe(1);

        // check nothing got emitted yet
        let emit = wrapper.emitted("update:modelValue");
        expect(emit).toBeUndefined();

        // select another date
        const cellToSelect1 = cells.find(
            (c) =>
                c.classes("o-dpck__table__cell--selectable") &&
                !c.classes("o-dpck__table__cell--selected"),
        );
        expect(cellToSelect1).toBeDefined();
        await cellToSelect1!.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(1);
        expect(emit![0][0]).toHaveLength(2);

        // check two dates are selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        expect(selectedCells.length).toBe(2);

        // select another date
        const cellToSelect2 = cells.find(
            (c) =>
                c.classes("o-dpck__table__cell--selectable") &&
                !c.classes("o-dpck__table__cell--selected"),
        );
        expect(cellToSelect2).toBeDefined();
        await cellToSelect2!.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(2);
        expect(emit![1][0]).toHaveLength(3);

        // check three dates are selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        expect(selectedCells.length).toBe(3);

        // deselect preveus selected date
        await cellToSelect1!.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(3);
        expect(emit![2][0]).toHaveLength(2);

        // check two dates are selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        expect(selectedCells.length).toBe(2);
    });

    test("react accordingly when an date is selected with range prop", async () => {
        const wrapper = mount(ODatepicker, {
            props: { modelValue: [], range: true },
        });

        // check pre selected date
        const cells = wrapper.findAll(".o-dpck__table__cell");
        let selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        // check nothing is selected yet
        expect(selectedCells.length).toBe(0);

        // check nothing got emitted yet
        let emit = wrapper.emitted("update:modelValue");
        expect(emit).toBeUndefined();

        // select first date
        let cellToSelect = cells.find(
            (c) =>
                c.classes("o-dpck__table__cell--selectable") &&
                !c.classes("o-dpck__table__cell--selected"),
        );
        expect(cellToSelect).toBeDefined();
        await cellToSelect!.trigger("click");

        // check nothing got emitted yet
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toBeUndefined();

        // check one date is selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--first-hovered"),
        );
        expect(selectedCells.length).toBe(1);

        // select second date
        cellToSelect = cells.find(
            (c) =>
                c.classes("o-dpck__table__cell--selectable") &&
                !c.classes("o-dpck__table__cell--selected"),
        );
        await cellToSelect!.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(1);
        expect(emit![0][0]).toHaveLength(2);

        // check two dates are selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        expect(selectedCells.length).not.toBe(0);

        // check one date is selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--first-selected"),
        );
        expect(selectedCells.length).toBe(1);

        // check one date is selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--last-selected"),
        );
        expect(selectedCells.length).toBe(1);

        // select another first date
        cellToSelect = cells.find(
            (c) =>
                c.classes("o-dpck__table__cell--selectable") &&
                !c.classes("o-dpck__table__cell--selected"),
        );
        expect(cellToSelect).toBeDefined();
        // select another date
        await cellToSelect!.trigger("click");

        // check nothing got emitted yet
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(1);

        // select second date
        cellToSelect = cells.find(
            (c) =>
                c.classes("o-dpck__table__cell--selectable") &&
                !c.classes("o-dpck__table__cell--selected"),
        );
        expect(cellToSelect).toBeDefined();
        await cellToSelect!.trigger("click");

        // check two dates are selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        expect(selectedCells.length).not.toBe(0);

        // check one date is selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--first-selected"),
        );
        expect(selectedCells.length).toBe(1);

        // check one date is selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--last-selected"),
        );
        expect(selectedCells.length).toBe(1);

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(2);
        expect(emit![1][0]).toHaveLength(2);
    });
});
