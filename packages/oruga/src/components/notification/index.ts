import type { App, Plugin } from "vue";

import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";
import useNotificationProgrammatic, {
    NotificationProgrammaticFactory,
} from "./useNotificationProgrammatic";

import { registerComponent, registerComponentInterface } from "@/utils/plugins";

/** export notification specific types */
export type { NotificationProgrammaticOptions } from "./useNotificationProgrammatic";

/** export notification plugin */
export default {
    install(app: App) {
        registerComponent(app, Notification);
        registerComponentInterface(
            app,
            "notification",
            NotificationProgrammaticFactory,
        );
    },
} as Plugin;

/** export notification components & composables */
export {
    Notification as ONotification,
    NotificationNotice as ONotificationNotice,
    useNotificationProgrammatic,
};
