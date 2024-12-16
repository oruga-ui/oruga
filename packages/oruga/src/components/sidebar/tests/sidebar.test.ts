import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OSidebar from "@/components/sidebar/Sidebar.vue";
import { nextTick } from "vue";

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

    describe("open", () => {
        test("changes isOpen when open prop is modified", async () => {
            const wrapper = mount(OSidebar, { props: { active: false } });

            await nextTick();
            expect(wrapper.classes("o-side--active")).toBeFalsy();

            wrapper.setProps({ active: true });
            await nextTick();
            expect(wrapper.classes("o-side--active")).toBeTruthy();
        });

        test("close on cancel", () => {
            const wrapper = mount(OSidebar, {
                props: { cancelable: true },
                attachTo: document.body,
            });
            wrapper.vm.isOpen = true;
            wrapper.vm.close = jest.fn(() => wrapper.vm.close);
            wrapper.vm.cancel("outside");

            wrapper.setProps({ canCancel: false });
            wrapper.vm.cancel("outside");

            expect(wrapper.vm.close).toHaveBeenCalledTimes(1);
        });

        test("close on escape", () => {
            wrapper.setProps({ open: true });
            wrapper.vm.cancel = jest.fn(() => wrapper.vm.cancel);
            const event = new KeyboardEvent("keyup", { key: "Escape" });
            wrapper.vm.keyPress({});
            wrapper.vm.keyPress(event);

            wrapper.setProps({ position: "static" });
            wrapper.vm.keyPress(event);

            expect(wrapper.vm.cancel).toHaveBeenCalledTimes(1);
        });

        test("emit events on close", () => {
            wrapper.vm.close();
            expect(wrapper.emitted()["close"]).toBeTruthy();
            expect(wrapper.emitted()["update:open"]).toBeTruthy();
        });
    });
});
