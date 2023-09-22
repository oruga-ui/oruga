import Notification from "./Notification.vue";
import NotificationNotice from "./NotificationNotice.vue";

import { getOptions } from "../../utils/config";
import { getValueByPath } from "../../utils/helpers";
import { merge } from "../../utils/helpers";
import { VueInstance } from "../../utils/config";
import {
    registerComponent,
    registerProgrammaticComponent,
} from "../../utils/plugins";
import InstanceRegistry from "../..//utils/InstanceRegistry";

import type { App, DefineComponent, Plugin } from "vue";
import { createVNode, render } from "vue";

let localVueInstance: App;

const instances = new InstanceRegistry<typeof NotificationNotice>();

const NotificationProgrammatic = {
    open(params: string | any): InstanceType<typeof NotificationNotice> {
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
            position: getValueByPath(
                getOptions(),
                "notification.position",
                "top-right",
            ),
            closable:
                params.closable ||
                getValueByPath(getOptions(), "notification.closable", false),
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
        instances.walk((entry) => {
            entry.close(...args);
        });
    },
};

export default {
    install(app: App) {
        localVueInstance = app;
        registerComponent(app, Notification);
        registerProgrammaticComponent(
            app,
            "notification",
            NotificationProgrammatic,
        );
    },
} as Plugin;

declare module "@/types" {
    interface OrugaPrgrammatic {
        notification: typeof NotificationProgrammatic;
    }
}

export { Notification as ONotification, NotificationProgrammatic };

export interface ONotification {
    content: string | DefineComponent[] | undefined;
}
