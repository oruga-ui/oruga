import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { shallowRef } from "vue";

import OSteps from "@/components/steps/Steps.vue";
import OStepItem from "@/components/steps/StepItem.vue";
import OButton from "@/components/button/Button.vue";

describe("OSteps with OStepItem tests", () => {
    enableAutoUnmount(afterEach);

    function genTestcomponent(stepProps, itemProps) {
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
            genTestcomponent(
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

        expect(wrapper.attributes("data-oruga")).toBe("steps");

        const step = wrapper.find('[data-oruga="steps-item"]');
        expect(step.exists()).toBeTruthy();
        expect(step.text()).toBe("ABC");
    });

    test("render item with component prop correctly", () => {
        const wrapper = mount(
            genTestcomponent(
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
});
