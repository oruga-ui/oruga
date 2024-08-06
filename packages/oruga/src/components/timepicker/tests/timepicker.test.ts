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
        const wrapper = mount(OTimepicker, {
            props: { modelValue: new Date(2000, 0, 1), readonly: false },
        });

        let input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        await input.setValue("02:45");

        const date = new Date();
        date.setHours(2);
        date.setMinutes(45);
        date.setSeconds(0);
        date.setMilliseconds(0);

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits[0]).toHaveLength(1);
        expect(emits[0][0]).toBeInstanceOf(Date);
        expect((emits[0][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("02:45");

        input = wrapper.find("input");
        await input.setValue("12:3");

        date.setHours(12);
        date.setMinutes(3);

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits[1]).toHaveLength(1);
        expect(emits[1][0]).toBeInstanceOf(Date);
        expect((emits[1][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("12:03");
    });

    test("handles invalid keyboard input", async () => {
        const wrapper = mount(OTimepicker, {
            props: { readonly: false, modelValue: new Date() },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        await input.setValue("not-a-date");

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits[0]).toHaveLength(1);
        expect(emits[0][0]).toBeNull();
        expect(input.element.value).toBe("00:00");

        await input.setValue("21:wrong");

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(input.element.value).toBe("00:00");
    });
});
