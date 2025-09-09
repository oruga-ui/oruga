import { describe, expect, test } from "vitest";

import { render } from "vitest-browser-vue";

import OButton from "../Button.vue";

describe("<Button>", () => {
    test("render button text", async () => {
        const screen = render(OButton, {
            slots: {
                default: () => "Hello World!",
            },
        });
        const button = screen.getByRole("button");
        await expect.element(button).toHaveTextContent("Hello World!");
        await button.click();
        const clicks = screen.emitted("click");
        expect(clicks).toHaveLength(1);
    });
});
