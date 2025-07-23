import { getCurrentInstance, ref, type Ref } from "vue";
import { getOption } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import { useEventListener } from "./useEventListener";

/**
 * Checks if the match media is mobile.
 * @param mobileBreakpoint px breakpoint
 */
export function useMatchMedia(mobileBreakpoint?: string): {
    isMobile: Ref<boolean>;
} {
    const isMobile = ref(false);
    const mediaQuery = ref<MediaQueryList>();

    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useMatchMedia must be called within a component setup function.",
        );
    // get component props
    const props = vm.props;

    const componentKey = vm.proxy?.$options.configField;
    if (!componentKey)
        throw new Error("component must define the 'configField' option.");

    // get mobileBreakpoint width value
    let width = props.mobileBreakpoint;
    if (!width) {
        const defaultWidth = getOption(`mobileBreakpoint`, mobileBreakpoint);
        width = getOption(`${componentKey}.mobileBreakpoint`, defaultWidth);
    }
    if (!width) return { isMobile };

    // define match media query ref
    mediaQuery.value = isClient
        ? window.matchMedia(`(max-width: ${width})`)
        : undefined;

    if (mediaQuery.value) {
        isMobile.value = mediaQuery.value.matches;
        useEventListener(mediaQuery.value, "change", onMatchMedia);
    } else {
        isMobile.value = false;
    }

    function onMatchMedia(event: any): void {
        isMobile.value = event.matches;
    }

    return { isMobile };
}
