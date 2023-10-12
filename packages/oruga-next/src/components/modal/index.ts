import type { App, DefineComponent, Plugin } from "vue";
import { createVNode, render } from "vue";

import Modal from "./Modal.vue";

import { VueInstance } from "@/utils/config";
import { merge } from "@/utils/helpers";
import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";
import InstanceRegistry from "@/utils/InstanceRegistry";

export type ModalProps = InstanceType<typeof Modal>["$props"];

declare module "@/types" {
    interface OrugaProgrammatic {
        modal: typeof ModalProgrammatic;
    }
}

let localVueInstance: App;

const instances = new InstanceRegistry<typeof Modal>();

const ModalProgrammatic = {
    open(params: Readonly<string | ModalProps>): InstanceType<typeof Modal> {
        const componentParams =
            typeof params === "string"
                ? {
                      content: params,
                  }
                : { ...params };

        let slot;
        if (Array.isArray(componentParams.content)) {
            slot = componentParams.content;
            delete componentParams.content;
        }

        const defaultParams = {
            programmatic: { instances },
        };

        const propsData = merge(defaultParams, componentParams);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const defaultSlot = () => slot;

        const app = localVueInstance || VueInstance;
        const vnode = createVNode(Modal, propsData, defaultSlot);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));
        // return exposed functionalities
        return vnode.component.exposed as InstanceType<typeof Modal>;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.close(...args));
    },
};

export default {
    install(app: App) {
        localVueInstance = app;
        registerComponent(app, Modal);
        registerComponentProgrammatic(app, "modal", ModalProgrammatic);
    },
} as Plugin;

export { ModalProgrammatic, Modal as OModal };

export interface OModal {
    content: string | DefineComponent[] | undefined;
}
