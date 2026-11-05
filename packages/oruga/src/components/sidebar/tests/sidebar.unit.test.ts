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

            expect(wrapper.attributes("role")).toBe("dialog");
            expect(wrapper.attributes("aria-modal")).toBe("true");
            expect(wrapper.attributes("aria-label")).toBe("Menu");
        });

        test("not expose a dialog without overlay", () => {
            const wrapper = mount(OSidebar, {
                props: { active: true, overlay: false },
            });

            expect(wrapper.attributes("role")).toBeUndefined();
            expect(wrapper.attributes("aria-modal")).toBeUndefined();
        });

        test("not expose a dialog while closed", async () => {
            const wrapper = mount(OSidebar, {
                props: { active: false, overlay: true },
            });
            expect(wrapper.attributes("role")).toBeUndefined();

            await wrapper.setProps({ active: true });
            expect(wrapper.attributes("role")).toBe("dialog");

            await wrapper.setProps({ active: false });
            expect(wrapper.attributes("role")).toBeUndefined();
            expect(wrapper.attributes("aria-modal")).toBeUndefined();
        });

        test("keep a role passed by the user when no dialog is exposed", () => {
            const wrapper = mount(OSidebar, {
                props: { active: true },
                attrs: { role: "navigation" },
            });

            expect(wrapper.attributes("role")).toBe("navigation");
        });
    });
});
