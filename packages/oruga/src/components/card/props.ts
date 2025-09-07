import type { Component } from "vue";
import type { ComponentClass, ComponentEmits } from "@/types";
import type { ComponentProps } from "vue-component-type-helpers";

export type CardProps<C extends Component = Component> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Card header title, unnecessary when title slot is used */
    title?: string;
    /** Card header subtitle, unnecessary when subtitle slot is used */
    subtitle?: string;
    /** Card body content, unnecessary when content slot is used */
    content?: string;
    /** Card image src, unnecessary when image slot is used */
    imageSrc?: string;
    /** Card image alt, unnecessary when image slot is used */
    imageAlt?: string;
    /** Show a loading spinner in the card */
    loading?: boolean;
    /**  Show label beside the loading icon */
    loadingLabel?: string;
    /** Adds close button to the header */
    closeable?: boolean;
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
} & CardClasses;

// class props (will not be displayed in the docs)
export type CardClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the header element */
    headerClass: ComponentClass;
    /** Class of the header title element */
    titleClass: ComponentClass;
    /** Class of the header subtitle element */
    subtitle: ComponentClass;
    /** Class of the header close element */
    closeClass: ComponentClass;
    /** Class of the image container */
    imageClass: ComponentClass;
    /** Class of the image figure element */
    figureClass: ComponentClass;
    /** Class of the body element */
    bodyClass: ComponentClass;
    /** Class of the body content element */
    contentClass: ComponentClass;
    /** Class of the footer element */
    footerClass: ComponentClass;
}>;
