import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        carousel?: ComponentConfigBase &
            Partial<{
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the wrapper element of carousel items */
                wrapperClass: ClassDefinition;
                /** Timer interval for `autoplay` */
                interval: number;
                /** Position of the indicator - depends on used theme */
                indicatorPosition: string;
                /** Style of the indicator - depends on used theme */
                indicatorStyle: string;
                /** Number of items to show at once */
                itemsToShow: number;
                /** Number of items to switch at once */
                itemsToList: number;
                /** Show next / prev arrows */
                arrows: boolean;
                /** Show next / prev arrows only on hover */
                arrowsHover: boolean;
                /** Icon size */
                iconSize: string;
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon name for next icon */
                iconNext: string;
                /** Class of the root element in overlay */
                overlayClass: ClassDefinition;
                /** Class of slider items */
                itemsClass: ClassDefinition;
                /** Class of slider items on drag */
                itemsDraggingClass: ClassDefinition;
                /** Class of arrow elements */
                arrowIconClass: ClassDefinition;
                /** Class of prev arrow element */
                arrowIconPrevClass: ClassDefinition;
                /** Class of next arrow element */
                arrowIconNextClass: ClassDefinition;
                /** Class of indicator link element */
                indicatorClass: ClassDefinition;
                /** Class of indicators wrapper element */
                indicatorsClass: ClassDefinition;
                /** Class of indicators wrapper element when inside */
                indicatorsInsideClass: ClassDefinition;
                /** Class of indicators wrapper element when inside and position */
                indicatorsInsidePositionClass: ClassDefinition;
                /** Class of indicator item element */
                indicatorItemClass: ClassDefinition;
                /** Class of indicator element when is active */
                indicatorItemActiveClass: ClassDefinition;
                /** Class of indicator element to separate different styles */
                indicatorItemStyleClass: ClassDefinition;
                /** Class of carousel item */
                itemClass: ClassDefinition;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Class of carousel item when is active */
                itemActiveClass: ClassDefinition;
                /** Class of carousel item when is clickable */
                itemClickableClass: ClassDefinition;
            }>;
    }
}
