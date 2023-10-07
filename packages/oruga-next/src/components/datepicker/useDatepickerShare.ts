import { computed } from "vue";
import Datepicker from "./Datepicker.vue";
import { matchWithGroups } from "./datepickerUtils";

export type DatepickerProps = InstanceType<typeof Datepicker>["$props"];

export type DatepickerEvent = {
    date: Date;
    type?: string;
};

export type FocusedDate = {
    day: number;
    month: number;
    year: number;
};

export function useDatepickerShare(props: DatepickerProps) {
    /**
     * Check that selected date is within earliest/latest params and
     * is within a given month
     */
    function isDateSelectable(date: Date, month: number): boolean {
        const validity = [];

        if (props.minDate) validity.push(date >= props.minDate);
        if (props.maxDate) validity.push(date <= props.maxDate);

        if (props.nearbyMonthDays && !props.nearbySelectableMonthDays)
            validity.push(date.getMonth() === month);

        if (props.selectableDates) {
            if (typeof props.selectableDates === "function") {
                if (props.selectableDates(date)) return true;
                else validity.push(false);
            } else {
                for (let i = 0; i < props.selectableDates.length; i++) {
                    const enabledDate = props.selectableDates[i];
                    if (
                        date.getDate() === enabledDate.getDate() &&
                        date.getFullYear() === enabledDate.getFullYear() &&
                        date.getMonth() === enabledDate.getMonth()
                    )
                        return true;
                    else validity.push(false);
                }
            }
        }

        if (props.unselectableDates) {
            if (typeof props.unselectableDates === "function") {
                validity.push(!props.unselectableDates(date));
            } else {
                for (let i = 0; i < props.unselectableDates.length; i++) {
                    const disabledDate = props.unselectableDates[i];
                    validity.push(
                        date.getDate() !== disabledDate.getDate() ||
                            date.getFullYear() !== disabledDate.getFullYear() ||
                            date.getMonth() !== disabledDate.getMonth(),
                    );
                }
            }
        }

        if (props.unselectableDaysOfWeek) {
            for (let i = 0; i < props.unselectableDaysOfWeek.length; i++) {
                const dayOfWeek = props.unselectableDaysOfWeek[i];
                validity.push(date.getDay() !== dayOfWeek);
            }
        }

        return validity.indexOf(false) < 0;
    }

    const isTypeMonth = computed(() => props.type === "month");

    const localeOptions = computed(
        () =>
            new Intl.DateTimeFormat(props.locale, {
                year: "numeric",
                month: "numeric",
            }).resolvedOptions() as Intl.DateTimeFormatOptions,
    );

    /** DateTime Format */
    const dtf = computed(
        () => new Intl.DateTimeFormat(props.locale /*, { timeZone: 'UTC' }*/),
    );

    /** DateTime Month Format */
    const dtfMonth = computed(
        () =>
            new Intl.DateTimeFormat(props.locale, {
                year: localeOptions.value.year || "numeric",
                month: localeOptions.value.month || "2-digit",
                // timeZone: 'UTC'
            }),
    );

    const sampleTime = computed(() => {
        const d = props.dateCreator();
        d.setHours(10);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setMilliseconds(0);
        return d;
    });

    /** Format date into string */
    const defaultDateFormatter = (date: Date | Date[]): string => {
        if (!date) return "";
        const targetDates = Array.isArray(date) ? date : [date];
        const dates = targetDates.map((date) => {
            const d = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                12,
            );
            return !isTypeMonth.value
                ? dtf.value.format(d)
                : dtfMonth.value.format(d);
        });
        return !props.multiple ? dates.join(" - ") : dates.join(", ");
    };

    /** Parse a string into a date */
    const defaultDateParser = (date: string): Date => {
        if (!date) return null;
        if (
            dtf.value.formatToParts &&
            typeof dtf.value.formatToParts === "function"
        ) {
            const formatRegex = (isTypeMonth.value ? dtfMonth.value : dtf.value)
                .formatToParts(sampleTime.value)
                .map((part) => {
                    if (part.type === "literal") return part.value;
                    return `((?!=<${part.type}>)\\d+)`;
                })
                .join("");
            const dateGroups = matchWithGroups(formatRegex, date);

            // We do a simple validation for the group.
            // If it is not valid, it will fallback to Date.parse below
            if (
                dateGroups.year &&
                dateGroups.year.length === 4 &&
                dateGroups.month &&
                dateGroups.month <= 12
            ) {
                if (isTypeMonth.value)
                    return new Date(dateGroups.year, dateGroups.month - 1);
                else if (dateGroups.day && dateGroups.day <= 31) {
                    return new Date(
                        dateGroups.year,
                        dateGroups.month - 1,
                        dateGroups.day,
                        12,
                    );
                }
            }
        }
        // Fallback if formatToParts is not supported or if we were not able to parse a valid date
        if (!isTypeMonth.value) return new Date(Date.parse(date));
        const s = date.split("/");
        const year = s[0].length === 4 ? s[0] : s[1];
        const month = s[0].length === 2 ? s[0] : s[1];
        if (year && month) {
            return new Date(
                parseInt(year, 10),
                parseInt(month, 10) - 1,
                1,
                0,
                0,
                0,
                0,
            );
        }
    };

    return { isDateSelectable, defaultDateParser, defaultDateFormatter };
}
