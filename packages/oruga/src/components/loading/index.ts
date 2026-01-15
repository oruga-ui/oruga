import type { App, Plugin } from "vue";

import Loading from "./Loading.vue";
import useLoadingProgrammatic, {
  LoadingProgrammaticFactory,
} from "./useLoadingProgrammatic";

import { registerComponent, registerComponentInterface } from "@/utils/plugins";

/** export loading specific types */
export type { LoadingProgrammaticOptions } from "./useLoadingProgrammatic";

/** export loading plugin */
export default {
  install(app: App) {
    registerComponent(app, Loading);
    registerComponentInterface(app, "loading", LoadingProgrammaticFactory);
  },
} as Plugin;

/** export loading components & composables */
export { Loading as OLoading, useLoadingProgrammatic };
