import { createVNode, render } from "vue";

import Sidebar from "./Sidebar.vue";
import type { SidebarProps } from "./types";

import InstanceRegistry from "@/utils/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { merge } from "@/utils/helpers";
import type { OrugaOptions, ProgrammaticExpose } from "@/types";

declare module "../../index" {
    interface OrugaProgrammatic {
        sidebar: typeof SidebarProgrammatic;
    }
}

const instances = new InstanceRegistry<typeof Sidebar>();

type ProgrammaticProps = Readonly<SidebarProps & OrugaOptions["sidebar"]>;

const SidebarProgrammatic = {
    open(params: ProgrammaticProps): ProgrammaticExpose {
        const defaultParams = {
            programmatic: { instances },
            active: true, // set the active state to true
        };

        const propsData = merge(defaultParams, params);
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1;
            propsData.programmatic.reject = p2;
        });

        const app = VueInstance;
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

export default SidebarProgrammatic;
