import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OTag from "@/components/tag/Tag.vue";

describe("OTag tests", () => {
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

        const icon = wrapper.find('[data-oruga="icon"]');
        expect(icon.exists()).toBeTruthy();
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

        expect(wrapper.classes("o-tag--danger")).toBeTruthy();
    });

    test("emit close event", async () => {
        const wrapper = mount(OTag, {
            props: { label: "My Tag", closeable: true },
        });

        expect(wrapper.text()).toEqual("My Tag");

        const closeIcon = wrapper.find('[data-oruga="icon"]');
        expect(closeIcon.exists()).toBeTruthy();

        await closeIcon.trigger("click");

        expect(wrapper.emitted("close")).toHaveLength(1);
    });
});
