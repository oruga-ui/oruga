import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OField from "@/components/field/Field.vue";
import OInput from "@/components/input/Input.vue";

describe("OField tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OField);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("field");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-field")).toBeTruthy();
    });

    test('react accordingly when "variant" prop is changed dynamically', async () => {
        const variant = "danger";
        const wrapper = mount(OField, {
            props: { variant },
            slots: { default: [OInput] },
        });
        const input = wrapper.find('[data-oruga="input"]');
        expect(input.exists()).toBeTruthy();
        expect(input.find(".o-icon").classes()).toContain("o-icon--danger");
    });

    describe("managing message prop", () => {
        test('react accordingly when "message" prop is passed', () => {
            const message = "Some string message";
            const wrapper = mount(OField, {
                props: { message },
                slots: { default: [OInput] },
            });
            const messageDiv = wrapper.find(".o-field__message");
            expect(messageDiv.exists()).toBeTruthy();
            expect(messageDiv.text()).toEqual(message);
        });

        test('react accordingly when "messageTag" prop is passed', () => {
            const message = "Some string message";
            const messageTag = "a";
            const wrapper = mount(OField, {
                props: { message, messageTag },
                slots: { default: [OInput] },
            });
            const messageDiv = wrapper.find(messageTag + ".o-field__message");
            expect(messageDiv.exists()).toBeTruthy();
            expect(messageDiv.text()).toEqual(message);
        });

        test('react accordingly when "message" prop is changed dynamically', async () => {
            const message = "Some string message";
            const wrapper = mount(OField, {
                slots: { default: [OInput] },
            });

            await wrapper.setProps({ message });

            const messageDiv = wrapper.find(".o-field__message");
            expect(messageDiv.exists()).toBeTruthy();
            expect(messageDiv.text()).toEqual(message);
        });

        test('react accordingly when "message" is array', async () => {
            const message = ["Selected option is wrong", "Option is required"];
            const wrapper = mount(OField, {
                props: { message },
                slots: { default: [OInput] },
            });

            const messageDiv = wrapper.find(".o-field__message");
            expect(messageDiv.exists()).toBeTruthy();
            const messages = messageDiv.findAll("div");
            expect(message).toHaveLength(2);
            message.forEach((m, idx) => {
                expect(messages[idx].text()).toEqual(m);
            });
        });
    });

    describe("managing group prop", () => {
        test('react accordingly when "grouped" prop is set', () => {
            const wrapper = mount(OField, {
                props: { grouped: true },
                slots: {
                    default: [OInput, '<button class="button">Button</button>'],
                },
            });

            const body = wrapper.find(".o-field__body");
            expect(body.exists()).toBeTruthy();
            const innerField = body.find(".o-field");
            expect(innerField.classes()).toContain("o-field--grouped");
        });

        test('react accordingly when "multiline" prop is set', () => {
            const wrapper = mount(OField, {
                props: { multiline: true },
                slots: {
                    default: [OInput, '<button class="button">Button</button>'],
                },
            });

            const body = wrapper.find(".o-field__body");
            expect(body.exists()).toBeTruthy();
            const innerField = body.find(".o-field");
            expect(innerField.classes()).toContain("o-field--multiline");
        });
    });

    describe("managing label prop", () => {
        test('react accordingly when "label" prop is passed', () => {
            const label = "Some label";
            const wrapper = mount(OField, {
                props: { label },
                slots: {
                    default: [OInput, '<button class="button">Button</button>'],
                },
                attachTo: document.body,
            });
            const labelDiv = wrapper.find("label");
            expect(labelDiv.exists()).toBeTruthy();
            expect(labelDiv.isVisible()).toBeTruthy();
        });
    });

    describe("managing default slot ", () => {
        test("react accordingly when child is a text", () => {
            const text = "text";
            const wrapper = mount(OField, {
                slots: { default: text },
            });
            expect(wrapper.text()).toBe(text);
        });
    });

    describe("managing horizontal prop ", () => {
        test('react accordingly when "grouped" prop is set', () => {
            const wrapper = mount(OField, {
                props: { grouped: true, horizontal: true },
                slots: {
                    default: [OInput, '<button class="button">Button</button>'],
                },
            });

            const body = wrapper.find(".o-field__horizontal-body");
            expect(body.exists()).toBeTruthy();
            const innerField = body.find(".o-field");
            expect(innerField.classes()).not.toContain("o-field--grouped");
        });

        test('react accordingly when "groupMultiline" prop is set', () => {
            const wrapper = mount(OField, {
                props: { groupMultiline: true, horizontal: true },
                slots: {
                    default: [OInput, '<button class="button">Button</button>'],
                },
            });

            const body = wrapper.find(".o-field__horizontal-body");
            expect(body.exists()).toBeTruthy();
            const innerField = body.find(".o-field");
            expect(innerField.classes()).not.toContain(
                "o-field--grouped-multiline",
            );
        });

        test('react accordingly when "message" prop is set', () => {
            const message = "Some string message";
            const wrapper = mount(OField, {
                props: { message, horizontal: true },
                slots: {
                    default: [OInput, '<button class="button">Button</button>'],
                },
            });

            const messages = wrapper.findAll(".o-field__message");
            expect(messages.length).toBe(1);
            expect(messages[0].text()).toBe(message);
        });
    });
});
