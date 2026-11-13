import { onScopeDispose, toValue, watch, type MaybeRefOrGetter } from "vue";
import { isClient } from "@/utils/ssr";
import { getDefault } from "@/utils/config";

export type ScrollLock = "clip" | "keep" | "off";

type SharedLock = {
    /** whether the lock was taken with the `clip` mode */
    clips: boolean;
    classes: string[];
    scrollTop: number;
    /** inline style of the body before the lock, restored on release */
    bodyStyle: { paddingRight: string; top: string };
};

// Module-level state shared across all composable instances, so that stacked
// overlays (e.g. a modal opening a dialog) don't cancel each other.
let lockCount = 0;
let sharedLock: SharedLock | null = null;

/**
 * Prevent the background from scrolling while `active` is true.
 * The lock is released when `active` turns false or the scope is disposed.
 * Every instance holds at most one lock, so closing and unmounting an overlay
 * never releases the lock of another one.
 *
 * Adds the global `scrollClipClass` or `scrollKeepClass` (from OrugaConfig root) to the body.
 * - `clip` clips the page at the viewport and hides the body scrollbar via `overflow: hidden`.
 * - `keep` keeps an inert scrollbar via `position: fixed` to prevent layout shift,
 *   which may break some layouts.
 * - `off` does not prevent scrolling.
 *
 * When overlays are stacked, the mode of the first one to lock wins.
 *
 * @param active whether the scroll should be prevented
 * @param scrollLock which mode to use when locking scroll
 */
export function useScrollLock(
    active: MaybeRefOrGetter<boolean>,
    scrollLock: MaybeRefOrGetter<ScrollLock>,
): void {
    // whether this instance currently holds one of the locks
    let locked = false;

    function lock(): void {
        if (!isClient || locked) return;

        const mode = toValue(scrollLock);
        if (mode === "off") return;

        if (lockCount === 0) {
            const clips = mode === "clip";
            const classes = (
                clips
                    ? getDefault("scrollClipClass", "o-scroll-clip")
                    : getDefault("scrollKeepClass", "o-scroll-keep")
            )
                .split(" ")
                .filter(Boolean);

            // without a class the body would not be locked, so the style
            // compensation below would only shift the layout
            if (!classes.length) return;

            const { body, documentElement } = document;
            sharedLock = {
                clips,
                classes,
                scrollTop: window.scrollY,
                bodyStyle: {
                    paddingRight: body.style.paddingRight,
                    top: body.style.top,
                },
            };

            body.classList.add(...classes);

            if (clips) {
                // Compensate for the scrollbar disappearing to prevent layout shift.
                const scrollbarWidth =
                    window.innerWidth - documentElement.clientWidth;
                body.style.paddingRight = `${scrollbarWidth}px`;
            } else {
                // The body is fixed, so offset it to keep the visual scroll position.
                body.style.top = `-${sharedLock.scrollTop}px`;
            }
        }

        locked = true;
        lockCount++;
    }

    function unlock(): void {
        if (!isClient || !locked) return;

        locked = false;
        if (--lockCount > 0 || !sharedLock) return;

        // Last lock released: restore everything.
        const { clips, classes, scrollTop, bodyStyle } = sharedLock;
        sharedLock = null;

        document.body.classList.remove(...classes);

        if (clips) {
            document.body.style.paddingRight = bodyStyle.paddingRight;
        } else {
            document.body.style.top = bodyStyle.top;
            // `instant` avoids an animated jump when the page sets `scroll-behavior: smooth`
            window.scrollTo({ top: scrollTop, behavior: "instant" });
        }
    }

    // Post flush, so the body is not locked before the overlay is rendered.
    // The initial run of an immediate watcher is synchronous either way.
    watch(
        () => toValue(active),
        (value) => (value ? lock() : unlock()),
        { immediate: true, flush: "post" },
    );

    // release on component unmount, even if still active
    onScopeDispose(unlock);
}
