import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import type { SimpleOptionsProp } from "@/composables";

import OBreadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import OBreadcrumbItem from "@/components/breadcrumb/BreadcrumbItem.vue";

describe("OBreadcrumb tests", () => {
    const component = {
        components: { OBreadcrumb, OBreadcrumbItem },
        template: `
            <o-breadcrumb>
                <o-breadcrumb-item label="Home" tag="router-link" to="/" :active="true" />
                <o-breadcrumb-item label="Docs" tag="a" href="/documentation/" :disabled="true" />
                <o-breadcrumb-item label="Breadcrumb" tag="router-link" to="/components/Breadcrumb" />
            </o-breadcrumb>
        `,
    };

    const itemsHTML = '<o-breadcrumb-item href="/">Home</o-breadcrumb-item>';

    enableAutoUnmount(afterEach);

    test("render correctly", async () => {
        const wrapper = mount(component, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
        });
        await nextTick(); // await breadcrumb items rendered

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-breadcrumb")).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("breadcrumb");

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        expect(items.length).toBe(3);

        expect(items.at(0)!.attributes("data-oruga")).toBe("breadcrumb-item");
        expect(items.at(0)!.classes("o-breadcrumb__item")).toBeTruthy();
        expect(items.at(0)!.text()).toBe("Home");
    });

    test("render correctly with default slot items", async () => {
        const wrapper = mount(component, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
        });
        await nextTick(); // await breadcrumb items rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        expect(items.length).toBe(3);
        expect(items[0].classes("o-breadcrumb__item")).toBeTruthy();
        expect(items[1].text()).toBe("Docs");
        const link = items[2].find("router-link");
        expect(link.attributes("to")).toBe("/components/Breadcrumb");
    });

    test("react accordingly when position is centered", () => {
        const wrapper = mount(OBreadcrumb, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
            slot: { default: itemsHTML },
            props: { position: "centered" },
        });

        expect(wrapper.classes("o-breadcrumb--centered")).toBeTruthy();
    });

    test("react accordingly when size is large ", () => {
        const wrapper = mount(OBreadcrumb, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
            slot: { default: itemsHTML },
            props: { size: "large" },
        });

        expect(wrapper.classes("o-breadcrumb--large")).toBeTruthy();
    });

    test("react accordingly when item is active ", async () => {
        const wrapper = mount(component, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
        });
        await nextTick(); // await breadcrumb items rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);

        expect(items[0].classes("o-breadcrumb__item")).toBeTruthy();
        expect(items[0].classes("o-breadcrumb__item--active")).toBeTruthy();
    });

    test("react accordingly when item is disabled", async () => {
        const wrapper = mount(component, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
        });
        await nextTick(); // await breadcrumb items rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        expect(items[0].classes("o-breadcrumb__item")).toBeTruthy();
        expect(items[1].classes("o-breadcrumb__item--disabled")).toBeTruthy();
    });

    test("react accordingly when item has href link", async () => {
        const wrapper = mount(component, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
        });
        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAllComponents(OBreadcrumbItem);
        const link = items[1].find("a");
        expect(link.attributes("href")).toBe("/documentation/");
    });

    test("react accordingly when item has icon", async () => {
        const componentWithIcons = {
            components: { OBreadcrumb, OBreadcrumbItem },
            template: `
                <o-breadcrumb
                    size="medium"
                    position="center">
                    <o-breadcrumb-item icon-left="home" :active="true">Home</o-breadcrumb-item>
                    <o-breadcrumb-item icon-left="plus" :disabled="true">Docs</o-breadcrumb-item>
                    <o-breadcrumb-item icon-left="location">Breadcrumb</o-breadcrumb-item>
                </o-breadcrumb>
            `,
        };

        const wrapper = mount(componentWithIcons, {
            global: { components: { OBreadcrumb, OBreadcrumbItem } },
        });
        await nextTick(); // await breadcrumb item rendered

        const items = wrapper.findAll(`[data-oruga=icon]`);

        expect(items).toHaveLength(3);
        expect(items[0].classes("o-breadcrumb__item__icon")).toBeTruthy();
        expect(items[0].classes("o-breadcrumb__item__icon-left")).toBeTruthy();
    });

    describe("handle options correctly", () => {
        test("handle options as primitves correctly", async () => {
            const options: SimpleOptionsProp = [
                "Flint",
                "Silver",
                "Vane",
                0,
                1,
                2,
            ];

            const wrapper = mount(OBreadcrumb, {
                global: { components: { OBreadcrumb, OBreadcrumbItem } },
                props: { options },
            });
            await nextTick(); // await dropdown item rendered

            const optionElements = wrapper.findAll(
                '[data-oruga="breadcrumb-item"]',
            );
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(String(options[idx]));
            });
        });

        test("handle options as options array correctly", async () => {
            const options: SimpleOptionsProp = [
                { label: "Item 1", attrs: { tag: "router-link", to: "/" } },
                {
                    label: "Item 2",
                    attrs: {
                        tag: "router-link",
                        to: "/documentation/",
                        disabled: true,
                    },
                },
                {
                    label: "Item 3",
                    attrs: { tag: "router-link", to: "/components/Breadcrumb" },
                },
            ];

            const wrapper = mount(OBreadcrumb, {
                global: { components: { OBreadcrumb, OBreadcrumbItem } },
                props: { options },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll('[data-oruga="breadcrumb-item"]');
            expect(items).toHaveLength(options.length);

            options.forEach((option, idx) => {
                expect(items.at(idx)!.attributes("data-oruga")).toBe(
                    "breadcrumb-item",
                );
                expect(
                    items.at(idx)!.classes("o-breadcrumb__item"),
                ).toBeTruthy();
                expect(items.at(idx)!.text()).toBe(option.label);
            });
        });
    });
});
