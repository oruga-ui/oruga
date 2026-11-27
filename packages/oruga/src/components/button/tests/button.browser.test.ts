import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";

import { render } from "vitest-browser-vue";

import OButton from "../Button.vue";

describe("<Button>", () => {
    const tags = ["button", "input", "div"];
    test.each(tags)("render button text with tag '%s'", async (tag) => {
        const screen = await render(OButton, {
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

    test("render a link with tag 'a'", async () => {
        const screen = await render(OButton, {
            // a hash link does not navigate away from the test page
            props: { tag: "a", href: "#" },
            slots: {
                default: () => "Hello World!",
            },
        });
        // a link is not announced as a button
        const link = screen.getByRole("link");
        await expect.element(link).toHaveTextContent("Hello World!");

        link.element().focus();

        await link.click();
        expect(screen.emitted("click")).toHaveLength(1);

        await userEvent.keyboard("{enter}");
        expect(screen.emitted("click")).toHaveLength(2);

        // space activates the link like a button instead of scrolling the page
        await userEvent.keyboard("{ }");
        expect(screen.emitted("click")).toHaveLength(3);
    });

    test("expect disabled link to not emit click", async () => {
        const screen = await render(OButton, {
            props: { tag: "a", href: "#", disabled: true },
            slots: {
                default: () => "Hello World!",
            },
        });
        const link = screen.getByRole("link");
        await expect.element(link).toHaveAttribute("aria-disabled", "true");
        await expect.element(link).toHaveAttribute("tabindex", "-1");

        await link.click({ force: true });
        link.element().focus();
        await userEvent.keyboard("{enter}");
        expect(screen.emitted("click")).toBeUndefined();
    });
});
