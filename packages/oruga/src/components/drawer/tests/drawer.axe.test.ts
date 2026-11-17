import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import ODrawer from "../Drawer.vue";
import type { DrawerProps } from "../props.ts";

describe("ODrawer a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: DrawerProps }[] = [
        { title: "axe drawer - closed", props: { active: false } },
        { title: "axe drawer - base case", props: { active: true } },
        {
            title: "axe drawer - modal case",
            props: { active: true, backdrop: true },
        },
        {
            title: "axe drawer - right",
            props: { active: true, position: "right" },
        },
        {
            title: "axe drawer - header, body and footer",
            props: {
                active: true,
                backdrop: true,
                closeable: true,
                title: "Notifications",
                subtitle: "You have 3 unread messages",
                content: "Lorem ipsum dolor sit amet.",
                confirmButton: "OK",
                cancelButton: "CANCEL",
            },
        },
        {
            title: "axe drawer - loading",
            props: {
                active: true,
                backdrop: true,
                title: "Saving",
                content: "Please wait",
                loading: true,
                loadingLabel: "Saving...",
                confirmButton: "OK",
            },
        },
        {
            title: "axe drawer - bottom with a described content",
            props: {
                active: true,
                position: "bottom",
                title: "Cookies",
                ariaDescribedby: "description",
                content: "We use cookies",
            },
        },
        {
            title: "axe drawer - resizable",
            props: { active: true, resizable: true },
        },
        {
            title: "axe drawer - fullscreen",
            props: { active: true, fullscreen: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(ODrawer, {
            props: { ...props },
            attrs: { "aria-label": "Navigation" },
            slots: { default: "<div>Drawer content</div>" },
            attachTo: document.body,
            global: { stubs: { teleport: true } },
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
