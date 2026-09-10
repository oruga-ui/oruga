import { onBeforeUnmount, toValue, type MaybeRefOrGetter } from "vue";
import { isClient } from "@/utils/ssr";
import { getDefault } from "@/utils/config";

// Module-level state shared across all active scroll-lock instances so that
// stacked overlays (e.g. a modal opening a dialog) don't cancel each other.
let scrollLockCount = 0;
let sharedActiveClass: string[] | null = null;
let sharedIsClip: boolean | null = null;
let sharedSavedScrollTop: number | undefined;

/**
 * Prevent the background from scrolling if toggled.
 * Adds the global `scrollClipClass` or `scrollKeepClass` (from OrugaConfig root) to the body.
 * `clip` removes the body scrollbar via overflow:hidden.
 * `keep` maintains a phantom scrollbar via position:fixed to prevent layout shift.
 * @param scrollStrategy which strategy to use when locking scroll
 */
export function usePreventScrolling(
    scrollStrategy: MaybeRefOrGetter<"clip" | "keep">,
): (active: boolean) => void {
    const clipClass = getDefault("scrollClipClass", "o-scroll-clip")
        .split(" ")
        .filter(Boolean);
    const keepClass = getDefault("scrollKeepClass", "o-scroll-keep")
        .split(" ")
        .filter(Boolean);

    // reset scroll
    onBeforeUnmount(() => toggleScroll(false));

    function toggleScroll(active: boolean): void {
        if (!isClient) return;

        if (active) {
            if (scrollLockCount === 0) {
                // First activator owns the lock: snapshot strategy and class, save scroll position.
                sharedIsClip = toValue(scrollStrategy) === "clip";
                sharedActiveClass = sharedIsClip ? clipClass : keepClass;

                if (!sharedActiveClass.length) return;

                sharedSavedScrollTop = window.scrollY;
                document.body.classList.add(...sharedActiveClass);

                if (sharedIsClip) {
                    // Compensate for the scrollbar disappearing to prevent layout shift.
                    const scrollbarWidth =
                        window.innerWidth -
                        document.documentElement.clientWidth;
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                } else {
                    document.body.style.top = `-${sharedSavedScrollTop}px`;
                }
            }
            scrollLockCount++;
        } else if (scrollLockCount > 0) {
            if (--scrollLockCount === 0) {
                // Last activator to close: restore everything.
                if (sharedActiveClass) {
                    document.body.classList.remove(...sharedActiveClass);
                }

                if (!sharedIsClip) {
                    window.scrollTo({ top: sharedSavedScrollTop ?? 0 });
                    document.body.style.top = "";
                } else {
                    document.body.style.paddingRight = "";
                }

                sharedActiveClass = null;
                sharedIsClip = null;
                sharedSavedScrollTop = undefined;
            }
        }
    }

    return toggleScroll;
}
