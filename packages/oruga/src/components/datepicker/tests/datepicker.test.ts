import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mount, enableAutoUnmount } from "@vue/test-utils";

import ODatepicker from "@/components/datepicker/Datepicker.vue";

describe("ODatepicker", () => {
    enableAutoUnmount(afterEach);

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2000, 0, 1));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("render correctly", () => {
        const wrapper = mount(ODatepicker, {
            props: { modelValue: new Date(2000, 0, 1) },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("datepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("parses keyboard input", async () => {
        const wrapper = mount(ODatepicker, { props: { readonly: false } });

        const target = wrapper.find("input");
        expect(target.exists()).toBeTruthy();
        await target.setValue("2024-04-10");

        const updates = wrapper.emitted("update:modelValue");
        expect(updates).toHaveLength(1);
        expect(updates[0]).toHaveLength(1);
        const updateValue = updates[0][0];
        expect(updateValue).toBeInstanceOf(Date);
        expect((updateValue as Date).toISOString()).toBe(
            "2024-04-10T00:00:00.000Z",
        );
    });

    test("handles invalid keyboard input", async () => {
        const wrapper = mount(ODatepicker, {
            props: { readonly: false, modelValue: new Date() },
        });

        const target = wrapper.find("input");
        expect(target.exists()).toBeTruthy();
        await target.setValue("not-a-date");

        const updates = wrapper.emitted("update:modelValue");
        expect(updates).toHaveLength(1);
        expect(updates[0]).toHaveLength(1);
        const updateValue = updates[0][0];
        expect(updateValue).toBeNull();
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
        await cellToSelect1.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(1);
        expect(emit[0][0]).toHaveLength(2);

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
        await cellToSelect2.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(2);
        expect(emit[1][0]).toHaveLength(3);

        // check three dates are selected
        selectedCells = cells.filter((c) =>
            c.classes("o-dpck__table__cell--selected"),
        );
        expect(selectedCells.length).toBe(3);

        // deselect preveus selected date
        await cellToSelect1.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(3);
        expect(emit[2][0]).toHaveLength(2);

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
        await cellToSelect.trigger("click");

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
        await cellToSelect.trigger("click");

        // check modelValue got updated
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(1);
        expect(emit[0][0]).toHaveLength(2);

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
        // select another date
        await cellToSelect.trigger("click");

        // check nothing got emitted yet
        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(1);

        // select second date
        cellToSelect = cells.find(
            (c) =>
                c.classes("o-dpck__table__cell--selectable") &&
                !c.classes("o-dpck__table__cell--selected"),
        );
        await cellToSelect.trigger("click");

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
        expect(emit[1][0]).toHaveLength(2);
    });
});
