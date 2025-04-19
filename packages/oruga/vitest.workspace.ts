import { defineWorkspace } from "vitest/config";

const browserTestPattern = "src/**/*.browser.test.{ts,js}";

export default defineWorkspace([
    {
        extends: "vite.config.js",
        test: {
            exclude: [browserTestPattern],
        },
    },
    {
        extends: "vite.config.js",
        test: {
            include: [browserTestPattern],
            name: "oruga-browser",
            browser: {
                enabled: true,
                provider: "playwright",
                instances: [
                    {
                        browser: "chromium",
                    },
                ],
            },
        },
    },
]);
