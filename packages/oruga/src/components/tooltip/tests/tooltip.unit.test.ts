import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { setTimeout } from "timers/promises";

import OTooltip from "@/components/tooltip/Tooltip.vue";

describe("OTooltip tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OTooltip, {
            slots: { default: "<button>trigger</button>" },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("tooltip");
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe("test trigger", () => {
        test("render default trigger slot correctly", () => {
            const triggerHTML =
                '<button class="trigger" aria-describedby="v-0">trigger</button>';
            const wrapper = mount(OTooltip, {
                slots: { default: triggerHTML },
            });
            const trigger = wrapper.find(".trigger");
            expect(trigger.html()).toBe(triggerHTML);
            expect(trigger.text()).toBe("trigger");
        });

        test("trigger gets aria-describedby pointing to tooltip content", async () => {
            const wrapper = mount(OTooltip, {
                props: { id: "my-tooltip" },
                slots: { default: "<button>trigger</button>" },
                attachTo: document.body,
            });
            await setTimeout(); // await mount lifecycle

            const trigger = wrapper.find("button");
            expect(trigger.attributes("aria-describedby")).toBe("my-tooltip");

            const content = wrapper.find(".o-tooltip__content");
            expect(content.attributes("id")).toBe("my-tooltip");
        });

        test("opens on hover and closes on hover leave", async () => {
            const wrapper = mount(OTooltip, {
                slots: { default: '<button class="trigger">trigger</button>' },
                attachTo: document.body,
            });

            const trigger = wrapper.find(".trigger");
            expect(trigger.exists()).toBeTruthy();

            const content = wrapper.find(".o-tooltip__content");
            expect(content.exists()).toBeTruthy();
            expect(content.isVisible()).toBeFalsy();

            // does NOT open on click
            await trigger.trigger("click");
            await setTimeout();
            expect(content.isVisible()).toBeFalsy();

            // does NOT open on contextmenu
            await trigger.trigger("contextmenu");
            await setTimeout();
            expect(content.isVisible()).toBeFalsy();

            // DOES open on hover
            await trigger.trigger("pointerenter");
            await setTimeout();
            expect(content.isVisible()).toBeTruthy();
            expect(wrapper.emitted("open")).toHaveLength(1);
            const openEmits = wrapper.emitted("update:active");
            expect(openEmits).toHaveLength(1);
            expect(openEmits?.[0][0]).toBeTruthy();

            // DOES close on hover leave
            await trigger.trigger("pointerleave");
            await setTimeout();
            expect(content.isVisible()).toBeFalsy();
            expect(wrapper.emitted("close")).toHaveLength(1);
            const closeEmits = wrapper.emitted("update:active");
            expect(closeEmits).toHaveLength(2);
            expect(closeEmits?.[1][0]).toBeFalsy();
        });

        test("opens on focus and closes on blur", async () => {
            const wrapper = mount(OTooltip, {
                slots: { default: "<button>trigger</button>" },
                attachTo: document.body,
            });

            const trigger = wrapper.find("button");
            const content = wrapper.find(".o-tooltip__content");
            expect(content.isVisible()).toBeFalsy();

            // DOES open on focus
            await trigger.trigger("focus");
            await setTimeout();
            expect(content.isVisible()).toBeTruthy();
            expect(wrapper.emitted("open")).toHaveLength(1);

            // DOES close on blur
            await trigger.trigger("blur");
            await setTimeout();
            expect(content.isVisible()).toBeFalsy();
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("does not open when disabled", async () => {
            const wrapper = mount(OTooltip, {
                props: { disabled: true },
                slots: { default: "<button>trigger</button>" },
                attachTo: document.body,
            });

            const trigger = wrapper.find("button");
            const content = wrapper.find(".o-tooltip__content");
            expect(content.isVisible()).toBeFalsy();

            await trigger.trigger("pointerenter");
            await setTimeout();
            expect(content.isVisible()).toBeFalsy();
            expect(wrapper.emitted("open")).toBeUndefined();
            expect(wrapper.emitted("update:active")).toBeUndefined();
        });
    });

    describe("test teleport", () => {
        test("react accordingly when using teleport to body", () => {
            const wrapper = mount(OTooltip, {
                props: { teleport: true },
                slots: { default: "<button>trigger</button>" },
            });

            expect(wrapper.classes("o-tooltip--teleport")).toBeTruthy();

            expect(wrapper.find(".o-tooltip__content").exists()).toBeFalsy();

            const content =
                document.getElementsByClassName("o-tooltip__content");
            expect(content.length).toBe(1);
        });

        test("react accordingly when using teleport with element", () => {
            const wrapperDiv = document.createElement("div");
            wrapperDiv.className = "test-teleport-wrapper";
            document.body.appendChild(wrapperDiv);

            const wrapper = mount(OTooltip, {
                props: { teleport: wrapperDiv },
                slots: { default: "<button>trigger</button>" },
            });

            expect(wrapper.classes("o-tooltip--teleport")).toBeTruthy();

            expect(wrapper.find(".o-tooltip__content").exists()).toBeFalsy();

            const content =
                document.getElementsByClassName("o-tooltip__content");
            expect(content.length).toBe(1);
        });
    });
});
