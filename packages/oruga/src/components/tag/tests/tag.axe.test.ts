import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import OTag from "../Tag.vue";
import type { TagProps } from "../props.ts";

describe("OTag a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: TagProps }[] = [
        { title: "axe tag - base case", props: { label: "Tag" } },
        {
            title: "axe tag - closable",
            props: { label: "Tag", closeable: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OTag, {
            props: { ...props },
            attachTo: document.body,
        });
        await setTimeout();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
