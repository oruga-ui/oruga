import { defineComponent, h, nextTick, type VNode } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OInput from "../Input.vue";
import OField from "../../field/Field.vue";
import type { InputProps } from "../props.ts";

const TestComponent = defineComponent(
    (props) => (): VNode =>
        h(OField, { label: "Input" }, { default: () => h(OInput, props) }),
);

describe("OInput a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: InputProps<true | false>;
    }[] = [
        { title: "axe input - base case", props: { modelValue: "hello" } },
        {
            title: "axe input - number",
            props: { modelValue: 5, number: true },
        },
        {
            title: "axe input - rounded",
            props: { modelValue: "hello", rounded: true },
        },
        {
            title: "axe input - expanded",
            props: { modelValue: "hello", expanded: true },
        },
        {
            title: "axe input - with icon",
            props: { modelValue: "hello", icon: "search" },
        },
        {
            title: "axe input - password reveal",
            props: {
                modelValue: "hello",
                type: "password",
                passwordReveal: true,
            },
        },
        {
            title: "axe input - textarea",
            props: { modelValue: "hello", type: "textarea" },
        },
        {
            title: "axe input - disabled",
            props: { modelValue: "hello", disabled: true },
        },
        {
            title: "axe input - large size",
            props: { modelValue: "hello", size: "large" },
        },
        {
            title: "axe input - danger variant",
            props: { modelValue: "hello", variant: "danger" },
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
