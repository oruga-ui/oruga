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
});
