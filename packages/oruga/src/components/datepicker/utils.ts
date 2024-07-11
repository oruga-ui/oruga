type MonthType =
    | "numeric"
    | "2-digit"
    | "long"
    | "short"
    | "narrow"
    | undefined;

/**
 * Return month names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
 * @return {Array<String>} An array of month names
 */
export function getMonthNames(
    locale: string = undefined,
    format: MonthType = "long",
): string[] {
    const dates = [];
    for (let i = 0; i < 12; i++) {
        dates.push(new Date(2000, i, 15));
    }
    const dtf = new Intl.DateTimeFormat(locale, {
        month: format,
    });
    return dates.map((d) => dtf.format(d));
}

type WeekdayType = "long" | "short" | "narrow" | undefined;

/**
 * Return weekday names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {Number} first day of week index
 * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
 * @return {Array<String>} An array of weekday names
 */
export function getWeekdayNames(
    locale: string = undefined,
    firstDayOfWeek: number = 0,
    format: WeekdayType = "narrow",
): string[] {
    const dates = [];
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

/**
 * Accept a regex with group names and return an object
 * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
 * will return { year: 2000, month: 12, day: 25 }
 * @param  {String} includes injections of (?!={groupname}) for each group
 * @param  {String} the string to run regex
 * @return {Object} an object with a property for each group having the group's match as the value
 */
export function matchWithGroups(pattern: string, str: string): any {
    const matches = str.match(pattern);
    return (
        pattern
            // get the pattern as a string
            .toString()
            // suss out the groups
            .match(/<(.+?)>/g)
            // remove the braces
            .map((group) => {
                const groupMatches = group.match(/<(.+)>/);
                if (!groupMatches || groupMatches.length <= 0) {
                    return null;
                }
                return group.match(/<(.+)>/)[1];
            })
            // create an object with a property for each group having the group's match as the value
            .reduce((acc, curr, index) => {
                if (matches && matches.length > index) {
                    acc[curr] = matches[index + 1];
                } else {
                    acc[curr] = null;
                }
                return acc;
            }, {})
    );
}

/** Return array of all days in the week that the startingDate is within */
export function weekBuilder(
    startingDate: number,
    month: number,
    year: number,
    firstDayOfWeek: number,
): Date[] {
    const thisMonth = new Date(year, month);

    const thisWeek = [];

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

export function firstWeekOffset(year, dow, doy): number {
    // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    const fwd = 7 + dow - doy;
    // first-week day local weekday -- which local weekday is fwd
    const firstJanuary = new Date(year, 0, fwd);
    const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
    return -fwdlw + fwd - 1;
}

/** Return the number of days in a specific year */
export function daysInYear(year): number {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
}

/** Return the number of weeks in a specific year */
export function weeksInYear(year, dow, doy): number {
    const weekOffset = firstWeekOffset(year, dow, doy);
    const weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
