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
            title: "axe dialog - base case",
            props: {
                title: "Adcanced Title",
                subtitle: "Advanced subtitle",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                confirmButton: "OK",
                cancelButton: "CANCEL",
            },
        },
        {
            title: "axe dialog - modal case case",
            props: {
                backdrop: true,
                title: "Adcanced Title",
                subtitle: "Advanced subtitle",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                confirmButton: "OK",
                cancelButton: "CANCEL",
            },
        },
        {
            title: "axe dialog - alert case",
            props: {
                alert: true,
                title: "Adcanced Title",
                subtitle: "Advanced subtitle",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                confirmButton: "OK",
                cancelButton: "CANCEL",
            },
        },
        {
            title: "axe dialog - with aria",
            props: {
                title: "Adcanced Title",
                subtitle: "Advanced subtitle",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                confirmButton: "OK",
                cancelButton: "CANCEL",
                ariaLabel: "Some Dialog",
            },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(ODialog, {
            props: { active: true, ...props },
            global: {
                stubs: {
                    // intentionally stubs transition component
                    // to avoid potentially flaky snapshots
                    transition: true,
                    teleport: true,
                },
            },
            attachTo: document.body,
        });
        await nextTick(); // await all content got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
