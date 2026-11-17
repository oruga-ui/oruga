import { describe, test, expect, afterEach } from "vitest";
import { page } from "vitest/browser";
import { defineComponent, h, markRaw } from "vue";

import useDialogProgrammatic from "../useDialogProgrammatic";

describe("useDialogProgrammatic", () => {
    const factory = useDialogProgrammatic();

    afterEach(() => factory.closeAll());

    test("show the modal dialog while an async component is resolved", async () => {
        let resolveSetup!: () => void;
        const pending = new Promise<void>((r) => (resolveSetup = r));

        factory.open({
            component: markRaw(
                defineComponent({
                    async setup() {
                        await pending;
                        return () =>
                            h("div", { "data-testid": "content" }, "Content");
                    },
                }),
            ),
        });

        const dialog = document.querySelector("dialog");
        expect(dialog?.hasAttribute("open")).toBe(true);
        await expect
            .element(page.getByTestId("content"))
            .not.toBeInTheDocument();

        resolveSetup();

        await expect.element(page.getByTestId("content")).toBeVisible();
        expect(document.querySelector("dialog")?.matches(":modal")).toBe(true);
    });
});
