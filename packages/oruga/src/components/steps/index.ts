import type { App } from "vue";

import Steps from "./Steps.vue";
import StepItem from "./StepItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export steps specific types */
export type * from "./types";

/** export steps plugin */
export default {
    install(app: App) {
        registerComponent(app, Steps);
        registerComponent(app, StepItem);
    },
} as OrugaComponentPlugin;

/** export steps components */
export { Steps as OSteps, StepItem as OStepItem };
