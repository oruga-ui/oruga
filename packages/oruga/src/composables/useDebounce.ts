import { toValue, type MaybeRefOrGetter } from "vue";

/**
 * Debounce execution of a function to limit the rate at which it will be invoked.
 * @param fn A function to be executed after delay milliseconds debounced.
 * @param ms A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @returns A new, debounce, function to call.
 */
export function useDebounce<A extends Array<unknown>>(
    fn: (...args: A) => void,
    ms: MaybeRefOrGetter<number>,
): (...args: A) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return (...args: A) => {
        const debouncedFunc = (): void => {
            timeout = undefined;
            fn.apply(this, args);
        };

        // clear old timeout
        if (timeout) clearTimeout(timeout);

        // create new timeout to call debounced function
        timeout = setTimeout(debouncedFunc, toValue(ms));
    };
}
