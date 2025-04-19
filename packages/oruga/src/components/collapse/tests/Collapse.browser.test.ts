import { describe, expect, test } from "vitest";

import { render } from "vitest-browser-vue";

import SimpleCollapse from "./SimpleCollapse.vue";

describe("<Collapse>", () => {
    test("works", async () => {
        const screen = render(SimpleCollapse);
        const firstContent = screen.getByTestId("content-0");
        await expect.element(firstContent).toBeVisible();
        const secondContent = screen.getByTestId("content-1");
        await expect.element(secondContent).not.toBeVisible();
        const second = screen.getByTestId("collapse-1");
        const trigger = second.getByRole("button");
        await trigger.click();
        await expect.element(firstContent).not.toBeVisible();
        await expect.element(secondContent).toBeVisible();
    });
});
