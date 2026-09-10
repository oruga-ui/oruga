import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { h, nextTick } from "vue";

import OField from "../Field.vue";
import OInput from "../../input/Input.vue";
import type { FieldProps } from "../props.ts";

describe("OField a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: FieldProps;
        slots?: Record<string, any>;
    }[] = [
        { title: "axe field - base case", props: { label: "Name" } },
        {
            title: "axe field - grouped",
            props: { label: "Name", grouped: true },
            slots: { default: [h(OInput), "<button>Action</button>"] },
        },
        {
            title: "axe field - nowrap",
            props: { label: "Name", grouped: true, nowrap: true },
            slots: { default: [h(OInput), "<button>Action</button>"] },
        },
        {
            title: "axe field - addons",
            props: { label: "Search", addons: true },
            slots: { default: [h(OInput), "<button>Search</button>"] },
        },
        {
            title: "axe field - message",
            props: { label: "Email", message: "Enter a valid email address" },
            slots: { default: h(OInput, { type: "email" }) },
        },
        {
            title: "axe field - horizontal",
            props: { label: "Name", horizontal: true, message: "Required" },
            slots: { default: h(OInput) },
        },
        {
            title: "axe field - variant",
            props: { label: "Name", variant: "danger" },
            slots: { default: h(OInput) },
        },
    ];

    test.each(a11yCases)("$title", async ({ props, slots }) => {
        const wrapper = mount(OField, {
            props: { ...props },
            slots: slots ?? { default: h(OInput) },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
