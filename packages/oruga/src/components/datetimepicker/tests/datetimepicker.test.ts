import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import ODatetimepicker from "@/components/datetimepicker/Datetimepicker.vue";

describe("ODatetimepicker tests", () => {
    enableAutoUnmount(afterEach);

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2000, 0, 0));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("render correctly", () => {
        const wrapper = mount(ODatetimepicker, {
            props: { modelValue: new Date(2000, 0, 1) },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("datetimepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("parses keyboard input", async () => {
        const wrapper = mount(ODatetimepicker);

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        await input.setValue("6.8.2024, 10:51");

        let date = new Date(2024, 5, 8, 10, 51);

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits[0]).toHaveLength(1);
        expect(emits[0][0]).toBeInstanceOf(Date);
        expect((emits[0][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("08/06/2024, 10:51");

        await input.setValue("21/10/2021 12:23");

        date = new Date(2021, 9, 21, 12, 23);

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits[1]).toHaveLength(1);
        expect(emits[1][0]).toBeInstanceOf(Date);
        expect((emits[1][0] as Date).toISOString()).toBe(date.toISOString());
        expect(input.element.value).toBe("21/10/2021, 12:23");
    });

    test("handles invalid keyboard input", async () => {
        const wrapper = mount(ODatetimepicker, {
            props: { modelValue: new Date() },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        await input.setValue("not-a-date");

        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits[0]).toHaveLength(1);
        expect(emits[0][0]).toBeNull();
        expect(input.element.value).toBe("");

        await input.setValue("21/06/wrong");

        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(input.element.value).toBe("");
    });
});
