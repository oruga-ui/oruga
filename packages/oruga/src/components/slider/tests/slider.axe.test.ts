import { defineComponent, h, nextTick, type VNode } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OSlider from "../Slider.vue";
import OField from "../../field/Field.vue";
import type { SliderProps } from "../props.ts";

const TestComponent = defineComponent(
    (props) => (): VNode =>
        h(OField, { label: "Slider" }, { default: () => h(OSlider, props) }),
);

describe("OSlider a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: SliderProps<true | false>;
    }[] = [
        { title: "axe slider - base case", props: { modelValue: 30 } },
        {
            title: "axe slider - range",
            props: { modelValue: [20, 80], range: true },
        },
        {
            title: "axe slider - disabled",
            props: { modelValue: 30, disabled: true },
        },
        {
            title: "axe slider - custom range",
            props: { modelValue: 30, min: 10, max: 90, step: 5 },
        },
        {
            title: "axe slider - rounded with tooltip",
            props: { modelValue: 40, rounded: true, tooltip: true },
        },
        {
            title: "axe slider - variant and size",
            props: { modelValue: 50, variant: "danger", size: "large" },
        },
        {
            title: "axe slider - formatter",
            props: {
                modelValue: 60,
                formatter: (value: number) => `${value}%`,
            },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TestComponent, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
