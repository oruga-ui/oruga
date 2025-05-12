/* eslint-disable vue/one-component-per-file */

import {
    userEvent,
    type Locator,
    type LocatorSelectors,
} from "@vitest/browser/context";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";

import { defineComponent, h, ref, type PropType, type VNode } from "vue";

import OButton from "@/components/button/Button.vue";
import OInput from "@/components/input/Input.vue";
import OField from "@/components/field/Field.vue";

type CustomValidityCallback = (
    currentValue: string | number | null | undefined,
    state: ValidityState,
) => string;
const NativeForm = defineComponent({
    name: "NativeForm",
    props: {
        customValidity: {
            type: [String, Function] as PropType<
                string | CustomValidityCallback
            >,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup: (props) => {
        const value = ref("");
        const onInput = (e: string): void => {
            value.value = e;
        };
        return (): VNode =>
            h("form", { onSubmit: () => false }, [
                h(OField, { "data-testid": "field" }, () => [
                    h(OInput, {
                        customValidity: props.customValidity,
                        disabled: props.disabled,
                        modelValue: value.value,
                        required: true,
                        onInput,
                    }),
                ]),
                h(OButton, { type: "submit" }, () => "Submit"),
            ]);
    },
});

const findMessage = (screen: LocatorSelectors): Locator => {
    return screen.getByTestId("field").getByRole("paragraph");
};

const inside = (
    containerStart: number,
    containerEnd: number,
    elementStart: number,
    elementEnd: number,
): boolean => {
    return (
        (elementStart >= containerStart && elementStart < containerEnd) ||
        (elementEnd > containerStart && elementEnd <= containerEnd) ||
        (elementStart <= containerStart && elementEnd >= containerEnd)
    );
};
const visibleWithin = (parent: Element, child: Element): boolean => {
    const parentBB = parent.getBoundingClientRect();
    const childBB = child.getBoundingClientRect();
    return (
        inside(parentBB.left, parentBB.right, childBB.left, childBB.right) &&
        inside(parentBB.top, parentBB.bottom, childBB.top, childBB.bottom)
    );
};

describe("useInputHandler", () => {
    test("shows validation message on blur", async () => {
        const screen = render(NativeForm);
        const input = screen.getByRole("textbox");
        const message = findMessage(screen);
        await expect.element(message).not.toBeInTheDocument();
        await input.click();
        await userEvent.keyboard("{Tab}");
        await expect.element(message).toBeInTheDocument();
    });

    test("shows validation message on submit", async () => {
        const Spacer = (): VNode => h("div", { style: "height: 40em" });
        const ScrollingForm = (): VNode =>
            h(
                "form",
                {
                    "data-testid": "form",
                    style: "max-height: 4em; overflow-y: scroll;",
                    onSubmit: () => false,
                },
                [
                    h(OField, { "data-testid": "disabled-field" }, () => [
                        h(OInput, { disabled: true, required: true }),
                    ]),
                    h(Spacer),
                    h(OField, { "data-testid": "field" }, () => [
                        h(OInput, { required: true }),
                    ]),
                    h(Spacer),
                    h(OButton, { type: "submit" }, () => "Submit"),
                ],
            );

        const screen = render(ScrollingForm);
        const message = findMessage(screen);
        await expect.element(message).not.toBeInTheDocument();

        const submit = screen.getByRole("button");
        await submit.click();
        await expect.element(message).toBeInTheDocument();

        // Test that we focused and scrolled to the right element.
        const form = screen.getByTestId("form").element();
        const mainInput = screen.getByTestId("field").getByRole("textbox");
        await expect.element(mainInput).toHaveFocus();
        await expect
            .poll(() => visibleWithin(form, message.element()))
            .toBeTruthy();
        const disabledInput = screen
            .getByTestId("disabled-field")
            .getByRole("textbox");
        await expect
            .poll(() => visibleWithin(form, disabledInput.element()))
            .toBeFalsy();
    });

    test("hides validation message on input change", async () => {
        const screen = render(NativeForm);
        const input = screen.getByRole("textbox");
        await input.click();
        await userEvent.keyboard("{Tab}");
        const message = findMessage(screen);
        await expect.element(message).toBeInTheDocument();
        await input.click();
        await userEvent.keyboard("test");
        await expect.element(message).not.toBeInTheDocument();
    });

    test("does not overwrite parent component's message", async () => {
        const FormWithParentMessage = defineComponent({
            name: "FormWithParentMessage",
            render: () =>
                h(
                    OField,
                    {
                        "data-testid": "field",
                        message: "Override message",
                    },
                    () => [h(OInput, { required: true })],
                ),
        });

        const screen = render(FormWithParentMessage);
        const input = screen.getByRole("textbox");
        await input.click();
        await userEvent.keyboard("{Tab}");
        const message = findMessage(screen);
        await expect.element(message).toHaveTextContent("Override message");
    });

    test("sets custom message", async () => {
        const screen = render(() =>
            h(NativeForm, {
                customValidity: "Override message",
            }),
        );
        const input = screen.getByRole("textbox");
        await input.click();
        await userEvent.keyboard("{Tab}");
        const message = findMessage(screen);
        await expect.element(message).toHaveTextContent("Override message");
    });

    test("overrides native validation message", async () => {
        const screen = render(() =>
            h(NativeForm, {
                customValidity: (_, validity) =>
                    validity.valueMissing ? "Override message" : "",
            }),
        );
        const input = screen.getByRole("textbox");
        await input.click();
        await userEvent.keyboard("{Tab}");
        const message = findMessage(screen);
        await expect.element(message).toHaveTextContent("Override message");
        await input.click();
        await userEvent.keyboard("test");
        await expect.element(message).not.toBeInTheDocument();
    });
});
