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
     * Position of the dropdown relative to the trigger
     * @values top-right, top-left, bottom-left, bottom-right
     * @values top, bottom, left, right, auto
     */
    position: {
        type: String,
        validator: (value: string) =>
            ["top-right", "top-left", "bottom-left", "bottom-right"].indexOf(
                value,
            ) > -1,
        default: undefined,
    },
    /** update positioning on teleport */
    positioning: { type: Boolean, default: true },
});

const to = computed(() =>
    typeof props.teleport === "boolean" ? "body" : props.teleport,
);

const disabled = computed(() =>
    typeof props.teleport === "boolean" || !props.teleport
        ? !props.teleport
        : false,
);

watch(
    [() => props.trigger, () => props.content, () => props.positioning],
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

    if (content && trigger) {
        // set content position
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;
        if (!props.position || props.position.indexOf("bottom") >= 0) {
            top += trigger.clientHeight;
        } else {
            top -= content.clientHeight;
        }
        if (props.position && props.position.indexOf("left") >= 0) {
            left -= content.clientWidth - trigger.clientWidth;
        }
        if (props.positioning) {
            content.style.position = "absolute";
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
