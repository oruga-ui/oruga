import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OSwitch from "../Switch.vue";

describe("Switch axe tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases = [
        {
            title: "axe switch - base case",
            props: { label: "Switch Label" },
        },
        {
            title: "axe switch - position case",
            props: { label: "Switch Label", position: "left" },
        },
        {
            title: "axe switch - id case",
            props: { label: "Checkbox Label", id: "my-id" },
        },
        {
            title: "axe switch - variant case",
            props: { label: "Checkbox Label", variant: "success" },
        },
        {
            title: "axe switch - passivevariant case",
            props: { label: "Checkbox Label", passiveVariant: "success" },
        },
        {
            title: "axe switch - size case",
            props: { label: "Checkbox Label", size: "large" },
        },
        {
            title: "axe switch - required case",
            props: { label: "Checkbox Label", required: true },
        },
        {
            title: "axe switch - rounded case",
            props: { label: "Checkbox Label", rounded: true },
        },
        {
            title: "axe switch - disabled case",
            props: { label: "Checkbox Label", disabled: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OSwitch, {
            props: { ...props },
            attachTo: document.body,
        });

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
