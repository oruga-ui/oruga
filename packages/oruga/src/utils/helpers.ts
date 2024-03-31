/**
 * Generates a random string
 */
export const uuid = (): string => Math.random().toString(36).substring(2, 15);

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

export const isObject = <T>(obj: T): boolean =>
    obj && typeof obj === "object" && !Array.isArray(obj);

export const isDefined = <T>(d: T): boolean => d !== null && d !== undefined;

export const blankIfUndefined = (value: string): string =>
    typeof value !== "undefined" && value !== null ? value : "";

export const defaultIfUndefined = <T>(
    value: T | undefined,
    defaultValue: T,
): T => (typeof value !== "undefined" && value !== null ? value : defaultValue);

export const toCssDimension = (width: string | number): string | number =>
    !isDefined(width) ? null : isNaN(width as number) ? width : width + "px";

/**
 * Extension of indexOf method by equality function if specified
 */
export function indexOf<T>(
    array: T[],
    obj: T,
    fn: (value: T, array: T[]) => boolean,
): number {
    if (!array) return -1;
    if (!fn || typeof fn !== "function") return array.indexOf(obj);
    return array.findIndex((value, index, arr) => fn(value, arr));
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
export function isElement(o: any): boolean {
    return typeof HTMLElement === "object"
        ? o instanceof HTMLElement //DOM2
        : o &&
              typeof o === "object" &&
              o !== null &&
              o.nodeType === 1 &&
              typeof o.nodeName === "string";
}

/**
 * Clone an obj with Object.assign
 */
export function clone<T extends object>(obj: T): T {
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
