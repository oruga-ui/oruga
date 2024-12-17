import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import type { OptionsProp } from "@/composables";

import OMenu from "../Menu.vue";
import { nextTick } from "vue";
import type { MenuProps } from "../props";

describe("Menu axe tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsProp<string> = [
        {
            label: "Fruits",
            value: "fruits",
            attrs: {
                icon: "info-circle",
                options: ["Apple", "Banana", "Watermelon"],
            },
        },
        {
            label: "Vegetables",
            value: "vegetables",
            attrs: {
                icon: "info-circle",
                options: ["Carrot", "Broccoli", "Cucumber", "Onion"],
            },
        },
    ];

    const a11yCases: { title: string; props: MenuProps<string> }[] = [
        {
            title: "axe tabs - base case",
            props: { options },
        },
        {
            title: "axe tabs - label case",
            props: { options, label: "My Label" },
        },
        {
            title: "axe tabs - no accordion case",
            props: { options, accordion: false },
        },
        {
            title: "axe tabs - disabled case",
            props: { options, disabled: true },
        },
        {
            title: "axe tabs - icon case",
            props: { options, icon: "info-circle" },
        },
        {
            title: "axe tabs - role tree case",
            props: { options, role: "tree" },
        },
        {
            title: "axe tabs - role menu case",
            props: { options, role: "menu" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OMenu, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
