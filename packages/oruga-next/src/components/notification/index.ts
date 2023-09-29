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
import InstanceRegistry from "@//utils/InstanceRegistry";

declare module "@/types" {
    interface OrugaPrgrammatic {
        notification: typeof NotificationProgrammatic;
    }
}

let localVueInstance: App;

const instances = new InstanceRegistry<typeof NotificationNotice>();

const NotificationProgrammatic = {
    open(params): InstanceType<typeof NotificationNotice> {
        let newParams;
        if (typeof params === "string") {
            newParams = {
                message: params,
            };
        } else {
            newParams = params;
        }

        const defaultParams = {
            programmatic: { instances },
            position: getOption("notification.position", "top-right"),
            closable:
                params.closable || getOption("notification.closable", false),
        };

        let slot;
        if (Array.isArray(newParams.message)) {
            slot = newParams.message;
            delete newParams.message;
        }

        newParams.active = true;
        const propsData = merge(defaultParams, newParams);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        propsData.propsNotification = Object.assign({}, propsData);
        propsData.propsNotification.isActive = true;
        const defaultSlot = () => slot;

        const app = localVueInstance || VueInstance;
        const vnode = createVNode(NotificationNotice, propsData, defaultSlot);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));
        return vnode.component.proxy as InstanceType<typeof NotificationNotice>;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.close(...args));
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
