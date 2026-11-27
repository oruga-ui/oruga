import { describe, test, expect } from "vitest";

import { resolvePlaceholder } from "@/utils/helpers";

describe("resolvePlaceholder", () => {
    test("replace the value placeholder", () => {
        expect(resolvePlaceholder("Check {value}", "row 1")).toBe(
            "Check row 1",
        );
        expect(resolvePlaceholder("Slide {value}", 2)).toBe("Slide 2");
        expect(resolvePlaceholder("{value} - {value}", "a")).toBe("a - a");
    });

    test("keep a string without placeholder", () => {
        expect(resolvePlaceholder("Plain", "x")).toBe("Plain");
        expect(resolvePlaceholder("Go {where}", "x")).toBe("Go {where}");
    });

    test("call a function with the value", () => {
        expect(resolvePlaceholder((value) => `Slide ${value}`, 2)).toBe(
            "Slide 2",
        );
    });

    test("return an undefined label unchanged", () => {
        expect(resolvePlaceholder(undefined, "x")).toBeUndefined();
    });
});
