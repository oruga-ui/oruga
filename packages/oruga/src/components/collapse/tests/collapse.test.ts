import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OCollapse from "@/components/collapse/Collapse.vue";

describe("OCollapse tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OCollapse);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("collapse");
        expect(wrapper.html()).toMatchSnapshot();
    });
});
