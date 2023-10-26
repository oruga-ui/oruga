import type { Component, DefineComponent, PropType } from "vue";
import { defineComponent, h } from "vue";

/** This components renders a specific slot and only the slot of another component */
export default defineComponent({
    name: "OSlotComponent",
    props: {
        /** Component to be get the slot from */
        component: { type: Object, required: true },
        /** Slot name */
        name: { type: String, default: "default" },
        /** Props passed to the slot */
        props: { type: Object, default: () => {} },
        /** Tag name of the slot wrapper element */
        tag: {
            type: [String, Object, Function] as PropType<string | Component>,
            default: "div",
        },
    },
    render() {
        const slot = (this.component as DefineComponent).$slots[this.name]
            ? (this.component as DefineComponent).$slots[this.name](this.props)
            : {};

        return h(this.tag, {}, slot);
    },
});
