import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick, type Component } from "vue";

import ODialog from "@/components/dialog/Dialog.vue";
import type { DialogProps } from "../props";

describe("ODialog axe test", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: DialogProps<Component> }[] = [
        {
            title: "axe checkbox - base case",
            props: { label: "Checkbox Label" },
        },
        {
            title: "axe checkbox - indeterminate case",
            props: { label: "Checkbox Label", indeterminate: true },
        },
        {
            title: "axe checkbox - id case",
            props: { label: "Checkbox Label", id: "my-id" },
        },
        {
            title: "axe checkbox - variant case",
            props: { label: "Checkbox Label", variant: "success" },
        },
        {
            title: "axe checkbox - size case",
            props: { label: "Checkbox Label", size: "large" },
        },
        {
            title: "axe checkbox - required case",
            props: { label: "Checkbox Label", required: true },
        },
        {
            title: "axe checkbox - disabled case",
            props: { label: "Checkbox Label", disabled: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(ODialog, {
            props: { active: true, ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
