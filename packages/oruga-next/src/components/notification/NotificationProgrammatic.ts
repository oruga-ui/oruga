import { createVNode, render } from "vue";

import NotificationNotice from "./NotificationNotice.vue";

import InstanceRegistry from "@/utils/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { merge } from "@/utils/helpers";
import { getOption } from "@/utils/config";
import type {
    OrugaOptions,
    ProgrammaticExpose,
    ProgrammaticInstance,
} from "@/types";
import type { NotifcationNoticeProps, NotifcationProps } from "./types";

declare module "../../index" {
    interface OrugaProgrammatic {
        notification: typeof NotificationProgrammatic;
    }
}

const instances = new InstanceRegistry<typeof NotificationNotice>();

type ProgrammaticProps = Readonly<
    | string
    | (NotifcationNoticeProps & NotifcationProps & OrugaOptions["notification"])
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
            programmatic: { instances } as ProgrammaticInstance<
                typeof NotificationNotice
            >,
            active: true, // set the active state to true
            position: getOption("notification.position", "top-right"),
        };

        const propsData = merge(defaultParams, componentParams);
        propsData.notification = Object.assign({}, componentParams);
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
