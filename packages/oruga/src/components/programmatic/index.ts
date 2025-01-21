import type { App, Plugin } from "vue";

import useProgrammatic from "./useProgrammatic";

import { registerComponentProgrammatic } from "@/utils/plugins";
import InstanceRegistry from "./InstanceRegistry";

/** export programmatic specific types */
export type {
    ProgrammaticOptions,
    ProgrammaticExpose,
    PublicProgrammaticComponentOptions,
} from "./useProgrammatic";
export { InstanceRegistry };

/** export programmatic plugin */
export default {
    install(app: App) {
        registerComponentProgrammatic(app, "programmatic", useProgrammatic);
    },
} as Plugin;

/** export composables here */
export { useProgrammatic } from "./useProgrammatic";
