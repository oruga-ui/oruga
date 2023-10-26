import { createVNode, render } from "vue";

import Modal from "./Modal.vue";
import type { ModalProps } from "./types";

import InstanceRegistry from "@/utils/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { merge } from "@/utils/helpers";
import type { ProgrammaticExpose } from "@/types";

declare module "@/types" {
    interface OrugaProgrammatic {
        modal: typeof ModalProgrammatic;
    }
}

const instances = new InstanceRegistry<typeof Modal>();

const ModalProgrammatic = {
    open(params: Readonly<string | ModalProps>): ProgrammaticExpose {
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
            active: true, // set the active state to true
        };

        const propsData = merge(defaultParams, componentParams);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const defaultSlot = () => slot;

        const app = VueInstance;
        const vnode = createVNode(Modal, propsData, defaultSlot);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));

        // return exposed functionalities
        return vnode.component.exposed as ProgrammaticExpose;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default ModalProgrammatic;
