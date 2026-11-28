import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import OProgress from "../Progress.vue";
import type { ProgressProps } from "../props.ts";

describe("OProgress a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: ProgressProps }[] = [
        { title: "axe progress - base case", props: { value: 40 } },
        { title: "axe progress - indeterminate" },
        {
            title: "axe progress - show value",
            props: { value: 40, showValue: true },
        },
        {
            title: "axe progress - percent format",
            props: { value: 2, max: 8, showValue: true, format: "percent" },
        },
        {
            title: "axe progress - formatter",
            props: {
                value: 128,
                max: 256,
                showValue: true,
                formatter: (value: number): string => `${value} MB`,
            },
        },
        {
            title: "axe progress - variant and size",
            props: { value: 40, variant: "primary", size: "large" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OProgress, {
            props: { ...props },
            attrs: { "aria-label": "Progress" },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
