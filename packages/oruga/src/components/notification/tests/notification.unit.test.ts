import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import ONotification from "@/components/notification/Notification.vue";

describe("ONotification tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(ONotification, {
            props: {
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        const element = wrapper.find("[data-oruga=notification]");
        expect(element.attributes("data-oruga")).toBe("notification");
    });

    describe("live region", () => {
        test("announce politely by default", () => {
            const wrapper = mount(ONotification, {
                props: { content: "Saved", variant: "success" },
            });
            const element = wrapper.find("[data-oruga=notification]");
            expect(element.attributes("role")).toBe("status");
            expect(element.attributes("aria-atomic")).toBe("true");
        });

        test.each(["warning", "danger"])(
            "announce the variant %s as alert",
            (variant) => {
                const wrapper = mount(ONotification, {
                    props: { content: "Failed", variant },
                });
                expect(
                    wrapper
                        .find("[data-oruga=notification]")
                        .attributes("role"),
                ).toBe("alert");
            },
        );

        test("prefer a role passed by the user", () => {
            const wrapper = mount(ONotification, {
                props: { content: "Failed", variant: "danger" },
                attrs: { role: "log" },
            });
            expect(
                wrapper.find("[data-oruga=notification]").attributes("role"),
            ).toBe("log");
        });
    });
});
