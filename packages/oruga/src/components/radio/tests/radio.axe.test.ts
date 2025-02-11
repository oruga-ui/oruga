import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import ORadio from "../Radio.vue";

describe("OCheckbox axe tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases = [
        {
            title: "axe radio - base case",
            props: { label: "Switch Label" },
        },
        {
            title: "axe radio - id case",
            props: { label: "Checkbox Label", id: "my-id" },
        },
        {
            title: "axe radio - variant case",
            props: { label: "Checkbox Label", variant: "success" },
        },
        {
            title: "axe radio - size case",
            props: { label: "Checkbox Label", size: "large" },
        },
        {
            title: "axe radio - required case",
            props: { label: "Checkbox Label", required: true },
        },
        {
            title: "axe radio - disabled case",
            props: { label: "Checkbox Label", disabled: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(ORadio, {
            props: { ...props },
            attachTo: document.body,
        });

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
