import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import OLoading from "../Loading.vue";
import type { LoadingProps } from "../props.ts";

describe("OLoading a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: LoadingProps }[] = [
        { title: "axe loading - base case", props: { active: true } },
        {
            title: "axe loading - full page",
            props: { active: true, fullPage: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OLoading, {
            props: { ...props },
            slots: { default: "<span>Content</span>" },
            attachTo: document.body,
        });
        await setTimeout();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
