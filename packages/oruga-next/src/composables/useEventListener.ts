import { onBeforeUnmount, onMounted } from "vue";

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * @param event event name
 * @param listener event listener function
 * @param el = docuemnt
 */
export function useEventListener(
    event: string,
    listener: (evt?: any) => any,
    el: Element | Document | Window = document,
): void {
    onMounted(() => {
        if (typeof window !== "undefined") {
            el.addEventListener(event, listener);
        }
    });
    onBeforeUnmount(() => {
        if (typeof window !== "undefined") {
            el.removeEventListener(event, listener);
        }
    });
}
