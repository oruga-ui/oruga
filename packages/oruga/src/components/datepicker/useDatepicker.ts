import { computed } from "vue";

import { isTrueish } from "@/utils/helpers";
import { matchWithGroups } from "@/utils/dateUtils";
import { useDateTimeFormat } from "@/composables";

import type { DatepickerProps } from "./props";

type DateSelectabilityOptions = Pick<
    DatepickerProps,
    | "minDate"
    | "maxDate"
    | "nearbyMonthDays"
    | "nearbySelectableMonthDays"
    | "selectableDates"
    | "unselectableDates"
    | "unselectableDaysOfWeek"
> & {
    type?: DatepickerProps["type"];
};

/**
 * Check that a date is within the configured bounds and selection constraints.
 */
export function isDateSelectable(
    options: DateSelectabilityOptions,
    date: Date,
    month: number,
    year?: number,
): boolean {
    const validity: boolean[] = [];
    const isMonth = options.type === "month";

    if (isMonth && date.getFullYear() !== (year ?? date.getFullYear()))
        return false;

    if (options.minDate) validity.push(date >= options.minDate);
    if (options.maxDate) validity.push(date <= options.maxDate);

    if (
        !isMonth &&
        options.nearbyMonthDays &&
        !options.nearbySelectableMonthDays
    )
        validity.push(date.getMonth() === month);

    if (options.selectableDates) {
        if (typeof options.selectableDates === "function") {
            if (options.selectableDates(date)) return true;
            else validity.push(false);
        } else {
            for (let i = 0; i < options.selectableDates.length; i++) {
                const enabledDate = options.selectableDates[i];
                if (
                    date.getFullYear() === enabledDate.getFullYear() &&
                    date.getMonth() === enabledDate.getMonth() &&
                    (isMonth || date.getDate() === enabledDate.getDate())
                )
                    return true;
                else validity.push(false);
            }
        }
    }

    if (options.unselectableDates) {
        if (typeof options.unselectableDates === "function") {
            validity.push(!options.unselectableDates(date));
        } else {
            for (let i = 0; i < options.unselectableDates.length; i++) {
                const disabledDate = options.unselectableDates[i];
                validity.push(
                    date.getFullYear() !== disabledDate.getFullYear() ||
                        date.getMonth() !== disabledDate.getMonth() ||
                        (!isMonth && date.getDate() !== disabledDate.getDate()),
                );
            }
        }
    }

    if (options.unselectableDaysOfWeek) {
        for (let i = 0; i < options.unselectableDaysOfWeek.length; i++) {
            const dayOfWeek = options.unselectableDaysOfWeek[i];
            validity.push(date.getDay() !== dayOfWeek);
        }
    }

    return validity.indexOf(false) < 0;
}

export function parseDateInput(
    date: string,
    options: {
        isArray: boolean;
        isMonth: boolean;
        formatter: Intl.DateTimeFormat;
        monthFormatter: Intl.DateTimeFormat;
        sampleDate: () => Date;
    },
): Date | (Date | undefined)[] | undefined {
    if (!date) return undefined;

    const targetDates = options.isArray ? date.split(", ") : [date];
    const dates = targetDates.map((date) => {
        if (
            options.formatter.formatToParts &&
            typeof options.formatter.formatToParts === "function"
        ) {
            const parts = (
                options.isMonth ? options.monthFormatter : options.formatter
            ).formatToParts(options.sampleDate());
            const formatRegex = parts
                .map((part) => {
                    if (part.type === "literal") return part.value;
                    return `((?!=<${part.type}>)\\d+)`;
                })
                .join("");
            const dateGroups = matchWithGroups(formatRegex, date);
            const year = dateGroups.year;
            const month = dateGroups.month;
            const day = dateGroups.day;

            if (year && year.length === 4 && month && Number(month) <= 12) {
                if (options.isMonth)
                    return new Date(Number(year), Number(month) - 1);
                else if (day && Number(day) <= 31) {
                    return new Date(
                        Number(year),
                        Number(month) - 1,
                        Number(day),
                        12,
                    );
                }
            }
        }

        // Fallback if formatToParts is not supported or if we were not able to parse a valid date
        if (!options.isMonth) return new Date(Date.parse(date));

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
    });

    return options.isArray ? dates : dates[0];
}

/** Date Format Feature */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useDatepicker<R extends boolean, M extends boolean>(
    props: DatepickerProps<R, M>,
) {
    const isTypeMonth = computed(() => props.type === "month");

    const { formatterOptions: localeOptions } = useDateTimeFormat(
        () => props.locale,
        () => ({
            year: "numeric",
            month: "numeric",
        }),
    );

    /** DateTime Format */
    const { formatter: dtf } = useDateTimeFormat(
        () => props.locale,
        () => ({}),
    );

    /** DateTime Month Format */
    const { formatter: dtfMonth } = useDateTimeFormat(
        () => props.locale,
        () => ({
            year: (localeOptions.value.year ||
                "numeric") as Intl.DateTimeFormatOptions["year"],
            month: (localeOptions.value.month ||
                "2-digit") as Intl.DateTimeFormatOptions["month"],
        }),
    );

    function dateCreator(): Date {
        if (typeof props.creator === "function") {
            const r = props.creator();
            if (r instanceof Date) return r;
        }
        return new Date();
    }

    const baseTime = computed(() => {
        const d = dateCreator();
        d.setHours(10);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setMilliseconds(0);
        return d;
    });

    /** Format date into string */
    function dateFormatter(date: typeof props.modelValue): string {
        if (typeof props.formatter === "function") {
            const r = props.formatter(date);
            if (typeof r === "string") return r;
        }

        if (!date) return "";
        const targetDates: Date[] = Array.isArray(date) ? date : [date];
        if (!targetDates.length) return "";
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

        return !isTrueish(props.multiple) && !isTrueish(props.range)
            ? dates.join(" - ")
            : dates.join(", ");
    }

    /** Parse a string into a date */
    function dateParser(date: string): typeof props.modelValue {
        if (typeof props.parser === "function") {
            const r = props.parser(date);
            if (r !== undefined) return r;
        }

        if (!date) return undefined;
        return parseDateInput(date, {
            isArray: isTrueish(props.multiple) || isTrueish(props.range),
            isMonth: isTypeMonth.value,
            formatter: dtf.value,
            monthFormatter: dtfMonth.value,
            sampleDate: () => baseTime.value,
        }) as typeof props.modelValue;
    }

    return {
        dtf,
        dateCreator,
        dateParser,
        dateFormatter,
    };
}
