import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("Oruga Nuxt module", async () => {
    await setup({
        rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
    });

    test("auto-imports components and initializes Oruga with configured options", async () => {
        const html = await $fetch("/");

        expect(html).toContain("Oruga works");
        expect(html).toContain("Type here");
        expect(html).toContain('id="oruga-config">test-pack|en-US|body</p>');
        expect(html).toContain('id="programmatic-apis">true</p>');
    });
});
