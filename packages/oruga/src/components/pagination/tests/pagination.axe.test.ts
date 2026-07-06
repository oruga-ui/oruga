import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import OPagination from "../Pagination.vue";
import type { PaginationProps } from "../props.ts";

describe("OPagination a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: PaginationProps }[] = [
        {
            title: "axe pagination - base case",
            props: { total: 10, perPage: 5 },
        },
        {
            title: "axe pagination - rounded",
            props: { total: 10, perPage: 5, rounded: true },
        },
        {
            title: "axe pagination - simple",
            props: { total: 10, perPage: 5, simple: true },
        },
        {
            title: "axe pagination - disabled",
            props: { total: 10, perPage: 5, disabled: true },
        },
        {
            title: "axe pagination - custom labels",
            props: {
                total: 10,
                perPage: 5,
                ariaNextLabel: "Go to next page",
                ariaPreviousLabel: "Go to previous page",
                ariaCurrentLabel: "Current page",
            },
        },
        {
            title: "axe pagination - size ",
            props: { total: 10, perPage: 5, size: "small" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OPagination, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
