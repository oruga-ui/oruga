import { beforeEach, describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import { timezoneMock } from "@/__tests__/mocks/timezoneMock";

import ODatetimepicker from "@/components/datetimepicker/Datetimepicker.vue";

describe("ODatetimepicker tests", () => {
    enableAutoUnmount(afterEach);

    beforeEach(() => {
        timezoneMock("en-GB", "Europe/London");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("render correctly", () => {
        const wrapper = mount(ODatetimepicker);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("datetimepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });
});
