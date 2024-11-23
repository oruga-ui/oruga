import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import ORadio from "@/components/radio/Radio.vue";

describe("ORadio tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(ORadio);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("radio");
        expect(wrapper.find("input[type=radio]").exists()).toBeTruthy(); // has an input checkbox
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render accordingly when has native attributes", () => {
        const wrapper = mount(ORadio, {
            props: {
                autocomplete: "on",
                nativeValue: "1",
                required: true,
            },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.attributes("value")).toBe("1");
        expect(input.attributes("autocomplete")).toBe("on");
        expect(input.attributes("required")).not.toBeUndefined();
    });

    test("render accordingly when has size prop", () => {
        const wrapper = mount(ORadio, {
            props: { size: "large" },
        });

        expect(wrapper.classes("o-radio--large")).toBeTruthy();
    });

    test("render accordingly when has variant prop", () => {
        const wrapper = mount(ORadio, {
            props: { variant: "danger" },
        });

        expect(wrapper.classes("o-radio--danger")).toBeTruthy();
    });

    test("render accordingly when is disabled", () => {
        const wrapper = mount(ORadio, {
            props: { disabled: true },
        });

        expect(wrapper.classes("o-radio--disabled")).toBeTruthy();
        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.attributes("disabled")).not.toBeUndefined();
    });

    test("react accordingly when value change ", async () => {
        const value1 = true;
        const value2 = false;
        const model = value2;
        const wrapper1 = mount(ORadio, {
            props: {
                modelValue: model,
                nativeValue: value1,
                "onUpdate:modelValue": (modelValue) => {
                    wrapper1.setProps({ modelValue });
                    wrapper2.setProps({ modelValue });
                },
            },
        });
        const wrapper2 = mount(ORadio, {
            props: {
                modelValue: model,
                nativeValue: value2,
                "onUpdate:modelValue": (modelValue) => {
                    wrapper1.setProps({ modelValue });
                    wrapper2.setProps({ modelValue });
                },
            },
        });

        const input1 = wrapper1.find("input");
        expect(input1.exists()).toBeTruthy();
        const input2 = wrapper2.find("input");
        expect(input2.exists()).toBeTruthy();
        expect(wrapper1.vm.value).toEqual(model);
        expect(wrapper2.vm.value).toEqual(model);

        await input1.setValue(true);

        let emits = wrapper1.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(value1);
        expect(wrapper1.vm.value).toEqual(value1);
        expect(wrapper2.vm.value).toEqual(value1);

        await input2.setValue();
        emits = wrapper2.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(value2);
        expect(wrapper1.vm.value).toEqual(value2);
        expect(wrapper2.vm.value).toEqual(value2);
    });

    test("react accordingly when custom string values are given", async () => {
        const value1 = "Yes";
        const value2 = "No";
        const model = value2;
        const wrapper1 = mount(ORadio, {
            props: {
                modelValue: model,
                nativeValue: value1,
                "onUpdate:modelValue": (modelValue) => {
                    wrapper1.setProps({ modelValue });
                    wrapper2.setProps({ modelValue });
                },
            },
        });
        const wrapper2 = mount(ORadio, {
            props: {
                modelValue: model,
                nativeValue: value2,
                "onUpdate:modelValue": (modelValue) => {
                    wrapper1.setProps({ modelValue });
                    wrapper2.setProps({ modelValue });
                },
            },
        });
        const input1 = wrapper1.find("input");
        expect(input1.exists()).toBeTruthy();
        const input2 = wrapper2.find("input");
        expect(input2.exists()).toBeTruthy();
        expect(wrapper1.vm.value).toEqual(model);
        expect(wrapper2.vm.value).toEqual(model);

        await input1.setValue(true);

        let emits = wrapper1.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(value1);
        expect(wrapper1.vm.value).toEqual(value1);
        expect(wrapper2.vm.value).toEqual(value1);

        await input2.setValue();
        emits = wrapper2.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(value2);
        expect(wrapper1.vm.value).toEqual(value2);
        expect(wrapper2.vm.value).toEqual(value2);
    });

    test("react accordingly when custom object values are given", async () => {
        const value1 = { a: "a", b: "b" };
        const value2 = { y: "y", x: "X" };
        const model = value2;
        const wrapper1 = mount(ORadio, {
            props: {
                modelValue: model,
                nativeValue: value1,
                "onUpdate:modelValue": (modelValue) => {
                    wrapper1.setProps({ modelValue });
                    wrapper2.setProps({ modelValue });
                },
            },
        });
        const wrapper2 = mount(ORadio, {
            props: {
                modelValue: model,
                nativeValue: value2,
                "onUpdate:modelValue": (modelValue) => {
                    wrapper1.setProps({ modelValue });
                    wrapper2.setProps({ modelValue });
                },
            },
        });
        const input1 = wrapper1.find("input");
        expect(input1.exists()).toBeTruthy();
        const input2 = wrapper2.find("input");
        expect(input2.exists()).toBeTruthy();
        expect(wrapper1.vm.value).toEqual(model);
        expect(wrapper2.vm.value).toEqual(model);

        await input1.setValue(true);

        let emits = wrapper1.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(value1);
        expect(wrapper1.vm.value).toEqual(value1);
        expect(wrapper2.vm.value).toEqual(value1);

        await input2.setValue();
        emits = wrapper2.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(value2);
        expect(wrapper1.vm.value).toEqual(value2);
        expect(wrapper2.vm.value).toEqual(value2);
    });

    test("react accordingly when method focus() is called", async () => {
        const wrapper = mount(ORadio);

        const input = wrapper.find("input");
        input.element.focus = vi.fn();

        wrapper.vm.focus();
        await nextTick(() => {
            expect(input.element.focus).toHaveBeenCalled();
        });
    });
});
