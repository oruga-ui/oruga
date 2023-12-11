import type { ClassDefinition, ComponentConfigBase } from "@/types";
import Slider from "./Slider.vue";

export type SliderProps = InstanceType<typeof Slider>["$props"];

export type SliderComponent = {
    min: number;
    max: number;
};

declare module "../../index" {
    interface OrugaOptions {
        slider?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the vertical slider size */
                sizeClass: ClassDefinition;
                /** Class of the slider track */
                trackClass: ClassDefinition;
                /** Class of the filled part of the slider */
                fillClass: ClassDefinition;
                /** Class when the slider is rounded */
                thumbRoundedClass: ClassDefinition;
                /** Class when the thumb gets dragged */
                thumbDraggingClass: ClassDefinition;
                /** Class when slider is disabled */
                disabledClass: ClassDefinition;
                /** Class of the thumb wrapper */
                thumbWrapperClass: ClassDefinition;
                /** Class of the thumb */
                thumbClass: ClassDefinition;
                /** Class of the slider variant */
                variantClass: ClassDefinition;
                /** Class of slider tick */
                tickClass: ClassDefinition;
                /** Class when slider tick is hidden */
                tickHiddenClass: ClassDefinition;
                /** Class of tick label */
                tickLabelClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Color of the slider */
                variant: string;
                /** Vertical size of slider */
                size: string;
                /** Show tooltip when thumb is being dragged */
                tooltip: boolean;
                /** Color of the tooltip */
                tooltipVariant: string;
                /** Rounded thumb */
                rounded: boolean;
                /** Define v-model format */
                format: string;
                /** Accessibility aria-label to to be passed to the slider thumb element. */
                ariaLabel: string;
            }>;
    }
}
