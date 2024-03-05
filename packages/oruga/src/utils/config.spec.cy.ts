import { describe, it, expect } from "vitest";

import { getOptions, setOptions } from "./config";

describe("Configuration", () => {
    it("iconPack option should be `fa`", () => {
        const config = getOptions();
        setOptions(Object.assign(config, { iconPack: "fa" }));
        expect(config.iconPack).to.be.equal("fa");
    });
});
