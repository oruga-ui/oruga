/**
 * Debounce a function call to limit the rate at which it will be invoked.
 * @param func function to debounce
 * @param wait debounce time to wait
 * @param immediate call immediate once
 * @returns function to call
 */
export function useDebounce<A extends Array<unknown>>(
    func: (...args: A) => void,
    wait: number,
    immediate?: boolean,
): (...args: A) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: A) => {
        const later = (): void => {
            timeout = undefined;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}
