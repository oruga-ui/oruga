import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import type { OptionsProp } from "@/composables";
import type { MenuItemProps, MenuProps } from "../props";

import OMenu from "../Menu.vue";

describe("Menu a11y tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsProp<MenuItemProps<string>> = [
        {
            label: "Fruits",
            value: "fruits",

            icon: "info-circle",
            options: ["Apple", "Banana", "Watermelon"],
        },
        {
            label: "Vegetables",
            value: "vegetables",
            icon: "info-circle",
            options: ["Carrot", "Broccoli", "Cucumber", "Onion"],
        },
    ];

    const a11yCases: { title: string; props: MenuProps<string> }[] = [
        {
            title: "axe menu - base case",
            props: { options },
        },
        {
            title: "axe menu - label case",
            props: { options, label: "My Label" },
        },
        {
            title: "axe menu - no accordion case",
            props: { options, accordion: false },
        },
        {
            title: "axe menu - disabled case",
            props: { options, disabled: true },
        },
        {
            title: "axe menu - icon case",
            props: { options, icon: "info-circle" },
        },
        {
            title: "axe menu - role tree case",
            props: { options, role: "tree" },
        },
        {
            title: "axe menu - role menu case",
            props: { options, role: "menu" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OMenu, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
