import { unref } from "vue";

/**
 * Generates a random string
 */
export function uuid(): string {
    return Math.random().toString(36).substring(2, 15);
}

/**
 * +/- function to native math sign
 */
function signPoly(value: number): number {
    if (value < 0) return -1;
    return value > 0 ? 1 : 0;
}
export const sign = Math.sign || signPoly;

/**
 * Checks if the flag is set
 * @param val
 * @param flag
 * @returns {boolean}
 */
export function hasFlag(val: number, flag: number): boolean {
    return (val & flag) === flag;
}

/**
 * Native modulo bug with negative numbers
 * @param n
 * @param mod
 * @returns {number}
 */
export function mod(n: number, mod: number): number {
    return ((n % mod) + mod) % mod;
}

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
 * Get a value of an object property/path even if it's nested
 */
export function getValueByPath<T = any>(
    obj: Record<string, any>,
    path: string,
    defaultValue?: T,
): T {
    const value = path
        .split(".")
        .reduce(
            (o, i) => (typeof o !== "undefined" ? o[i] : undefined),
            obj,
        ) as T;
    return typeof value !== "undefined" ? value : defaultValue;
}

/**
 * Set a value of an object property/path even if it's nested
 */
export function setValueByPath<T>(
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

export function getStyleValue(value: any): any {
    if (typeof value === "object") {
        for (const key in value) {
            if (value[key]) return key;
        }
        return "";
    }
    return value;
}

/** Extension of indexOf method by equality function if specified */
export function indexOf<T>(
    array: T[],
    obj: T,
    fn: (value: T, array: T[]) => boolean,
): number {
    if (!array) return -1;
    if (!fn || typeof fn !== "function") return array.indexOf(obj);
    return array.findIndex((value, index, arr) => fn(value, arr));
}

export const isObject = <T>(obj: T): boolean =>
    obj && typeof obj === "object" && !Array.isArray(obj);

export const isDefined = <T>(d: T): boolean =>
    unref(d) !== null && unref(d) !== undefined;

export function blankIfUndefined(value: string): string {
    return typeof value !== "undefined" && value !== null ? value : "";
}

export function defaultIfUndefined<T>(
    value: T | undefined,
    defaultValue: T,
): T {
    return typeof value !== "undefined" && value !== null
        ? value
        : defaultValue;
}

export function clone<T extends object>(obj: T): T {
    return Object.assign({}, obj);
}

/**
 * Merge function to replace Object.assign with deep merging possibility
 */
export function merge(target: any, source: any, deep = false): any {
    if (!isObject(target) || !isObject(source)) {
        return source;
    }

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
    const isObject = (obj: any): any => obj && typeof obj === "object";

    if (!isObject(target) || !isObject(source)) {
        return source;
    }

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

export function removeElement(el: Element): void {
    if (typeof el.remove !== "undefined") {
        el.remove();
    } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
        el.parentNode.removeChild(el);
    }
}

export function createAbsoluteElement(el: Element): HTMLDivElement {
    const root = document.createElement("div");
    root.style.position = "absolute";
    root.style.left = "0px";
    root.style.top = "0px";
    const wrapper = document.createElement("div");
    root.appendChild(wrapper);
    wrapper.appendChild(el);
    document.body.appendChild(root);
    return root;
}

export function createNewEvent(eventName: string): Event {
    let event: any;
    if (typeof Event === "function") {
        event = new Event(eventName);
    } else {
        event = document.createEvent("Event");
        event.initEvent(eventName, true, true);
    }
    return event;
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

export function toCssDimension(width: string | number): string | number {
    return width === undefined
        ? null
        : isNaN(width as number)
          ? width
          : width + "px";
}

/**
 * @deprecated use useDebounce composable instead
 */
export function debounce<A extends Array<unknown>>(
    func: (...args: A[]) => void,
    wait: number,
    immediate?: boolean,
): (...args: A[]) => void {
    let timeout: NodeJS.Timeout;
    return (...args: A[]) => {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Remove accents/diacritics in a string in JavaScript
 * https://stackoverflow.com/a/37511463
 */
export function removeDiacriticsFromString(value: string): string {
    if (!value) return value;
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
