import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        sidebar?: ComponentConfigBase &
            Partial<{
                /** Show a small sidebar */
                reduce: boolean;
                /** Sidebar position */
                position: "top" | "bottom" | "left" | "right";
                /** Custom animation (transition name) */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the sidebar */
                variant: string;
                /** Class of the sidebar variant */
                variantClass: ClassDefinition;
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: string;
                /** Show an overlay like modal */
                overlay: boolean;
                /** Class of the sidebar overlay */
                overlayClass: ClassDefinition;
                /** Class of the sidebar content */
                contentClass: ClassDefinition;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of sidebar component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of sidebar when teleported */
                teleportClass: ClassDefinition;
                /** Class of the sidebar when its inlined */
                inlineClass: ClassDefinition;
                /** Is Sidebar cancleable by pressing escape or clicking outside. */
                cancelable: boolean | string[];
                /** DOM element where the sidebar component will be created on (for programmatic usage). */
                container: string | HTMLElement;
                /** Destroy sidebar on hide */
                destroyOnHide: boolean;
                /** Class of sidebar component when its active */
                activeClass: ClassDefinition;
                /** Class of the body when sidebar is not clipped */
                noScrollClass: ClassDefinition;
                /** Class of the sidebar position */
                positionClass: ClassDefinition;
                /** Show sidebar in fullheight */
                fullheight: boolean;
                /** Show sidebar in fullwidth */
                fullwidth: boolean;
                /** Custom layout on mobile */
                mobile: string;
                /** Expand sidebar on hover when reduced or mobile is reduce */
                expandOnHover: boolean;
                /** Class of the sidebar when is fullheight */
                fullheightClass: ClassDefinition;
                /** Class of the sidebar when is fullwidth */
                fullwidthClass: ClassDefinition;
                /** Class of the sidebar when reduced */
                reduceClass: ClassDefinition;
                /** Class of the sidebar when expanded on hover */
                expandOnHoverClass: ClassDefinition;
                /** Class of the body when sidebar clipped */
                crollClipClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is hidden */
                hiddenClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is visible */
                visibleClass: ClassDefinition;
            }>;
    }
}
