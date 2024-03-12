import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import StepsExample from "./StepsExample.vue";

describe("Steps Integration", () => {
    enableAutoUnmount(afterEach);

    const a11yCases = [
        {
            title: "axe steps - base case",
            props: undefined,
        },
        {
            title: "axe steps - isVertical",
            props: { isVertical: true },
        },
        {
            title: "axe steps - isAnimated",
            props: { isAnimated: true },
        },
        {
            title: "axe steps - isRounded",
            props: { isRounded: true },
        },
        {
            title: "axe steps - hasNavigation",
            props: { hasNavigation: true },
        },
        {
            title: "axe steps - labelPosition",
            props: { labelPosition: "left" },
        },
        {
            title: "axe steps - isStepsClickable",
            props: { isStepsClickable: true },
        },
        {
            title: "axe steps - isProfileSuccess",
            props: { isProfileSuccess: true },
        },
        {
            title: "axe steps - showSocial",
            props: { showSocial: true },
        },
        {
            title: "axe steps - customNavigation",
            props: { customNavigation: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(StepsExample, props);
        expect(await axe(wrapper.html())).toHaveNoViolations();
    });
});
