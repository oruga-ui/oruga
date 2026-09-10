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
                iconLeft: "check",
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

    const tags = ["button", "input", "a", "div"];
    test.each(tags)(
        "expect click handler only get triggered once for '%s'",
        async (tag) => {
            const wrapper = mount(OButton, {
                props: { tag },
                attachTo: document.body,
            });

            const button = wrapper.find<HTMLElement>(tag);
            expect(button.exists()).toBeTruthy();

            button.element.focus();

            await button.trigger("click");
            expect(wrapper.emitted("click")).toHaveLength(1);

            await button.trigger("keydown.enter");
            expect(wrapper.emitted("click")).toHaveLength(2);

            await button.trigger("keydown.space");
            expect(wrapper.emitted("click")).toHaveLength(3);
        },
    );
});
