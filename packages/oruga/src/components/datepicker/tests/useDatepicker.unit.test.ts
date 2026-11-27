import { describe, expect, test } from "vitest";

import {
    isDateSelectable,
    parseDateInput,
    useDatepicker,
} from "../useDatepicker";

describe("Datepicker helpers", () => {
    test("checks date bounds, nearby months, and weekday constraints", () => {
        const options = {
            minDate: new Date(2024, 0, 10),
            maxDate: new Date(2024, 0, 20),
            nearbyMonthDays: true,
            nearbySelectableMonthDays: false,
            unselectableDaysOfWeek: [1],
        };

        expect(isDateSelectable(options, new Date(2024, 0, 16), 0)).toBe(true);
        expect(isDateSelectable(options, new Date(2024, 0, 8), 0)).toBe(false);
        expect(isDateSelectable(options, new Date(2024, 0, 15), 0)).toBe(false);
        expect(isDateSelectable(options, new Date(2024, 1, 16), 0)).toBe(false);
    });

    test("matches selectable dates at month granularity in month view", () => {
        const options = {
            type: "month" as const,
            selectableDates: [new Date(2024, 0, 15)],
            unselectableDates: [new Date(2024, 1, 20)],
        };

        expect(isDateSelectable(options, new Date(2024, 0, 1), 0, 2024)).toBe(
            true,
        );
        expect(isDateSelectable(options, new Date(2024, 0, 1), 0, 2025)).toBe(
            false,
        );
        expect(
            isDateSelectable(
                {
                    type: "month" as const,
                    unselectableDates: [new Date(2024, 1, 20)],
                },
                new Date(2024, 1, 1),
                1,
                2024,
            ),
        ).toBe(false);
    });

    test("supports date lists and selectability callbacks", () => {
        const date = new Date(2024, 0, 16);
        const options = {
            selectableDates: [date],
        };
        expect(isDateSelectable(options, date, 0)).toBe(true);
        expect(isDateSelectable(options, new Date(2024, 0, 17), 0)).toBe(false);
        expect(isDateSelectable({ unselectableDates: [date] }, date, 0)).toBe(
            false,
        );
        expect(
            isDateSelectable(
                {
                    unselectableDates: (candidate: Date) =>
                        candidate.getDate() === 16,
                },
                date,
                0,
            ),
        ).toBe(false);
        expect(
            isDateSelectable(
                { selectableDates: (candidate: Date) => candidate === date },
                date,
                0,
            ),
        ).toBe(true);
    });

    test("parses localized dates and multiple values", () => {
        const formatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
        const options = {
            isArray: false,
            isMonth: false,
            formatter,
            monthFormatter: new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "numeric",
            }),
            sampleDate: () => new Date(2024, 0, 1, 10),
        };

        const firstDate = new Date(2024, 3, 10, 10);
        const secondDate = new Date(2024, 3, 11, 10);
        const parsed = parseDateInput(formatter.format(firstDate), options);

        expect(parsed).toBeInstanceOf(Date);
        expect([
            (parsed as Date).getFullYear(),
            (parsed as Date).getMonth(),
            (parsed as Date).getDate(),
            (parsed as Date).getHours(),
        ]).toStrictEqual([2024, 3, 10, 12]);

        const parsedMultiple = parseDateInput(
            [formatter.format(firstDate), formatter.format(secondDate)].join(
                ", ",
            ),
            { ...options, isArray: true },
        ) as Date[];
        expect(
            parsedMultiple.map((date) => [
                date?.getFullYear(),
                date?.getMonth(),
                date?.getDate(),
            ]),
        ).toStrictEqual([
            [2024, 3, 10],
            [2024, 3, 11],
        ]);
    });

    test("parses a month value", () => {
        const monthFormatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "numeric",
        });
        const parsed = parseDateInput(
            monthFormatter.format(new Date(2024, 3)),
            {
                isArray: false,
                isMonth: true,
                formatter: new Intl.DateTimeFormat("en-US"),
                monthFormatter,
                sampleDate: () => new Date(2024, 0, 1, 10),
            },
        );

        expect(parsed).toBeInstanceOf(Date);
        expect([
            (parsed as Date).getFullYear(),
            (parsed as Date).getMonth(),
            (parsed as Date).getDate(),
        ]).toStrictEqual([2024, 3, 1]);
    });

    test("uses creator and formats month values", () => {
        const creator = new Date(2024, 0, 1, 17);
        const datepicker = useDatepicker<false, false>({
            type: "month",
            locale: "en-US",
            creator: () => creator,
        });
        const value = new Date(2024, 3, 10);

        expect(datepicker.dateCreator()).toBe(creator);
        expect(datepicker.dateFormatter(value)).toBe(
            new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "numeric",
            }).format(new Date(2024, 3, 10, 12)),
        );
        const parsed = datepicker.dateParser("4/2024") as Date;
        expect([
            parsed.getFullYear(),
            parsed.getMonth(),
            parsed.getDate(),
        ]).toStrictEqual([2024, 3, 1]);
    });
});
