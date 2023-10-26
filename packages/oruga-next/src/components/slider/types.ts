import Slider from "./Slider.vue";

export type SliderProps = InstanceType<typeof Slider>["$props"];

export type SliderComponent = {
    min: number;
    max: number;
};
