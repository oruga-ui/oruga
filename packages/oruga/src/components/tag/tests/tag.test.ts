import { afterEach, describe, expect } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OTag from "@/components/tag/Tag.vue";

describe("BTag", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OTag, {
            props: { label: "My Tag" },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("tag");
        expect(wrapper.text()).toEqual("My Tag");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("has icon", async () => {
        const wrapper = mount(OTag, {
            props: { label: "My Tag", icon: "home" },
        });

        expect(wrapper.text()).toEqual("My Tag");

        const icon = wrapper.find(".icon");
        expect(icon.exists()).toBeTruthy();
        expect(icon.classes("fa-home")).toBeTruthy();
    });

    test("render accordingly when has size prop", () => {
        const wrapper = mount(OTag, {
            props: { size: "large" },
        });

        expect(wrapper.classes("o-tag--large")).toBeTruthy();
    });

    test("render accordingly when has variant prop", () => {
        const wrapper = mount(OTag, {
            props: { variant: "danger" },
        });

        expect(wrapper.classes("o-radio--danger")).toBeTruthy();
    });

    test("emit close event", async () => {
        const wrapper = mount(OTag, {
            props: { label: "My Tag", closable: true },
        });

        expect(wrapper.text()).toEqual("My Tag");

        const closeIcon = wrapper.find(".icon");
        expect(closeIcon.exists()).toBeTruthy();

        await closeIcon.trigger("click");

        expect(wrapper.emitted("close")).toHaveLength(1);
    });
});
