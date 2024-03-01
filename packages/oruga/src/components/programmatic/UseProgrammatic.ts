import { createVNode, render } from "vue";

import ProgrammaticWrapper from "./ProgrammaticWrapper.vue";
import type { ProgrammaticProps } from "./types";

import InstanceRegistry from "@/utils/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { merge } from "@/utils/helpers";
import type { ProgrammaticExpose } from "@/types";

declare module "../../index" {
    interface OrugaProgrammatic {
        programmatic: typeof UseProgrammatic;
    }
}

const instances = new InstanceRegistry<typeof ProgrammaticWrapper>();

const UseProgrammatic = {
    open(params: ProgrammaticProps): ProgrammaticExpose {
        const defaultParams = {
            programmatic: { instances },
        };

        const propsData = merge(defaultParams, params);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const app = VueInstance;
        const vnode = createVNode(ProgrammaticWrapper, propsData);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));

        // return exposed functionalities
        return vnode.component.exposed as ProgrammaticExpose;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default UseProgrammatic;
