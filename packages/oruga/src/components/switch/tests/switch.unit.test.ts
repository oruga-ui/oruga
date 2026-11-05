import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { h, nextTick } from "vue";

import OField from "@/components/field/Field.vue";
import OSwitch from "@/components/switch/Switch.vue";

describe("OSwitch tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OSwitch, { props: { label: "My input" } });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("switch");
        expect(wrapper.find("input[type=checkbox]").exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render accordingly when has native attributes", () => {
        const wrapper = mount(OSwitch, {
            props: {
                autocomplete: "on",
                nativeValue: true,
                required: true,
            },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.attributes("value")).toBe("true");
        expect(input.attributes("autocomplete")).toBe("on");
        expect(input.attributes("required")).not.toBeUndefined();
    });

    test("render accordingly when has size prop", () => {
        const wrapper = mount(OSwitch, {
            props: { size: "large" },
        });

        expect(wrapper.classes("o-switch--large")).toBeTruthy();
    });

    test("render accordingly when has variant prop", () => {
        const wrapper = mount(OSwitch, {
            props: { variant: "danger" },
        });

        expect(wrapper.classes("o-switch--danger")).toBeTruthy();
    });

    test("render accordingly when has passiveVariant prop", () => {
        const wrapper = mount(OSwitch, {
            props: { passiveVariant: "danger" },
        });

        expect(wrapper.classes("o-switch--danger-passive")).toBeTruthy();
    });

    test("render accordingly when has rounded prop", () => {
        const wrapper = mount(OSwitch, {
            props: { rounded: true },
        });

        expect(wrapper.classes("o-switch--rounded")).toBeDefined();
    });

    test("render accordingly when is disabled", () => {
        const wrapper = mount(OSwitch, {
            props: { disabled: true },
        });

        expect(wrapper.classes("o-switch--disabled")).toBeTruthy();
        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.attributes("disabled")).toBeDefined();
    });

    describe("test events", () => {
        test("check emit focus and blur event correctly", async () => {
            const wrapper = mount(OSwitch);

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("focus");
            await input.trigger("blur");

            expect(wrapper.emitted("focus")).toHaveLength(1);
            expect(wrapper.emitted("blur")).toHaveLength(1);
        });

        test("react accordingly when method focus() is called", async () => {
            const wrapper = mount(OSwitch);

            const input = wrapper.find("input");
            const dummyFocus = vi.fn();
            input.element.focus = dummyFocus;

            wrapper.vm.focus();
            await nextTick(() => {
                expect(dummyFocus).toHaveBeenCalled();
            });
        });

        test("react accordingly when value change ", async () => {
            const wrapper = mount(OSwitch);

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.setValue(true);
            let emits = wrapper.emitted("update:modelValue");
            expect(emits).toHaveLength(1);
            expect(emits?.[0]).toContainEqual(true);
            expect(wrapper.vm.value).toEqual(true);

            await input.setValue(false);
            emits = wrapper.emitted("update:modelValue");
            expect(emits).toHaveLength(2);
            expect(emits?.[1]).toContainEqual(false);
            expect(wrapper.vm.value).toEqual(false);
        });

        test("react accordingly when custom string values are given", async () => {
            const trueValue = "Yes";
            const falseValue = "No";
            const wrapper = mount(OSwitch, {
                props: { trueValue, falseValue },
            });

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.setValue(true);
            let emits = wrapper.emitted("update:modelValue");
            expect(emits).toHaveLength(1);
            expect(emits?.[0]).toContainEqual(trueValue);
            expect(wrapper.vm.value).toEqual(trueValue);

            await input.setValue(false);
            emits = wrapper.emitted("update:modelValue");
            expect(emits).toHaveLength(2);
            expect(emits?.[1]).toContainEqual(falseValue);
            expect(wrapper.vm.value).toEqual(falseValue);
        });

        test("react accordingly when custom object values are given", async () => {
            const trueValue = { a: "a", b: "b" };
            const falseValue = { y: "y", x: "X" };
            const wrapper = mount(OSwitch, {
                props: {
                    modelValue: falseValue,
                    trueValue,
                    falseValue,
                    "onUpdate:modelValue": (modelValue) =>
                        wrapper.setProps({ modelValue }),
                },
            });

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.setValue(true);
            let emits = wrapper.emitted("update:modelValue");
            expect(emits).toHaveLength(1);
            expect(emits?.[0]).toContainEqual(trueValue);
            expect(wrapper.vm.value).toEqual(trueValue);

            await input.setValue(false);
            emits = wrapper.emitted("update:modelValue");
            expect(emits?.[0]).toContainEqual(trueValue);
            expect(emits?.[1]).toContainEqual(falseValue);
            expect(wrapper.vm.value).toEqual(falseValue);
        });
    });
    describe("accessible name within a field", () => {
        const controls = () =>
            mount(OField, {
                props: { label: "Options", role: "group" },
                slots: {
                    default: () => [
                        h(OSwitch, { label: "First" }),
                        h(OSwitch, { label: "Second" }),
                    ],
                },
            });

        test("each control is named by its own label", () => {
            const wrapper = controls();
            const inputs = wrapper.findAll("input");
            const labels = wrapper.findAll(".o-switch__label");
            expect(inputs).toHaveLength(2);

            const fieldLabelId = wrapper
                .find(".o-field__label")
                .attributes("id");
            for (const [idx, input] of inputs.entries()) {
                const labelId = labels[idx].attributes("id");
                expect(labelId).toBeTruthy();
                expect(labelId).not.toBe(fieldLabelId);
                expect(input.attributes("aria-labelledby")).toBe(labelId);
            }
            expect(labels[0].attributes("id")).not.toBe(
                labels[1].attributes("id"),
            );
        });

        test("the field names the group", () => {
            const wrapper = controls();
            const fieldLabelId = wrapper
                .find(".o-field__label")
                .attributes("id");
            expect(wrapper.attributes("role")).toBe("group");
            expect(wrapper.attributes("aria-labelledby")).toBe(fieldLabelId);
        });

        test("a control without own label is named by the field label", () => {
            const wrapper = mount(OField, {
                props: { label: "Newsletter" },
                slots: { default: () => h(OSwitch) },
            });
            expect(wrapper.find("input").attributes("aria-labelledby")).toBe(
                wrapper.find(".o-field__label").attributes("id"),
            );
            expect(wrapper.attributes("aria-labelledby")).toBeUndefined();
        });

        test("an own aria-label replaces the labels", () => {
            const wrapper = mount(OSwitch, {
                props: { label: "Visible" },
                attrs: { "aria-label": "Own name" },
            });
            const input = wrapper.find("input");
            expect(input.attributes("aria-label")).toBe("Own name");
            expect(input.attributes("aria-labelledby")).toBeUndefined();
        });
    });
});
