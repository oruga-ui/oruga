import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { axe } from "jest-axe";

import TabsExample from "./TabsAxeExample.vue";

describe("Tabs axe tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases = [
        {
            title: "axe tabs - base case",
            props: undefined,
        },
        {
            title: "axe tabs - vertical",
            props: { vertical: true },
        },
        {
            title: "axe tabs - animated",
            props: { animated: true },
        },
        {
            title: "axe tabs - multiline",
            props: { multiline: true },
        },
        {
            title: "axe tabs - expanded",
            props: { expanded: true },
        },
        {
            title: "axe tabs - boxed",
            props: { type: "boxed" },
        },
        {
            title: "axe tabs - variant",
            props: { variant: "danger" },
        },
        {
            title: "axe tabs - position",
            props: { position: "right" },
        },
        {
            title: "axe tabs - size",
            props: { size: "large" },
        },
        {
            title: "axe tabs - isStepsClickable",
            props: { isStepsClickable: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TabsExample, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();
        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
