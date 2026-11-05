import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OUpload from "@/components/upload/Upload.vue";

describe("OUpload tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OUpload);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("upload");
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe("drag and drop zone", () => {
        test("open the file dialog with enter and space", async () => {
            const wrapper = mount(OUpload, { props: { dragDrop: true } });

            const zone = wrapper.find("[role=button]");
            expect(zone.attributes("tabindex")).toBe("0");

            const clickSpy = vi.spyOn(
                wrapper.find<HTMLInputElement>("input").element,
                "click",
            );

            // the test utils key modifiers do not set `event.key`, so pass it explicitly
            await zone.trigger("keydown", { key: "Enter" });
            expect(clickSpy).toHaveBeenCalledTimes(1);

            const event = new KeyboardEvent("keydown", {
                key: " ",
                bubbles: true,
                cancelable: true,
            });
            zone.element.dispatchEvent(event);
            // prevent scrolling the page
            expect(event.defaultPrevented).toBe(true);
            expect(clickSpy).toHaveBeenCalledTimes(2);

            // other keys are ignored
            await zone.trigger("keydown", { key: "a" });
            expect(clickSpy).toHaveBeenCalledTimes(2);
        });

        test("not be focusable or open the file dialog when disabled", async () => {
            const wrapper = mount(OUpload, {
                props: { dragDrop: true, disabled: true },
            });

            const zone = wrapper.find("[role=button]");
            expect(zone.attributes("tabindex")).toBeUndefined();
            expect(zone.attributes("aria-disabled")).toBe("true");

            const clickSpy = vi.spyOn(
                wrapper.find<HTMLInputElement>("input").element,
                "click",
            );
            await zone.trigger("keydown", { key: "Enter" });
            expect(clickSpy).not.toHaveBeenCalled();
        });
    });

    describe("test events", () => {
        test("check emit focus and blur event correctly", async () => {
            const wrapper = mount(OUpload);

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("focus");
            await input.trigger("blur");

            expect(wrapper.emitted("focus")).toHaveLength(1);
            expect(wrapper.emitted("blur")).toHaveLength(1);
        });
    });
});
