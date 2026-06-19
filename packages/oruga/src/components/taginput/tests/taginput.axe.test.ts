import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import type { OptionsProp } from "@/composables";

import OTaginput from "../Taginput.vue";
import type { TaginputProps } from "../props.ts";
import { OField } from "@/components/field/index.ts";

const TestComponent = defineComponent(
    (props) => () =>
        h(
            OField,
            { label: "My Input" },
            {
                default: () => h(OTaginput, props),
            },
        ),
);

describe("OTaginput axe tests", () => {
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
        props?: TaginputProps<unknown>;
    }[] = [
        {
            title: "axe taginput - base case",
            props: { options },
        },
        {
            title: "axe taginput - with tags",
            props: { options, modelValue: ["a", "b", "c"] },
        },
        {
            title: "axe taginput - expanded",
            props: { options, expanded: true },
        },
        {
            title: "axe taginput - teleport",
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
