import { defineComponent, h, nextTick, type VNode } from "vue";
import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OUpload from "../Upload.vue";
import OField from "../../field/Field.vue";
import type { UploadProps } from "../props.ts";

const TestComponent = defineComponent(
    (props) => (): VNode =>
        h(OField, { label: "Upload" }, { default: () => h(OUpload, props) }),
);

describe("OUpload a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: {
        title: string;
        props?: UploadProps<object, true | false>;
    }[] = [
        { title: "axe upload - base case" },
        { title: "axe upload - disabled", props: { disabled: true } },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TestComponent, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
