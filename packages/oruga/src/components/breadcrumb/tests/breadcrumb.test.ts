import { describe, test, expect, vi, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { setTimeout } from "timers/promises";

import { OBreadcrumb } from "@/components/breadcrumb/Breadcrumb.vue";
// import { OBreadcrumbItem } from "../Breadcrumbitem.vue";

describe("<Breadcrumb>", () => {
    enableAutoUnmount(afterEach);

    it("is called", () => {
        const wrapper = mount(OBreadcrumb);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("breadcrumb");
    });

    it("rendeer correctly", () => {
        const wrapper = mount(OBreadcrumb);
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-breadcrumb")).toBeTruthy();
    });
    it("render items", () => {
        // const triggerHTML = "<breadcrumb-item tag="a" href='/'>Home</breadcrumb-item>";
        const triggerHTML =
            '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>";

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML
        });
        const trigger = wrapper.find(".breadcrumb-item")
        // expect(trigger.html()).toBe(triggerHTML)
        expect(trigger.exists()).toBeTruthy()
        expect(trigger.text()).contain("Home")
    });
    it("is centered", () => {
        const triggerHTML =
        '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>";

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
            props: { align : "centered"}
        });

        expect(wrapper.classes("o-breadcrumb-item__centered")).toBeTruthy()
    });
    // it("is large ", () => {
    //     const triggerHTML =
    //     '<breadcrumb-item tag="a" href="/">Home</breadcrumb-item>";

    //     const wrapper = mount(OBreadcrumb, {
    //         slot: triggerHTML,
    //         props: { size : "large"}
    //     });

    //     expect(wrapper.classes("o-breadcrumb-item__large")).toBeTruthy()
    // });
    // it("is active", () => {
    //     const triggerHTML =
    //     '<breadcrumb-item tag="a" active="true" active-variant"primary" href="/">Home</breadcrumb-item>";

    //     const wrapper = mount(OBreadcrumb, {
    //         slot: triggerHTML,
    //     });

    //     expect(wrapper.classes("o-breadcrumb-item__primary")).toBeTruthy()
    //     expect(wrapper.classes("o-breadcrumb-item__primary")).toBeTruthy()
    // });
    // it("is disabled", () => {
    //     const triggerHTML =
    //     '<breadcrumb-item tag="a" disabled="true" href="/">Home</breadcrumb-item>";

    //     const wrapper = mount(OBreadcrumb, {
    //         slot: triggerHTML,
    //         props: { size : "large"}
    //     });

    //     expect(wrapper.classes("o-breadcrumb-item__primary")).toBeTruthy()
    // });
    // it("has icon", () => {
       
    // });
    // it("has href link", () => {
       
    // });
});
