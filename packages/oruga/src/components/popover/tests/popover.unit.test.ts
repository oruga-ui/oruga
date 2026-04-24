import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { setTimeout } from "timers/promises";

import OPopover from "@/components/popover/Popover.vue";

describe("OPopover tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OPopover, {
            props: {
                content:
                    "Lorem ipsum dolor sit amet, consectetur warning elit.",
            },
            slots: { default: "<p> Open Popover! </p>" },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("popover");
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe("test trigger", () => {
        test("render default trigger slot correctly", () => {
            const triggerHTML = '<button class="trigger">trigger</button>';
            const wrapper = mount(OPopover, {
                slots: { default: triggerHTML },
            });
            const trigger = wrapper.find(".trigger");
            expect(trigger.element.tagName).toBe("BUTTON");
            expect(trigger.text()).toBe("trigger");
        });

        test("do not open on trigger hover or fucus", async () => {
            const wrapper = mount(OPopover, {
                slots: { default: '<button class="trigger">trigger</button>' },
                attachTo: document.body,
            });

            const trigger = wrapper.find(".trigger");
            expect(trigger.exists()).toBeTruthy();

            // check do not open on right click
            await trigger.trigger("contextmenu");
            await setTimeout(); // await async event is processed

            // check do not open on focus
            await trigger.trigger("focus");
            await setTimeout(); // await async event is processed

            // check do not open on hover
            await trigger.trigger("pointerenter");
            await setTimeout(); // await async event is processed

            const content = wrapper.find(".o-popover__content");
            expect(content.exists()).toBeTruthy();
            expect(content.isVisible()).toBeFalsy();

            expect(wrapper.emitted("open")).toBeUndefined();
            expect(wrapper.emitted("update:active")).toBeUndefined();
        });

        // currently not testable with vitest because popover api is not included
        test.skip("react accordingly when has click trigger", async () => {
            const wrapper = mount(OPopover, {
                props: { content: "Some Content" },
                slots: { default: '<button class="trigger">trigger</button>' },
                attachTo: document.body,
            });
            await setTimeout(); // await event handler get set

            const trigger = wrapper.find(".trigger");
            expect(trigger.exists()).toBeTruthy();

            const content = wrapper.find(".o-popover__content");
            expect(content.exists()).toBeTruthy();
            expect(content.isVisible()).toBeFalsy();

            // check open on click
            await trigger.trigger("click");
            await setTimeout(200); // await async event is processed

            console.log(wrapper.html());
            expect(content.isVisible()).toBeTruthy();
            expect(wrapper.emitted("open")).toHaveLength(1);
            const activeEmits = wrapper.emitted("update:active");
            expect(activeEmits).toHaveLength(1);
            expect(activeEmits![0][0]).toBeTruthy();
        });
    });

    describe("test teleport", () => {
        test("react accordingly when using teleport to body", () => {
            const wrapper = mount(OPopover, {
                props: {
                    teleport: true,
                    content:
                        "Lorem ipsum dolor sit amet, consectetur warning elit.",
                },
                slots: { default: "<p> Open Popover! </p>" },
                attachTo: document.body,
            });

            expect(wrapper.find(".o-popover__content").exists()).toBeFalsy();

            const content =
                document.getElementsByClassName("o-popover__content");
            expect(content.length).toBe(1);
            const teleportWrapper = document.getElementsByClassName(
                "o-popover--teleport",
            );
            expect(teleportWrapper.length).toBe(1);
        });

        test("react accordingly when using teleport with element", () => {
            const wrapperDiv = document.createElement("div");
            const wrapperClass = "test-teleport-wrapper";
            wrapperDiv.className = wrapperClass;
            document.body.appendChild(wrapperDiv);

            const wrapper = mount(OPopover, {
                props: {
                    teleport: wrapperDiv,
                    content:
                        "Lorem ipsum dolor sit amet, consectetur warning elit.",
                },
                slots: { default: "<p> Open Popover! </p>" },
                attachTo: document.body,
            });

            expect(wrapper.find(".o-popover__content").exists()).toBeFalsy();

            const content =
                document.getElementsByClassName("o-popover__content");
            expect(content.length).toBe(1);
            const teleportWrapper = document.getElementsByClassName(
                "o-popover--teleport",
            );
            expect(teleportWrapper.length).toBe(1);
        });
    });
});
