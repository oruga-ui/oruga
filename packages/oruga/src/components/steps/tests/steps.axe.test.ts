import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import StepsExample from "./StepsExample.vue";

describe("OSteps axe tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases = [
        {
            title: "axe steps - base case",
            props: undefined,
        },
        {
            title: "axe steps - vertical",
            props: { vertical: true },
        },
        {
            title: "axe steps - animated",
            props: { animated: true },
        },
        {
            title: "axe steps - rounded",
            props: { rounded: true },
        },
        {
            title: "axe steps - has navigation",
            props: { hasNavigation: true },
        },
        {
            title: "axe steps - label  position",
            props: { labelPosition: "left" },
        },
        {
            title: "axe steps - is steps clickable",
            props: { isStepsClickable: true },
        },
        {
            title: "axe steps - is profile success",
            props: { isProfileSuccess: true },
        },
        {
            title: "axe steps - show social",
            props: { showSocial: true },
        },
        {
            title: "axe steps - custom navigation",
            props: { customNavigation: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(StepsExample, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
