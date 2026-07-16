import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OSlider from "@/components/slider/Slider.vue";

describe("OSlider tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OSlider);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("slider");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("renders a single thumb with the expected classes and aria attributes", () => {
        const wrapper = mount(OSlider, {
            props: { modelValue: 30, size: "large", variant: "danger" },
        });

        expect(wrapper.find(".o-slider__track").exists()).toBe(true);
        expect(wrapper.find(".o-slider__fill").exists()).toBe(true);
        expect(wrapper.findAll('[data-oruga="slider-thumb"]')).toHaveLength(1);
        expect(
            wrapper.find('[role="slider"]').attributes("aria-valuenow"),
        ).toBe("30");
        expect(
            wrapper.find('[role="slider"]').attributes("aria-disabled"),
        ).toBe("false");
        expect(wrapper.classes()).toContain("o-slider--large");
    });

    test("renders two thumbs for range sliders and updates the exposed value", async () => {
        const wrapper = mount(OSlider, {
            props: { range: true, modelValue: [20, 80], min: 0, max: 100 },
        });

        expect(wrapper.findAll('[data-oruga="slider-thumb"]')).toHaveLength(2);
        expect(wrapper.findAll('[role="slider"]')).toHaveLength(2);
        expect(wrapper.vm.value).toEqual([20, 80]);

        await wrapper.setProps({ modelValue: [30, 70] });

        expect(wrapper.vm.value).toEqual([30, 70]);
    });

    test("renders ticks when enabled", () => {
        const wrapper = mount(OSlider, {
            props: { ticks: true, min: 0, max: 100, step: 10 },
        });

        expect(wrapper.findAll('[data-oruga="slider-tick"]')).toHaveLength(11);
    });

    test("emits a change event when a thumb is moved with keyboard input", async () => {
        const wrapper = mount(OSlider, {
            props: { modelValue: 30, step: 1 },
        });

        await wrapper.find('[role="slider"]').trigger("keydown.right");

        expect(wrapper.emitted("change")).toBeTruthy();
        expect(wrapper.emitted("change")?.[0]?.[0]).toBeGreaterThan(30);
    });
});
