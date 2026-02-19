import type { App } from "vue";

import Taginput from "./Taginput.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export taginput specific types */
export type * from "./props";

/** export taginput plugin */
export default {
    install(Vue: App): void {
        registerComponent(Vue, Taginput);
    },
} satisfies OrugaComponentPlugin;

/** export taginput components */
export { Taginput as OTaginput };
