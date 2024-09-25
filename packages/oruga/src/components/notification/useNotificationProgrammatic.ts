import type { ComponentInternalInstance } from "vue";
import {
    InstanceRegistry,
    useProgrammatic,
    type PublicProgrammaticComponentOptions,
    type ProgrammaticExpose,
} from "../programmatic";
import { getOption } from "@/utils/config";

import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";

import type { ComponentProps } from "vue-component-type-helpers";

declare module "../../index" {
    interface OrugaProgrammatic {
        notification: typeof useNotificationProgrammatic;
    }
}

/** notification component programmatic instance registry */
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** all properties of the notification component */
export type NotifcationProps = ComponentProps<typeof Notification>;
export type NotifcationNoticeProps = ComponentProps<typeof NotificationNotice>;

/** useNotificationProgrammatic composable options */
type NotifcationProgrammaticOptions = Readonly<
    Omit<NotifcationNoticeProps, "container">
> &
    Readonly<Omit<NotifcationProps, "message">> & {
        message?: string | Array<unknown>;
    } & PublicProgrammaticComponentOptions;

const useNotificationProgrammatic = {
    /**
     * create a new programmatic modal component
     * @param options notification message string or notification component props object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open(
        options: string | NotifcationProgrammaticOptions,
        target?: string | HTMLElement,
    ): ProgrammaticExpose {
        const _options: NotifcationProgrammaticOptions =
            typeof options === "string" ? { message: options } : options;

        let slot;
        // render message as slot when is an array
        if (Array.isArray(_options.message)) {
            slot = _options.message;
            delete _options.message;
        }

        const componentProps: NotifcationNoticeProps = {
            position: getOption("notification.position", "top-right"),
            ..._options, // pass all props to the internal notification component
            container: null, // this will be overridden by the `useProgrammatic` composable
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
    /** close the last registred instance in the notification programmatic instance registry */
    close(...args: unknown[]): void {
        instances.last()?.exposed.close(...args);
    },
    /** close all instances in the programmatic notification instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default useNotificationProgrammatic;
