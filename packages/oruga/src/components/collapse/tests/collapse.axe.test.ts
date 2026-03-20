import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import OCollapse from "../Collapse.vue";
import type { CollapseProps } from "../props";

describe("OCollapse axe test", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: CollapseProps }[] = [
        {
            title: "axe collapse - base case",
        },
        {
            title: "axe collapse - open case",
            props: {
                open: true,
            },
        },
        {
            title: "axe collapse - name case",
            props: {
                name: "some-collapse",
            },
        },
        {
            title: "axe collapse - expanded case",
            props: {
                expanded: true,
            },
        },
        {
            title: "axe collapse - position case",
            props: {
                position: "top",
            },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OCollapse, {
            props: { open: false, ...props },
            attachTo: document.body,
        });
        await nextTick(); // await all content got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
