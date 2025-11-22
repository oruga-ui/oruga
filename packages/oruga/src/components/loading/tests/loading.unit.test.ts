import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { setTimeout } from "timers/promises";

import OLoading from "@/components/loading/Loading.vue";

describe("OLoading tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OLoading, {
            props: { active: true },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        const element = wrapper.find("div");
        expect(element.attributes("data-oruga")).toBe("loading");
    });

    test("render label slot correctly", () => {
        const labelHTML = `<p class="label">My Label</p>`;
        const wrapper = mount(OLoading, {
            props: { active: true },
            slots: { default: `<p class="label">My Label</p>` },
        });
        const label = wrapper.find(".label");
        expect(label.html()).toBe(labelHTML);
        expect(label.text()).toBe("My Label");
    });

    test("react accordingly when has fullPage", () => {
        const wrapper = mount(OLoading, {
            props: { active: true, fullPage: true },
        });

        const container = wrapper.find('[data-oruga="loading"]');
        expect(container.classes("o-loading--fullpage")).toBeTruthy();
    });

    describe("test trigger", () => {
        test("react accordingly when pressing escape with close on escape", async () => {
            const wrapper = mount(OLoading, {
                props: { active: true, closeOnEscape: true },
                attachTo: document.body,
            });
            await setTimeout(); // await event handler get set

            const container = wrapper.find('[data-oruga="loading"]');
            expect(container.exists()).toBeTruthy();

            expect(container.isVisible()).toBeTruthy();

            await container.trigger("keyup", { key: "Esc" });
            expect(wrapper.find('[data-oruga="loading"]').exists()).toBeFalsy();

            expect(wrapper.emitted("close")).toHaveLength(1);
            const activeEmits = wrapper.emitted("update:active");
            expect(activeEmits).toHaveLength(1);
            expect(activeEmits![0][0]).toBeFalsy();
        });

        test("react accordingly when pressing escape with  close on escape false", async () => {
            const wrapper = mount(OLoading, {
                props: { active: true, closeOnEscape: false },
            });
            await setTimeout(); // await event handler get set

            const container = wrapper.find('[data-oruga="loading"]');
            expect(container.exists()).toBeTruthy();
            expect(wrapper.isVisible()).toBeTruthy();

            await wrapper.trigger("keyup", { key: "Esc" });
            expect(
                wrapper.find('[data-oruga="loading"]').exists(),
            ).toBeTruthy();
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(wrapper.emitted("update:active")).toBeUndefined();
        });

        test("react accordingly when clicking outside with close on outside", async () => {
            const wrapper = mount(OLoading, {
                props: { active: true, closeOnOutside: true },
                attachTo: document.body,
            });
            await setTimeout(); // await event handler get set

            const overlay = wrapper.find(".o-loading__overlay");
            expect(overlay.exists()).toBeTruthy();
            expect(overlay.isVisible()).toBeTruthy();

            // check Do close on click outside
            await overlay.trigger("click");

            expect(wrapper.find(".o-loading__overlay").exists()).toBeFalsy();
            expect(wrapper.emitted("close")).toHaveLength(1);
            const activeEmits = wrapper.emitted("update:active");
            expect(activeEmits).toHaveLength(1);
            expect(activeEmits![0][0]).toBeFalsy();
        });

        test("react accordingly when clicking outside with close on outside false", async () => {
            const wrapper = mount(OLoading, {
                props: { active: true, closeOnOutside: false },
                attachTo: document.body,
            });
            await setTimeout(); // await event handler get set

            const overlay = wrapper.find(".o-loading__overlay");
            expect(overlay.exists()).toBeTruthy();
            expect(overlay.isVisible()).toBeTruthy();

            // check Do close on click outside
            await overlay.trigger("click");

            expect(wrapper.find(".o-loading__overlay").exists()).toBeTruthy();
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(wrapper.emitted("update:active")).toBeUndefined();
        });
    });
});
