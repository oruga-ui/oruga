import { createVNode, render } from "vue";

import NotificationNotice from "./NotificationNotice.vue";
import type { NotifcationNoticeProps, NotifcationProps } from "./types";

import InstanceRegistry from "@/utils/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { merge } from "@/utils/helpers";
import { getOption } from "@/utils/config";
import type { OrugaOptions, ProgrammaticExpose } from "@/types";

declare module "../../index" {
    interface OrugaProgrammatic {
        notification: typeof NotificationProgrammatic;
    }
}

const instances = new InstanceRegistry<typeof NotificationNotice>();

type ProgrammaticProps = Readonly<
    | string
    | (NotifcationNoticeProps &
          NotifcationProps &
          OrugaOptions["notification"] &
          Record<string, unknown>)
>;

const NotificationProgrammatic = {
    open(params: ProgrammaticProps): ProgrammaticExpose {
        const componentParams =
            typeof params === "string"
                ? {
                      message: params,
                  }
                : { ...params };

        let slot;
        if (Array.isArray(componentParams.message)) {
            slot = componentParams.message;
            delete componentParams.message;
        }

        const defaultParams = {
            programmatic: { instances },
            position: getOption("notification.position", "top-right"),
        };

        const notificationParams = componentParams.notification
            ? componentParams.notification
            : componentParams;

        const propsData = merge(defaultParams, componentParams);
        propsData.notification = merge({}, notificationParams);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const defaultSlot = () => slot;

        const app = VueInstance;
        const vnode = createVNode(NotificationNotice, propsData, defaultSlot);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));

        // return exposed functionalities
        return vnode.component.exposed as ProgrammaticExpose;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default NotificationProgrammatic;
