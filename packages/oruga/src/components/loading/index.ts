import type { App, Plugin } from "vue";

import Loading from "./Loading.vue";
import useLoadingProgrammatic from "./useLoadingProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export loading specific types */
// no types to export here

/** export loading plugin */
export default {
    install(app: App) {
        registerComponent(app, Loading);
        registerComponentProgrammatic(app, "loading", useLoadingProgrammatic);
    },
} as Plugin;

/** export loading components & composables */
export { Loading as OLoading, useLoadingProgrammatic };
