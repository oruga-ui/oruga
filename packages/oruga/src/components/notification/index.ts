import type { App, Plugin } from "vue";

import Notification from "./Notification.vue";
import useNotificationProgrammatic from "./useNotificationProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export notification specific types */
// no types to export here

/** export notification plugin */
export default {
    install(app: App) {
        registerComponent(app, Notification);
        registerComponentProgrammatic(
            app,
            "notification",
            useNotificationProgrammatic,
        );
    },
} as Plugin;

/** export notification components & composables */
export { Notification as ONotification, useNotificationProgrammatic };
