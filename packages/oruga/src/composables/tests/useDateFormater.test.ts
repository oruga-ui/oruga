import { describe, expect, test, vi, beforeEach } from "vitest";
import { ref } from "vue";

import {
    AM,
    PM,
    useDateTimeFormat,
    useTimeFormat,
    type HourFormat,
} from "../useDateFormater";

describe("date and time format composables", () => {
    beforeEach(() => vi.restoreAllMocks());

    test("reacts to locale and format option changes", () => {
        const locale = ref("en-US");
        const options = ref<Intl.DateTimeFormatOptions>({
            year: "numeric",
            month: "long",
        });
        const { formatter, formatterOptions } = useDateTimeFormat(
            () => locale.value,
            () => options.value,
        );
        const date = new Date(2024, 0, 1);

        expect(formatter.value.format(date)).toBe("January 2024");
        expect(formatterOptions.value.locale).toBe("en-US");

        options.value = { year: "numeric", month: "short" };
        expect(formatter.value.format(date)).toBe("Jan 2024");

        locale.value = "de-DE";
        expect(formatterOptions.value.locale).toBe("de-DE");
    });

    test("exposes locale day periods and updates the hour cycle", () => {
        const locale = ref<string | undefined>("en-US");
        const hourFormat = ref<HourFormat>(undefined);
        const date = new Date(2024, 0, 1, 10);
        const timeFormat = useTimeFormat(
            () => locale.value,
            () => ({
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
            }),
            () => hourFormat.value,
            () => date,
        );

        expect(timeFormat.isHourFormat24.value).toBe(false);
        expect(timeFormat.amString.value).toBe(AM);
        expect(timeFormat.pmString.value).toBe(PM);
        expect(timeFormat.meridiens.value).toStrictEqual([AM, PM]);
        expect(timeFormat.hourLiteral.value).toBe(":");
        expect(timeFormat.secondLiteral.value).toBeDefined();

        hourFormat.value = 24;
        expect(timeFormat.isHourFormat24.value).toBe(true);
        expect(timeFormat.formatter.value.resolvedOptions().hourCycle).toBe(
            "h23",
        );
    });
});
