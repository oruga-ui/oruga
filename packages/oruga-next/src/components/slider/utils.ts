import type { ComponentProps } from "vue-component-type-helpers";
import Slider from "./Slider.vue";

export type SliderProps = ComponentProps<typeof Slider>;

export type SliderComponent = {
    min: number;
    max: number;
};
