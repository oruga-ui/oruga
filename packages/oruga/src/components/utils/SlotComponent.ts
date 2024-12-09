import {
    createVNode,
    defineComponent,
    type DefineComponent,
    type VNode,
    type VNodeTypes,
} from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import type { DynamicComponent } from "@/types";

type SlotComponentProps<C extends VNodeTypes> = {
    /** Component to be get the slot from */
    component: C;
    /** Props to be binded to the injected component. */
    props?: ComponentProps<C>;
    /**
     * Slot name
     * @default "default"
     */
    name?: string;
    /**
     * Tag name of the slot wrapper element
     * @default "div"
     */
    tag?: DynamicComponent;
};

/** This components renders a specific slot and only the slot of another component */
export default defineComponent<SlotComponentProps<any>>(
    <C extends DefineComponent>(props: SlotComponentProps<C>, { slots }) => {
        const _props = { tag: "div", name: "default", ...props };

        return (): VNode => {
            const slot = props.component.$slots[_props.name]
                ? props.component.$slots[_props.name](props.props)
                : slots.default
                  ? slots.default()
                  : {};

            return createVNode(_props.tag as VNode, {}, slot);
        };
    },
    {
        name: "OSlotComponent",
        // manual runtime props declaration is currently still needed.
        props: ["component", "props", "name", "tag"],
    },
);
