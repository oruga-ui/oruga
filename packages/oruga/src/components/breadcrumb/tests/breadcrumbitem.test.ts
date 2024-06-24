import { describe, test, expect, vi, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { setTimeout } from "timers/promises";

import { OBreadcrumb } from "@/components/breadcrumb/Breadcrumb.vue";
import { OBreadcrumbItem } from "../Breadcrumbitem.vue";


describe("<Breadcrumb>", () => {


    it("is active", () => {
        const triggerHTML =
        '<breadcrumb-item tag="a" active="true" active-variant"primary" href="/">Home</breadcrumb-item>";

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
        });

        expect(wrapper.classes("o-breadcrumb-item__primary")).toBeTruthy()
        expect(wrapper.classes("o-breadcrumb-item__primary")).toBeTruthy()
    });
    it("is disabled", () => {
        const triggerHTML =
        '<breadcrumb-item tag="a" disabled="true" href="/">Home</breadcrumb-item>";

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
            props: { size : "large"}
        });

        expect(wrapper.classes("o-breadcrumb-item__primary")).toBeTruthy()
    });
    it("has icon", () => {
       
    });
    it("has href link", () => {
       
    });

})