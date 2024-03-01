import type { App, Plugin } from "vue";

import UseProgrammatic from "./UseProgrammatic";

import { registerComponentProgrammatic } from "@/utils/plugins";

/** export modal specific types */
export type { ProgrammaticProps } from "./types";

/** export modal plugin */
export default {
    install(app: App) {
        registerComponentProgrammatic(app, "programmatic", UseProgrammatic);
    },
} as Plugin;

// no component export here
