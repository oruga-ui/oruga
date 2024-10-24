import type { Component } from "vue";
import type { ComponentClass } from "@/types";
import type { ComponentEmit, ComponentProps } from "vue-component-type-helpers";

export type NotificationProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Whether modal is active or not, use v-model:active to make it two-way binding */
    active?: boolean;
    /**
     * Type (color) of the notification
     * @values info, success, warning, danger
     */
    type?: string;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Which position the notification will appear when programmatically
     * @values top-right, top, top-left, bottom-right, bottom, bottom-left
     */
    position?:
        | "top-right"
        | "top"
        | "top-left"
        | "bottom-right"
        | "bottom"
        | "bottom-left";
    /** Message text (can contain HTML), unnecessary when default slot is used */
    message?: string | string[];
    /** Custom animation (transition name) */
    animation?: string;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon name to use */
    icon?: string;
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize?: string;
    /** Add close button to the item that closes the notification */
    closable?: boolean;
    /** Close icon name */
    closeIcon?: string;
    /**
     * Size of close icon
     * @values small, medium, large
     */
    closeIconSize?: string;
    /** Accessibility label for the close button */
    ariaCloseLabel?: string;
} & NotificationClasses;

// class props (will not be displayed in the docs)
type NotificationClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the close button */
    closeClass: ComponentClass;
    /** Class of the content element */
    contentClass: ComponentClass;
    /** Class of the icon on the left */
    iconClass: ComponentClass;
    /** Class of the element when positioned */
    positionClass: ComponentClass;
    /** Class of the notification variant */
    variantClass: ComponentClass;
    /** Class of the wrapper element */
    wrapperClass: ComponentClass;
}>;

export type NotificationNoticeProps<C extends Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * DOM element the toast will be created on (for programmatic usage).
     * Note that this also changes the position of the toast from fixed to absolute.
     * Meaning that the container should be fixed.
     * @ignore internal property
     */
    container: HTMLElement;
    /**
     * Which position the notification will appear.
     * @values top-right, top, top-left, bottom-right, bottom, bottom-left
     */
    position?:
        | "top-right"
        | "top"
        | "top-left"
        | "bottom-right"
        | "bottom"
        | "bottom-left";
    /** Hide notification after duration (in miliseconds) */
    duration?: number;
    /** Show the Notification infinitely until it is dismissed. */
    infinite?: boolean;
    /** If notice should queue with others notices (snackbar/toast/notification). */
    queue?: boolean;
    /**
     * Component to be injected.
     * Close notification within the component by emitting a 'close' event — $emit('close').
     */
    component?: Component;
    /** Props to be binded to the injected component */
    props?: ComponentProps<C>;
    /** Events to be binded to the injected component */
    events?: ComponentEmit<C>;
} & NotificationNoticeClasses;

// class props (will not be displayed in the docs)
type NotificationNoticeClasses = Partial<{
    /** Root class of the notice */
    noticeClass: ComponentClass;
    /** Class of the notice when positioned */
    noticePositionClass: ComponentClass;
    /** Class of the custom container element */
    noticeContainerClass: ComponentClass;
}>;
