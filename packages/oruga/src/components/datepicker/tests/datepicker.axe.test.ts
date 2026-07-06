import { defineComponent, h, nextTick, type VNode } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import ODatepicker from "../Datepicker.vue";
import type { DatepickerProps } from "../props";
import OField from "../../field/Field.vue";

const TestComponent = defineComponent(
    (props) => (): VNode =>
        h(
            OField,
            { label: "Datepicker" },
            { default: () => h(ODatepicker, props) },
        ),
);

describe("ODatepicker a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: DatepickerProps<true | false, true | false>;
    }[] = [
        {
            title: "axe datepicker - base case",
            props: {},
        },
        {
            title: "axe datepicker - open popover",
            props: { active: true },
        },
        {
            title: "axe datepicker - inline",
            props: { inline: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TestComponent, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
