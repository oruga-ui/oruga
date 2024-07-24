import { computed } from "vue";
import { matchWithGroups } from "../datepicker/utils";
import type { DatetimepickerProps } from "./types";

const AM = "AM" as const;
const PM = "PM" as const;
const HOUR_FORMAT_24 = "24" as const;

/** Time Format Feature */
export function useDateimepickerMixins(props: DatetimepickerProps) {
    const localeOptions = computed(
        () =>
            new Intl.DateTimeFormat(props.locale, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: props.timepicker?.enableSeconds ? "numeric" : undefined,
            }).resolvedOptions() as Intl.DateTimeFormatOptions,
    );

    const isHourFormat24 = computed(
        () =>
            (props.timepicker?.hourFormat &&
                props.timepicker.hourFormat === HOUR_FORMAT_24) ||
            (!props.timepicker?.hourFormat && !localeOptions.value.hour12),
    );

    const dtf = computed(
        () =>
            new Intl.DateTimeFormat(props.locale, {
                year: localeOptions.value.year || "numeric",
                month: localeOptions.value.month || "numeric",
                day: localeOptions.value.day || "numeric",
                hour: localeOptions.value.hour || "numeric",
                minute: localeOptions.value.minute || "numeric",
                second: props.timepicker?.enableSeconds
                    ? localeOptions.value.second || "numeric"
                    : undefined,
                hourCycle: !isHourFormat24.value ? "h12" : "h23",
            }),
    );

    const amString = computed(() => {
        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const d = props.datetimeCreator(new Date());
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
            const d = props.datetimeCreator(new Date());
            d.setHours(20);
            const dayPeriod = dtf.value
                .formatToParts(d)
                .find((part) => part.type === "dayPeriod");
            if (dayPeriod) return dayPeriod.value;
        }
        return PM;
    });

    function defaultDatetimeParser(value: string): Date {
        function defaultParser(date: string): Date {
            if (
                dtf.value.formatToParts &&
                typeof dtf.value.formatToParts === "function"
            ) {
                const dayPeriods = [
                    AM,
                    PM,
                    AM.toLowerCase(),
                    PM.toLowerCase(),
                    amString.value,
                    pmString.value,
                ];
                const parts = dtf.value.formatToParts(new Date());
                const formatRegex = parts
                    .map((part, idx) => {
                        if (part.type === "literal") {
                            if (
                                idx + 1 < parts.length &&
                                parts[idx + 1].type === "hour"
                            ) {
                                return `[^\\d]+`;
                            }
                            return part.value.replace(/ /g, "\\s?");
                        } else if (part.type === "dayPeriod") {
                            return `((?!=<${part.type}>)(${dayPeriods.join(
                                "|",
                            )})?)`;
                        }
                        return `((?!=<${part.type}>)\\d+)`;
                    })
                    .join("");
                const datetimeGroups = matchWithGroups(formatRegex, date);

                // We do a simple validation for the group.
                // If it is not valid, it will fallback to Date.parse below
                if (
                    datetimeGroups.year &&
                    datetimeGroups.year.length === 4 &&
                    datetimeGroups.month &&
                    datetimeGroups.month <= 12 &&
                    datetimeGroups.day &&
                    datetimeGroups.day <= 31 &&
                    datetimeGroups.hour &&
                    datetimeGroups.hour >= 0 &&
                    datetimeGroups.hour < 24 &&
                    datetimeGroups.minute &&
                    datetimeGroups.minute >= 0 &&
                    datetimeGroups.minute <= 59
                ) {
                    const d = new Date(
                        datetimeGroups.year,
                        datetimeGroups.month - 1,
                        datetimeGroups.day,
                        datetimeGroups.hour,
                        datetimeGroups.minute,
                        datetimeGroups.second || 0,
                    );
                    return d;
                }
            }

            return new Date(Date.parse(date));
        }

        // call prop function
        const date = props.datetimeParser(value);
        // call default if prop function is not given
        if (typeof date === "undefined") return defaultParser(value);
        else return date;
    }

    function defaultDatetimeFormatter(value: Date): string {
        // call prop function
        const date = props.datetimeFormatter(value);
        // call default if prop function is not given
        if (typeof date === "undefined") return dtf.value.format(value);
        else return date;
    }

    return {
        dtf,
        defaultDatetimeFormatter,
        defaultDatetimeParser,
    };
}
