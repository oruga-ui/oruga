import { onMounted, ref } from "vue";
import { getOption } from "@/utils/config";
import { useEventListener } from "./useEventListener";

/**
 * Checks if the match media is mobile.
 * @param mobileBreakpoint px breakpoint
 */
export function useMatchMedia(mobileBreakpoint?: string) {
    const isMobile = ref(false);

    onMounted(() => {
        const width = getOption(
            `mobileBreakpoint`,
            mobileBreakpoint || "1023px",
        );
        const mediaQuery = window.matchMedia(`(max-width: ${width})`);
        isMobile.value = mediaQuery ? mediaQuery.matches : false;
    });

    useEventListener("change", onMatchMedia);

    function onMatchMedia(event: any): void {
        isMobile.value = event.matches;
    }

    return { isMobile };
}
