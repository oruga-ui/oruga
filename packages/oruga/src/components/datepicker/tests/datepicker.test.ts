import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { mount, enableAutoUnmount } from "@vue/test-utils";

import { timezoneMock } from "@/__tests__/mocks/timezoneMock";

import ODatepicker from "@/components/datepicker/Datepicker.vue";

describe("ODatepicker", () => {
    enableAutoUnmount(afterEach);

    beforeEach(() => {
        timezoneMock("en-GB", "Europe/London");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("render correctly", () => {
        const wrapper = mount(ODatepicker);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("datepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("parses keyboard input", () => {
        const wrapper = mount(ODatepicker, { props: { readonly: false } });

        const target = wrapper.find("input");
        expect(target.exists()).toBeTruthy();
        target.setValue("2024-04-10");

        const updates = wrapper.emitted("update:modelValue");
        expect(updates).toHaveLength(1);
        expect(updates[0]).toHaveLength(1);
        const updateValue = updates[0][0];
        expect(updateValue).toBeInstanceOf(Date);
        expect((updateValue as Date).toISOString()).toBe(
            "2024-04-10T00:00:00.000Z",
        );
    });

    test("handles invalid keyboard input", () => {
        const wrapper = mount(ODatepicker, { props: { readonly: false } });

        const target = wrapper.find("input");
        expect(target.exists()).toBeTruthy();
        target.setValue("not-a-date");

        const updates = wrapper.emitted("update:modelValue");
        expect(updates).toHaveLength(1);
        expect(updates[0]).toHaveLength(1);
        const updateValue = updates[0][0];
        expect(updateValue).toBeNull();
    });
});
