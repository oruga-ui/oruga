import { defineComponent, h } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import OTimepicker from "../Timepicker.vue";
import type { TimepickerProps } from "../props.ts";
import OField from "../../field/Field.vue";

const TestComponent = defineComponent(
    (props) => () =>
        h(
            OField,
            { label: "My Input" },
            {
                default: () => h(OTimepicker, props),
            },
        ),
);

describe("OTimepicker a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: TimepickerProps;
    }[] = [
        {
            title: "axe timepicker - base case",
            props: {},
        },
        {
            title: "axe timepicker - open popover",
            props: { active: true },
        },
        {
            title: "axe timepicker - inline",
            props: { inline: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TestComponent, {
            props: { ...props },
            attachTo: document.body,
        });
        await setTimeout(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
