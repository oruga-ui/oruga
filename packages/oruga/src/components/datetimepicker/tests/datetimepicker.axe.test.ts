import { defineComponent, h, nextTick, type VNode } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import ODatetimepicker from "../Datetimepicker.vue";
import type { DatetimepickerProps } from "../props.ts";
import OField from "../../field/Field.vue";

const BrowserPicker = defineComponent(
    (props) => (): VNode =>
        h(
            OField,
            { label: "Datetimepicker" },
            { default: () => h(ODatetimepicker, props) },
        ),
);

describe("ODatetimepicker a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: DatetimepickerProps;
    }[] = [
        {
            title: "axe datetimepicker - base case",
            props: {},
        },
        {
            title: "axe datetimepicker - open popover",
            props: { active: true },
        },
        {
            title: "axe datetimepicker - inline",
            props: { inline: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(BrowserPicker, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
