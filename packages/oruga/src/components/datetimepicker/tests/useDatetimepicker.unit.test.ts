import { describe, expect, test, vi } from "vitest";

import { parseDatetimeInput, useDatetimepicker } from "../useDatetimepicker";

describe("Datetimepicker helpers", () => {
    test("parses localized date and time values", () => {
        vi.restoreAllMocks();
        const formatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hourCycle: "h12",
        });
        const expected = new Date(2024, 3, 10, 13, 35);

        const parsed = parseDatetimeInput(formatter.format(expected), {
            formatter,
            amString: "AM",
            pmString: "PM",
            locale: "en-US",
            sampleDate: () => new Date(2024, 0, 1, 10),
        });

        expect(parsed).toBeInstanceOf(Date);
        expect([
            parsed?.getFullYear(),
            parsed?.getMonth(),
            parsed?.getDate(),
            parsed?.getHours(),
            parsed?.getMinutes(),
        ]).toStrictEqual([2024, 3, 10, 13, 35]);

        const midnight = parseDatetimeInput(
            formatter.format(new Date(2024, 3, 10, 0, 15)),
            {
                formatter,
                amString: "AM",
                pmString: "PM",
                locale: "en-US",
                sampleDate: () => new Date(2024, 0, 1, 10),
            },
        );
        const noon = parseDatetimeInput(
            formatter.format(new Date(2024, 3, 10, 12, 15)),
            {
                formatter,
                amString: "AM",
                pmString: "PM",
                locale: "en-US",
                sampleDate: () => new Date(2024, 0, 1, 10),
            },
        );
        expect([midnight?.getHours(), noon?.getHours()]).toStrictEqual([0, 12]);
    });

    test("returns undefined for empty input", () => {
        const formatter = new Intl.DateTimeFormat("en-US");
        expect(
            parseDatetimeInput("", {
                formatter,
                amString: "AM",
                pmString: "PM",
                sampleDate: () => new Date(2024, 0, 1, 10),
            }),
        ).toBeUndefined();
    });

    test("formats and parses through the datetimepicker composable", () => {
        const creator = new Date(2024, 0, 1, 10);
        const datetimepicker = useDatetimepicker({
            locale: "en-US",
            creator: () => new Date(creator),
            timepicker: { hourFormat: "24" },
        });
        const value = new Date(2024, 3, 10, 13, 35);
        const formatted = datetimepicker.datetimeFormatter(value);
        const parsed = datetimepicker.datetimeParser(formatted);

        expect(datetimepicker.datetimeCreator()).toStrictEqual(creator);
        expect(parsed).toBeInstanceOf(Date);
        expect([
            parsed?.getFullYear(),
            parsed?.getMonth(),
            parsed?.getDate(),
            parsed?.getHours(),
            parsed?.getMinutes(),
        ]).toStrictEqual([2024, 3, 10, 13, 35]);
    });
});
