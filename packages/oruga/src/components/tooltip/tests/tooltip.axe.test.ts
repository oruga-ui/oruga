import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import OTooltip from "../Tooltip.vue";
import type { TooltipProps } from "../props.ts";

describe("OTooltip a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: TooltipProps }[] = [
        { title: "axe tooltip - base case", props: { label: "Tooltip" } },
        {
            title: "axe tooltip - position",
            props: { label: "Tooltip", position: "top" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OTooltip, {
            props: { ...props },
            slots: { default: "<button>Trigger</button>" },
            attachTo: document.body,
        });
        await setTimeout();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
