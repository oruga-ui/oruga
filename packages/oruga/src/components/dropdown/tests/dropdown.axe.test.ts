import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import type { OptionsProp } from "@/composables";

import ODropdown from "../Dropdown.vue";
import type { DropdownProps } from "../props";

describe("Dropdown axe tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsProp = [
        { label: "Item 1", value: 1 },
        { label: "Item 2", value: 2 },
        { label: "Item 3", value: 3 },
        { label: "Item 4", value: 4 },
        { label: "Item 5", value: 5 },
        { label: "Item 6", value: 6 },
        { label: "Item 7", value: 7 },
        { label: "Item 8", value: 8 },
        { label: "Item 9", value: 9 },
    ];

    const a11yCases = [
        {
            title: "axe dropdown - base case",
            props: { options },
        },
        {
            title: "axe dropdown - active",
            props: { options, active: true, ariaLabel: "accessiblle-name" },
        },
        {
            title: "axe dropdown - selectable",
            props: {
                options,
                active: true,
                selectable: true,
                ariaLabel: "accessiblle-name",
            },
        },
        {
            title: "axe dropdown - multiple",
            props: {
                options,
                active: true,
                selectable: true,
                multiple: true,
                ariaLabel: "accessiblle-name",
            },
        },
        {
            title: "axe dropdown - keepFirst",
            props: {
                options,
                active: true,
                selectable: true,
                keepFirst: true,
                ariaLabel: "accessiblle-name",
            },
        },
        {
            title: "axe dropdown - scrollable",
            props: {
                options,
                active: true,
                scrollable: true,
                ariaLabel: "accessiblle-name",
            },
        },
        {
            title: "axe dropdown - inline",
            props: { options, inline: true, ariaLabel: "accessiblle-name" },
        },
        {
            title: "axe dropdown - position",
            props: {
                options,
                position: "right" as DropdownProps<string>["position"],
            },
        },
        {
            title: "axe dropdown - expanded",
            props: { options, expanded: true },
        },
        {
            title: "axe dropdown - teleport",
            props: { options, teleport: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(ODropdown, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
