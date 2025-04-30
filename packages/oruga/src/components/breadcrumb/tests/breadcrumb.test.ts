import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import OBreadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import OBreadcrumbItem from "@/components/breadcrumb/BreadcrumbItem.vue";

describe("<Breadcrumb>", () => {
    enableAutoUnmount(afterEach);

    test("is called", () => {
        const triggerHTML =
            '<o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>';
        const wrapper = mount(OBreadcrumb, {
            slots: {
                trigger: triggerHTML,
            },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-breadcrumb")).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("breadcrumb");
    });

    test("rendeer correctly", () => {
        const triggerHTML =
            '<o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>';
        const wrapper = mount(OBreadcrumb, {
            slots: {
                trigger: triggerHTML,
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-breadcrumb")).toBeTruthy();
    });

    test("render items", async () => {
        const component = {
            components: { OBreadcrumb, OBreadcrumbItem },
            props: ["options"],
            template: `
                <o-breadcrumb tag="section" align="centered">
                    <o-breadcrumb-item tag="router-link" to="/" active-variant="primary"
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
        expect(items.length).toBe(3);
        expect(items[0].classes("o-breadcrumb-item")).toBeTruthy();
        expect(items[1].text()).toBe("Docs");
        expect(items[2].attributes("to")).toBe("/components/Breadcrumb");
    });

    test("is centered", () => {
        const triggerHTML =
            '<o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>';

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
            props: { align: "centered" },
        });

        expect(wrapper.classes("o-breadcrumb__centered")).toBeTruthy();
    });

    test("is large ", () => {
        const triggerHTML =
            '<o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>';

        const wrapper = mount(OBreadcrumb, {
            slot: triggerHTML,
            props: { size: "large" },
        });

        expect(wrapper.classes("o-breadcrumb__large")).toBeTruthy();
    });
});
