import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { shallowMount, mount, enableAutoUnmount } from "@vue/test-utils";
import { nextTick } from "vue";

import OInput from "@/components/input/Input.vue";

describe("OInput", () => {
    enableAutoUnmount(afterEach);

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("render correctly", () => {
        const wrapper = mount(OInput);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("input");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-input__wrapper")).toBeTruthy();
    });

    test("test basic", async () => {
        const wrapper = mount(OInput, {
            props: { icon: "placeholder", iconClickable: true },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.classes()).toContain("o-input");

        const value = "some value";
        await input.setValue(value);
        await vi.runAllTimers(); // await debounce timer

        expect(wrapper.emitted("input")).toHaveLength(1);
        expect(wrapper.emitted("update:model-value")).toHaveLength(1);
        expect(wrapper.vm.value).toEqual(value);
    });

    test("render textarea element when type is textarea", () => {
        const wrapper = mount(OInput, { props: { type: "textarea" } });

        const input = wrapper.find("textarea");
        expect(input.exists()).toBeTruthy();
        expect(input.classes()).toContain("o-input");
        expect(input.attributes().style).toBeFalsy();
    });

    test("add inline style and call resize for textarea when autosize is true", async () => {
        const wrapper = mount(OInput, {
            props: { type: "textarea", autosize: true },
        });

        const target = wrapper.find("textarea");
        const style = target.attributes("style");
        expect(!!style).toBeTruthy();

        await target.setValue("test2");
        expect(target.attributes("style") == style).toBeFalsy();

        expect(target.element.style.height).toContain("px");
    });

    test("render field password when the type property is password", () => {
        const wrapper = shallowMount(OInput, {
            props: { type: "password", passwordReveal: true },
        });

        const target = wrapper.find("input");
        expect(target.exists()).toBeTruthy();
        expect(target.attributes("type")).toBe("password");

        const icon = wrapper.find("o-icon-stub");
        expect(icon.exists()).toBeTruthy();
        expect(icon.classes("o-input__icon-right")).toBeTruthy();
    });

    test("toggles the visibility of the password to true when the togglePasswordVisibility method is called", async () => {
        const wrapper = mount(OInput, {
            props: {
                modelValue: "foo",
                type: "password",
                passwordReveal: true,
                iconRightClickable: true,
            },
        });

        const target = wrapper.find("input");
        expect(target).toBeTruthy();
        await target.setValue("bar");

        expect(target.element.type).toBe("password");

        const icon = wrapper.find("[data-oruga='icon']");
        expect(icon.exists()).toBeTruthy();
        expect(icon.classes("o-icon--clickable")).toBeTruthy();
        expect(icon.find(".mdi-eye").exists()).toBeTruthy();

        await icon.trigger("click");
        expect(wrapper.emitted("icon-right-click")).toHaveLength(1);

        expect(target.element.type).toBe("text");
        expect(target.attributes().type).toBe("text");
        expect(icon.find(".mdi-eye-off").exists()).toBeTruthy();
    });

    test("icon clickable", async () => {
        const wrapper = mount(OInput, {
            props: { icon: "foo", iconClickable: true },
        });

        const icon = wrapper.find("[data-oruga='icon']");
        expect(icon.exists()).toBeTruthy();
        expect(icon.classes("o-icon--clickable")).toBeTruthy();
        expect(icon.find(".mdi-foo").exists()).toBeTruthy();

        await icon.trigger("click");
        expect(wrapper.emitted("icon-click")).toHaveLength(1);
    });

    test("render the placeholder and readonly attribute when passed", () => {
        const wrapper = shallowMount(OInput, {
            props: { placeholder: "Awesome!", readonly: true },
        });

        const target = wrapper.find("input");
        expect(target.element.getAttribute("placeholder")).toBe("Awesome!");
        expect(target.attributes("readonly")).toBe("");
    });

    test("expands input when expanded property is passed", async () => {
        const wrapper = mount(OInput, { props: { expanded: true } });

        expect(wrapper.classes()).toContain("o-input__wrapper--expanded");
    });

    test("keep its value on blur", async () => {
        const wrapper = mount(OInput, {
            props: {
                modelValue: "foo",
                "onUpdate:modelValue": (modelValue) =>
                    wrapper.setProps({ modelValue }),
            },
        });

        const input = wrapper.find("input");
        expect(input.element.value).toBe("foo");

        await input.setValue("bar");
        await input.trigger("blur");
        await vi.runAllTimers(); // await debounce timer

        const emits = wrapper.emitted("input");
        expect(emits).toHaveLength(1);
        expect(emits![0][0]).toBe("bar");
        expect(wrapper.emitted("blur")).toHaveLength(1);
        expect(wrapper.emitted("update:model-value")).toHaveLength(1);
        expect(wrapper.emitted("update:model-value")![0][0]).toBe("bar");
        expect(wrapper.props("modelValue")).toBe("bar");
    });

    test("manage the click on icon", async () => {
        const wrapper = mount(OInput, {
            props: { icon: "magnify", iconClickable: true },
        });

        expect(wrapper.find("input").exists()).toBeTruthy();

        const visibilityIcon = wrapper.find(".o-icon--clickable");
        expect(visibilityIcon.exists()).toBeTruthy();

        await visibilityIcon.trigger("click");
        expect(wrapper.emitted("icon-click")).toHaveLength(1);
    });

    test("check type number ", async () => {
        const wrapper = shallowMount(OInput, {
            props: {
                type: "number",
                min: 0,
                max: 1000,
                modelValue: 10,
                number: true,
            },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.element.value).toBe("10");

        await input.setValue(11);
        expect(input.element.value).toBe("11");
        await input.setValue(12);
        expect(input.element.value).toBe("12");
        await input.setValue(13);
        expect(input.element.value).toBe("13");
        await input.setValue(12);
        expect(input.element.value).toBe("12");
        await input.setValue(11);
        expect(input.element.value).toBe("11");

        const emitted = wrapper.emitted("update:model-value");

        expect(emitted).toEqual([[11], [12], [13], [12], [11]]);
    });

    test("react accordingly when method focus() is called", async () => {
        const wrapper = mount(OInput);

        const input = wrapper.find("input");
        input.element.focus = vi.fn();

        wrapper.vm.focus();
        await nextTick(() => {
            expect(input.element.focus).toHaveBeenCalled();
        });
    });
});
