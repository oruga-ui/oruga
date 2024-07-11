import { describe, test, expect, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";

import { OBreadcrumb } from "@/components/breadcrumb/Breadcrumb.vue";
// import { OBreadcrumbItem } from "../Breadcrumbitem.vue";

describe("<BreadcrumbItem>", () => {
    test("is active", () => {
        const triggerHTML =
            '<breadcrumb-item tag="a" active="true" active-variant"primary" href="/">Home</breadcrumb-item>';

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
        });

        const trigger = wrapper.find(".o-breadcrumb-item");

        expect(trigger.classes("o-breadcrumb-item__primary")).toBeTruthy();
    });
    test("is disabled", () => {
        const triggerHTML =
            '<breadcrumb-item tag="a" disabled="true" href="/">Home</breadcrumb-item>';

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
            props: { size: "large" },
        });

        const trigger = wrapper.find(".o-breadcrumb-item");

        expect(trigger.classes("o-breadcrumb-item__disabled")).toBeTruthy();
    });
    test("has icon", () => {});
    test("has href link", () => {});
});
