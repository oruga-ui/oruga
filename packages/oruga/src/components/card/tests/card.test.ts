import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OCard from "@/components/card/Card.vue";

describe("OButton test", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OCard, {
            slots: {
                header: "Advanced Card Header",
                title: "Advanced Card",
                subtitle: "Advanced subtitle",
                content:
                    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>",
                footer: "Advanced Card Footer",
            },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("card");
        expect(wrapper.html()).toMatchSnapshot();
    });
});
