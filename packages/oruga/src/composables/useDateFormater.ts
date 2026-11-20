import { computed, type ComputedRef } from "vue";

export const AM = "AM" as const;
export const PM = "PM" as const;

export type HourFormat = "12" | "24" | 12 | 24 | undefined;

type UseDateTimeFormatResult = {
    formatter: ComputedRef<Intl.DateTimeFormat>;
    formatterOptions: ComputedRef<
        ReturnType<Intl.DateTimeFormat["resolvedOptions"]>
    >;
};

/**
 * Create a locale-aware DateTime formatter and expose its resolved options reactively.
 */
export function useDateTimeFormat(
    locale: () => string | undefined,
    options: () => Intl.DateTimeFormatOptions,
): UseDateTimeFormatResult {
    const formatter = computed(
        () => new Intl.DateTimeFormat(locale(), options()),
    );
    const formatterOptions = computed(() => formatter.value.resolvedOptions());

    return { formatter, formatterOptions };
}

type UseTimeFormatResult = {
    formatter: ComputedRef<Intl.DateTimeFormat>;
    isHourFormat24: ComputedRef<boolean>;
    amString: ComputedRef<string>;
    pmString: ComputedRef<string>;
    meridiens: ComputedRef<string[]>;
    hourLiteral: ComputedRef<string>;
    minuteLiteral: ComputedRef<string>;
    secondLiteral: ComputedRef<string | undefined>;
};

/**
 * Create a locale-aware Time formatter and expose its resolved options reactively.
 */
export function useTimeFormat(
    locale: () => string | undefined,
    options: () => Intl.DateTimeFormatOptions,
    hourFormat: () => HourFormat,
    createDate: () => Date,
): UseTimeFormatResult {
    const { formatterOptions: localeOptions } = useDateTimeFormat(
        locale,
        options,
    );

    const isHourFormat24 = computed(() => {
        const format = hourFormat();
        return (
            format === "24" ||
            format === 24 ||
            (format === undefined && !localeOptions.value.hour12)
        );
    });

    const formatterOptions = computed<Intl.DateTimeFormatOptions>(() => {
        const requestedOptions = options();
        const resolved = localeOptions.value;

        return {
            ...requestedOptions,
            hour: (resolved.hour ||
                requestedOptions.hour ||
                "numeric") as Intl.DateTimeFormatOptions["hour"],
            minute: (resolved.minute ||
                requestedOptions.minute ||
                "numeric") as Intl.DateTimeFormatOptions["minute"],
            second: requestedOptions.second
                ? ((resolved.second ||
                      requestedOptions.second) as Intl.DateTimeFormatOptions["second"])
                : undefined,
            hourCycle: isHourFormat24.value ? "h23" : "h12",
        };
    });

    const { formatter } = useDateTimeFormat(
        locale,
        () => formatterOptions.value,
    );

    function formatParts(date: Date): Intl.DateTimeFormatPart[] | undefined {
        if (typeof formatter.value.formatToParts !== "function")
            return undefined;
        return formatter.value.formatToParts(date);
    }

    function getDayPeriod(hour: number): string | undefined {
        const date = new Date(createDate().getTime());
        date.setHours(hour);
        return formatParts(date)?.find((part) => part.type === "dayPeriod")
            ?.value;
    }

    function getLiteralAfter(
        type: "hour" | "minute" | "second",
    ): string | undefined {
        const parts = formatParts(createDate());
        if (!parts) return undefined;
        const literal = parts.find(
            (part, index) => index > 0 && parts[index - 1].type === type,
        );
        return literal?.value || undefined;
    }

    const amString = computed(() => getDayPeriod(10) || AM);
    const pmString = computed(() => getDayPeriod(20) || PM);
    const meridiens = computed(() => [amString.value, pmString.value]);
    const hourLiteral = computed(() => getLiteralAfter("hour") || ":");
    const minuteLiteral = computed(() => getLiteralAfter("minute") || ":");
    const secondLiteral = computed(() => getLiteralAfter("second"));

    return {
        formatter,
        isHourFormat24,
        amString,
        pmString,
        meridiens,
        hourLiteral,
        minuteLiteral,
        secondLiteral,
    };
}
