import { computed } from "vue";
import { matchWithGroups } from "../datepicker/utils";
import type { TimepickerProps } from "./types";

const AM = "AM" as const;
const PM = "PM" as const;
const HOUR_FORMAT_24 = "24" as const;
const HOUR_FORMAT_12 = "12" as const;

/** Time Format Feature */
export function useTimepickerMixins(props: TimepickerProps) {
    const localeOptions = computed(
        () =>
            new Intl.DateTimeFormat(props.locale, {
                hour: "numeric",
                minute: "numeric",
                second: props.enableSeconds ? "numeric" : undefined,
            }).resolvedOptions() as Intl.DateTimeFormatOptions,
    );

    const isHourFormat24 = computed(
        () =>
            (props.hourFormat && props.hourFormat === HOUR_FORMAT_24) ||
            (!props.hourFormat && !localeOptions.value.hour12),
    );

    const dtf = computed(
        () =>
            new Intl.DateTimeFormat(props.locale, {
                hour: localeOptions.value.hour || "numeric",
                minute: localeOptions.value.minute || "numeric",
                second: props.enableSeconds
                    ? localeOptions.value.second || "numeric"
                    : undefined,
                hourCycle: !isHourFormat24.value ? "h12" : "h23",
            }),
    );

    const sampleTime = computed(() => {
        const d = timeCreator();
        d.setHours(10);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setMilliseconds(0);
        return d;
    });

    const amString = computed(() => {
        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const d = new Date(sampleTime.value);
            d.setHours(10);
            const dayPeriod = dtf.value
                .formatToParts(d)
                .find((part) => part.type === "dayPeriod");
            if (dayPeriod) return dayPeriod.value;
        }
        return AM;
    });

    const pmString = computed(() => {
        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const d = new Date(sampleTime.value);
            d.setHours(20);
            const dayPeriod = dtf.value
                .formatToParts(d)
                .find((part) => part.type === "dayPeriod");
            if (dayPeriod) {
                return dayPeriod.value;
            }
        }
        return PM;
    });

    const meridiens = computed(() => [amString.value, pmString.value]);

    const hourLiteral = computed(() => {
        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const d = new Date(sampleTime.value);
            const parts = dtf.value.formatToParts(d);
            const literal = parts.find(
                (part, idx) => idx > 0 && parts[idx - 1].type === "hour",
            );
            if (literal) return literal.value;
        }
        return ":";
    });

    const minuteLiteral = computed(() => {
        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const d = new Date(sampleTime.value);
            const parts = dtf.value.formatToParts(d);
            const literal = parts.find(
                (part, idx) => idx > 0 && parts[idx - 1].type === "minute",
            );
            if (literal) return literal.value;
        }
        return ":";
    });

    const secondLiteral = computed(() => {
        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const d = new Date(sampleTime.value);
            const parts = dtf.value.formatToParts(d);
            const literal = parts.find(
                (part, idx) => idx > 0 && parts[idx - 1].type === "second",
            );
            if (literal) return literal.value;
        }
        return undefined;
    });

    function timeCreator(): Date {
        return typeof props.creator === "function"
            ? props.creator()
            : new Date();
    }

    function timeFormatter(time: Date | undefined): string {
        if (typeof props.formatter === "function") return props.formatter(time);

        if (!time) return "00:00";
        return dtf.value.format(time);
    }

    function timeParser(time: string): Date | undefined {
        if (typeof props.parser === "function") return props.parser(time);

        if (!time) return undefined;

        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const formatRegex = dtf.value
                .formatToParts(sampleTime.value)
                .map((part) => {
                    if (part.type === "literal") {
                        return part.value.replace(/ /g, "\\s?");
                    } else if (part.type === "dayPeriod") {
                        return `((?!=<${part.type}>)(${amString.value}|${
                            pmString.value
                        }|${AM}|${PM}|${AM.toLowerCase()}|${PM.toLowerCase()})?)`;
                    }
                    return `((?!=<${part.type}>)\\d+)`;
                })
                .join("");
            const timeGroups = matchWithGroups(formatRegex, time);

            // We do a simple validation for the group.
            // If it is not valid, it will fallback to Date.parse below
            timeGroups.hour = timeGroups.hour
                ? parseInt(timeGroups.hour, 10)
                : null;
            timeGroups.minute = timeGroups.minute
                ? parseInt(timeGroups.minute, 10)
                : null;
            timeGroups.second = timeGroups.second
                ? parseInt(timeGroups.second, 10)
                : null;
            if (
                timeGroups.hour &&
                timeGroups.hour >= 0 &&
                timeGroups.hour < 24 &&
                timeGroups.minute &&
                timeGroups.minute >= 0 &&
                timeGroups.minute < 59
            ) {
                if (
                    timeGroups.dayPeriod &&
                    (timeGroups.dayPeriod.toLowerCase() ===
                        pmString.value.toLowerCase() ||
                        timeGroups.dayPeriod.toLowerCase() ===
                            PM.toLowerCase()) &&
                    timeGroups.hour < 12
                ) {
                    timeGroups.hour += 12;
                }
                const date = new Date(sampleTime.value);
                date.setHours(timeGroups.hour);
                date.setMinutes(timeGroups.minute);
                date.setSeconds(timeGroups.second || 0);
                return date;
            }
        }

        // Fallback if formatToParts is not supported or if we were not able to parse a valid date
        let am = false;
        if (props.hourFormat === HOUR_FORMAT_12) {
            const dateString12 = time.split(" ");
            time = dateString12[0];
            am = dateString12[1] === amString.value || dateString12[1] === AM;
        }
        const timeSplit = time.split(":");
        let hours = parseInt(timeSplit[0], 10);
        const minutes = parseInt(timeSplit[1], 10);
        const seconds =
            props.enableSeconds && timeSplit.length >= 3
                ? parseInt(timeSplit[2], 10)
                : 0;
        if (
            isNaN(hours) ||
            hours < 0 ||
            hours > 23 ||
            (props.hourFormat === HOUR_FORMAT_12 &&
                (hours < 1 || hours > 12)) ||
            isNaN(minutes) ||
            minutes < 0 ||
            minutes > 59
        ) {
            return undefined;
        }
        const date = new Date(sampleTime.value);
        date.setSeconds(seconds);
        date.setMinutes(minutes);
        if (props.hourFormat === HOUR_FORMAT_12) {
            if (am && hours === 12) {
                hours = 0;
            } else if (!am && hours !== 12) {
                hours += 12;
            }
        }
        date.setHours(hours);
        return new Date(date.getTime());
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
