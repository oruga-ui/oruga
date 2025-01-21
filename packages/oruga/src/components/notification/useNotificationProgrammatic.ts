import type { Component, ComponentInternalInstance } from "vue";
import {
    InstanceRegistry,
    useProgrammatic,
    type PublicProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";
import { getOption } from "@/utils/config";

import NotificationNotice from "./NotificationNotice.vue";

import type { NotificationProps, NotificationNoticeProps } from "./props";

declare module "../../index" {
    interface OrugaProgrammatic {
        notification: typeof useNotificationProgrammatic;
    }
}

/** notification component programmatic instance registry */
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** useNotificationProgrammatic composable options */
export type NotificationProgrammaticOptions<C extends Component> = Readonly<
    Omit<
        NotificationNoticeProps<C> & NotificationProps,
        "message" | "container"
    >
> & {
    message?: string | Array<unknown>;
} & PublicProgrammaticComponentOptions;

const useNotificationProgrammatic = {
    /** Returns the number of registered active instances. */
    count: instances.count,
    /**
     * Create a new programmatic modal component instance.
     * @param options notification message string or notification component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open<C extends Component>(
        options: string | NotificationProgrammaticOptions<C>,
        target?: string | HTMLElement | null,
    ): ProgrammaticExpose {
        const _options: NotificationProgrammaticOptions<C> =
            typeof options === "string" ? { message: options } : options;

        let slot;
        // render message as slot when is an array
        if (Array.isArray(_options.message)) {
            slot = _options.message;
            delete _options.message;
        }

        const componentProps: NotificationNoticeProps<C> = {
            position: getOption("notification.position", "top-right"),
            container: document.body,
            ..._options, // pass all props to the internal notification component
        };

        // create programmatic component
        return useProgrammatic.open(
            NotificationNotice,
            {
                instances, // custom programmatic instance registry
                target, // target the component get rendered into
                props: componentProps, // component specific props
                onClose: _options.onClose, // on close event handler
            },
            // component default slot render
            slot,
        );
    },
    /** Close the last registred instance in the notification programmatic instance registry. */
    close(...args: unknown[]): void {
        instances.last()?.exposed?.close(...args);
    },
    /** Close all instances in the programmatic notification instance registry. */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed?.close(...args));
    },
};

export default useNotificationProgrammatic;
