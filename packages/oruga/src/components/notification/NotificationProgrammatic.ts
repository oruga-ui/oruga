import type { ComponentInternalInstance } from "vue";
import { useProgrammatic, type ProgrammaticExpose } from "../programmatic";
import InstanceRegistry from "@/utils/InstanceRegistry";
import { getOption } from "@/utils/config";

import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";

import type { ComponentProps } from "vue-component-type-helpers";

declare module "../../index" {
    interface OrugaProgrammatic {
        notification: typeof useNotificationProgrammatic;
    }
}

// notification component programmatic instance registry
const instances = new InstanceRegistry<ComponentInternalInstance>();

/** all properties of the notification component */
export type NotifcationProps = ComponentProps<typeof Notification>;
export type NotifcationNoticeProps = ComponentProps<typeof NotificationNotice>;

type NotifcationProgrammaticProps = Readonly<
    Omit<NotifcationNoticeProps, "container">
> &
    Readonly<Omit<NotifcationProps, "message">> & {
        message?: string | Array<unknown>;
    };

const useNotificationProgrammatic = {
    /**
     * create a new programmatic modal component
     * @param options modal content string or options object
     * @param target specify a target the component get rendered into
     * @returns ProgrammaticExpose
     */
    open(
        options: string | NotifcationProgrammaticProps,
        target?: string | HTMLElement,
    ): ProgrammaticExpose {
        const _options: NotifcationProgrammaticProps =
            typeof options === "string" ? { message: options } : options;

        let slot;
        // render message as slot when is an array
        if (Array.isArray(_options.message)) {
            slot = _options.message;
            delete _options.message;
        }

        const componentProps: NotifcationNoticeProps = {
            position: getOption("notification.position", "top-right"),
            notification: _options.notification
                ? _options.notification
                : _options,
            container: null, // this will be overridden by the `useProgrammatic` composable
        };

        // create programmatic component
        return useProgrammatic.open(
            NotificationNotice,
            {
                instances, // custom programmatic instance registry
                target, // target the component get rendered into
                props: componentProps, // component specific props
            },
            // component default slot render
            slot,
        );
    },
    /** close all instances in the programmatic modal instance registry */
    closeAll(...args: unknown[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default useNotificationProgrammatic;
