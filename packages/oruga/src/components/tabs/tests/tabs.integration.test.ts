import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick, shallowRef } from "vue";

import OTabs from "../Tabs.vue";
import OTabItem from "../TabItem.vue";
import OButton from "@/components/button/Button.vue";

import type { OptionsProp } from "@/composables";

describe("OTab with OTabItem tests", () => {
    const componentWrapper = {
        components: {
            OTabs,
            OTabItem,
        },
        template: `<OTabs modelValue="1">
    <OTabItem label="Tab 1" value="1">
      <p>Tab 1 Content</p>
    </OTabItem>
    <OTabItem label="Tab 2" value="2">
      <p>Tab 2 Content</p>
    </OTabItem>
    <OTabItem label="Tab 3" value="3">
      <p>Tab 3 Content</p>
    </OTabItem>
  </OTabs>
`,
    };

    function genTestcomponent(stepProps, itemProps) {
        return {
            components: {
                OTabs,
                OTabItem,
            },
            data: () => ({ stepProps, itemProps }),
            template: `<OTabs v-bind="stepProps">
            <OTabItem v-bind="itemProps" />
          </OTabs>
        `,
        };
    }

    test("test render correctly", () => {
        const wrapper = mount(
            genTestcomponent(
                {},
                {
                    value: "1",
                    label: "Account",
                    content: "ABC",
                },
            ),
        );
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.attributes("data-oruga")).toBe("tabs");

        const step = wrapper.find('[data-oruga="tabs-item"]');
        expect(step.exists()).toBeTruthy();
        expect(step.text()).toBe("ABC");
    });

    test("renders the tab buttons", async () => {
        const wrapper = mount(componentWrapper);
        await wrapper.vm.$nextTick();

        const tabButtons = wrapper.findAll(".o-tabs__nav-item");

        expect(tabButtons.length).toBe(3);
        expect(tabButtons[0].text()).toBe("Tab 1");
        expect(tabButtons[0].attributes("aria-selected")).toBe("true");
        expect(tabButtons[1].text()).toBe("Tab 2");
        expect(tabButtons[1].attributes("aria-selected")).toBe("false");
        expect(tabButtons[2].text()).toBe("Tab 3");
        expect(tabButtons[2].attributes("aria-selected")).toBe("false");
    });

    test("renders the tab panels", async () => {
        const wrapper = mount(componentWrapper, { attachTo: document.body });
        await wrapper.vm.$nextTick();

        const tabPanls = wrapper.findAll(`[data-oruga="tabs-item"]`);

        expect(tabPanls.length).toBe(3);
        expect(tabPanls[0].text()).toBe("Tab 1 Content");
        expect(tabPanls[0].isVisible()).toBeTruthy();
        expect(tabPanls[1].text()).toBe("Tab 2 Content");
        expect(tabPanls[1].isVisible()).toBeFalsy();
        expect(tabPanls[2].text()).toBe("Tab 3 Content");
        expect(tabPanls[2].isVisible()).toBeFalsy();
    });

    test("switches the content based on the tab clicked", async () => {
        const wrapper = mount(componentWrapper, { attachTo: document.body });
        await wrapper.vm.$nextTick();

        const tabs = wrapper.findAll(".o-tabs__tab");
        const tabPanls = wrapper.findAll(`[data-oruga="tabs-item"]`);

        // clicking the second tab reveals the second content
        // and hides the first content
        await tabs[1].trigger("click");
        expect(tabPanls[1].isVisible()).toBeTruthy();
        expect(tabPanls[0].isVisible()).toBeFalsy();

        // clicking the third tab reveals the third content
        //  and hides the second content
        await tabs[2].trigger("click");
        expect(tabPanls[2].isVisible()).toBeTruthy();
        expect(tabPanls[1].isVisible()).toBeFalsy();
    });

    test("render item with component prop correctly", () => {
        const wrapper = mount(
            genTestcomponent(
                {},
                {
                    value: "1",
                    label: "1",
                    component: shallowRef(OButton),
                    props: { label: "MyButton" },
                },
            ),
        );

        const step = wrapper.find('[data-oruga="tabs-item"]');
        expect(step.exists()).toBeTruthy();
        const button = step.find('[data-oruga="button"]');
        expect(button.text()).toBe("MyButton");
    });

    describe("handle navigation correctly", () => {
        const options: OptionsProp<string> = [
            { label: "Flint", value: "flint", attrs: { clickable: true } },
            {
                label: "Silver",
                value: "silver",
                attrs: { clickable: true },
            },
            { label: "Vane", value: "vane", attrs: { clickable: true } },
            { label: "Billy", value: "billy", attrs: { clickable: true } },
            { label: "Jack", value: "jack", attrs: { clickable: true } },
        ];

        test("render accordingly when item is clicked", async () => {
            let currentIndex = 2;

            const wrapper = mount(OTabs, {
                props: { options, modelValue: options[currentIndex].value },
            });
            await nextTick();

            const navElements = wrapper.findAll(".o-tabs__nav-item");
            expect(navElements).toHaveLength(options.length);

            navElements.forEach((el, idx) => {
                expect(el.classes("o-tabs__nav-item--previous")).toBe(
                    idx < currentIndex,
                );
                expect(el.classes("o-tabs__nav-item--active")).toBe(
                    idx == currentIndex,
                );
                expect(el.classes("o-tabs__nav-item--next")).toBe(
                    idx > currentIndex,
                );
            });

            currentIndex = 4;
            let navButton = navElements[currentIndex].find("button");
            expect(navButton.exists()).toBeTruthy();

            await navButton.trigger("click");

            navElements.forEach((el, idx) => {
                expect(el.classes("o-tabs__nav-item--previous")).toBe(
                    idx < currentIndex,
                );
                expect(el.classes("o-tabs__nav-item--active")).toBe(
                    idx == currentIndex,
                );
                expect(el.classes("o-tabs__nav-item--next")).toBe(
                    idx > currentIndex,
                );
            });

            currentIndex = 0;
            navButton = navElements[currentIndex].find("button");
            expect(navButton.exists()).toBeTruthy();

            await navButton.trigger("click");

            navElements.forEach((el, idx) => {
                expect(el.classes("o-tabs__nav-item--previous")).toBe(
                    idx < currentIndex,
                );
                expect(el.classes("o-tabs__nav-item--active")).toBe(
                    idx == currentIndex,
                );
                expect(el.classes("o-tabs__nav-item--next")).toBe(
                    idx > currentIndex,
                );
            });

            expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                [options[4].value],
                [options[0].value],
            ]);

            expect(wrapper.emitted("change")).toStrictEqual([
                [options[4].value, options[2].value],
                [options[0].value, options[4].value],
            ]);
        });
    });

    describe("handle options props correctly", () => {
        test("handle options as primitves correctly", async () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(OTabs, { props: { options } });
            await nextTick();

            const navElements = wrapper.findAll(".o-tabs__nav-item");
            expect(navElements).toHaveLength(options.length);

            const itemElements = wrapper.findAll('[data-oruga="tabs-item"]');
            expect(itemElements).toHaveLength(options.length);

            navElements.forEach((el, idx) => {
                expect(el.text()).toBe(String(options[idx]));
            });
        });

        test("handle options as object correctly", async () => {
            const options: OptionsProp = {
                flint: "Flint",
                silver: "Silver",
                vane: "Vane",
                0: "Zero",
                1: "One",
                2: "Two",
            };

            const wrapper = mount(OTabs, { props: { options } });
            await nextTick();

            const navElements = wrapper.findAll(".o-tabs__nav-item");
            expect(navElements).toHaveLength(Object.keys(options).length);

            const optionElements = wrapper.findAll('[data-oruga="tabs-item"]');
            expect(optionElements).toHaveLength(Object.keys(options).length);

            navElements.forEach((el, idx) => {
                expect(el.text()).toBe(Object.entries(options)[idx][1]);
            });
        });

        test("handle options as options array correctly", async () => {
            const options: OptionsProp<string | number> = [
                { label: "Flint", value: "flint", attrs: { content: "flint" } },
                {
                    label: "Silver",
                    value: "silver",
                    attrs: { clickable: true, content: "silver" },
                },
                { label: "Vane", value: "vane", attrs: { content: "abc" } },
                { label: "Zero", value: 0, attrs: { content: "x" } },
                {
                    label: "One",
                    value: 1,
                    attrs: { content: "y", disabled: true },
                },
                {
                    label: "Two",
                    value: 2,
                    attrs: { clickable: true, content: "test" },
                },
            ];

            const wrapper = mount(OTabs, { props: { options } });
            await nextTick();

            const navElements = wrapper.findAll(".o-tabs__nav-item");
            expect(navElements).toHaveLength(Object.keys(options).length);

            const optionElements = wrapper.findAll('[data-oruga="tabs-item"]');
            expect(optionElements).toHaveLength(options.length);

            navElements.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].label);
                const button = el.find("button");
                expect(button.exists()).toBeTruthy();
                expect(button.classes("o-tabs__tab--disabled")).toBe(
                    options[idx].attrs?.disabled || false,
                );
            });

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].attrs?.content);
            });
        });
    });
});
