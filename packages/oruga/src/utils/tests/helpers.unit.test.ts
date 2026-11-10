import { describe, test, expect } from "vitest";

import { compareValues, resolvePlaceholder, sortBy } from "@/utils/helpers";

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

describe("compareValues", () => {
    test("compare values in the given direction", () => {
        expect(compareValues(1, 2, true)).toBe(-1);
        expect(compareValues(1, 2, false)).toBe(1);
        expect(compareValues("b", "a", true)).toBe(1);
        expect(compareValues(false, true, true)).toBe(-1);
        expect(compareValues(false, true, false)).toBe(1);
    });

    test("treat equal values as equal", () => {
        expect(compareValues(1, 1, true)).toBe(0);
        expect(compareValues(true, true, true)).toBe(0);
        expect(compareValues(false, false, false)).toBe(0);
        expect(compareValues("Anna", "anna", true)).toBe(0);
        expect(compareValues(null, undefined, true)).toBe(0);
        expect(compareValues("", null, false)).toBe(0);
    });

    test("place empty values last in both directions", () => {
        expect(compareValues(null, 1, true)).toBe(1);
        expect(compareValues(null, 1, false)).toBe(1);
        expect(compareValues(1, undefined, true)).toBe(-1);
        expect(compareValues(0, "", false)).toBe(-1);
    });
});

describe("sortBy", () => {
    test("sort by a nested key without mutating the array", () => {
        const array = [{ a: { b: 2 } }, { a: { b: 1 } }, { a: { b: 3 } }];
        const sorted = sortBy(array, "a.b", undefined, true);
        expect(sorted.map((item) => item.a.b)).toStrictEqual([1, 2, 3]);
        expect(array.map((item) => item.a.b)).toStrictEqual([2, 1, 3]);
    });

    test("keep the order of equal values", () => {
        const array = [
            { id: 1, done: true },
            { id: 2, done: false },
            { id: 3, done: true },
            { id: 4, done: false },
        ];
        const sorted = sortBy(array, "done", undefined, true);
        expect(sorted.map((item) => item.id)).toStrictEqual([2, 4, 1, 3]);
    });
});
