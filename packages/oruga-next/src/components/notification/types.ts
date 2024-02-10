import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        notification?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the close button container */
                closeClass: ClassDefinition;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the icon on the left */
                iconClass: ClassDefinition;
                /** Class of the element when positioned */
                positionClass: ClassDefinition;
                /** Class of the notification variant */
                variantClass: ClassDefinition;
                /** Class of the wrapper element */
                wrapperClass: ClassDefinition;
                /** Root class of the notice */
                noticeClass: ClassDefinition;
                /** Class of the notice when positioned */
                noticePositionClass: ClassDefinition;
                /** Class of the custom container element */
                noticeCustomContainerClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Color of the control */
                variant: string;
                /** Which position the notification will appear when programmatically */
                position: string;
                /** Custom animation (transition name) */
                animation: string;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /* Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Hide notification after duration (in miliseconds) */
                duration: number;
                /** If notice should queue with others notices (snackbar/toast/notification). */
                queue: boolean;
                /**  DOM element where the loading component will be created on */
                container: string | HTMLElement;
            }>;
    }
}
