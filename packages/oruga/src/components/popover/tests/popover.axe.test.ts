import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import OPopover from "../Popover.vue";
import type { PopoverProps } from "../props.ts";

describe("OPopover a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: PopoverProps;
    }[] = [
        {
            title: "axe popover - base case",
            props: {},
        },
        {
            title: "axe popover - open popover",
            props: { active: true },
        },
        {
            title: "axe popover - modal & backdrop",
            props: { disabled: true, modal: true, backdrop: true },
        },
        {
            title: "axe popover - disabled",
            props: { disabled: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OPopover, {
            props: {
                ...props,
                content:
                    "Lorem ipsum dolor sit amet, consectetur warning elit.",
            },
            slots: { default: "<p> Open Popover! </p>" },
            attachTo: document.body,
        });
        await setTimeout(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
