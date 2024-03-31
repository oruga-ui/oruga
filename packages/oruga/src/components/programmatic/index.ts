import type { App, Plugin } from "vue";

import UseProgrammatic from "./UseProgrammatic";

import { registerComponentProgrammatic } from "@/utils/plugins";

/** export programmatic specific types */
export type { ProgrammaticProps } from "./UseProgrammatic";

/** export programmatic plugin */
export default {
    install(app: App) {
        registerComponentProgrammatic(app, "programmatic", UseProgrammatic);
    },
} as Plugin;

// no component export here
