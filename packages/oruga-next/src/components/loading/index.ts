import type { App, Plugin } from "vue";

import Loading from "./Loading.vue";
import LoadingProgrammatic from "./LoadingProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export loading specific types */
export type { LoadingProps } from "./LoadingProgrammatic";

/** export loading plugin */
export default {
    install(app: App) {
        registerComponent(app, Loading);
        registerComponentProgrammatic(app, "loading", LoadingProgrammatic);
    },
} as Plugin;

/** export loading components */
export { LoadingProgrammatic, Loading as OLoading };
