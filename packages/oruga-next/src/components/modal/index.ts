import type { App, DefineComponent, Plugin } from "vue";
import { createVNode, render } from "vue";

import Modal from "./Modal.vue";

import { VueInstance } from "../../utils/config";
import { merge } from "../../utils/helpers";
import {
    registerComponent,
    registerProgrammaticComponent,
} from "../../utils/plugins";
import InstanceRegistry from "../../utils/InstanceRegistry";

let localVueInstance: App;

const instances = new InstanceRegistry<typeof Modal>();

const ModalProgrammatic = {
    open(params: OModal | string): InstanceType<typeof Modal> {
        let newParams;
        if (typeof params === "string") {
            newParams = {
                content: params,
            };
        } else {
            newParams = params;
        }

        const defaultParam = {
            programmatic: { instances },
        };

        let slot;
        if (Array.isArray(newParams.content)) {
            slot = newParams.content;
            delete newParams.content;
        }

        const propsData = merge(defaultParam, newParams);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const defaultSlot = () => slot;
        const app = localVueInstance || VueInstance;
        const vnode = createVNode(Modal, propsData, defaultSlot);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));
        return vnode.component.proxy as InstanceType<typeof Modal>;
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
        registerComponent(app, Modal);
        registerProgrammaticComponent(app, "modal", ModalProgrammatic);
    },
} as Plugin;

declare module "@/types" {
    interface OrugaPrgrammatic {
        modal: typeof ModalProgrammatic;
    }
}

export { ModalProgrammatic, Modal as OModal };

export interface OModal {
    content: string | DefineComponent[] | undefined;
}
