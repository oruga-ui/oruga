/**
 * Debounce a function
 * @param func function to debounce
 * @param wait debounce time to wait
 * @param immediate call immediate
 * @returns function to call
 */
export function useDebounce<A extends Array<unknown>>(
    func: (...args: A) => void,
    wait: number,
    immediate?: boolean,
): (...args: A) => void {
    let timeout: NodeJS.Timeout;
    return (...args: A) => {
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
