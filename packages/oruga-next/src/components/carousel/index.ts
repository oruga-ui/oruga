import type { App, Plugin } from "vue";

import Carousel from "./Carousel.vue";
import CarouselItem from "./CarouselItem.vue";

import { registerComponent } from "@/utils/plugins";

/** export carousel specific types */
export type * from "./types";

/** export carousel plugin */
export default {
    install(app: App) {
        registerComponent(app, Carousel);
        registerComponent(app, CarouselItem);
    },
} as Plugin;

/** export carousel components */
export { Carousel as OCarousel, CarouselItem as OCarouselItem };
