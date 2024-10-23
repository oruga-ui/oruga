import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { shallowRef } from "vue";

import OTabs from "../Tabs.vue";
import OTabItem from "../TabItem.vue";
import OButton from "@/components/button/Button.vue";

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
});
