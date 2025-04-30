import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

import OBreadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import OBreadcrumbItem from "@/components/breadcrumb//BreadcrumbItem.vue";

describe("<BreadcrumbItem>", () => {
    const component = {
        components: { OBreadcrumb, OBreadcrumbItem },
        props: ["options"],
        template: `
            <o-breadcrumb tag="section" align="centered">
                <o-breadcrumb-item active="true" tag="a" href="/" active-variant="primary"
                    >Home
                </o-breadcrumb-item>
                <o-breadcrumb-item tag="a" href="/documentation/" active-variant="primary" disabled="true"
                    >Docs
                </o-breadcrumb-item>
                <o-breadcrumb-item tag="a" href="/components/Breadcrumb" active-variant="primary"
                    >Breadcrumb
                </o-breadcrumb-item>
            </o-breadcrumb>
        `,
    };

    test("is active ", async () => {
        const wrapper = mount(component);

        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);

        expect(items[0].classes("o-breadcrumb-item__primary")).toBeTruthy();
        expect(items[0].classes("active")).toBeTruthy();
    });

    test("is disabled", async () => {
        const wrapper = mount(component);

        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        expect(items[1].classes("o-breadcrumb-item__disabled")).toBeTruthy();
    });

    test("has icon", async () => {
        const componentWithIcons = {
            components: { OBreadcrumb, OBreadcrumbItem },
            props: ["options"],
            template: `
                <o-breadcrumb
                    tag="section"
                    separator="has-arrow-separator"
                    size="medium"
                    align="center">
                    <o-breadcrumb-item tag="a" icon-left="home" active="true" active-variant="primary">Home</o-breadcrumb-item>
                    <o-breadcrumb-item tag="a" icon-left="plus" disabled="true">Docs</o-breadcrumb-item>
                    <o-breadcrumb-item tag="a" icon-left="location">Breadcrumb</o-breadcrumb-item>
                </o-breadcrumb>
            `,
        };

        const wrapper = mount(componentWithIcons);

        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAll(`[data-oruga=icon]`);

        expect(items).toHaveLength(3);
        expect(items[0].classes("o-breadcrumb-item__icon")).toBeTruthy();
        expect(items[0].classes("o-breadcrumb-item__icon-left")).toBeTruthy();
        // expect(items[0].find(".fas")).toBeTruthy();
    });

    test("has href link", async () => {
        const wrapper = mount(component);

        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        expect(items[2].attributes("href")).toBe("/components/Breadcrumb");
    });
});
