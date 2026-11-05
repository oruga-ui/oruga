import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

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

    describe("range thumbs crossing each other", () => {
        test("keep their values when a thumb reaches zero", async () => {
            const wrapper = mount({
                components: { OSlider },
                data: () => ({ value: [20, 80] }),
                template: `<OSlider v-model="value" range :min="0" :max="100" />`,
            });
            await nextTick();

            const [startThumb, endThumb] = wrapper.findAll('[role="slider"]');

            // move the start thumb past the end thumb
            await startThumb.trigger("keydown", { key: "End" });
            expect(wrapper.vm.value).toEqual([80, 100]);

            // move the end thumb down to zero
            await endThumb.trigger("keydown", { key: "Home" });
            expect(wrapper.vm.value).toEqual([0, 100]);
            expect(startThumb.attributes("aria-valuenow")).toBe("100");
            expect(endThumb.attributes("aria-valuenow")).toBe("0");

            // move the end thumb up again from where it is
            await endThumb.trigger("keydown", { key: "ArrowRight" });
            expect(wrapper.vm.value).toEqual([1, 100]);
            expect(startThumb.attributes("aria-valuenow")).toBe("100");
            expect(endThumb.attributes("aria-valuenow")).toBe("1");
        });

        test("keep their values when a thumb passes zero", async () => {
            const wrapper = mount({
                components: { OSlider },
                data: () => ({ value: [-20, 20] }),
                template: `<OSlider v-model="value" range :min="-50" :max="50" />`,
            });
            await nextTick();

            const [startThumb, endThumb] = wrapper.findAll('[role="slider"]');

            // move the start thumb past the end thumb
            await startThumb.trigger("keydown", { key: "End" });
            expect(wrapper.vm.value).toEqual([20, 50]);

            // move the end thumb down through zero
            for (let i = 0; i < 25; i++)
                await endThumb.trigger("keydown", { key: "ArrowLeft" });

            expect(wrapper.vm.value).toEqual([-5, 50]);
            expect(startThumb.attributes("aria-valuenow")).toBe("50");
            expect(endThumb.attributes("aria-valuenow")).toBe("-5");
        });
    });
});
