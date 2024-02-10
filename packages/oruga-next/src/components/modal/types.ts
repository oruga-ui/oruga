import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        modal?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of modal component when its active */
                activeClass: ClassDefinition;
                /** Class of the modal overlay */
                overlayClass: ClassDefinition;
                /** Class of the modal content */
                contentClass: ClassDefinition;
                /** Class of the close button */
                closeClass: ClassDefinition;
                /** Class of the modal when fullscreen */
                fullScreenClass: ClassDefinition;
                /** Class of modal component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the modal when scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the modal when scroll is not clip */
                noScrollClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Width of the Modal */
                width: string;
                /** Custom animation (transition name) */
                animation: string;
                /* Is Modal cancleable by clicking 'X', pressing escape or clicking outside */
                cancelable: string[] | boolean;
                /** Callback function to call after user canceled (clicked 'X' / pressed escap e / clicked outside) */
                onCancel: () => void;
                /** Callback function to call after close (programmatically close or user canceled) */
                onClose: () => void;
                /**
                 * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
                 * but will set body to position fixed, might break some layouts.
                 */
                scroll: string;
                /** Trap focus inside the modal */
                trapFocus: boolean;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Accessibility aria-label to be passed to the div wrapper element */
                ariaLabel: string;
                /** Destroy modal on hide */
                destroyOnHide: boolean;
                /** Automatically focus modal when active */
                autoFocus: string;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM. */
                teleport: boolean | string;
                /** DOM element where the modal component will be created on (for programmatic usage) */
                container: string | HTMLElement;
            }>;
    }
}
