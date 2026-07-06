import { defineComponent, h, nextTick, type VNode } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OSelect from "../Select.vue";
import OField from "../../field/Field.vue";
import type { SelectProps } from "../props.ts";

const TestComponent = defineComponent(
    (props) => (): VNode =>
        h(OField, { label: "Select" }, { default: () => h(OSelect, props) }),
);

describe("OSelect a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: SelectProps<unknown, true | false>;
    }[] = [
        {
            title: "axe select - base case",
            props: { options: ["One", "Two"], placeholder: "Choose" },
        },
        {
            title: "axe select - multiple",
            props: {
                options: ["One", "Two"],
                placeholder: "Choose",
                multiple: true,
            },
        },
        {
            title: "axe select - disabled",
            props: {
                options: ["One", "Two"],
                placeholder: "Choose",
                disabled: true,
            },
        },
        {
            title: "axe select - expanded",
            props: {
                options: ["One", "Two"],
                placeholder: "Choose",
                expanded: true,
            },
        },
        {
            title: "axe select - rounded",
            props: {
                options: ["One", "Two"],
                placeholder: "Choose",
                rounded: true,
            },
        },
        {
            title: "axe select - with icon",
            props: {
                options: ["One", "Two"],
                placeholder: "Choose",
                icon: "search",
            },
        },
        {
            title: "axe select - grouped options",
            props: {
                options: [
                    { label: "Group 1", options: ["One", "Two"] },
                    { label: "Group 2", options: ["Three", "Four"] },
                ],
                placeholder: "Choose",
            },
        },
        {
            title: "axe select - variant and size",
            props: {
                options: ["One", "Two"],
                placeholder: "Choose",
                size: "large",
                variant: "danger",
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
