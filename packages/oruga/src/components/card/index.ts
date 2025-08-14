import type { App, Plugin } from "vue";

import Card from "./Card.vue";

import { registerComponent } from "@/utils/plugins";

/** export card plugin */
export default {
    install(app: App) {
        registerComponent(app, Card);
    },
} as Plugin;

/** export card components */
export { Card as OButton };
