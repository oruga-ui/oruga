import type { App, Plugin } from "vue";

import Slider from "./Slider.vue";
import SliderTick from "./SliderTick.vue";

import { registerComponent } from "@/utils/plugins";

/** export slider specific types */
export type * from "./utils";

/** export slider plugin */
export default {
    install(app: App) {
        registerComponent(app, Slider);
        registerComponent(app, SliderTick);
    },
} as Plugin;

/** export slider components */
export { Slider as OSlider, SliderTick as OSliderTick };
