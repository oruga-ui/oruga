import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OCheckbox from "@/components/checkbox/Checkbox.vue";

describe("OCheckbox tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OCheckbox);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("checkbox");
        expect(
            wrapper.find("label input[type=checkbox]").exists(),
        ).toBeTruthy(); // has an input checkbox
        expect(wrapper.html()).toMatchSnapshot();
    });

    test.todo("render accordingly when has native attributes", () => {});

    test.todo("render accordingly when has size prop", () => {});

    test("render accordingly when has variant prop", () => {});

    test("render accordingly when is disabled", () => {});

    test("react accordingly when value change ", async () => {});

    test("react accordingly with a object values", async () => {});

    test.todo("emit input event with value when value change", async () => {
        wrapper.setProps({ value: true });
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.computedValue).toBeTruthy();

        wrapper.vm.computedValue = false;
        await wrapper.vm.$nextTick();
        const valueEmitted = wrapper.emitted()["input"][0];
        expect(valueEmitted).toContainEqual(false);
    });

    test.todo("method focus() gives focus to the input element", (done) => {
        wrapper.vm.$refs.input.focus = jest.fn();
        wrapper.vm.focus();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled();
            done();
        });
    });
});
