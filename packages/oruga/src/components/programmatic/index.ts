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
    ProgrammaticTarget,
    ProgrammaticExpose,
    ProgrammaticComponentOptions,
} from "./useProgrammatic";
export type { CloseEventArgs } from "./ProgrammaticComponent";

/** export programmatic plugin */
export default {
    install(app, { oruga }): void {
        registerProgrammatic(
            oruga,
            "programmatic",
            ProgrammaticComponentFactory,
        );
    },
} satisfies OrugaComponentPlugin;

/** export programmatic classes & composables here */
export {
    InstanceRegistry,
    ProgrammaticComponentFactory,
    ProgrammaticFactory,
    useProgrammaticComponent,
};
