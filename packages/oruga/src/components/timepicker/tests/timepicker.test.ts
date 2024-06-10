import { beforeEach, describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import { timezoneMock } from "@/__tests__/mocks/timezoneMock";

import OTimepicker from "@/components/timepicker/Timepicker.vue";

describe("OTimepicker tests", () => {
    enableAutoUnmount(afterEach);

    beforeEach(() => {
        timezoneMock("en-GB", "Europe/London");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("render correctly", () => {
        const wrapper = mount(OTimepicker);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("timepicker");
        expect(wrapper.html()).toMatchSnapshot();
    });
});
