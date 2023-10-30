import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";

export type NotifcationProps = InstanceType<typeof Notification>["$props"];

export type NotifcationNoticeProps = InstanceType<
    typeof NotificationNotice
>["$props"];
