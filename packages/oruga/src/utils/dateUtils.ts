type DateTimeFormatOptions = NonNullable<
    ConstructorParameters<typeof Intl.DateTimeFormat>[1]
>;

/**
 * Return month names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
 * @return {Array<String>} An array of month names
 */
export function getMonthNames(
    locale?: string,
    format: DateTimeFormatOptions["month"] = "long",
): string[] {
    const dates: Date[] = [];
    for (let i = 0; i < 12; i++) {
        dates.push(new Date(2000, i, 15));
    }
    const dtf = new Intl.DateTimeFormat(locale, {
        month: format,
    });
    return dates.map((d) => dtf.format(d));
}

/**
 * Return weekday names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {Number} first day of week index
 * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
 * @return {Array<String>} An array of weekday names
 */
export function getWeekdayNames(
    locale?: string,
    firstDayOfWeek: number = 0,
    format: DateTimeFormatOptions["weekday"] = "narrow",
): string[] {
    const dates: Date[] = [];
    for (let i = 1, j = 0; j < 7; i++) {
        const d = new Date(2000, 0, i);
        const day = d.getDay();
        if (day === firstDayOfWeek || j > 0) {
            dates.push(d);
            j++;
        }
    }
    const dtf = new Intl.DateTimeFormat(locale, {
        weekday: format,
    });
    return dates.map((d) => dtf.format(d));
}

/** Return array of all days in the week that the startingDate is within */
export function weekBuilder(
    startingDate: number,
    month: number,
    year: number,
    firstDayOfWeek: number,
): Date[] {
    const thisMonth = new Date(year, month);

    const thisWeek: Date[] = [];

    const dayOfWeek = new Date(year, month, startingDate).getDay();

    const end =
        dayOfWeek >= firstDayOfWeek
            ? dayOfWeek - firstDayOfWeek
            : 7 - firstDayOfWeek + dayOfWeek;

    let daysAgo = 1;
    for (let i = 0; i < end; i++) {
        thisWeek.unshift(
            new Date(
                thisMonth.getFullYear(),
                thisMonth.getMonth(),
                startingDate - daysAgo,
            ),
        );
        daysAgo++;
    }

    thisWeek.push(new Date(year, month, startingDate));

    let daysForward = 1;
    while (thisWeek.length < 7) {
        thisWeek.push(new Date(year, month, startingDate + daysForward));
        daysForward++;
    }

    return thisWeek;
}

export function firstWeekOffset(
    year: number,
    dow: number,
    doy: number,
): number {
    // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    const fwd = 7 + dow - doy;
    // first-week day local weekday -- which local weekday is fwd
    const firstJanuary = new Date(year, 0, fwd);
    const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
    return -fwdlw + fwd - 1;
}

/** Return the number of days in a specific year */
export function daysInYear(year: number): number {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
}

/** Return the number of weeks in a specific year */
export function weeksInYear(year: number, dow: number, doy: number): number {
    const weekOffset = firstWeekOffset(year, dow, doy);
    const weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

/**
 * Match a format pattern containing pseudo-named capture markers and return
 * the captured values indexed by marker name.
 */
export function matchWithGroups(
    pattern: string,
    value: string,
): Record<string, string | null> {
    const matches = value.match(pattern);
    const groupNames =
        pattern.match(/<([^>]+)>/g)?.map((group) => group.slice(1, -1)) ?? [];

    return groupNames.reduce<Record<string, string | null>>(
        (groups, groupName, index) => {
            groups[groupName] = matches?.[index + 1] ?? null;
            return groups;
        },
        {},
    );
}
