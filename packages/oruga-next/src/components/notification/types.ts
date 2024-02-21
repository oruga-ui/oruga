import type { ComponentProps } from "vue-component-type-helpers";

import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";

export type NotifcationProps = ComponentProps<typeof Notification>;

export type NotifcationNoticeProps = ComponentProps<typeof NotificationNotice>;
