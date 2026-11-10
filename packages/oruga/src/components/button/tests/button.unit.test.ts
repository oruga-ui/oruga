import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OButton from "@/components/button/Button.vue";

describe("OButton tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OButton);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("button");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render label prop", () => {
        const wrapper = mount(OButton, { props: { label: "Click me" } });

        expect(wrapper.text()).toContain("Click me");
        expect(wrapper.find("span").classes()).toContain("o-button__label");
    });

    test("render default slot content over label prop", () => {
        const wrapper = mount(OButton, {
            props: { label: "Click me" },
            slots: { default: "Slot text" },
        });

        expect(wrapper.text()).toContain("Slot text");
        expect(wrapper.text()).not.toContain("Click me");
    });

    test("render left and right icons", () => {
        const wrapper = mount(OButton, {
            props: {
                iconPack: "mdi",
                icon: "check",
                iconRight: "close",
            },
        });

        const icons = wrapper.findAll('[data-oruga="icon"]');
        expect(icons).toHaveLength(2);
        expect(icons[0].classes()).toContain("o-button__icon-left");
        expect(icons[1].classes()).toContain("o-button__icon-right");
    });

    test("set native type only on button and input tags", async () => {
        const wrapper = mount(OButton, {
            props: { tag: "button", type: "submit" },
        });
        expect(wrapper.attributes("type")).toBe("submit");

        await wrapper.setProps({ type: "reset" });
        expect(wrapper.attributes("type")).toBe("reset");

        await wrapper.setProps({ type: "button" });
        expect(wrapper.attributes("type")).toBe("button");
    });

    test("render modifiers classes when style props are enabled", () => {
        const wrapper = mount(OButton, {
            props: {
                variant: "danger",
                size: "large",
                outlined: true,
                inverted: true,
                expanded: true,
                loading: true,
                rounded: true,
            },
        });

        expect(wrapper.classes()).toContain("o-button--danger");
        expect(wrapper.classes()).toContain("o-button--large");
        expect(wrapper.classes()).toContain("o-button--outlined");
        expect(wrapper.classes()).toContain("o-button--inverted");
        expect(wrapper.classes()).toContain("o-button--expanded");
        expect(wrapper.classes()).toContain("o-button--loading");
        expect(wrapper.classes()).toContain("o-button--rounded");
    });

    test("render disabled state", () => {
        const wrapper = mount(OButton, { props: { disabled: true } });

        expect(wrapper.classes()).toContain("o-button--disabled");
        expect(wrapper.attributes("disabled")).not.toBeUndefined();
        expect(wrapper.attributes("aria-disabled")).toBe("true");
    });

    // The browser dispatches a click event on keyboard activation of native
    // elements. The component must not emit a second click on keydown.
    test.each(["button", "input"])(
        "expect native '%s' to emit click only once per activation",
        async (tag) => {
            const wrapper = mount(OButton, {
                props: { tag },
                attachTo: document.body,
            });

            const button = wrapper.find<HTMLElement>(tag);
            expect(button.exists()).toBeTruthy();
            expect(button.attributes("role")).toBeUndefined();
            expect(button.attributes("tabindex")).toBeUndefined();

            await button.trigger("click");
            expect(wrapper.emitted("click")).toHaveLength(1);

            // jsdom does not turn key presses into a click on native elements,
            // so nothing is emitted here. This only guards against the
            // component emitting a click of its own on keydown, which would
            // be a duplicate in a browser. Keyboard activation is covered by
            // the browser test.
            await button.trigger("keydown", { key: "Enter" });
            await button.trigger("keydown", { key: " " });
            expect(wrapper.emitted("click")).toHaveLength(1);
        },
    );

    test("expect custom element to be activated by keyboard", async () => {
        const wrapper = mount(OButton, {
            props: { tag: "div" },
            attachTo: document.body,
        });

        const button = wrapper.find<HTMLElement>("div");
        expect(button.attributes("role")).toBe("button");
        expect(button.attributes("tabindex")).toBe("0");

        await button.trigger("click");
        expect(wrapper.emitted("click")).toHaveLength(1);

        // the component checks `event.key`, which `keydown.enter` of the
        // test utils does not set
        await button.trigger("keydown", { key: "Enter" });
        expect(wrapper.emitted("click")).toHaveLength(2);

        await button.trigger("keydown", { key: " " });
        expect(wrapper.emitted("click")).toHaveLength(3);
    });

    test("expect space on a link to not scroll but to activate it", () => {
        const wrapper = mount(OButton, {
            props: { tag: "a" },
            attrs: { href: "#" },
            attachTo: document.body,
        });
        const link = wrapper.find<HTMLElement>("a");

        const keydown = new KeyboardEvent("keydown", {
            key: " ",
            bubbles: true,
            cancelable: true,
        });
        link.element.dispatchEvent(keydown);
        // the browser would scroll the page on space otherwise
        expect(keydown.defaultPrevented).toBeTruthy();
        // the link is activated like a button
        expect(wrapper.emitted("click")).toHaveLength(1);
    });

    test.each(["a", "div"])(
        "expect disabled '%s' to not emit click",
        async (tag) => {
            const wrapper = mount(OButton, {
                props: { tag, disabled: true },
                attachTo: document.body,
            });

            const button = wrapper.find<HTMLElement>(tag);
            expect(button.attributes("aria-disabled")).toBe("true");
            expect(button.attributes("tabindex")).toBe("-1");

            await button.trigger("click");
            await button.trigger("keydown", { key: "Enter" });
            await button.trigger("keydown", { key: " " });
            expect(wrapper.emitted("click")).toBeUndefined();
        },
    );
});
