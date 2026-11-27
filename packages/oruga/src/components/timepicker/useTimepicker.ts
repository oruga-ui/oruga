import { computed } from "vue";

import { AM, PM, useTimeFormat } from "@/composables";
import { matchWithGroups } from "@/utils/dateUtils";
import { escapeRegExpChars } from "@/utils/helpers";

import type { TimepickerProps } from "./props";

export function parseTimeInput(
    time: string,
    options: {
        formatter: Intl.DateTimeFormat;
        amString: string;
        pmString: string;
        isHourFormat24: boolean;
        locale?: string;
        enableSeconds?: boolean;
        sampleDate: () => Date;
    },
): Date | undefined {
    if (!time) return undefined;

    if (typeof options.formatter.formatToParts === "function") {
        const dayPeriods = [
            options.amString,
            options.pmString,
            AM,
            PM,
            AM.toLowerCase(),
            PM.toLowerCase(),
        ];
        const parts = options.formatter.formatToParts(options.sampleDate());
        const formatRegex = parts
            .map((part) => {
                if (part.type === "literal") {
                    // match any whitespace: newer ICU versions emit a narrow
                    // no-break space (U+202F) before the day period
                    return escapeRegExpChars(part.value).replace(/\s/g, "\\s?");
                }
                if (part.type === "dayPeriod") {
                    const alternatives = [...new Set(dayPeriods)]
                        .map(escapeRegExpChars)
                        .join("|");
                    return `((?!=<${part.type}>)(?:${alternatives})?)`;
                }
                return `((?!=<${part.type}>)\\d+)`;
            })
            .join("");
        const groups = matchWithGroups(formatRegex, time);
        const hour = groups.hour === null ? NaN : Number(groups.hour);
        const minute = groups.minute === null ? NaN : Number(groups.minute);
        const second = groups.second === null ? 0 : Number(groups.second);

        if (
            Number.isInteger(hour) &&
            Number.isInteger(minute) &&
            Number.isInteger(second) &&
            hour >= 0 &&
            hour <= (options.isHourFormat24 ? 23 : 12) &&
            (options.isHourFormat24 || hour >= 1) &&
            minute >= 0 &&
            minute <= 59 &&
            second >= 0 &&
            second <= 59
        ) {
            let normalizedHour = hour;
            const dayPeriod = groups.dayPeriod?.toLocaleLowerCase(
                options.locale,
            );
            if (!options.isHourFormat24) {
                if (
                    dayPeriod ===
                        options.pmString.toLocaleLowerCase(options.locale) ||
                    dayPeriod === PM.toLowerCase()
                ) {
                    normalizedHour = (hour % 12) + 12;
                } else if (
                    dayPeriod ===
                        options.amString.toLocaleLowerCase(options.locale) ||
                    dayPeriod === AM.toLowerCase()
                ) {
                    normalizedHour = hour % 12;
                }
            }

            const date = new Date(options.sampleDate().getTime());
            date.setHours(normalizedHour, minute, second, 0);
            return date;
        }
    }

    let value = time.trim();
    let dayPeriod: string | undefined;
    if (!options.isHourFormat24) {
        const match = value.match(/^(.*?)\s+([^\s]+)$/);
        if (match) {
            value = match[1];
            dayPeriod = match[2].toLocaleLowerCase(options.locale);
        }
    }

    const timeParts = value.split(":");
    let hours = Number.parseInt(timeParts[0], 10);
    const minutes = Number.parseInt(timeParts[1], 10);
    const seconds =
        options.enableSeconds && timeParts.length >= 3
            ? Number.parseInt(timeParts[2], 10)
            : 0;
    const is12HourFormat = !options.isHourFormat24;

    if (
        !Number.isInteger(hours) ||
        hours < (is12HourFormat ? 1 : 0) ||
        hours > (is12HourFormat ? 12 : 23) ||
        !Number.isInteger(minutes) ||
        minutes < 0 ||
        minutes > 59 ||
        !Number.isInteger(seconds) ||
        seconds < 0 ||
        seconds > 59
    ) {
        return undefined;
    }

    if (is12HourFormat) {
        const isPm =
            dayPeriod === options.pmString.toLocaleLowerCase(options.locale) ||
            dayPeriod === PM.toLowerCase();
        const isAm =
            dayPeriod === options.amString.toLocaleLowerCase(options.locale) ||
            dayPeriod === AM.toLowerCase();
        if (isPm && hours < 12) hours += 12;
        else if (isAm && hours === 12) hours = 0;
    }

    const date = new Date(options.sampleDate().getTime());
    date.setHours(hours, minutes, seconds, 0);
    return date;
}

/** Time Format Feature */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTimepicker(props: TimepickerProps) {
    function timeCreator(): Date {
        if (typeof props.creator === "function") {
            const result = props.creator();
            if (result instanceof Date) return result;
        }
        return new Date();
    }

    const baseDate = computed(() => {
        const date = timeCreator();
        date.setHours(10, 0, 0, 0);
        return date;
    });

    /** Time Format */
    const {
        formatter: dtf,
        amString,
        pmString,
        meridiens,
        isHourFormat24,
        hourLiteral,
        minuteLiteral,
        secondLiteral,
    } = useTimeFormat(
        () => props.locale,
        () => ({
            hour: "numeric",
            minute: "numeric",
            second: props.enableSeconds ? "numeric" : undefined,
        }),
        () => props.hourFormat,
        () => baseDate.value,
    );

    /** Format date into string */
    function timeFormatter(time: typeof props.modelValue): string {
        if (typeof props.formatter === "function") {
            const result = props.formatter(time);
            if (typeof result === "string") return result;
        }

        if (!time) return "00:00";
        return dtf.value.format(time);
    }

    /** Parse a string into a date */
    function timeParser(time: string): typeof props.modelValue {
        if (typeof props.parser === "function") {
            const result = props.parser(time);
            if (result !== undefined) return result;
        }

        if (!time) return undefined;
        return parseTimeInput(time, {
            formatter: dtf.value,
            amString: amString.value,
            pmString: pmString.value,
            isHourFormat24: isHourFormat24.value,
            locale: props.locale,
            enableSeconds: props.enableSeconds,
            sampleDate: () => baseDate.value,
        });
    }

    return {
        dtf,
        timeCreator,
        timeFormatter,
        timeParser,
        pmString,
        amString,
        meridiens,
        isHourFormat24,
        hourLiteral,
        minuteLiteral,
        secondLiteral,
    };
}
