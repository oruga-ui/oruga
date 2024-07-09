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
});
