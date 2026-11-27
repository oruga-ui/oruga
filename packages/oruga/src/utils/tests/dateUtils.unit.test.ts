import { describe, expect, test } from "vitest";

import {
    daysInYear,
    firstWeekOffset,
    getMonthNames,
    getWeekdayNames,
    matchWithGroups,
    weekBuilder,
    weeksInYear,
} from "../dateUtils";

describe("date utilities", () => {
    test("returns localized month and weekday names", () => {
        expect(getMonthNames("en-US", "long")).toHaveLength(12);
        expect(getMonthNames("en-US", "long")[0]).toBe("January");

        const weekdays = getWeekdayNames("en-US", 1, "long");
        expect(weekdays).toHaveLength(7);
        expect(weekdays[0]).toBe("Monday");
    });

    test("builds a week beginning on the configured weekday", () => {
        const week = weekBuilder(1, 0, 2023, 1);

        expect(
            week.map((date) => [
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
            ]),
        ).toStrictEqual([
            [2022, 11, 26],
            [2022, 11, 27],
            [2022, 11, 28],
            [2022, 11, 29],
            [2022, 11, 30],
            [2022, 11, 31],
            [2023, 0, 1],
        ]);
    });

    test("calculates leap years and locale week counts", () => {
        expect(daysInYear(2000)).toBe(366);
        expect(daysInYear(1900)).toBe(365);
        expect(daysInYear(2024)).toBe(366);
        expect(firstWeekOffset(2021, 1, 4)).toBe(3);
        expect(weeksInYear(2020, 1, 4)).toBe(53);
        expect(weeksInYear(2021, 1, 4)).toBe(52);
    });

    test("returns captures using the format markers", () => {
        expect(
            matchWithGroups("((?!=<year>)\\d+)-((?!=<month>)\\d+)", "2024-06"),
        ).toStrictEqual({ year: "2024", month: "06" });
    });
});
