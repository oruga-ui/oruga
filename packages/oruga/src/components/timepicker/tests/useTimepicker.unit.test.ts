import { describe, expect, test } from "vitest";

import { parseTimeInput, useTimepicker } from "../useTimepicker";

describe("Timepicker helpers", () => {
    test("parses localized midnight and noon", () => {
        const options = {
            formatter: new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
                hourCycle: "h12",
            }),
            amString: "AM",
            pmString: "PM",
            isHourFormat24: false,
            locale: "en-US",
            sampleDate: () => new Date(2024, 0, 1, 10),
        };

        expect(parseTimeInput("12:00 AM", options)?.getHours()).toBe(0);
        expect(parseTimeInput("12:00 PM", options)?.getHours()).toBe(12);
        expect(parseTimeInput("1:30 PM", options)?.getHours()).toBe(13);
    });

    test("parses seconds and rejects out-of-range hours", () => {
        const options = {
            formatter: new Intl.DateTimeFormat("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23",
            }),
            amString: "AM",
            pmString: "PM",
            isHourFormat24: true,
            enableSeconds: true,
            sampleDate: () => new Date(2024, 0, 1, 10),
        };

        const parsed = parseTimeInput("23:59:58", options);
        expect(parsed).toBeInstanceOf(Date);
        expect([
            parsed?.getHours(),
            parsed?.getMinutes(),
            parsed?.getSeconds(),
        ]).toStrictEqual([23, 59, 58]);
        expect(parseTimeInput("24:00:00", options)).toBeUndefined();
    });

    test("formats and parses values through the timepicker composable", () => {
        const creator = new Date(2024, 0, 1, 10);
        const timepicker = useTimepicker({
            locale: "en-US",
            hourFormat: "24",
            enableSeconds: true,
            creator: () => new Date(creator),
        });
        const value = new Date(2024, 0, 1, 13, 35, 10);

        expect(timepicker.timeFormatter(value)).toBe(
            timepicker.dtf.value.format(value),
        );
        expect(timepicker.isHourFormat24.value).toBe(true);

        const parsed = timepicker.timeParser("13:35:10");
        expect(parsed).toBeInstanceOf(Date);
        expect([
            parsed?.getHours(),
            parsed?.getMinutes(),
            parsed?.getSeconds(),
        ]).toStrictEqual([13, 35, 10]);

        const secondParsed = timepicker.timeParser("14:25:20");
        expect(secondParsed).not.toBe(parsed);
        expect([
            parsed?.getHours(),
            parsed?.getMinutes(),
            parsed?.getSeconds(),
        ]).toStrictEqual([13, 35, 10]);
        expect([
            secondParsed?.getHours(),
            secondParsed?.getMinutes(),
            secondParsed?.getSeconds(),
        ]).toStrictEqual([14, 25, 20]);
    });
});
