import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OProgress from "@/components/progress/Progress.vue";

describe("OProgress tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OProgress, { props: { value: 40 } });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("progress");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("sets progressbar aria attributes", () => {
        const wrapper = mount(OProgress, {
            props: { value: 3, min: 1, max: 5 },
            attrs: { "aria-label": "Upload" },
        });

        expect(wrapper.attributes("role")).toBe("progressbar");
        expect(wrapper.attributes("aria-label")).toBe("Upload");
        expect(wrapper.attributes("aria-valuemin")).toBe("1");
        expect(wrapper.attributes("aria-valuemax")).toBe("5");
        expect(wrapper.attributes("aria-valuenow")).toBe("3");
        expect(wrapper.attributes("aria-valuetext")).toBeUndefined();
    });

    test("sets the bar width relative to the range", () => {
        const wrapper = mount(OProgress, {
            props: { value: 3, min: 1, max: 5 },
        });

        const bar = wrapper.find(".o-progress__bar");
        expect(bar.exists()).toBeTruthy();
        expect(bar.attributes("style")).toBe("width: 50%;");
    });

    test("clamps the value into the range", async () => {
        const wrapper = mount(OProgress, { props: { value: 150 } });

        expect(wrapper.attributes("aria-valuenow")).toBe("100");
        expect(wrapper.find(".o-progress__bar").attributes("style")).toBe(
            "width: 100%;",
        );

        await wrapper.setProps({ value: -20 });

        expect(wrapper.attributes("aria-valuenow")).toBe("0");
        expect(wrapper.find(".o-progress__bar").attributes("style")).toBe(
            "width: 0%;",
        );
    });

    test("handles an empty range", () => {
        const wrapper = mount(OProgress, {
            props: { value: 5, min: 5, max: 5, showValue: true },
        });

        expect(wrapper.find(".o-progress__bar").attributes("style")).toBe(
            "width: 0%;",
        );
        expect(wrapper.find(".o-progress__label").text()).toBe("5");
    });

    test.each([undefined, NaN])(
        "is indeterminate when value is %s",
        (value) => {
            const wrapper = mount(OProgress, {
                props: { value, showValue: true },
            });

            expect(wrapper.classes()).toContain("o-progress--indeterminate");
            expect(wrapper.attributes("aria-valuenow")).toBeUndefined();
            expect(
                wrapper.find(".o-progress__bar").attributes("style"),
            ).toBeUndefined();
            expect(wrapper.find(".o-progress__label").exists()).toBeFalsy();
        },
    );

    test("is determinate when value is zero", () => {
        const wrapper = mount(OProgress, { props: { value: 0 } });

        expect(wrapper.classes()).not.toContain("o-progress--indeterminate");
        expect(wrapper.attributes("aria-valuenow")).toBe("0");
    });

    test("does not render the label by default", () => {
        const wrapper = mount(OProgress, { props: { value: 40 } });

        expect(wrapper.find(".o-progress__label").exists()).toBeFalsy();
    });

    test("renders the raw value as label", () => {
        const wrapper = mount(OProgress, {
            props: { value: 1234, max: 2000, showValue: true, locale: "en-US" },
        });

        expect(wrapper.find(".o-progress__label").text()).toBe("1,234");
    });

    test("renders the percentage as label", () => {
        const wrapper = mount(OProgress, {
            props: {
                value: 6,
                max: 8,
                showValue: true,
                format: "percent",
                locale: "en-US",
            },
        });

        expect(wrapper.find(".o-progress__label").text()).toBe("75%");
        expect(wrapper.attributes("aria-valuetext")).toBeUndefined();
    });

    test("renders the label with a custom formatter", () => {
        const wrapper = mount(OProgress, {
            props: {
                value: 128,
                max: 256,
                showValue: true,
                format: "percent",
                formatter: (value: number) => `${value} MB`,
            },
        });

        expect(wrapper.find(".o-progress__label").text()).toBe("128 MB");
        expect(wrapper.attributes("aria-valuetext")).toBe("128 MB");
    });

    test("renders the default slot with slot props", () => {
        const wrapper = mount(OProgress, {
            props: { value: 3, max: 4, format: "percent", locale: "en-US" },
            slots: {
                default: `<template #default="{ value, label }">{{ value }} done ({{ label }})</template>`,
            },
        });

        expect(wrapper.find(".o-progress__label").text()).toBe("3 done (75%)");
    });

    test("applies variant, size and rounded classes", () => {
        const wrapper = mount(OProgress, {
            props: {
                value: 10,
                variant: "primary",
                size: "large",
                rounded: true,
            },
        });

        expect(wrapper.classes()).toStrictEqual(
            expect.arrayContaining([
                "o-progress",
                "o-progress--primary",
                "o-progress--large",
                "o-progress--rounded",
            ]),
        );
    });
});
