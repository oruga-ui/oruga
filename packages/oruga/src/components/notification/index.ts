import type { App } from "vue";

import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";
import useNotificationProgrammatic, {
    NotificationProgrammaticFactory,
} from "./useNotificationProgrammatic";

import { registerComponent, registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export notification specific types */
export type { NotificationProgrammaticOptions } from "./useNotificationProgrammatic";

/** export notification plugin */
export default {
    install(app: App, { oruga }) {
        registerComponent(app, Notification);
        registerProgrammatic(
            oruga,
            "notification",
            NotificationProgrammaticFactory,
        );
    },
} as OrugaComponentPlugin;

/** export notification components & composables */
export {
    Notification as ONotification,
    NotificationNotice as ONotificationNotice,
    useNotificationProgrammatic,
};
