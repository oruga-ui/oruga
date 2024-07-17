import {
    computed,
    onBeforeUnmount,
    ref,
    toValue,
    type MaybeRefOrGetter,
} from "vue";

import { isClient } from "@/utils/ssr";
import { defineClasses, getActiveClasses } from "./defineClasses";

/**
 * Prevent the background from scrolling if toggled.
 * Adds `clippled` or `noscroll` class to the body.
 * `clip` removes the body scrollbar.
 * `keep` makes a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts.
 * @param noScroll keep scrollbar or not
 */
export function usePreventScrolling(
    noScroll: MaybeRefOrGetter<boolean> = false,
): (active: boolean) => void {
    const withScrollClasses = defineClasses(["scrollClipClass", "o-clipped"]);
    const noScrollClasses = defineClasses(["noScrollClass", "o-noscroll"]);

    const scrollClass = computed(() =>
        getActiveClasses(
            toValue(noScroll) ? noScrollClasses.value : withScrollClasses.value,
        ),
    );

    const savedScrollTop = ref(null);

    // reset scroll
    onBeforeUnmount(() => toggleScroll(false));

    function toggleScroll(active: boolean): void {
        if (!isClient) return;
        if (!scrollClass.value) return;

        savedScrollTop.value = savedScrollTop.value
            ? savedScrollTop.value
            : document.documentElement.scrollTop;

        if (active) document.body.classList.add(...scrollClass.value);
        else document.body.classList.remove(...scrollClass.value);

        if (toValue(noScroll)) {
            if (active) {
                document.body.style.top = `-${savedScrollTop.value}px`;
            } else {
                document.documentElement.scrollTop = savedScrollTop.value;
                document.body.style.top = null;
                savedScrollTop.value = null;
            }
        }
    }

    return toggleScroll;
}
