import { defineComponent, h, type VNode } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import OListbox from "../Listbox.vue";
import OField from "../../field/Field.vue";
import type { ListboxProps } from "../props.ts";

const TestComponent = defineComponent({
    setup(props: ListboxProps<unknown, true | false>): () => VNode {
        return () =>
            h(
                OField,
                { label: "Listbox" },
                { default: () => h(OListbox, props) },
            );
    },
});

describe("OListbox a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: ListboxProps<unknown, true | false>;
    }[] = [
        {
            title: "axe listbox - base case",
            props: {
                options: [
                    { label: "Item 1", modelValue: 1 },
                    { label: "Item 2", modelValue: 2 },
                ],
            },
        },
        {
            title: "axe listbox - multiple",
            props: {
                multiple: true,
                options: [
                    { label: "Item 1", modelValue: 1 },
                    { label: "Item 2", modelValue: 2 },
                ],
            },
        },
        {
            title: "axe listbox - disabled items",
            props: {
                options: [
                    { label: "Item 1", modelValue: 1 },
                    { label: "Item 2", modelValue: 2, disabled: true },
                ],
            },
        },
        {
            title: "axe listbox - filtered empty state",
            props: {
                options: [
                    { label: "Item 1", modelValue: 1 },
                    { label: "Item 2", modelValue: 2 },
                ],
                filterable: true,
                emptyLabel: "No results found",
            },
        },
        {
            title: "axe listbox - disabled",
            props: {
                disabled: true,
                options: [
                    { label: "Item 1", modelValue: 1 },
                    { label: "Item 2", modelValue: 2 },
                ],
            },
        },
        {
            title: "axe listbox - custom aria labels",
            props: {
                ariaLabel: "City selection",
                options: [
                    { label: "Item 1", modelValue: 1 },
                    { label: "Item 2", modelValue: 2 },
                ],
            },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TestComponent, {
            props: { ...props },
            attachTo: document.body,
            global: { stubs: { TransitionGroup: false } },
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
