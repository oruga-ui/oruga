import { getCurrentInstance, ref } from "vue";
import { getOption } from "@/utils/config";
import { useEventListener } from "./useEventListener";

/**
 * Checks if the match media is mobile.
 * @param mobileBreakpoint px breakpoint
 */
export function useMatchMedia(mobileBreakpoint?: string) {
    const isMobile = ref(false);
    const mediaQuery = ref();

    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useMatchMedia must be called within a component setup function.",
        );
    // get component props
    const props = vm.props;

    const configField = vm.proxy?.$options.configField;
    if (!configField)
        throw new Error("component must define the 'configField' option.");

    // get mobileBreakpoint width value
    let width = props.mobileBreakpoint;
    if (!width) {
        const defaultWidth = getOption(
            `mobileBreakpoint`,
            mobileBreakpoint || "1023px",
        );

        width = getOption(`${configField}.mobileBreakpoint`, defaultWidth);
    }

    // define match media query ref
    mediaQuery.value = window.matchMedia(`(max-width: ${width})`);

    if (mediaQuery.value) {
        isMobile.value = mediaQuery.value.matches;
        useEventListener("change", onMatchMedia, mediaQuery.value);
    } else {
        isMobile.value = false;
    }

    function onMatchMedia(event: any): void {
        isMobile.value = event.matches;
    }

    return { isMobile };
}
