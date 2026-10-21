import type { Component } from "vue";
import type { AnimationName, ComponentClass, ComponentEmits } from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type DrawerProps<C extends Component = Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether drawer is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Drawer header title, unnecessary when title slot is used */
    title?: string;
    /** Drawer header subtitle, unnecessary when subtitle slot is used */
    subtitle?: string;
    /** Drawer body content, unnecessary when content slot is used */
    content?: string;
    /** Show a loading spinner in the drawer */
    loading?: boolean;
    /** Show label beside the loading icon */
    loadingLabel?: string;
    /**
     * Show a backdrop overlay background; make it a modal dialog.
     * The rest of the page becomes inert while the drawer is open.
     * The backdrop can be styled with the `::backdrop` pseudo-element.
     */
    backdrop?: boolean;
    /**
     * Drawer position
     * @values top, right, bottom, left
     */
    position?: "top" | "right" | "bottom" | "left";
    /** Show drawer in full screen */
    fullscreen?: boolean;
    /**
     * Allow the user to resize the drawer by dragging its inner edge or with the arrow keys.
     * The drawer is resized in width for the positions `left` and `right`, otherwise in height.
     * The size is limited by the CSS `min-width` / `max-width` (`min-height` / `max-height`) of the drawer and the viewport.
     * Has no effect when the drawer is in `fullscreen`.
     */
    resizable?: boolean;
    /**
     * Open/close animation using the native Web Animations API.
     * By default the drawer slides in from the edge defined by `position`.
     * Set to `false` to disable the built-in animation.
     *
     * Alternatively, a fully custom transition can be implemented using a `@starting-style` CSS at-rule, with no JS needed.
     * @default 'slide-from-<position>'
     */
    animation?: AnimationName | false;
    /** Adds close button to the header to hide the drawer */
    closeable?: boolean;
    /**
     * Close when clicked outside of the panel.
     * Requires a browser with `closedby` support of the dialog element.
     */
    closeOnBackdrop?: boolean;
    /** Close when pressing escape key */
    closeOnEscape?: boolean;
    /** Close the drawer when the confirm button is pressed */
    closeOnConfirm?: boolean;
    /**
     * Set `true` to remove the body scrollbar.
     * When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
     * but will set the body to a fixed position, which may break some layouts.
     */
    blockScroll?: boolean;
    /**
     * Icon pack to use for the close icon
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Close icon name */
    closeIcon?: string;
    /** Close icon size */
    closeIconSize?: string;
    /** Accessibility label for the close button */
    ariaCloseLabel?: string;
    /** Accessibility label for the resize handle */
    ariaResizeLabel?: string;
    /** Render a confirm button and set text as label */
    confirmButton?: string;
    /**
     * Color variant of the confirm button
     * @values primary, info, success, warning, danger, and any other custom color
     */
    confirmVariant?: string;
    /** Disable the confirm button */
    disableConfirm?: boolean;
    /** Render a cancel button and set text as label */
    cancelButton?: string;
    /**
     * Color variant of the cancel button
     * @values primary, info, success, warning, danger, and any other custom color
     */
    cancelVariant?: string;
    /** Disable the cancel button */
    disableCancel?: boolean;
    /** Position of the footer buttons */
    buttonPosition?: "center" | "left" | "right";
    /** Accessibility aria-label to be passed to the dialog element */
    ariaLabel?: string;
    /** Accessibility aria-describedby to be passed to the dialog element */
    ariaDescribedby?: string;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
    /**
     * DOM container element for programmatic usage.
     * @ignore internal property
     */
    container?: HTMLElement;
    /**
     * Component to be injected.
     * Close the component by emitting a 'close' event — `$emit('close')`
     */
    component?: C;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmits<C>;
} & DrawerClasses;

// class props (will not be displayed in the docs)
export type DrawerClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element when active */
    activeClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the root element with position */
    positionClass: ComponentClass;
    /** Class of the root element when is fullscreen */
    fullscreenClass: ComponentClass;
    /** Class of the root element when is resizable */
    resizableClass: ComponentClass;
    /** Class of the root element while the drawer is being resized */
    resizingClass: ComponentClass;
    /** Class of the resize handle element */
    resizeHandleClass: ComponentClass;
    /** Class of the header element */
    headerClass: ComponentClass;
    /** Class of the header title element */
    titleClass: ComponentClass;
    /** Class of the header subtitle element */
    subtitleClass: ComponentClass;
    /** Class of the header close element */
    closeClass: ComponentClass;
    /** Class of the body element */
    bodyClass: ComponentClass;
    /** Class of the footer element */
    footerClass: ComponentClass;
    /** Class of the footer element with position */
    footerPositionClass: ComponentClass;
    /** Class of the footer confirm button element */
    confirmButtonClass: ComponentClass;
    /** Class of the footer cancel button element */
    cancelButtonClass: ComponentClass;
    /** Class of the body when is visible and scroll is clipped */
    scrollClipClass: ComponentClass;
    /** Class of the body when is visible and scroll is keeped */
    scrollKeepClass: ComponentClass;
}>;
