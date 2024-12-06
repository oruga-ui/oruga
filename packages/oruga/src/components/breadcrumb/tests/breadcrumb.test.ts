import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
// import { nextTick } from "vue";
// import { setTimeout } from "timers/promises";

// import { OBreadcrumb } from "@/components/breadcrumb/Breadcrumb.vue";
import OBreadcrumb from "@/components/breadcrumb/Breadcrumb.vue";

describe("<Breadcrumb>", () => {
    enableAutoUnmount(afterEach);

    test("is called", () => {
        // const wrapper = mount(OBreadcrumb);
        const triggerHTML =
            '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>';
        const wrapper = mount(OBreadcrumb, {
            slots: {
                trigger: triggerHTML,
            },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("breadcrumb");
    });

    test("rendeer correctly", () => {
        // const wrapper = mount(OBreadcrumb);
        const triggerHTML =
            '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>';
        const wrapper = mount(OBreadcrumb, {
            slots: {
                trigger: triggerHTML,
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-breadcrumb")).toBeTruthy();
    });
    test("render items", () => {
        // const triggerHTML = "<breadcrumb-item tag="a" href='/'>Home</breadcrumb-item>";
        const triggerHTML =
            '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>';

        // const wrapper = mount(OBreadcrumb, {
        //     slot: triggerHTML,
        // });
        const wrapper = mount(OBreadcrumb, {
            slots: {
                trigger: triggerHTML,
            },
        });
        const trigger = wrapper.find(".o-breadcrumb-item");
        expect(trigger.html()).toBe(triggerHTML);
        expect(trigger.exists()).toBeTruthy();
        // expect(trigger.text()).contain("Home");
    });
    test("is centered", () => {
        const triggerHTML =
            '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>';

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
            props: { align: "centered" },
        });

        expect(wrapper.classes("o-breadcrumb__centered")).toBeTruthy();
    });
    test("is large ", () => {
        const triggerHTML =
            '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>';

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
            props: { size: "large" },
        });

        expect(wrapper.classes("o-breadcrumb__large")).toBeTruthy();
    });
});
