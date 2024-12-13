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
            const d = datetimeCreator();
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
            const d = datetimeCreator();
            d.setHours(20);
            const dayPeriod = dtf.value
                .formatToParts(d)
                .find((part) => part.type === "dayPeriod");
            if (dayPeriod) return dayPeriod.value;
        }
        return PM;
    });

    function datetimeCreator(): Date {
        return typeof props.creator === "function"
            ? props.creator()
            : new Date();
    }

    function datetimeFormatter(date: Date): string {
        if (typeof props.formatter === "function") return props.formatter(date);

        if (!date) return "";
        return dtf.value.format(date);
    }

    function datetimeParser(date: string): Date | undefined {
        if (typeof props.parser === "function") return props.parser(date);

        if (!date) return undefined;
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
                return new Date(
                    datetimeGroups.year,
                    datetimeGroups.month - 1,
                    datetimeGroups.day,
                    datetimeGroups.hour,
                    datetimeGroups.minute,
                    datetimeGroups.second || 0,
                );
            }
        }

        // Fallback if formatToParts is not supported or if we were not able to parse a valid date
        return new Date(Date.parse(date));
    }

    return {
        dtf,
        datetimeCreator,
        datetimeFormatter,
        datetimeParser,
    };
}
