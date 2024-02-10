import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        slider?: ComponentConfigBase &
            Partial<{
                /** Vertical size of slider */
                size: string;
                /** Rounded thumb */
                rounded: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the slider */
                variant: string;
                /** Class when slider is disabled */
                disabledClass: ClassDefinition;
                /** Class of the vertical slider size */
                sizeClass: ClassDefinition;
                /** Class of the slider variant */
                variantClass: ClassDefinition;
                /** Accessibility aria-label to to be passed to the slider thumb element. */
                ariaLabel: string | string[];
                /** Show tooltip when thumb is being dragged */
                tooltip: boolean;
                /** Color of the tooltip */
                tooltipVariant: string;
                /** Define v-model format */
                format: string;
                /** Class of the slider track */
                trackClass: ClassDefinition;
                /** Class of the filled part of the slider */
                fillClass: ClassDefinition;
                /** Class when the slider is rounded */
                thumbRoundedClass: ClassDefinition;
                /** Class when the thumb gets dragged */
                thumbDraggingClass: ClassDefinition;
                /** Class of the thumb wrapper */
                thumbWrapperClass: ClassDefinition;
                /** Class of the thumb */
                thumbClass: ClassDefinition;
                /** Class of slider tick */
                tickClass: ClassDefinition;
                /** Class when slider tick is hidden */
                tickHiddenClass: ClassDefinition;
                /** Class of tick label */
                tickLabelClass: ClassDefinition;
            }>;
    }
}
