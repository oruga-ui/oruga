import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

import OBreadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import OBreadcrumbItem from "../BreadcrumbItem.vue";

describe("<BreadcrumbItem>", () => {
    test("is active ", async () => {
        const component = {
            components: { OBreadcrumb, OBreadcrumbItem },
            props: ["options"],
            template: `
                <o-breadcrumb tag="section" align="centered">
                    <o-breadcrumb-item active tag="router-link" to="/" active-variant="primary"
                        >Home
                    </o-breadcrumb-item>
                    <o-breadcrumb-item tag="router-link" to="/documentation/" active-variant="primary" disabled="true"
                        >Docs
                    </o-breadcrumb-item>
                    <o-breadcrumb-item tag="router-link" to="/components/Breadcrumb" active-variant="primary"
                        >Breadcrumb
                    </o-breadcrumb-item>
                </o-breadcrumb>
            `,
        };
        const wrapper = mount(component);

        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        // expect(items[0].classes("o-breadcrumb-item__primary")).toBeTruthy();
        // expect(items[0].classes("primary")).toBeTruthy();
        expect(items[0].attributes("active-variant")).toBe("primary");
    });
    test("is disabled", () => {});
    test("has icon", () => {});
    test("has href link", () => {});
});
