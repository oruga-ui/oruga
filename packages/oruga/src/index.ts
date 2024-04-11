import type { App, Plugin } from "vue";
import type { OrugaOptions } from "./types";

import * as plugins from "./components/plugins";

import { ConfigProgrammatic, OrugaConfig } from "./utils/config";
import { registerPlugin, registerComponentProgrammatic } from "./utils/plugins";

// export all types
export * from "./types";
export * from "./components/types";

// export all vue components
export * from "./components";
// export all components as vue plugin
export * from "./components/plugins";

// export programmatic config
export {
    OrugaConfig,
    /** @deprecated use `OrugaConfig` instead - will be removed with 0.9 */
    OrugaConfig as ConfigPlugin, // todo: remove export later - beaking change
    ConfigProgrammatic,
};

// export programmatic composable
export { useOruga } from "./utils/programmatic";

// main oruga vue plugin
const plugin: Plugin = {
    install(app: App, options: OrugaOptions = {}) {
        // initialise config with options
        app.use(OrugaConfig, options);

        // add all components
        if (options.dontRegisterComponents !== true) {
            const skipList = options.dontRegisterComponents ?? [];

            for (const componentKey in plugins) {
                if (skipList.includes(componentKey)) {
                    continue;
                }
                registerPlugin(app, plugins[componentKey]);
            }
        }

        // add programmatic config component
        registerComponentProgrammatic(app, "config", ConfigProgrammatic);
    },
};

// export default oruga vue plugin
export { plugin as Oruga };
export default plugin;
