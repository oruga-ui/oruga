import type { App } from "vue";

import Loading from "./Loading.vue";
import useLoadingProgrammatic, {
    LoadingProgrammaticFactory,
} from "./useLoadingProgrammatic";

import { registerComponent, registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export loading specific types */
export type { LoadingProgrammaticOptions } from "./useLoadingProgrammatic";

/** export loading plugin */
export default {
    install(app: App, { oruga }) {
        registerComponent(app, Loading);
        registerProgrammatic(oruga, "loading", LoadingProgrammaticFactory);
    },
} as OrugaComponentPlugin;

/** export loading components & composables */
export { Loading as OLoading, useLoadingProgrammatic };
