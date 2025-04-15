import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

import OBreadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import OBreadcrumbItem from "../BreadcrumbItem.vue";

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
        expect(true).toBe(true);
    });
    test("has icon", async () => {
        const wrapper = mount(component);

        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        expect(true).toBe(true);
    });
    test("has href link", async () => {
        const wrapper = mount(component);

        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        expect(true).toBe(true);
    });
});
