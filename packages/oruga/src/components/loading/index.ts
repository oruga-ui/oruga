import type { App, Plugin } from "vue";

import Loading from "./Loading.vue";
import LoadingProgrammatic from "./useLoadingProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export loading specific types */
export type { LoadingProgrammaticOptions } from "./useLoadingProgrammatic";

/** export loading plugin */
export default {
    install(app: App) {
        registerComponent(app, Loading);
        registerComponentProgrammatic(app, "loading", LoadingProgrammatic);
    },
} as Plugin;

/** export loading components & composables */
export { Loading as OLoading, LoadingProgrammatic };
