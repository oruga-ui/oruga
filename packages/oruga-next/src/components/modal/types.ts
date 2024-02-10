import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        modal?: ComponentConfigBase &
            Partial<{
                /** Custom animation (transition name) */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: string;
                /** Class of the modal overlay */
                overlayClass: ClassDefinition;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
                /** Class of the modal content */
                contentClass: ClassDefinition;
                /** Trap focus inside the modal */
                trapFocus: boolean;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of modal component when on mobile */
                mobileClass: ClassDefinition;
                /** Is Modal cancleable by clicking 'X', pressing escape or clicking outside */
                cancelable: boolean | string[];
                /** DOM element where the modal component will be created on (for programmatic usage) */
                container: string | HTMLElement;
                /** Width of the Modal */
                width: string | number;
                /** Accessibility aria-label to be passed to the div wrapper element */
                ariaLabel: string;
                /** Destroy modal on hide */
                destroyOnHide: boolean;
                /** Automatically focus modal when active */
                autoFocus: boolean;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Class of modal component when its active */
                activeClass: ClassDefinition;
                /** Class of the close button */
                closeClass: ClassDefinition;
                /** Class of the modal when fullscreen */
                fullScreenClass: ClassDefinition;
                /** Class of the modal when scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the modal when scroll is not clip */
                noScrollClass: ClassDefinition;
            }>;
    }
}
