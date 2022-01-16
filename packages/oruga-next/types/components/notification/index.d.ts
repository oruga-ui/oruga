import Notification from './Notification.vue';
import { DefineComponent, Plugin } from 'vue';
declare const NotificationProgrammatic: {
    open(params: any): void;
};
declare const _default: Plugin;
export default _default;
export { Notification as ONotification, NotificationProgrammatic, };
export interface ONotification {
    content: string | DefineComponent[] | undefined;
}
