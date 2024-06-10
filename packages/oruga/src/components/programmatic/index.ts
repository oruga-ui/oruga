import type { App, Plugin } from "vue";

import Programmatic from "./Programmatic";

import { registerComponentProgrammatic } from "@/utils/plugins";

/** export programmatic specific types */
export type { ProgrammaticProps } from "./Programmatic";

/** export programmatic plugin */
export default {
    install(app: App) {
        registerComponentProgrammatic(app, "programmatic", Programmatic);
    },
} as Plugin;

// no component export here
