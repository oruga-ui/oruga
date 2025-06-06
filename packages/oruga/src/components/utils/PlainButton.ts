import { createVNode, type FunctionalComponent } from "vue";

/**
 * Acts much like a regular `<button>` element except that its type defaults to "button" even inside forms
 *
 * Useful as a default tag for components that use custom action buttons
 */
const PlainButton: FunctionalComponent = (props, { slots }) =>
    createVNode(
        "button",
        {
            type: "button",
            ...props,
        },
        slots.default?.(),
    );
export default PlainButton;
