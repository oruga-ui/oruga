export declare const sign: (x: number) => number;
/**
 * Checks if the flag is set
 * @param val
 * @param flag
 * @returns {boolean}
 */
declare function hasFlag(val: number, flag: number): boolean;
/**
 * Native modulo bug with negative numbers
 * @param n
 * @param mod
 * @returns {number}
 */
declare function mod(n: number, mod: number): number;
/**
 * Asserts a value is beetween min and max
 * @param val
 * @param min
 * @param max
 * @returns {number}
 */
declare function bound(val: number, min: number, max: number): number;
export { mod, bound, hasFlag };
/**
 * Get value of an object property/path even if it's nested
 */
export declare function getValueByPath(obj: any, path: string, defaultValue?: any): any;
/**
 * Extension of indexOf method by equality function if specified
 */
export declare function indexOf(array: any[], obj: any, fn: Function): number;
export declare const merge: (target: any, source: any, deep?: boolean) => any;
/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export declare const isMobile: {
    Android: () => RegExpMatchArray;
    BlackBerry: () => RegExpMatchArray;
    iOS: () => RegExpMatchArray;
    Opera: () => RegExpMatchArray;
    Windows: () => RegExpMatchArray;
    any: () => RegExpMatchArray;
};
export declare function removeElement(el: Element): void;
export declare function createAbsoluteElement(el: Element): HTMLDivElement;
/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */
export declare function escapeRegExpChars(value: string): string;
export declare function multiColumnSort(inputArray: any, sortingPriority: any): any;
export declare function createNewEvent(eventName: string): any;
export declare function toCssDimension(width: string | number): string | number;
export declare function blankIfUndefined(value: string): string;
export declare function defaultIfUndefined(value: any, defaultValue: any): any;
/**
 * Return month names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
 * @return {Array<String>} An array of month names
 */
export declare function getMonthNames(locale?: string, format?: string): string[];
/**
 * Return weekday names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {Number} first day of week index
 * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
 * @return {Array<String>} An array of weekday names
 */
export declare function getWeekdayNames(locale?: string, firstDayOfWeek?: number, format?: string): string[];
/**
 * Accept a regex with group names and return an object
 * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
 * will return { year: 2000, month: 12, day: 25 }
 * @param  {String} includes injections of (?!={groupname}) for each group
 * @param  {String} the string to run regex
 * @return {Object} an object with a property for each group having the group's match as the value
 */
export declare function matchWithGroups(pattern: string, str: string): any;
export declare function getStyleValue(value: any): any;
export declare function debounce(func: Function, wait: number, immediate?: boolean): () => void;
export declare function endsWith(str: string, suffix: string): boolean;
export declare const isDefined: (d: any) => boolean;
/**
 * Remove accents/diacritics in a string in JavaScript
 * https://stackoverflow.com/a/37511463
 */
export declare function removeDiacriticsFromString(value: string): string;
