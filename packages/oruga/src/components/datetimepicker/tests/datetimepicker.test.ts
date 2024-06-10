import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import ODatetimepicker from "@/components/datetimepicker/Datetimepicker.vue";

describe("ODatetimepicker tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(ODatetimepicker);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("datetimepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });
});
