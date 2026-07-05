import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import ONotification from "../Notification.vue";
import type { NotificationProps } from "../props.ts";

describe("ONotification a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: NotificationProps }[] = [
        { title: "axe notification - base case", props: { message: "Hello" } },
        {
            title: "axe notification - variant",
            props: { message: "Hello", variant: "danger" },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(ONotification, {
            props: { ...props },
            attachTo: document.body,
        });
        await setTimeout();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
