import { defineComponent, h } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import ODatepicker from "../Datepicker.vue";
import type { DatepickerProps } from "../props";
import OField from "../../field/Field.vue";

const TestComponent = defineComponent(
    (props) => () =>
        h(
            OField,
            { label: "My Input" },
            {
                default: () => h(ODatepicker, props),
            },
        ),
);

describe("ODatepicker axe tests", () => {
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
        await setTimeout(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
