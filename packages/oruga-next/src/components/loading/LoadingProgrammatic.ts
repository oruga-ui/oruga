import { createVNode, render } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

import Loading from "./Loading.vue";

import InstanceRegistry from "@/utils/InstanceRegistry";
import { VueInstance } from "@/utils/plugins";
import { merge } from "@/utils/helpers";
import type { OrugaOptions, ProgrammaticExpose } from "@/types";

declare module "../../index" {
    interface OrugaProgrammatic {
        loading: typeof LoadingProgrammatic;
    }
}

export type LoadingProps = ComponentProps<typeof Loading>;

const instances = new InstanceRegistry<typeof Loading>();

type ProgrammaticProps = Readonly<
    string | (LoadingProps & OrugaOptions["loading"])
>;

const LoadingProgrammatic = {
    open(params: ProgrammaticProps): ProgrammaticExpose {
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

        const app = VueInstance;
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

export default LoadingProgrammatic;
