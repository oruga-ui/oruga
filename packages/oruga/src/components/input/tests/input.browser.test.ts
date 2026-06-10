import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-vue";

import { defineComponent, h, nextTick } from "vue";

import OInput from "../Input.vue";
import OField from "../../field/Field.vue";

const BrowserInput = defineComponent(
    () => () =>
        h(
            OField,
            { label: "My Input" },
            {
                default: () =>
                    h(OInput, {
                        placeholder: "e.g. jQuery",
                        icon: "search",
                        clearable: true,
                    }),
            },
        ),
);

describe("<Input>", () => {
    test("works", async () => {
        const screen = render(BrowserInput);
        const input = screen.container.querySelector("input");
        expect(input).toBeTruthy();
        await userEvent.click(input!);
        await expect.element(input).toHaveFocus();
        await userEvent.keyboard("j");
        screen.unmount();
    });

    test("does resize correctly when textarea is hidden at mount time", async () => {
        const HiddenTextarea = defineComponent(
            () => () =>
                h(
                    "div",
                    {
                        id: "hidden-container",
                        style: "display: none;",
                    },
                    [
                        h(OInput, {
                            type: "textarea",
                            autosize: true,
                            modelValue: "test content",
                        }),
                    ],
                ),
        );

        const screen = render(HiddenTextarea);
        await nextTick();

        const textarea = screen.container.querySelector("textarea");
        expect(textarea).toBeTruthy();

        // When mounted in a hidden container, scrollHeight is 0 and the textarea height stays 0px
        expect(textarea!.scrollHeight).toBe(0);
        expect(textarea!.style.height).toBe("auto");

        const hiddenContainer =
            screen.container.querySelector("#hidden-container");
        expect(hiddenContainer).toBeTruthy();
        hiddenContainer!.setAttribute("style", "display: block;");

        await new Promise((r) => setTimeout(r, 200)); // await async resize observer is run

        expect(textarea!.style.height).not.toBe("0px");
        expect(textarea!.scrollHeight).toBeGreaterThan(0);
        expect(parseInt(textarea!.style.height)).toBeGreaterThan(0);

        screen.unmount();
    });
});
