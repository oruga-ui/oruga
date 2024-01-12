<script lang="ts">
import {
    defineComponent,
    h,
    resolveComponent,
    Comment,
    Text,
    useSlots,
    type PropType,
} from "vue";

import { injectField } from "./useFieldShare";

import type { PropBind } from "@/types";

export default defineComponent({
    name: "OFieldBody",
    configField: "field",
    props: {
        classes: {
            type: Array as PropType<PropBind[]>,
            default: undefined,
        },
    },
    setup(props) {
        // inject parent field component if used inside one
        const { parentField } = injectField();

        const slots = useSlots();

        return () => {
            let first = true;
            const slot = slots.default();
            const children =
                slot.length === 1 && Array.isArray(slot[0].children)
                    ? slot[0].children
                    : slot;
            return h(
                "div",
                { class: props.classes },
                children.map((element: any) => {
                    let message;
                    if (element.type === Comment || element.type === Text) {
                        return element;
                    }
                    if (first) {
                        message = parentField.value.fieldMessage;
                        first = false;
                    }
                    return h(
                        resolveComponent("OField"),
                        {
                            variant: parentField.value.fieldVariant,
                            message,
                        },
                        () => [element],
                    );
                }),
            );
        };
    },
});
</script>
