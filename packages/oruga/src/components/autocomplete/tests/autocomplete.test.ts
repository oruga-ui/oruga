import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OAutocomplete from "@/components/autocomplete/Autocomplete.vue";

describe("OAutocomplete tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OAutocomplete);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("autocomplete");
        expect(wrapper.html()).toMatchSnapshot();
    });
});
