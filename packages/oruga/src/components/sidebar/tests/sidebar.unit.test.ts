import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OSidebar from "@/components/sidebar/Sidebar.vue";

describe("OSidebar tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OSidebar);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        const element = wrapper.find("div");
        expect(element.attributes("data-oruga")).toBe("sidebar");
    });

    describe("dialog semantics", () => {
        test("expose an active sidebar with overlay as named modal dialog", () => {
            const wrapper = mount(OSidebar, {
                props: { active: true, overlay: true, ariaLabel: "Menu" },
            });
            const sidebar = wrapper.find("[data-oruga=sidebar]");
            expect(sidebar.exists()).toBeTruthy();

            expect(sidebar.attributes("role")).toBe("dialog");
            expect(sidebar.attributes("aria-modal")).toBe("true");
            expect(sidebar.attributes("aria-label")).toBe("Menu");
        });

        test("not expose a dialog without overlay", () => {
            const wrapper = mount(OSidebar, {
                props: { active: true, overlay: false },
            });

            const sidebar = wrapper.find("[data-oruga=sidebar]");
            expect(sidebar.exists()).toBeTruthy();

            expect(sidebar.attributes("role")).toBeUndefined();
            expect(sidebar.attributes("aria-modal")).toBeUndefined();
        });

        test("not expose a dialog while closed", async () => {
            const wrapper = mount(OSidebar, {
                props: { active: false, overlay: true },
            });
            const sidebar = wrapper.find("[data-oruga=sidebar]");
            expect(sidebar.exists()).toBeTruthy();

            expect(sidebar.attributes("role")).toBeUndefined();

            await wrapper.setProps({ active: true });
            expect(sidebar.attributes("role")).toBe("dialog");

            await wrapper.setProps({ active: false });
            expect(sidebar.attributes("role")).toBeUndefined();
            expect(sidebar.attributes("aria-modal")).toBeUndefined();
        });

        test("keep a role passed by the user when no dialog is exposed", () => {
            const wrapper = mount(OSidebar, {
                props: { active: true },
                attrs: { role: "navigation" },
            });

            const sidebar = wrapper.find("[data-oruga=sidebar]");
            expect(sidebar.exists()).toBeTruthy();

            expect(sidebar.attributes("role")).toBe("navigation");
        });
    });
});
