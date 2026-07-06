import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OIcon from "../Icon.vue";
import type { IconProps } from "../props.ts";
import { nextTick } from "vue";

describe("OIcon a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: IconProps }[] = [
        { title: "axe icon - base case", props: { icon: "home" } },
        {
            title: "axe icon - custom size",
            props: { icon: "home", size: "large" },
        },
        { title: "axe icon - spin", props: { icon: "home", spin: true } },
        {
            title: "axe icon - clickable",
            props: {
                icon: "home",
                clickable: true,
                ariaLabel: "Clickable Icon",
            },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OIcon, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
