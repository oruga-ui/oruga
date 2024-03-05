import type { App, Plugin } from "vue";
import type { OrugaOptions } from "./types";

import * as plugins from "./components/plugins";

import { ConfigProgrammatic, ConfigPlugin } from "./utils/config";
import { registerPlugin, registerComponentProgrammatic } from "./utils/plugins";

// export all types
export * from "./types";
export * from "./components/types";

// export all vue components
export * from "./components";
// export all components as vue plugin
export * from "./components/plugins";

// export programmatic components
export { LoadingProgrammatic } from "./components/loading";
export { ModalProgrammatic } from "./components/modal";
export { NotificationProgrammatic } from "./components/notification";
export { ConfigProgrammatic } from "./utils/config";
// export programmatic plugins
export { ConfigPlugin } from "./utils/config";

// export programmatic composable
export { useOruga } from "./utils/programmatic";

// default export main oruga vue plugin
const plugin: Plugin = {
    install(app: App, options: OrugaOptions = {}) {
        // enable programmatic config registering
        app.use(ConfigPlugin, options);

        // add components
        for (const componentKey in plugins) {
            registerPlugin(app, plugins[componentKey]);
        }

        // add programmatic config component
        registerComponentProgrammatic(app, "config", ConfigProgrammatic);
    },
};

export { plugin as Oruga };
export default plugin;

declare module "./index" {
    interface OrugaProgrammatic {
        config: typeof ConfigProgrammatic;
    }
}
