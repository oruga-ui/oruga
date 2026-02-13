import type { App } from "vue";

import Field from "./Field.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export field plugin */
export default {
    install(app: App): void {
        registerComponent(app, Field);
    },
} satisfies OrugaComponentPlugin;

/** export field components */
export { Field as OField };
