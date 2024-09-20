import type { App, Plugin } from "vue";

import Programmatic from "./useProgrammatic";

import { registerComponentProgrammatic } from "@/utils/plugins";

/** export programmatic specific types */
export type {
    ProgrammaticOptions,
    ProgrammaticExpose,
} from "./useProgrammatic";

/** export programmatic plugin */
export default {
    install(app: App) {
        registerComponentProgrammatic(app, "programmatic", Programmatic);
    },
} as Plugin;

/** export composables here */
export { useProgrammatic } from "./useProgrammatic";
