import type { App, Plugin } from "vue";

import Notification from "./Notification.vue";
import NotificationProgrammatic from "./NotificationProgrammatic";

import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";

/** export notification specific types */
export type {
    NotifcationNoticeProps,
    NotifcationProps,
} from "./NotificationProgrammatic";

/** export notification plugin */
export default {
    install(app: App) {
        registerComponent(app, Notification);
        registerComponentProgrammatic(
            app,
            "notification",
            NotificationProgrammatic,
        );
    },
} as Plugin;

/** export notification components */
export { Notification as ONotification, NotificationProgrammatic };
