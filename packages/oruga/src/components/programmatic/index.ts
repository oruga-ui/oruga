import type { App, Plugin } from "vue";

import ComponentProgrammatic from "./useProgrammatic";

import { registerComponentProgrammatic } from "@/utils/plugins";
import InstanceRegistry from "./InstanceRegistry";

/** export programmatic specific types */
export type {
    ProgrammaticOptions,
    ProgrammaticExpose,
    ProgrammaticComponentOptions,
} from "./useProgrammatic";
export { InstanceRegistry };

/** export programmatic plugin */
export default {
    install(app: App) {
        registerComponentProgrammatic(
            app,
            "programmatic",
            ComponentProgrammatic,
        );
    },
} as Plugin;

/** export composables here */
export { ComponentProgrammatic } from "./useProgrammatic";
