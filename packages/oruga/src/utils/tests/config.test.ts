import { describe, test, expect } from "vitest";

import { getOption, getOptions, setOptions } from "../config";

describe("Configuration", () => {
    test("iconPack option should be `fa`", () => {
        const config = getOptions();
        setOptions(Object.assign(config, { iconPack: "fa" }));
        const option = getOption("iconPack");
        expect(option).toBe("fa");
    });

    test("teleportTarget option should be `body`", () => {
        const option = getOption("teleportTarget");
        expect(option).toBe(document.body);
    });
});
