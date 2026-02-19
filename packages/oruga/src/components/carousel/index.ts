import type { App } from "vue";

import Carousel from "./Carousel.vue";
import CarouselItem from "./CarouselItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export carousel specific types */
export type * from "./props";

/** export carousel plugin */
export default {
    install(app: App): void {
        registerComponent(app, Carousel);
        registerComponent(app, CarouselItem);
    },
} satisfies OrugaComponentPlugin;

/** export carousel components */
export { Carousel as OCarousel, CarouselItem as OCarouselItem };
