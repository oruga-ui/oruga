import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-vue";
import { userEvent } from "vitest/browser";

import OPopover from "@/components/popover/Popover.vue";

describe("<Popover>", () => {
    const renderComponent = () =>
        render(OPopover, {
            slots: {
                content:
                    '<div data-testid="content">Lorem ipsum dolor sit amet.</div>',
                default: '<button data-testid="trigger">trigger</button>',
            },
        });

    test("open on click", async () => {
        const screen = renderComponent();
        await new Promise((r) => setTimeout(r, 100)); // await event handler get set

        const trigger = screen.getByTestId("trigger");
        await expect.element(trigger).toBeVisible();

        let content = screen.getByTestId("content");
        await expect.element(content).not.toBeVisible();

        await trigger.click();

        content = screen.getByTestId("content");
        await expect.element(content).toBeVisible();

        await screen.unmount();
    });

    test("do not open on hover or fucus", async () => {
        const screen = renderComponent();
        await new Promise((r) => setTimeout(r, 100)); // await event handler get set

        const trigger = screen.getByTestId("trigger");
        await expect.element(trigger).toBeVisible();

        let content = screen.getByTestId("content");
        await expect.element(content).not.toBeVisible();

        // check do not open on hover
        await trigger.hover();

        content = screen.getByTestId("content");
        await expect.element(content).not.toBeVisible();

        // check do not open on focus
        trigger.element().focus();
        await new Promise((r) => setTimeout(r, 10)); // await event handler get set

        content = screen.getByTestId("content");
        await expect.element(content).not.toBeVisible();

        // check do not open on right click
        trigger.element().dispatchEvent(new MouseEvent("contextmenu"));
        await new Promise((r) => setTimeout(r, 10)); // await event handler get set

        content = screen.getByTestId("content");
        await expect.element(content).not.toBeVisible();

        await screen.unmount();
    });

    test("close on escape", async () => {
        const screen = renderComponent();
        await new Promise((r) => setTimeout(r, 100)); // await event handler get set

        const trigger = screen.getByTestId("trigger");
        await expect.element(trigger).toBeVisible();
        await trigger.click();

        let content = screen.getByTestId("content");
        await expect.element(content).toBeVisible();

        await userEvent.keyboard("{Escape}");
        await new Promise((r) => setTimeout(r, 10)); // await event handler get set

        content = screen.getByTestId("content");
        await expect.element(content).not.toBeVisible();

        await screen.unmount();
    });

    test("close on click outside", async () => {
        const screen = renderComponent();
        await new Promise((r) => setTimeout(r, 100)); // await event handler get set

        const trigger = screen.getByTestId("trigger");
        await expect.element(trigger).toBeVisible();
        await trigger.click();

        let content = screen.getByTestId("content");
        await expect.element(content).toBeVisible();

        await userEvent.click(screen.baseElement);
        await new Promise((r) => setTimeout(r, 10)); // await event handler get set

        content = screen.getByTestId("content");
        await expect.element(content).not.toBeVisible();

        await screen.unmount();
    });
});
