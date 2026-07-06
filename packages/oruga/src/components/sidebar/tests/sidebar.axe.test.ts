import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import OSidebar from "../Sidebar.vue";
import type { SidebarProps } from "../props.ts";

describe("OSidebar a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: SidebarProps }[] = [
        { title: "axe sidebar - base case", props: { active: true } },
        {
            title: "axe sidebar - right",
            props: { active: true, position: "right" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OSidebar, {
            props: { ...props },
            slots: { default: "<div>Sidebar content</div>" },
            attachTo: document.body,
            global: { stubs: { teleport: true } },
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
