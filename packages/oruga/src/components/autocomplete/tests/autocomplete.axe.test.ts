import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import type { OptionsProp } from "@/composables";

import OAutocomplete from "../Autocomplete.vue";
import type { AutocompleteProps } from "../props.ts";
import { OField } from "@/components/field/index.ts";

const TestComponent = defineComponent(
    (props) => () =>
        h(
            OField,
            { label: "My Input" },
            {
                default: () => h(OAutocomplete, props),
            },
        ),
);

describe("OAutocomplete axe tests", () => {
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

    const a11yCases: {
        title: string;
        props?: AutocompleteProps<unknown>;
    }[] = [
        {
            title: "axe autocomplete - base case",
            props: { options },
        },
        {
            title: "axe autocomplete - active",
            props: { options, active: true },
        },
        {
            title: "axe autocomplete - keepFirst",
            props: {
                options,
                active: true,
                keepFirst: true,
            },
        },
        {
            title: "axe autocomplete - position top",
            props: { options, position: "top" },
        },
        {
            title: "axe autocomplete - expanded",
            props: { options, expanded: true },
        },
        {
            title: "axe autocomplete - teleport",
            props: { options, teleport: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TestComponent, {
            props: { ...props },
            attachTo: document.body,
        });
        await setTimeout(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
