import { matchWithGroups } from "@/utils/dateUtils";
import { AM, PM, useTimeFormat } from "@/composables";

import type { DatetimepickerProps } from "./props";

export function parseDatetimeInput(
    date: string,
    options: {
        formatter: Intl.DateTimeFormat;
        amString: string;
        pmString: string;
        locale?: string;
        sampleDate: () => Date;
    },
): Date | undefined {
    if (!date) return undefined;

    if (typeof options.formatter.formatToParts === "function") {
        const dayPeriods = [
            AM,
            PM,
            AM.toLowerCase(),
            PM.toLowerCase(),
            options.amString,
            options.pmString,
        ];
        const parts = options.formatter.formatToParts(options.sampleDate());
        const formatRegex = parts
            .map((part, idx) => {
                if (part.type === "literal") {
                    if (
                        idx + 1 < parts.length &&
                        parts[idx + 1].type === "hour"
                    ) {
                        return `[^\\d]+`;
                    }
                    // match any whitespace: newer ICU versions emit a narrow
                    // no-break space (U+202F) before the day period
                    return part.value.replace(/\s/g, "\\s?");
                }
                if (part.type === "dayPeriod") {
                    return `((?!=<${part.type}>)(${dayPeriods.join("|")})?)`;
                }
                return `((?!=<${part.type}>)\\d+)`;
            })
            .join("");
        const datetimeGroups = matchWithGroups(formatRegex, date);
        const year = datetimeGroups.year;
        const month = datetimeGroups.month;
        const day = datetimeGroups.day;
        const hour = datetimeGroups.hour;
        const minute = datetimeGroups.minute;
        const second = datetimeGroups.second;
        const dayPeriod = datetimeGroups.dayPeriod?.toLocaleLowerCase(
            options.locale,
        );

        if (
            year &&
            year.length === 4 &&
            month &&
            Number(month) <= 12 &&
            day &&
            Number(day) <= 31 &&
            hour &&
            Number(hour) >= 0 &&
            Number(hour) < 24 &&
            minute &&
            Number(minute) >= 0 &&
            Number(minute) <= 59
        ) {
            let normalizedHour = Number(hour);
            if (
                dayPeriod ===
                    options.pmString.toLocaleLowerCase(options.locale) ||
                dayPeriod === PM.toLowerCase()
            ) {
                normalizedHour = (normalizedHour % 12) + 12;
            } else if (
                dayPeriod ===
                    options.amString.toLocaleLowerCase(options.locale) ||
                dayPeriod === AM.toLowerCase()
            ) {
                normalizedHour %= 12;
            }

            return new Date(
                Number(year),
                Number(month) - 1,
                Number(day),
                normalizedHour,
                Number(minute),
                Number(second) || 0,
            );
        }
    }

    return new Date(Date.parse(date));
}

/** DateTime Format Feature */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useDatetimepicker(props: DatetimepickerProps) {
    function datetimeCreator(): Date {
        if (typeof props.creator === "function") {
            const r = props.creator();
            if (r instanceof Date) return r;
        }
        return new Date();
    }

    const {
        formatter: dtf,
        amString,
        pmString,
    } = useTimeFormat(
        () => props.locale,
        () => ({
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: props.timepicker?.enableSeconds ? "numeric" : undefined,
        }),
        () => props.timepicker?.hourFormat,
        datetimeCreator,
    );

    /** Format date into string */
    function datetimeFormatter(date: Date | undefined): string {
        if (typeof props.formatter === "function") {
            const r = props.formatter(date);
            if (typeof r === "string") return r;
        }

        if (!date) return "";
        return dtf.value.format(date);
    }

    /** Parse a string into a date */
    function datetimeParser(date: string): Date | undefined {
        if (typeof props.parser === "function") {
            const r = props.parser(date);
            if (r !== undefined) return r;
        }

        if (!date) return undefined;
        return parseDatetimeInput(date, {
            formatter: dtf.value,
            amString: amString.value,
            pmString: pmString.value,
            locale: props.locale,
            sampleDate: () => datetimeCreator(),
        });
    }

    return { datetimeCreator, datetimeFormatter, datetimeParser };
}
