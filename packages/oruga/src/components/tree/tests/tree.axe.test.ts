import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import type { TreeProps, TreeOptions } from "../props";

import OTree from "../Tree.vue";

describe("Menu axe tests", () => {
    enableAutoUnmount(afterEach);

    const options: TreeOptions<string> = [
        {
            label: "Documents",

            icon: "folder",
            options: [
                {
                    label: "Work",
                    value: "work",
                    icon: "cog",
                    options: [
                        {
                            label: "Expenses.doc",
                            value: "expenses",
                            icon: "file",
                        },
                        {
                            label: "Resume.doc",
                            value: "resume",
                            icon: "file",
                        },
                    ],
                },
                {
                    label: "Home",
                    value: "home",
                    icon: "home",
                    options: [
                        {
                            label: "Invoices.txt",
                            value: "invoices",
                            icon: "file",
                        },
                    ],
                },
            ],
        },
        {
            label: "Events",
            value: "events",
            options: [
                {
                    label: "Meeting",
                    value: "meeting",
                    icon: "calendar-plus",
                },
                {
                    label: "Product Launch",
                    value: "product-launch",
                    icon: "calendar-plus",
                },
                {
                    label: "Report Review",
                    value: "report-review",
                    icon: "calendar-plus",
                },
            ],
        },
        {
            label: "Movies",
            value: "movies",
            icon: "star",
            options: [
                {
                    label: "Al Pacino",
                    value: "al-pacion",
                    icon: "star",
                    options: [
                        {
                            label: "Scarface",
                            value: "scarface",
                            icon: "video",
                        },
                        {
                            label: "Serpico",
                            value: "serpico",
                            icon: "video",
                        },
                    ],
                },
                {
                    label: "Robert De Niro",
                    value: "robert-de-niro",
                    icon: "star",
                    options: [
                        {
                            label: "Goodfellas",
                            value: "goodfellas",
                            icon: "video",
                        },
                        {
                            label: "Untouchables",
                            value: "untouchables",
                            icon: "video",
                        },
                    ],
                },
            ],
        },
    ];

    const a11yCases: { title: string; props: TreeProps<string> }[] = [
        {
            title: "axe tree - base case",
            props: { options, ariaLabel: "Tree Component" },
        },
        {
            title: "axe tree - empty case",
            props: { options: [] },
        },
        {
            title: "axe tree - collapsable case",
            props: { options, collapsable: true },
        },
        {
            title: "axe tree - disabled case",
            props: { options, disabled: true },
        },
        {
            title: "axe tree - selectable case",
            props: { options, selectable: true, modelValue: "invoices" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OTree, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
