import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import OButton from "../Button.vue";
import type { ButtonProps } from "../props.ts";

describe("OButton a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: ButtonProps }[] = [
        { title: "axe button - base case", props: { label: "Button" } },
        {
            title: "axe button - outlined",
            props: { label: "Button", outlined: true },
        },
        {
            title: "axe button - expanded",
            props: { label: "Button", expanded: true },
        },
        {
            title: "axe button - disabled",
            props: { label: "Button", disabled: true },
        },
        {
            title: "axe button - loading",
            props: { label: "Button", loading: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OButton, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
