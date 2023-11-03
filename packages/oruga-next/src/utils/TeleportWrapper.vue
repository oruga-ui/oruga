<script setup lang="ts">
import { useEventListener } from "@/composables";
import { watch, computed, type PropType, nextTick } from "vue";
import { isClient } from "./ssr";

defineOptions({ inheritAttrs: false });
const props = defineProps({
    teleport: {
        type: [Boolean, String, Object],
        required: true,
    },
    trigger: {
        type: Object as PropType<HTMLElement>,
        default: undefined,
    },
    content: {
        type: Object as PropType<HTMLElement>,
        default: undefined,
    },
    /**
     * Position of the component relative to the trigger
     * @values auto, top, bottom, left, right, top-right, top-left, bottom-left, bottom-right
     */
    position: {
        type: String,
        validator: (value: string) =>
            [
                "auto",
                "top",
                "bottom",
                "left",
                "right",
                "top-right",
                "top-left",
                "bottom-left",
                "bottom-right",
            ].indexOf(value) > -1,
        default: undefined,
    },
    /** additional key property to force update on key change */
    updateKey: { type: [String, Boolean, Number], default: undefined },
    /** update positioning on teleport */
    disablePositioning: { type: Boolean, default: true },
});

const to = computed(() =>
    typeof props.teleport === "boolean" ? "body" : props.teleport,
);

const disabled = computed(() =>
    typeof props.teleport === "boolean" || !props.teleport
        ? !props.teleport
        : false,
);

// update positioning if props change
watch(
    [
        () => props.trigger,
        () => props.content,
        () => props.disablePositioning,
        () => props.updateKey,
    ],
    () => {
        if (props.teleport) nextTick(() => updatePositioning());
    },
    { immediate: true },
);

if (props.teleport && isClient) {
    useEventListener("resize", updatePositioning, window);
}

/** set teleport positioning */
function updatePositioning(): void {
    const content = props.content;
    const trigger = props.trigger;

    // set content position
    if (content && trigger) {
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;
        // define vertical positioning
        if (!props.position || props.position.includes("bottom")) {
            top += trigger.clientHeight;
        } else if (props.position && props.position.includes("top")) {
            top -= content.clientHeight;
        }
        // define horizontal positioning
        if (props.position === "left") {
            left -= content.clientWidth;
        } else if (props.position === "right") {
            left += trigger.clientWidth;
        } else if (props.position.includes("-right")) {
            left += trigger.clientWidth - content.clientWidth;
        }

        if (props.position === "top" || props.position === "bottom") {
            left += trigger.clientWidth / 2;
        }
        if (props.position === "left" || props.position === "right") {
            top += trigger.clientHeight / 2;
        }

        // set style properties
        if (props.disablePositioning) {
            content.style.position = "relative";
            content.style.top = `${top}px`;
            content.style.left = `${left}px`;
        } else {
            content.style.position = "";
            content.style.top = "";
            content.style.left = "";
        }
    }
}
</script>

<template>
    <Teleport :to="to" :disabled="disabled">
        <template v-if="disabled">
            <slot />
        </template>
        <template v-else>
            <div
                v-bind="$attrs"
                :style="{ position: 'absolute', left: '0px', top: '0px' }">
                <slot />
            </div>
        </template>
    </Teleport>
</template>
