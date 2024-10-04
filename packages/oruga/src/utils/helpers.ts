import { Comment, Fragment, Text } from "vue";

/**
 * +/- function to native math sign
 */
function signPoly(value: number): number {
    if (value < 0) return -1;
    return value > 0 ? 1 : 0;
}
export const sign = Math.sign || signPoly;

/**
 * Native modulo bug with negative numbers
 * @param n
 * @param mod
 * @returns {number}
 */
export const mod = (n: number, mod: number): number => ((n % mod) + mod) % mod;

/** add a prefix `0` to a 1 digit number */
export const pad = (value: number): string => (value < 10 ? "0" : "") + value;

/**
 * Asserts a value is beetween min and max
 * @param val
 * @param min
 * @param max
 * @returns {number}
 */
export function bound(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val));
}

/**
 * checks if the value is of type object
 */
export const isObject = (value: unknown): value is object =>
    !!value && typeof value === "object" && !Array.isArray(value);

/**
 * checks if the value is of type date
 */
export const isDate = (value: unknown): value is Date =>
    !!value && value instanceof Date && !isNaN(value.getTime());

/**
 * checks if the value is not null or undefined
 */
export const isDefined = <T>(value: T | undefined | null): value is T =>
    value !== null && typeof value !== "undefined";

/**
 * Determines if the value of a prop that is either present (true) or not
 * present (undefined). For example, the prop disabled should disable
 * by just existing, but what if it is set to the string "false" — then it
 * should not be disabled.
 *
 * @param value - Value to check for undefined.
 * @returns boolean
 */
export const isTrueish = (value: unknown): boolean =>
    isDefined(value) && value !== "false" && value !== false;

export const blankIfUndefined = (value: string | null | undefined): string =>
    isDefined(value) ? value : "";

export const defaultIfUndefined = <T>(
    value: T | undefined,
    defaultValue: T,
): T => (isDefined(value) ? value : defaultValue);

export const toCssDimension = (
    width: string | number | undefined,
    dimension: string = "px",
): string | undefined =>
    !isDefined(width)
        ? undefined
        : isNaN(width as number)
          ? String(width)
          : String(width) + dimension;

/**
 * Sort an array by key without mutating original data.
 * Call the user sort function if it was passed.
 */
export function sortBy<T>(
    array: T[],
    key: string,
    fn?: (a: T, b: T, asc: boolean) => number,
    isAsc: boolean = false,
): T[] {
    let sorted: T[] = [];
    // Sorting without mutating original data
    if (fn && typeof fn === "function") {
        sorted = [...array].sort((a, b) => fn(a, b, isAsc));
    } else {
        sorted = [...array].sort((a, b) => {
            // Get nested values from objects
            let newA: any = isObject(a) ? getValueByPath(a, key) : a;
            let newB: any = isObject(b) ? getValueByPath(b, key) : b;

            // sort boolean type
            if (typeof newA === "boolean" && typeof newB === "boolean") {
                return isAsc ? (newA > newB ? 1 : -1) : newA > newB ? -1 : 1;
            }

            if (!newA && newA !== 0) return 1;
            if (!newB && newB !== 0) return -1;
            if (newA === newB) return 0;

            newA = typeof newA === "string" ? newA.toUpperCase() : newA;
            newB = typeof newB === "string" ? newB.toUpperCase() : newB;

            return isAsc ? (newA > newB ? 1 : -1) : newA > newB ? -1 : 1;
        });
    }

    return sorted;
}

/**
 * Deeply check if two values are equal
 */
export function isEqual(valueA: unknown, valueB: unknown): boolean {
    // Check if only one value is empty.
    if ((!valueA && !!valueB) || (!!valueA && !valueB)) return false;

    // If both objects are identical, return true.
    if (valueA === valueB) return true;

    // Check if both values are objecs.
    if (isObject(valueA) && isObject(valueB)) {
        // Get the keys of both objects.
        const keys1 = Object.keys(valueA);
        const keys2 = Object.keys(valueB);

        // Check if the number of keys is the same.
        if (keys1.length !== keys2.length) return false;

        // Iterate through the keys and compare their values recursively.
        for (const key of keys1) {
            const val1 = valueA[key];
            const val2 = valueB[key];
            const areObjects = isObject(val1) && isObject(val2);
            if (
                (areObjects && !isEqual(val1, val2)) ||
                (!areObjects && val1 !== val2)
            )
                return false;
        }
        // If all checks pass, the objects are deep equal.
        return true;
    }

    // Check if both values are arrays.
    if (Array.isArray(valueA) && Array.isArray(valueB)) {
        // Check if the number of keys is the same.
        if (valueA.length !== valueB.length) return false;
        // Check if each value of the array is the same.
        if (!valueA.every((val, index) => val === valueB[index])) return false;
        // If all checks pass, the arrays are deep equal.
        return true;
    }

    return false;
}

/**
 * Returns true if it is a DOM element
 * @source https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 */
export function isElement(el: any): el is Element {
    return typeof HTMLElement === "object"
        ? el instanceof HTMLElement //DOM2
        : el &&
              typeof el === "object" &&
              el !== null &&
              el.nodeType === 1 &&
              typeof el.nodeName === "string";
}

/**
 * Return display text for an option.
 * If option is an object, get the property from path based on given field, or else just the property.
 * Apply a formatter function to the property if given.
 * Return the display label.
 *
 * @param option Object to the the label for
 * @param field  Property of the object to use as display text
 * @param formatter Function to format the option to a string
 */
export function getPropertyValue<T>(
    option?: T,
    field?: string,
    formatter?: (value: unknown, option: T) => string,
): string {
    if (!option) return "";

    const property =
        field && typeof option === "object"
            ? getValueByPath(option, field)
            : option;

    const label =
        typeof formatter === "function"
            ? formatter(property, option)
            : property;

    return String(label || "");
}

/**
 * Clone an obj with Object.assign
 */
export function softClone<T extends object>(obj: T): T {
    return Object.assign({}, obj);
}

/**
 * Merge function to replace Object.assign with deep merging possibility
 */
export function merge(target: any, source: any, deep = false): any {
    if (!isObject(target) || !isObject(source)) return source;
    if (!deep) return Object.assign(target, source);
    else return mergeDeep(target, source);
}

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
export function mergeDeep(target: any, source: any): any {
    if (!isObject(target) || !isObject(source)) return source;

    Object.getOwnPropertyNames(source).forEach((key) => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = mergeDeep(
                Object.assign({}, targetValue),
                sourceValue,
            );
        } else {
            target[key] = sourceValue;
        }
    });

    return target;
}

/**
 * Get a value of an object property/path even if it's nested
 */
export function getValueByPath<T>(
    obj: Record<string, any>,
    path: string,
    defaultValue?: T,
): typeof defaultValue extends undefined ? typeof defaultValue : T {
    const value: any = path
        .split(".")
        .reduce((o, i) => (typeof o !== "undefined" ? o[i] : undefined), obj);
    return typeof value !== "undefined" ? value : defaultValue;
}

/**
 * Set a value of an object property/path even if it's nested
 */
export function setValueByPath<T = any>(
    obj: Record<string, any>,
    path: string,
    value: T,
): void {
    const p = path.split(".");
    if (p.length === 1) {
        obj[path] = value;
        return;
    }
    const field = p[0];
    if (typeof obj[field] === "undefined") obj[field] = {};
    return setValueByPath(obj[field], p.slice(1).join("."), value);
}

export function removeElement(el: Element): void {
    if (typeof el.remove !== "undefined") {
        el.remove();
    } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
    }
}

/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */
export function escapeRegExpChars(value: string): string {
    if (!value) return value;
    // eslint-disable-next-line no-useless-escape
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * Remove accents/diacritics in a string in JavaScript
 * https://stackoverflow.com/a/37511463
 */
export function removeDiacriticsFromString(value: string): string {
    if (!value) return value;
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** checks if a vue vnode is empty */
export function isVNodeEmpty(vnode): boolean {
    if (!vnode) return true;
    if (vnode.type === Comment) return true;
    if (vnode.type === Text && !vnode.children.trim()) return true;
    if (vnode.type === Fragment && isVNodeEmpty(vnode.children)) return true;
    return false;
}

/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export const isMobileAgent = {
    Android: (): boolean =>
        typeof window !== "undefined" &&
        !!window.navigator.userAgent.match(/Android/i),
    BlackBerry: (): boolean =>
        typeof window !== "undefined" &&
        !!window.navigator.userAgent.match(/BlackBerry/i),
    iOS: (): boolean =>
        typeof window !== "undefined" &&
        !!window.navigator.userAgent.match(/iPhone|iPad|iPod/i),
    Opera: (): boolean =>
        typeof window !== "undefined" &&
        !!window.navigator.userAgent.match(/Opera Mini/i),
    Windows: (): boolean =>
        typeof window !== "undefined" &&
        !!window.navigator.userAgent.match(/IEMobile/i),
    any: (): boolean =>
        isMobileAgent.Android() ||
        isMobileAgent.BlackBerry() ||
        isMobileAgent.iOS() ||
        isMobileAgent.Opera() ||
        isMobileAgent.Windows(),
};
