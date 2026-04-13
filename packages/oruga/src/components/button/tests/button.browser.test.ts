import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";

import { render } from "vitest-browser-vue";

import OButton from "../Button.vue";

describe("<Button>", () => {
    const tags = ["button", "input", "a", "div"];
    test.each(tags)("render button text with tag '%s'", async (tag) => {
        const screen = render(OButton, {
            props: { tag },
            slots: {
                default: () => "Hello World!",
            },
        });
        const button = screen.getByRole("button");
        await expect.element(button).toHaveTextContent("Hello World!");

        button.element().focus();

        await button.click();
        expect(screen.emitted("click")).toHaveLength(1);

        // keydown.enter
        await userEvent.keyboard("{enter}");
        expect(screen.emitted("click")).toHaveLength(2);

        // keydown.space
        await userEvent.keyboard("{ }");
        expect(screen.emitted("click")).toHaveLength(3);
    });
});
