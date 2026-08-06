import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OIcon from "@/components/icon/Icon.vue";

describe("OIcon tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OIcon);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("icon");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("sets aria-hidden when no aria label is provided", () => {
        const wrapper = mount(OIcon);

        expect(wrapper.attributes("aria-hidden")).toBe("true");
    });

    test("does not set aria-hidden when an aria label is provided", () => {
        const wrapper = mount(OIcon, {
            props: {
                ariaLabel: "Close",
            },
        });

        expect(wrapper.attributes("aria-hidden")).toBeUndefined();
    });
});
