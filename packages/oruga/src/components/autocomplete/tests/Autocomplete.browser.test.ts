import { describe, expect, test } from "vitest";

import { render } from "vitest-browser-vue";
import { userEvent } from "@vitest/browser/context";

import SimpleAutocomplete from "./SimpleAutocomplete.vue";

describe("<Autocomplete>", () => {
    test("works", async () => {
        const screen = render(SimpleAutocomplete);
        const input = screen.getByRole("textbox");
        await input.click();
        await expect.element(input).toHaveFocus();
        await userEvent.keyboard("j");
        const dropdown = screen.getByRole("listbox");
        await expect.element(dropdown).toBeVisible();
        await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
        await expect.element(input).toHaveValue("Node.js");
    });
});
