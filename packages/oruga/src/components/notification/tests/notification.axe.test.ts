import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import ONotification from "../Notification.vue";
import type { NotificationProps } from "../props.ts";
import { nextTick } from "vue";

describe("ONotification a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: NotificationProps }[] = [
        { title: "axe notification - base case", props: { content: "Hello" } },
        {
            title: "axe notification - variant",
            props: { content: "Hello", variant: "danger" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(ONotification, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
