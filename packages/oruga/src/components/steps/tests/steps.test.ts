import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OSteps from "@/components/steps/Steps.vue";

describe("OSteps tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OSteps);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("steps");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render accordingly when has variant prop", () => {
        const variant = "success";
        const wrapper = mount(OSteps, { props: { variant } });

        expect(wrapper.classes("o-steps--" + variant)).toBeTruthy();
    });

    test("render accordingly when has size prop", () => {
        const size = "large";
        const wrapper = mount(OSteps, { props: { size } });

        expect(wrapper.classes("o-steps--" + size)).toBeTruthy();
    });

    test("render accordingly when has vertical prop", () => {
        const vertical = true;
        const wrapper = mount(OSteps, { props: { vertical } });

        expect(wrapper.classes("o-steps--vertical")).toBeTruthy();
    });
});
