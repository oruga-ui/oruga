import type { App, Plugin } from "vue";

import Steps from "./Steps.vue";
import StepItem from "./StepItem.vue";

import { registerComponent } from "@/utils/plugins";

/** export steps specific types */
export type * from "./utils";

/** export steps plugin */
export default {
    install(app: App) {
        registerComponent(app, Steps);
        registerComponent(app, StepItem);
    },
} as Plugin;

/** export steps components */
export { Steps as OSteps, StepItem as OStepItem };
