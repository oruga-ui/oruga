import type { ClassDefinition, ComponentConfigBase } from "@/types";
import Sidebar from "./Sidebar.vue";

export type SidebarProps = InstanceType<typeof Sidebar>["$props"];

declare module "@/types" {
    interface OrugaOptions {
        sidebar?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of modal component when its active */
                activeClass: ClassDefinition;
                /** Class of the sidebar overlay */
                overlayClass: ClassDefinition;
                /** Class of the sidebar content */
                contentClass: ClassDefinition;
                /** Class of the sidebar position */
                positionClass: ClassDefinition;
                /** Class of the sidebar when is fullheight */
                fullheightClass: ClassDefinition;
                /** Class of the sidebar when is fullwidth */
                fullwidthClass: ClassDefinition;
                /** Class of the sidebar when its inlined */
                inlineClass: ClassDefinition;
                /** Class of the sidebar when reduced */
                reduceClass: ClassDefinition;
                /** Class of the sidebar when expanded on hover */
                expandOnHoverClass: ClassDefinition;
                /** Class of the sidebar variant */
                variantClass: ClassDefinition;
                /** Class of sidebar component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the body when sidebar clipped */
                scrollClipClass: ClassDefinition;
                /** Class of the body when sidebar is not clipped */
                noScrollClass: ClassDefinition;
                /** Class of the sidebar when sidebar is hidden */
                hiddenClass: ClassDefinition;
                /** Class of the sidebar when sidebar is visible */
                visibleClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Show sidebar in fullheight */
                fullheight: boolean;
                /** Show sidebar in fullwidth */
                fullwidth: boolean;
                /** Show a small sidebar */
                reduce: boolean;
                /** Custom layout on mobile */
                mobile: string;
                /** Expand sidebar on hover when reduced or mobile is reduce */
                expandOnHover: boolean;
                /**
                 * Is Sidebar cancleable by pressing escape or clicking outside.
                 */
                cancelable: string[] | boolean;
                /**
                 * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
                 * but will set body to position fixed, might break some layouts.
                 */
                scroll: string;
                /** Destroy sidebar on hide */
                destroyOnHide: boolean;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /**  DOM element where the loading component will be created on */
                container: string | HTMLElement;
                /** Append the component to another part of the DOM. */
                teleport: boolean | string;
                /** Custom animation (transition name) */
                animation: string;
                /** Color of the sidebar */
                variant: string;
                /** Show an overlay like modal */
                overlay: boolean;
                /** Sidebar position */
                position: string;
            }>;
    }
}
