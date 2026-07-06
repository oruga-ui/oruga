import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OBreadcrumb from "../Breadcrumb.vue";
import type { BreadcrumbItemProps, BreadcrumbProps } from "../props";
import { nextTick } from "vue";

describe("OBreadcrumb a11y tests", () => {
    enableAutoUnmount(afterEach);

    const options: (BreadcrumbItemProps | Record<string, string>)[] = [
        {
            label: "Home",
            tag: "router-link",
            to: "/",
            active: true,
        },
        {
            label: "Docs",
            tag: "a",
            href: "/documentation/",
            disabled: true,
        },
        {
            label: "Breadcrumb",
            tag: "router-link",
            to: "/components/Breadcrumb",
        },
    ];

    const a11yCases: {
        title: string;
        props?: BreadcrumbProps;
    }[] = [
        {
            title: "axe breadcrumb - base case",
            props: { ariaLabel: "Breadcrumb", options },
        },
        {
            title: "axe breadcrumb - centered large",
            props: {
                position: "centered",
                size: "large",
                ariaLabel: "Breadcrumb",
                options,
            },
        },
        {
            title: "axe breadcrumb - options prop",
            props: {
                ariaLabel: "Breadcrumb",
                options: [
                    { label: "Home", tag: "router-link", to: "/" },
                    {
                        label: "Docs",
                        tag: "router-link",
                        to: "/documentation/",
                    },
                    {
                        label: "Breadcrumb",
                        tag: "router-link",
                        to: "/components/Breadcrumb",
                    },
                ],
            },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OBreadcrumb, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
