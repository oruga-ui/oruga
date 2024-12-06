import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { shallowRef, nextTick } from "vue";

import type { OptionsProp } from "@/composables";

import OSteps from "@/components/steps/Steps.vue";
import OStepItem from "@/components/steps/StepItem.vue";
import OButton from "@/components/button/Button.vue";

describe("OSteps with OStepItem tests", () => {
    enableAutoUnmount(afterEach);

    function createTestcomponent(stepProps, itemProps) {
        return {
            components: {
                OSteps,
                OStepItem,
            },
            data: () => ({ stepProps, itemProps }),
            template: `<OSteps v-bind="stepProps">
                    <OStepItem v-bind="itemProps" />
                  </OSteps>
                `,
        };
    }

    test("test render correctly", () => {
        const wrapper = mount(
            createTestcomponent(
                {},
                {
                    value: "1",
                    step: "1",
                    label: "Account",
                    content: "ABC",
                },
            ),
        );
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.attributes("data-oruga")).toBe("steps");

        const step = wrapper.find('[data-oruga="steps-item"]');
        expect(step.exists()).toBeTruthy();
        expect(step.text()).toBe("ABC");
    });

    test("render item with component prop correctly", () => {
        const wrapper = mount(
            createTestcomponent(
                {},
                {
                    value: "1",
                    step: "1",
                    component: shallowRef(OButton),
                    props: { label: "MyButton" },
                },
            ),
        );

        const step = wrapper.find('[data-oruga="steps-item"]');
        expect(step.exists()).toBeTruthy();
        const button = step.find('[data-oruga="button"]');
        expect(button.text()).toBe("MyButton");
    });

    describe("handle navigation correctly", () => {
        const options: OptionsProp<string> = [
            { label: "Flint", value: "flint", attrs: { clickable: true } },
            {
                label: "Silver",
                value: "silver",
                attrs: { clickable: true },
            },
            { label: "Vane", value: "vane", attrs: { clickable: true } },
            { label: "Billy", value: "billy", attrs: { clickable: true } },
            { label: "Jack", value: "jack", attrs: { clickable: true } },
        ];

        test("render accordingly when item is clicked", async () => {
            let currentIndex = 2;

            const wrapper = mount(OSteps, {
                props: { options, modelValue: options[currentIndex].value },
            });
            await nextTick();

            const navElements = wrapper.findAll(".o-steps__nav-item");
            expect(navElements).toHaveLength(options.length);

            navElements.forEach((el, idx) => {
                expect(el.classes("o-steps__nav-item--previous")).toBe(
                    idx < currentIndex,
                );
                expect(el.classes("o-steps__nav-item--active")).toBe(
                    idx == currentIndex,
                );
                expect(el.classes("o-steps__nav-item--next")).toBe(
                    idx > currentIndex,
                );
            });

            currentIndex = 4;
            let navButton = navElements[currentIndex].find("button");
            expect(navButton.exists()).toBeTruthy();

            await navButton.trigger("click");

            navElements.forEach((el, idx) => {
                expect(el.classes("o-steps__nav-item--previous")).toBe(
                    idx < currentIndex,
                );
                expect(el.classes("o-steps__nav-item--active")).toBe(
                    idx == currentIndex,
                );
                expect(el.classes("o-steps__nav-item--next")).toBe(
                    idx > currentIndex,
                );
            });

            currentIndex = 0;
            navButton = navElements[currentIndex].find("button");
            expect(navButton.exists()).toBeTruthy();

            await navButton.trigger("click");

            navElements.forEach((el, idx) => {
                expect(el.classes("o-steps__nav-item--previous")).toBe(
                    idx < currentIndex,
                );
                expect(el.classes("o-steps__nav-item--active")).toBe(
                    idx == currentIndex,
                );
                expect(el.classes("o-steps__nav-item--next")).toBe(
                    idx > currentIndex,
                );
            });

            expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                [options[4].value],
                [options[0].value],
            ]);

            expect(wrapper.emitted("change")).toStrictEqual([
                [options[4].value, options[2].value],
                [options[0].value, options[4].value],
            ]);
        });

        test("render accordingly when prev is clicked", async () => {
            const currentIndex = 2;

            const wrapper = mount(OSteps, {
                props: { options, modelValue: options[currentIndex].value },
            });
            await nextTick();

            const navigation = wrapper.find(".o-steps__navigation");
            expect(navigation.exists()).toBeTruthy();

            const buttons = navigation.findAll("button");
            expect(buttons).toHaveLength(2);

            // should be undefined because current index is 2
            expect(buttons[0].attributes("disabled")).toBeUndefined();
            expect(buttons[1].attributes("disabled")).toBeUndefined();

            // trigger prev
            await buttons[0].trigger("click");
            // trigger prev
            await buttons[0].trigger("click");

            expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                [options[currentIndex - 1].value],
                [options[currentIndex - 2].value],
            ]);

            expect(wrapper.emitted("change")).toStrictEqual([
                [options[currentIndex - 1].value, options[currentIndex].value],
                [
                    options[currentIndex - 2].value,
                    options[currentIndex - 1].value,
                ],
            ]);
        });

        test("render accordingly when next is clicked", async () => {
            const currentIndex = 0;

            const wrapper = mount(OSteps, {
                props: { options, modelValue: options[currentIndex].value },
            });
            await nextTick();

            const navigation = wrapper.find(".o-steps__navigation");
            expect(navigation.exists()).toBeTruthy();

            const buttons = navigation.findAll("button");
            expect(buttons).toHaveLength(2);

            // should be undefined because current index is 2
            expect(buttons[0].attributes("disabled")).toBe("");
            expect(buttons[1].attributes("disabled")).toBeUndefined();

            // trigger prev
            await buttons[1].trigger("click");
            // trigger prev
            await buttons[1].trigger("click");

            expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                [options[currentIndex + 1].value],
                [options[currentIndex + 2].value],
            ]);

            expect(wrapper.emitted("change")).toStrictEqual([
                [options[currentIndex + 1].value, options[currentIndex].value],
                [
                    options[currentIndex + 2].value,
                    options[currentIndex + 1].value,
                ],
            ]);
        });
    });

    describe("handle options props correctly", () => {
        test("handle options as primitves correctly", async () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(OSteps, { props: { options } });
            await nextTick();

            const navElements = wrapper.findAll(".o-steps__nav-item");
            expect(navElements).toHaveLength(options.length);

            const itemElements = wrapper.findAll('[data-oruga="steps-item"]');
            expect(itemElements).toHaveLength(options.length);

            navElements.forEach((el, idx) => {
                expect(el.text()).toBe(String(options[idx]));
            });
        });

        test("handle options as object correctly", async () => {
            const options: OptionsProp = {
                flint: "Flint",
                silver: "Silver",
                vane: "Vane",
                0: "Zero",
                1: "One",
                2: "Two",
            };

            const wrapper = mount(OSteps, { props: { options } });
            await nextTick();

            const navElements = wrapper.findAll(".o-steps__nav-item");
            expect(navElements).toHaveLength(Object.keys(options).length);

            const optionElements = wrapper.findAll('[data-oruga="steps-item"]');
            expect(optionElements).toHaveLength(Object.keys(options).length);

            navElements.forEach((el, idx) => {
                expect(el.text()).toBe(Object.entries(options)[idx][1]);
            });
        });

        test("handle options as options array correctly", async () => {
            const options: OptionsProp<string | number> = [
                { label: "Flint", value: "flint", attrs: { content: "flint" } },
                {
                    label: "Silver",
                    value: "silver",
                    attrs: { clickable: true, content: "silver" },
                },
                { label: "Vane", value: "vane", attrs: { content: "abc" } },
                { label: "Zero", value: 0, attrs: { content: "x" } },
                {
                    label: "One",
                    value: 1,
                    attrs: { content: "y", disabled: true },
                },
                {
                    label: "Two",
                    value: 2,
                    attrs: { clickable: true, content: "test" },
                },
            ];

            const wrapper = mount(OSteps, { props: { options } });
            await nextTick();

            const navElements = wrapper.findAll(".o-steps__nav-item");
            expect(navElements).toHaveLength(Object.keys(options).length);

            const optionElements = wrapper.findAll('[data-oruga="steps-item"]');
            expect(optionElements).toHaveLength(options.length);

            navElements.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].label);
                const button = el.find("button");
                expect(button.exists()).toBeTruthy();
                expect(button.classes("o-steps__step--clickable")).toBe(
                    options[idx].attrs?.clickable || false,
                );
                expect(button.classes("o-steps__step--disabled")).toBe(
                    options[idx].attrs?.disabled || false,
                );
            });

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].attrs?.content);
            });
        });
    });
});
