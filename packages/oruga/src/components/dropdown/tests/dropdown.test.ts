import { describe, test, expect, vi, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { setTimeout } from "timers/promises";

import ODropdown from "@/components/dropdown/Dropdown.vue";

describe("Dropdown tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(ODropdown);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-drop")).toBeTruthy();
    });

    test("render trigger slot correctly", () => {
        const triggerHTML = '<button class="trigger">trigger</button>';
        const wrapper = mount(ODropdown, {
            slots: {
                trigger: triggerHTML,
            },
        });
        const trigger = wrapper.find(".trigger");
        expect(trigger.html()).toBe(triggerHTML);
        expect(trigger.text()).toBe("trigger");
    });

    test("render trigger label correctly", () => {
        const triggerLabel = "MyTriggerLabel";
        const wrapper = mount(ODropdown, { props: { label: triggerLabel } });
        const trigger = wrapper.find(".o-drop__trigger");
        expect(trigger.exists()).toBeTruthy();
        expect(trigger.text()).contain(triggerLabel);
    });

    test("react accordingly when clicking outside", async () => {
        const wrapper = mount(ODropdown, { props: { active: true } });
        await setTimeout(); // await event handler get set

        expect(wrapper.classes("o-drop--active")).toBeTruthy();

        // click outside
        window.dispatchEvent(new Event("click"));
        await nextTick(); // await dom update

        // check dropdown closed
        const activeEmits = wrapper.emitted("update:active");
        expect(activeEmits).toHaveLength(1);
        expect(activeEmits![0][0]).toBeFalsy();
        expect(wrapper.emitted("close")).toHaveLength(1);
        expect(wrapper.classes("o-drop--active")).toBeFalsy();
    });

    test("react accordingly when clicking outside with inline", async () => {
        const wrapper = mount(ODropdown, {
            props: { active: true, inline: true },
        });
        await setTimeout(); // await event handler get set

        expect(wrapper.classes("o-drop--active")).toBeTruthy();

        // click outside
        window.dispatchEvent(new Event("click"));
        await nextTick(); // await dom update

        // check dropdown closed
        expect(wrapper.emitted("update:active")).toBeUndefined();
        expect(wrapper.emitted("close")).toBeUndefined();
        expect(wrapper.classes("o-drop--active")).toBeTruthy();
    });

    test("react accordingly when clicking outside with closable", async () => {
        const wrapper = mount(ODropdown, {
            props: { active: true, closeable: false },
        });
        await setTimeout(); // await event handler get set

        expect(wrapper.classes("o-drop--active")).toBeTruthy();

        // click outside
        window.dispatchEvent(new Event("click"));
        await nextTick(); // await dom update

        // check dropdown closed
        expect(wrapper.emitted("update:active")).toBeUndefined();
        expect(wrapper.emitted("close")).toBeUndefined();
        expect(wrapper.classes("o-drop--active")).toBeTruthy();
    });

    test("react accordingly when clicking trigger", async () => {
        const wrapper = mount(ODropdown);
        await setTimeout(); // await event handler get set

        expect(wrapper.classes("o-drop--active")).toBeFalsy();

        const trigger = wrapper.find(".o-drop__trigger");

        // open on trigger click
        await trigger.trigger("click");
        expect(wrapper.classes("o-drop--active")).toBeTruthy();

        // close on trigger click
        await trigger.trigger("click");
        expect(wrapper.classes("o-drop--active")).toBeFalsy();
    });

    test("react accordingly when clicking trigger with disabled", async () => {
        const wrapper = mount(ODropdown, { props: { disabled: true } });

        expect(wrapper.classes("o-drop--active")).toBeFalsy();

        const trigger = wrapper.find(".o-drop__trigger");
        await trigger.trigger("click");
        expect(wrapper.classes("o-drop--active")).toBeFalsy();
    });

    test("react accordingly when pressing escape", async () => {
        const wrapper = mount(ODropdown, { props: { active: true } });
        await setTimeout(); // await event handler get set

        expect(wrapper.classes("o-drop--active")).toBeTruthy();

        document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
        await nextTick(); // await dom update

        expect(wrapper.classes("o-drop--active")).toBeFalsy();
    });

    test("react accordingly when pressing escape with closable", async () => {
        const wrapper = mount(ODropdown, {
            props: { active: true, closeable: false },
        });
        await setTimeout(); // await event handler get set

        expect(wrapper.classes("o-drop--active")).toBeTruthy();

        document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
        await nextTick(); // await dom update

        expect(wrapper.classes("o-drop--active")).toBeTruthy();
    });

    test("react accordingly when mouse over without trigger", async () => {
        const wrapper = mount(ODropdown, {
            props: { triggers: ["click"] },
            attachTo: document.body,
        });

        const trigger = wrapper.find(".o-drop__trigger");
        await trigger.trigger("mouseenter");
        expect(wrapper.find(".o-drop__menu").isVisible()).toBeFalsy();
    });

    test("react accordingly when mouse over with trigger", async () => {
        const wrapper = mount(ODropdown, {
            props: { triggers: ["hover"] },
            attachTo: document.body,
        });
        const trigger = wrapper.find(".o-drop__trigger");
        await trigger.trigger("mouseenter");
        expect(wrapper.find(".o-drop__menu").isVisible()).toBeTruthy();
    });

    test("react accordingly when is disabled", async () => {
        const wrapper = mount(ODropdown, {
            props: { disabled: true, active: true },
            attachTo: document.body,
        });
        expect(wrapper.classes("o-drop--disabled")).toBeTruthy();
        expect(wrapper.find(".o-drop__menu").isVisible()).toBeFalsy();
    });

    test("reset events before destroy", async () => {
        const wrapper = mount(ODropdown, { props: { active: true } });
        await setTimeout(); // await event handler get set

        document.removeEventListener = vi.fn();
        window.removeEventListener = vi.fn();

        wrapper.unmount();

        // remove scroll listener
        expect(document.removeEventListener).toBeCalledWith(
            "scroll",
            expect.any(Function),
        );
        // remove keyup listener
        expect(document.removeEventListener).toBeCalledWith(
            "keyup",
            expect.any(Function),
            expect.any(Object),
        );
        // remove click outside listener
        expect(window.removeEventListener).toBeCalledWith(
            "click",
            expect.any(Function),
            expect.any(Object),
        );
    });

    test("has configurable menu tag", () => {
        const wrapper = mount(ODropdown, { props: { menuTag: "ul" } });
        expect(wrapper.find("ul.o-drop__menu").exists()).toBeTruthy();
    });

    test("has configurable trigger tag", () => {
        const wrapper = mount(ODropdown, { props: { triggerTag: "a" } });
        expect(wrapper.find("a.o-drop__trigger").exists()).toBeTruthy();
    });

    test("react accordingly when using teleport to body", () => {
        const wrapper = mount(ODropdown, { props: { teleport: true } });

        expect(wrapper.find(".o-drop__menu").exists()).toBeFalsy();

        const menu = document.getElementsByClassName("o-drop__menu");
        expect(menu.length).toBe(1);
        const teleportWrapper =
            document.getElementsByClassName("o-drop--teleport");
        expect(teleportWrapper.length).toBe(1);
    });

    test("react accordingly when using teleport with element", () => {
        const wrapperDiv = document.createElement("div");
        const wrapperClass = "test-teleport-wrapper";
        wrapperDiv.className = wrapperClass;
        document.body.appendChild(wrapperDiv);

        const wrapper = mount(ODropdown, { props: { teleport: wrapperDiv } });

        expect(wrapper.find(".o-drop__menu").exists()).toBeFalsy();

        const menu = document.getElementsByClassName("o-drop__menu");
        expect(menu.length).toBe(1);
        const teleportWrapper =
            document.getElementsByClassName("o-drop--teleport");
        expect(teleportWrapper.length).toBe(1);
    });
});
