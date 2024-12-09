import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import OTabs from "@/components/tabs/Tabs.vue";

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
});
