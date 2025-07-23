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
 * Adds `clipped` or `keeped` class to the body.
 * True, alias `clip` removes the body scrollbar.
 * False, alias `keep` makes a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts.
 * @param clipScroll clip scrollbar or not
 */
export function usePreventScrolling(
    clipScroll: MaybeRefOrGetter<boolean>,
): (active: boolean) => void {
    const scrollClipClasses = defineClasses([
        "scrollClipClass",
        "o-scroll-clip",
    ]);
    const scrollKeepClasses = defineClasses([
        "scrollKeepClass",
        "o-scroll-keep",
    ]);

    const scrollClass = computed(() =>
        getActiveClasses(
            toValue(clipScroll)
                ? scrollClipClasses.value
                : scrollKeepClasses.value,
        ),
    );

    const savedScrollTop = ref<number>();

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

        if (!toValue(clipScroll)) {
            if (active) {
                document.body.style.top = `-${savedScrollTop.value}px`;
            } else {
                document.documentElement.scrollTop = savedScrollTop.value;
                document.body.style.top = "";
                savedScrollTop.value = undefined;
            }
        }
    }

    return toggleScroll;
}
