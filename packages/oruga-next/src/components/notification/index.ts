import type { App, DefineComponent, Plugin } from "vue";
import { createVNode, render } from "vue";

import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";

import { VueInstance, getOption } from "@/utils/config";
import { merge } from "@/utils/helpers";
import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";
import type { ProgrammaticInstance } from "@/types";

import InstanceRegistry from "@/utils/InstanceRegistry";
import type { ProgrammaticExpose } from "@/types";

export type NotifcationProps = InstanceType<typeof Notification>["$props"];
export type NotifcationNoticeProps = InstanceType<
    typeof NotificationNotice
>["$props"];

declare module "@/types" {
    interface OrugaProgrammatic {
        notification: typeof NotificationProgrammatic;
    }
}

let localVueInstance: App;

const instances = new InstanceRegistry<typeof NotificationNotice>();

const NotificationProgrammatic = {
    open(
        params: Readonly<string | (NotifcationNoticeProps & NotifcationProps)>,
    ): InstanceType<typeof NotificationNotice> & ProgrammaticExpose {
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
            position: getOption("notification.position", "top-right"),
        };

        const propsData = merge(defaultParams, componentParams);
        propsData.notification = Object.assign({}, propsData);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const defaultSlot = () => slot;

        const app = localVueInstance || VueInstance;
        const vnode = createVNode(NotificationNotice, propsData, defaultSlot);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));
        // return exposed functionalities
        return vnode.component.proxy as InstanceType<
            typeof NotificationNotice
        > &
            ProgrammaticExpose;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default {
    install(app: App) {
        localVueInstance = app;
        registerComponent(app, Notification);
        registerComponentProgrammatic(
            app,
            "notification",
            NotificationProgrammatic,
        );
    },
} as Plugin;

export { Notification as ONotification, NotificationProgrammatic };

export interface ONotification {
    content: string | DefineComponent[] | undefined;
}
