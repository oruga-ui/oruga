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
