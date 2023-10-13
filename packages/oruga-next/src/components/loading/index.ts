import type { App, Plugin } from "vue";
import { createVNode, render } from "vue";

import Loading from "./Loading.vue";

import { VueInstance } from "@/utils/config";
import { merge } from "@/utils/helpers";
import {
    registerComponent,
    registerComponentProgrammatic,
} from "@/utils/plugins";
import InstanceRegistry from "@/utils/InstanceRegistry";
import type { ProgrammaticExpose } from "@/types";

export type LoadingProps = InstanceType<typeof Loading>["$props"];

declare module "@/types" {
    interface OrugaProgrammatic {
        loading: typeof LoadingProgrammatic;
    }
}

let localVueInstance: App;

const instances = new InstanceRegistry<typeof Loading>();

const LoadingProgrammatic = {
    open(params: Readonly<string | LoadingProps>): ProgrammaticExpose {
        const componentParams =
            typeof params === "string"
                ? {
                      label: params,
                  }
                : { ...params };

        let slot;
        if (Array.isArray(componentParams.label)) {
            slot = componentParams.label;
            delete componentParams.label;
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

        const app = localVueInstance || VueInstance;
        const vnode = createVNode(Loading, propsData, defaultSlot);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));
        // return exposed functionalities
        return vnode.component.exposed as ProgrammaticExpose;
    },
    closeAll(...args: any[]): void {
        instances.walk((entry) => entry.exposed.close(...args));
    },
};

export default {
    install(app: App) {
        localVueInstance = app;
        registerComponent(app, Loading);
        registerComponentProgrammatic(app, "loading", LoadingProgrammatic);
    },
} as Plugin;

export { LoadingProgrammatic, Loading as OLoading };
