import type { App } from "vue";

import Card from "./Card.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export card plugin */
export default {
    install(app: App) {
        registerComponent(app, Card);
    },
} as OrugaComponentPlugin;

/** export card components */
export { Card as OCard };
