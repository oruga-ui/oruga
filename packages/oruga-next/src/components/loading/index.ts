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
    open(
        params: Readonly<LoadingProps>,
    ): InstanceType<typeof Loading> & ProgrammaticExpose {
        const defaultParams = {
            programmatic: { instances },
            active: true,
        };

        const propsData = merge(defaultParams, params);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const app = localVueInstance || VueInstance;
        const vnode = createVNode(Loading, propsData);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));
        // return exposed functionalities
        return vnode.component.proxy as InstanceType<typeof Loading> &
            ProgrammaticExpose;
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
