import type {
    Component,
    ComponentInternalInstance,
    MaybeRefOrGetter,
} from "vue";
import {
    InstanceRegistry,
    ComponentProgrammatic,
    type ProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";
import { getOption } from "@/utils/config";

import NotificationNotice from "./NotificationNotice.vue";

import type { NotificationProps, NotificationNoticeProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        notification: typeof NotificationProgrammatic;
    }
}

/** notification component programmatic instance registry */
const registry = new InstanceRegistry<ComponentInternalInstance>();

/** useNotificationProgrammatic composable options */
export type NotificationProgrammaticOptions<C extends Component> = Readonly<
    Omit<NotificationNoticeProps<C>, "container">
> &
    Readonly<NotificationProps> &
    ProgrammaticComponentOptions<typeof NotificationNotice<C>>;

const NotificationProgrammatic = {
    /** Returns the number of registered active instances. */
    count: registry.count,
    /**
     * Create a new programmatic notification component instance.
     * @param options notification message string or notification component props object
     * @param target specify a target the component get rendered into - default is `document.body`
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: string | NotificationProgrammaticOptions<C>,
        target?: MaybeRefOrGetter<string | HTMLElement | null>,
    ): ProgrammaticExpose<typeof NotificationNotice<C>> {
        const _options: NotificationProgrammaticOptions<C> =
            typeof options === "string" ? { message: options } : options;

        const componentProps: NotificationNoticeProps<C> = {
            position: getOption("notification.position", "top-right"),
            container: document.body,
            ..._options, // pass all props to the internal notification component
        };

        // create programmatic component
        return ComponentProgrammatic.open(NotificationNotice, {
            registry, // custom programmatic instance registry
            target, // target the component get rendered into
            props: componentProps, // component specific props
            onClose: _options.onClose, // on close event handler
        });
    },
    /** Close the last registred instance in the notification programmatic instance registry. */
    close(...args: unknown[]): void {
        registry.last()?.exposed?.close(...args);
    },
    /** Close all instances in the programmatic notification instance registry. */
    closeAll(...args: unknown[]): void {
        registry.walk((entry) => entry.exposed?.close(...args));
    },
};

export default NotificationProgrammatic;
