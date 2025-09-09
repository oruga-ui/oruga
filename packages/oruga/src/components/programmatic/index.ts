import InstanceRegistry from "./InstanceRegistry";

import useProgrammaticComponent, {
    ProgrammaticFactory,
    ProgrammaticComponentFactory,
} from "./useProgrammatic";

import { registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export programmatic specific types */
export type {
    ProgrammaticOptions,
    ProgrammaticExpose,
    ProgrammaticComponentOptions,
} from "./useProgrammatic";
export type { CloseEventArgs } from "./ProgrammaticComponent";

/** export programmatic plugin */
export default {
    install(app, { oruga }) {
        registerProgrammatic(
            oruga,
            "programmatic",
            ProgrammaticComponentFactory,
        );
    },
} as OrugaComponentPlugin;

/** export programmatic classes & composables here */
export {
    InstanceRegistry,
    ProgrammaticComponentFactory,
    ProgrammaticFactory,
    useProgrammaticComponent,
};
