import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        carousel?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element in overlay */
                overlayClass: ClassDefinition;
                /** Class of the wrapper element of carousel items */
                wrapperClass: ClassDefinition;
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
                /** Class of carousel item when is active */
                itemActiveClass: ClassDefinition;
                /** Class of carousel item when is clickable */
                itemClickableClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Timer interval for `autoplay` */
                interval: number;
                /** Position of the indicator - depends on used theme */
                indicatorPosition: string;
                /** Style of the indicator - depends on used theme */
                indicatorStyle: string;
                /** Number of items to show at once*/
                itemsToShow: number;
                /** Number of items to switch at once */
                itemsToList: number;
                /** Show next / prev arrows */
                arrows: boolean;
                /** Show next / prev arrows only on hover */
                arrowsHover: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon name for next icon */
                iconNext: string;
            }>;
    }
}
