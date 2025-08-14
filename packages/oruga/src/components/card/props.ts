import type { ComponentClass } from "@/types";

export type CardProps = {
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
    /** Adds close button to the header */
    closeable?: boolean;
    /** Accessibility label for the close button */
    ariaCloseLabel?: string;
    /**
     * Icon pack to use for the close icon
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Close icon name */
    closeIcon?: string;
    /** Close icon size */
    closeIconSize?: string;
    /** Show a loading spinner in the card */
    loading?: boolean;
    /**  Show label beside the loading icon */
    loadingLabel?: string;
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
