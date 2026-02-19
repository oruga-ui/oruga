import type { App } from "vue";

import Radio from "./Radio.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export radio specific types */
export type * from "./props";

/** export radio plugin */
export default {
    install(app: App): void {
        registerComponent(app, Radio);
    },
} satisfies OrugaComponentPlugin;

/** export radio components */
export { Radio as ORadio };
