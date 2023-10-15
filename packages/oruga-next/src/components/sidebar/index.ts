import type { App, Plugin } from "vue";
import { createVNode, render } from "vue";

import Sidebar from "./Sidebar.vue";

import { VueInstance } from "@/utils/config";
import { merge } from "@/utils/helpers";
import {
    registerComponent,
    registerComponentProgrammatic,
} from "../../utils/plugins";

import InstanceRegistry from "@/utils/InstanceRegistry";
import type { ProgrammaticExpose } from "@/types";

export type SidebarProps = InstanceType<typeof Sidebar>["$props"];

declare module "@/types" {
    interface OrugaProgrammatic {
        sidebar: typeof SidebarProgrammatic;
    }
}

let localVueInstance: App;

const instances = new InstanceRegistry<typeof Sidebar>();

const SidebarProgrammatic = {
    open(params: Readonly<SidebarProps>): ProgrammaticExpose {
        const defaultParams = {
            programmatic: { instances },
            active: true, // set the active state to true
        };

        const propsData = merge(defaultParams, params);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const app = localVueInstance || VueInstance;
        const vnode = createVNode(Sidebar, propsData);
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
        registerComponent(app, Sidebar);
        registerComponentProgrammatic(app, "sidebar", SidebarProgrammatic);
    },
} as Plugin;

export { SidebarProgrammatic, Sidebar as OSidebar };
