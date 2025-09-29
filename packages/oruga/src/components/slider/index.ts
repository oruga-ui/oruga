import type { App } from "vue";

import Slider from "./Slider.vue";
import SliderTick from "./SliderTick.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export slider specific types */
export type * from "./types";

/** export slider plugin */
export default {
    install(app: App) {
        registerComponent(app, Slider);
        registerComponent(app, SliderTick);
    },
} as OrugaComponentPlugin;

/** export slider components */
export { Slider as OSlider, SliderTick as OSliderTick };
