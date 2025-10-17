import type { App, Plugin } from "vue";

import { registerComponentInterface } from "@/utils/plugins";
import InstanceRegistry from "./InstanceRegistry";

import useProgrammaticComponent, {
    ProgrammaticFactory,
    ProgrammaticComponentFactory,
} from "./useProgrammatic";

/** export programmatic specific types */
export type {
    ProgrammaticOptions,
    ProgrammaticTarget,
    ProgrammaticExpose,
    ProgrammaticComponentOptions,
} from "./useProgrammatic";
export type { CloseEventArgs } from "./ProgrammaticComponent";

/** export programmatic plugin */
export default {
    install(app: App) {
        registerComponentInterface(
            app,
            "programmatic",
            ProgrammaticComponentFactory,
        );
    },
} as Plugin;

/** export programmatic classes & composables here */
export {
    InstanceRegistry,
    ProgrammaticComponentFactory,
    ProgrammaticFactory,
    useProgrammaticComponent,
};
