import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick, shallowRef } from "vue";

import type { OptionsProp } from "@/composables";
import { getOptions, setOptions } from "@/utils/config";

import OTabs from "@/components/tabs/Tabs.vue";
import OTabItem from "@/components/tabs/TabItem.vue";
import OButton from "@/components/button/Button.vue";

describe("OTabs tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", async () => {
        const wrapper = mount(OTabs);
        await nextTick();

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("tabs");
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe("basic tests", () => {
        const componentWrapper = {
            components: {
                OTabs,
                OTabItem,
            },
            template: `<OTabs value="tab1" v-bind="$attrs">
            <OTabItem value="tab1"></OTabItem>
            <OTabItem value="tab2" :visible="false"></OTabItem>
        </OTabs>`,
        };

        test("manage main classes accordingly", async () => {
            let wrapper = mount(componentWrapper, {
                props: {
                    expanded: false,
                    vertical: false,
                    position: "centered",
                },
            });
            await nextTick();

            expect(wrapper.classes("o-tabs--expanded")).toBeFalsy();
            expect(wrapper.classes("o-tabs--vertical")).toBeFalsy();
            expect(wrapper.classes("o-tabs--centered")).toBeTruthy();

            wrapper = mount(componentWrapper, {
                props: {
                    expanded: true,
                    vertical: false,
                    position: "centered",
                },
            });
            await nextTick();

            expect(wrapper.classes("o-tabs--expanded")).toBeTruthy();

            wrapper = mount(componentWrapper, {
                props: {
                    expanded: false,
                    vertical: true,
                    position: "centered",
                },
            });
            await nextTick();
            expect(wrapper.classes("o-tabs--vertical")).toBeTruthy();

            wrapper = mount(componentWrapper, {
                props: {
                    expanded: false,
                    vertical: true,
                    position: "right",
                },
            });
            await nextTick();
            expect(wrapper.classes("o-tabs--centered")).toBeFalsy();
            expect(wrapper.classes("o-tabs--right")).toBeTruthy();
        });

        test("updates the tab when the value is changed", async () => {
            const wrapper = mount(componentWrapper, {
                props: { modelValue: "tab2" },
            });
            await nextTick();
            let tabs = wrapper.findAll(".o-tabs__tab");
            expect(tabs).toHaveLength(2);
            expect(tabs[0].classes("o-tabs__tab--active")).toBeFalsy();
            expect(tabs[1].classes("o-tabs__tab--active")).toBeTruthy();

            // @ts-ignore
            wrapper.setProps({ modelValue: "tab1" });
            await nextTick();

            tabs = wrapper.findAll(".o-tabs__tab");
            expect(tabs).toHaveLength(2);
            expect(tabs[0].classes("o-tabs__tab--active")).toBeTruthy();
            expect(tabs[1].classes("o-tabs__tab--active")).toBeFalsy();
        });
    });

    describe("OTab with OTabItem integration tests", () => {
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

        test("test render correctly", async () => {
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
            await nextTick();

            expect(!!wrapper.vm).toBeTruthy();
            expect(wrapper.exists()).toBeTruthy();
            expect(wrapper.html()).toMatchSnapshot();

            expect(wrapper.attributes("data-oruga")).toBe("tabs");

            const step = wrapper.find('[data-oruga="tabs-item"]');
            expect(step.exists()).toBeTruthy();
            expect(step.text()).toBe("ABC");
        });

        test("renders the tab buttons", async () => {
            const wrapper = mount(componentWrapper, {
                attachTo: document.body,
            });
            await nextTick();

            console.log(wrapper.html());
            const tabButtons = wrapper.findAll(".o-tabs__tab");

            expect(tabButtons).toHaveLength(3);
            expect(tabButtons[0].text()).toBe("Tab 1");
            expect(tabButtons[0].attributes("aria-selected")).toBe("true");
            expect(tabButtons[1].text()).toBe("Tab 2");
            expect(tabButtons[1].attributes("aria-selected")).toBe("false");
            expect(tabButtons[2].text()).toBe("Tab 3");
            expect(tabButtons[2].attributes("aria-selected")).toBe("false");
        });

        test("renders the tab panels", async () => {
            const wrapper = mount(componentWrapper, {
                attachTo: document.body,
            });
            await nextTick();

            const tabPanls = wrapper.findAll(`[data-oruga="tabs-item"]`);

            expect(tabPanls).toHaveLength(3);
            expect(tabPanls[0].text()).toBe("Tab 1 Content");
            expect(tabPanls[0].isVisible()).toBeTruthy();
            expect(tabPanls[1].text()).toBe("Tab 2 Content");
            expect(tabPanls[1].isVisible()).toBeFalsy();
            expect(tabPanls[2].text()).toBe("Tab 3 Content");
            expect(tabPanls[2].isVisible()).toBeFalsy();
        });

        test("switches the content based on the tab clicked", async () => {
            const wrapper = mount(componentWrapper, {
                attachTo: document.body,
            });
            await nextTick();

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

        test("render item with component prop correctly", async () => {
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
            await nextTick();

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

                const navElements = wrapper.findAll(".o-tabs__tab");
                expect(navElements).toHaveLength(options.length);

                navElements.forEach((el, idx) => {
                    expect(el.classes("o-tabs__tab--previous")).toBe(
                        idx < currentIndex,
                    );
                    expect(el.classes("o-tabs__tab--active")).toBe(
                        idx == currentIndex,
                    );
                    expect(el.classes("o-tabs__tab--next")).toBe(
                        idx > currentIndex,
                    );
                });

                currentIndex = 4;
                let navButton = navElements[currentIndex];
                expect(navButton.element.tagName).toBe("BUTTON");

                await navButton.trigger("click");

                navElements.forEach((el, idx) => {
                    expect(el.classes("o-tabs__tab--previous")).toBe(
                        idx < currentIndex,
                    );
                    expect(el.classes("o-tabs__tab--active")).toBe(
                        idx == currentIndex,
                    );
                    expect(el.classes("o-tabs__tab--next")).toBe(
                        idx > currentIndex,
                    );
                });

                currentIndex = 0;
                navButton = navElements[currentIndex];
                expect(navButton.element.tagName).toBe("BUTTON");

                await navButton.trigger("click");

                navElements.forEach((el, idx) => {
                    expect(el.classes("o-tabs__tab--previous")).toBe(
                        idx < currentIndex,
                    );
                    expect(el.classes("o-tabs__tab--active")).toBe(
                        idx == currentIndex,
                    );
                    expect(el.classes("o-tabs__tab--next")).toBe(
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
                const options: OptionsProp = [
                    0,
                    1,
                    2,
                    "Flint",
                    "Silver",
                    "Vane",
                ];

                const wrapper = mount(OTabs, { props: { options } });
                await nextTick();

                const navElements = wrapper.findAll(".o-tabs__tab");
                expect(navElements).toHaveLength(options.length);

                const itemElements = wrapper.findAll(
                    '[data-oruga="tabs-item"]',
                );
                expect(itemElements).toHaveLength(options.length);

                navElements.forEach((el, idx) => {
                    expect(el.text()).toBe(String(options[idx]));
                });

                expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                    ["0"],
                ]);
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

                const navElements = wrapper.findAll(".o-tabs__tab");
                expect(navElements).toHaveLength(Object.keys(options).length);

                const optionElements = wrapper.findAll(
                    '[data-oruga="tabs-item"]',
                );
                expect(optionElements).toHaveLength(
                    Object.keys(options).length,
                );

                navElements.forEach((el, idx) => {
                    expect(el.text()).toBe(Object.entries(options)[idx][1]);
                });
            });

            test("handle options as options array correctly", async () => {
                const options: OptionsProp<string | number> = [
                    {
                        label: "Flint",
                        value: "flint",
                        attrs: { content: "flint" },
                    },
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

                const navElements = wrapper.findAll(".o-tabs__tab");
                expect(navElements).toHaveLength(Object.keys(options).length);

                const optionElements = wrapper.findAll(
                    '[data-oruga="tabs-item"]',
                );
                expect(optionElements).toHaveLength(options.length);

                navElements.forEach((el, idx) => {
                    expect(el.text()).toBe(options[idx].label);
                    expect(el.element.tagName).toBe("BUTTON");
                    expect(el.classes("o-tabs__tab--disabled")).toBe(
                        options[idx].attrs?.disabled || false,
                    );
                });

                optionElements.forEach((el, idx) => {
                    expect(el.text()).toBe(options[idx].attrs?.content);
                });
            });
        });
    });

    describe("OTabItem", () => {
        const componentWrapper = {
            components: {
                OTabs,
                OTabItem,
            },
            data: () => ({
                show1: true,
            }),
            template: `<OTabs>
            <OTabItem v-if="show1" value="tab1"/>
            <OTabItem ref="testItem" value="tab2"/>
            <OTabItem value="tab3" :visible="false"/>
        </OTabs>`,
        };

        test("render correctly", async () => {
            const wrapper = mount(componentWrapper);
            await nextTick();

            const tabs = wrapper.findAll(".o-tabs__tab");
            expect(tabs).toHaveLength(3);
            expect(tabs[1].html()).toMatchSnapshot();
        });

        test("computes its position correctly", () => {
            const wrapper = mount(componentWrapper);
            const panels = wrapper.findAll('[data-oruga="tabs-item"]');
            expect(panels).toHaveLength(3);
            expect(panels[0].attributes("data-id")).toBe("tabs-1");
            expect(panels[1].attributes("data-id")).toBe("tabs-2");
            expect(panels[2].attributes("data-id")).toBe("tabs-3");
        });

        test("transforms default item tag accordingly to props", async () => {
            let wrapper = mount(componentWrapper);
            await nextTick();
            let item = wrapper.find(".o-tabs__tab");
            expect(item.exists()).toBeTruthy();
            expect(item.element.tagName).toBe("BUTTON");

            setOptions(
                Object.assign(getOptions(), {
                    tabs: {
                        itemTag: "a",
                    },
                }),
            );

            wrapper = mount(componentWrapper);
            await nextTick();
            item = wrapper.find(".o-tabs__tab");
            expect(item.exists()).toBeTruthy();
            expect(item.element.tagName).toBe("A");
        });

        test("unregisters when destroyed", async () => {
            const wrapper = mount({
                template: `
        <OTabs>
            <OTabItem ref="item1"/>
            <OTabItem v-if="item2" ref="item2"/>
        </OTabs>`,
                props: {
                    item2: {
                        type: Boolean,
                        default: true,
                    },
                },
                components: {
                    OTabs,
                    OTabItem,
                },
            });
            await nextTick();

            let tabs = wrapper.findAll(".o-tabs__tab");
            expect(tabs).toHaveLength(2);

            wrapper.setProps({ item2: false });
            await nextTick();

            tabs = wrapper.findAll(".o-tabs__tab");
            expect(tabs).toHaveLength(1);
        });
    });
});
