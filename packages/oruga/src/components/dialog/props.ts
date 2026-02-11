import type { Component } from "vue";
import type { ComponentClass, ComponentEmits, Numberish } from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type DialogProps<C extends Component = Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether dialog is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Custom animation (transition name) */
    animation?: string;
    /** Show an backdrop overlay background; make it a modal dialog */
    backdrop?: boolean;
    /**
     * This enables the `alertdialog` role, allowing assistive technologies and browsers to distinguish alert dialogs from other dialogs.
     * Alert dialogs interrupt the user's workflow to communicate an important messages and acquire an explicit response.
     * Examples include error messages that require confirmation and other action confirmation prompts.
     */
    alert?: boolean;
    /** Display dialog as full screen */
    fullscreen?: boolean;
    /** Max width of the dialog */
    maxWidth?: Numberish;
    /** Max height of the dialog */
    maxHeight?: Numberish;
    /** Adds close button to the header to hide the dialog */
    closeable?: boolean;
    /** Close the dialog when clicked outside of the panel */
    closeOnBackdrop?: boolean;
    /** Close the dialog when pressing escape key */
    closeOnEscape?: boolean;
    /** Close the dialog when the confirm button is preset */
    closeOnConfirm?: boolean;
    /** Whether background scrollbar should be blocked/removed when dialog is visible */
    blockScroll?: boolean;
    /** Text alignment in its entirely */
    textPosition?: "center" | "left" | "right";
    /** Dialog header title, unnecessary when title slot is used */
    title?: string;
    /** Dialog header subtitle, unnecessary when subtitle slot is used */
    subtitle?: string;
    /** Dialog body content, unnecessary when content slot is used */
    content?: string;
    /** Dialog image src, unnecessary when image slot is used */
    imageSrc?: string;
    /** Dialog image alt, unnecessary when image slot is used */
    imageAlt?: string;
    /** Show a loading spinner in the dialog */
    loading?: boolean;
    /**  Show label beside the loading icon */
    loadingLabel?: string;
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
    /**
     * Component to be injected.
     * Close the component by emitting a 'close' event — `$emit('close')`
     */
    component?: C;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmits<C>;
    /** Render a confirm button and set text as label */
    confirmButton?: string;
    /** Disable the confirm button */
    disableConfirm?: boolean;
    /**
     * Color variant of the confirm button
     * @values primary, info, success, warning, danger, and any other custom color
     */
    confirmVariant?: string;
    /** Render a cancel button and set text text as label */
    cancelButton?: string;
    /** Disable the cancel button */
    disableCancel?: boolean;
    /**
     * Color variant of the cancel button
     * @values primary, info, success, warning, danger, and any other custom color
     */
    cancelVariant?: string;
    /** Position of the footer buttons */
    buttonPosition?: "center" | "left" | "right";
    /** Accessibility aria-label to be passed to the div root element */
    ariaLabel?: string;
    /** Accessibility aria-describedby to be passed to the div root element - if a title is set, it is linked to the title */
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
} & DialogClasses;

// class props (will not be displayed in the docs)
export type DialogClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element when active */
    activeClass: ComponentClass;
    /** Class of the root element when fullscreen */
    fullscreenClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the root element with text-position */
    textPositionClass: ComponentClass;
    /** Class of the backdrop overlay element */
    backdropClass: ComponentClass;
    /** Class of the wrapper element */
    wrapperClass: ComponentClass;
    /** Class of the header element */
    headerClass: ComponentClass;
    /** Class of the header title element */
    titleClass: ComponentClass;
    /** Class of the header subtitle element */
    subtitleClass: ComponentClass;
    /** Class of the header close element */
    closeClass: ComponentClass;
    /** Class of the image figure element */
    figureClass: ComponentClass;
    /** Class of the image element */
    imageClass: ComponentClass;
    /** Class of the body element */
    bodyClass: ComponentClass;
    /** Class of the body content element */
    contentClass: ComponentClass;
    /** Class of the footer element */
    footerClass: ComponentClass;
    /** Class of the footer element with position */
    footerPositionClass: ComponentClass;
    /** Class of the confirm button element */
    confirmButtunClass: ComponentClass;
    /** Class of the cancel button element */
    cancelButtonClass: ComponentClass;
    /** Class of the body when modal is open and scroll is clipped */
    scrollClipClass: ComponentClass;
    /** Class of the body when modal is open and scroll is keeped */
    scrollKeepClass: ComponentClass;
}>;
