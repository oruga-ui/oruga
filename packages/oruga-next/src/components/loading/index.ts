import type { App, ComponentPropsOptions, Plugin } from "vue";
import { createVNode, render } from "vue";

import Loading from "./Loading.vue";

import { VueInstance } from "../../utils/config";
import { merge } from "../../utils/helpers";
import {
    registerComponent,
    registerComponentProgrammatic,
} from "../../utils/plugins";
import InstanceRegistry from "../../utils/InstanceRegistry";

let localVueInstance: App;

const instances = new InstanceRegistry();

const LoadingProgrammatic = {
    open(
        params: Readonly<ComponentPropsOptions>,
    ): InstanceType<typeof Loading> {
        const defaultParam = {
            programmatic: { instances },
        };
        const propsData = merge(defaultParam, params);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });
        const app = localVueInstance || VueInstance;
        const vnode = createVNode(Loading, propsData);
        vnode.appContext = app._context;
        render(vnode, document.createElement("div"));
        return vnode.component.proxy as InstanceType<typeof Loading>;
    },
    closeAll() {
        instances.walk((entry) => {
            entry.close(...arguments);
        });
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
