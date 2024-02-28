<script setup lang="ts">
import {
    watch,
    computed,
    nextTick,
    onBeforeUnmount,
    ref,
    type Component,
    type PropType,
} from "vue";
import { isClient } from "@/utils/ssr";
import { getScrollingParent, unrefElement } from "@/composables";

type Position = "top" | "bottom" | "left" | "right";

const opposites: Record<Position, Position> = {
    top: "bottom",
    bottom: "top",
    right: "left",
    left: "right",
};

type Point = { x: number; y: number };

defineOptions({ inheritAttrs: false });

const props = defineProps({
    teleport: {
        type: [Boolean, String, Object],
        required: true,
    },
    trigger: {
        type: Object as PropType<HTMLElement | Component>,
        default: undefined,
    },
    content: {
        type: Object as PropType<HTMLElement | Component>,
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
    /** Used for calculation position auto */
    defaultPosition: {
        type: String as PropType<Position>,
        validator: (value: string) =>
            ["top", "bottom", "left", "right"].indexOf(value) > -1,
        default: "top",
    },
    /** disable the position calculation */
    disabled: { type: Boolean, default: false },
    /** update positioning on teleport */
    disablePositioning: { type: Boolean, default: true },
});

const emits = defineEmits<{
    (e: "update:position", value: string);
}>();

const teleportTo = computed(() =>
    typeof props.teleport === "boolean" ? "body" : props.teleport,
);

const teleportDisabled = computed(() =>
    typeof props.teleport === "boolean" || !props.teleport
        ? !props.teleport
        : false,
);

// --- Dynamic Positioning Handling Feature ---

const initialPosition = props.position;

const scrollingParent = ref(undefined);
const resizeObserver = ref(null);

if (isClient && window.ResizeObserver) {
    resizeObserver.value = new window.ResizeObserver(updatePositioning);
}

// on content or disable state change update event listener
watch(
    [() => props.disabled, () => props.content],
    () => {
        if (!props.disabled) addHandler();
        else removeHandler();
    },
    { immediate: true },
);

// update positioning if props change
watch(
    [
        () => props.trigger,
        () => props.content,
        () => props.disablePositioning,
        () => props.disabled,
    ],
    () => {
        nextTick(() => updatePositioning());
    },
    { immediate: true },
);

// remove any event listener on unmount
onBeforeUnmount(() => removeHandler());

/** add event listener */
function addHandler(): void {
    if (isClient && !scrollingParent.value && props.content) {
        // get parent container
        scrollingParent.value = getScrollingParent(unrefElement(props.content));
        // set event listener
        if (
            scrollingParent.value &&
            scrollingParent.value !== document.documentElement
        ) {
            scrollingParent.value.addEventListener(
                "scroll",
                updatePositioning,
                { passive: true },
            );
            if (window.ResizeObserver)
                resizeObserver.value.observe(scrollingParent.value);
        } else {
            document.addEventListener("scroll", updatePositioning, {
                passive: true,
            });
            window.addEventListener("resize", updatePositioning);
        }
    }
}

/** remove event listener */
function removeHandler(): void {
    if (isClient) {
        if (window.ResizeObserver) resizeObserver.value?.disconnect();
        window.removeEventListener("resize", updatePositioning);
        document.removeEventListener("scroll", updatePositioning);
        scrollingParent.value = undefined;
    }
}

/** Update the best position set teleport positioning */
function updatePositioning(): void {
    if (props.disabled) return;
    let position = props.position;
    // update position if auto position is enabled
    if (initialPosition === "auto") {
        // calculate best position
        position = getAutoPosition();
        if (position != props.position)
            // two-way bind updated position
            emits("update:position", position);
    }
    // do not set content position if not teleport enabled
    if (!props.teleport) return;

    const content = unrefElement(props.content);
    const trigger = unrefElement(props.trigger);

    // set content position
    if (content && trigger) {
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;
        // define vertical positioning
        if (position.includes("bottom")) {
            top += trigger.clientHeight;
        } else if (position.includes("top")) {
            top -= content.clientHeight;
        }
        // define horizontal positioning
        if (position === "left") {
            left -= content.clientWidth;
        } else if (position === "right") {
            left += trigger.clientWidth;
        } else if (position.includes("-right")) {
            left += trigger.clientWidth - content.clientWidth;
        }

        // adjust exact vertical positioning
        if (position === "top" || position === "bottom") {
            left += trigger.clientWidth / 2; //- content.clientWidth / 2;
        }
        // adjust exact horizontal positioning
        if (position === "left" || position === "right") {
            top += trigger.clientHeight / 2; // - content.clientHeight / 2;
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

/** calculate best position if auto */
function getAutoPosition(): string {
    let bestPosition = props.defaultPosition;
    if (!props.content || !props.trigger) return bestPosition;
    if (!scrollingParent.value) return bestPosition;

    // get viewport from container
    const viewRect = new DOMRect(
        scrollingParent.value.offsetLeft,
        scrollingParent.value.offsetTop,
        scrollingParent.value.clientWidth,
        scrollingParent.value.clientHeight,
    );

    const contentRect = unrefElement(props.content).getBoundingClientRect();
    const triggerRect = unrefElement(props.trigger).getBoundingClientRect();

    // detect auto position
    const triggerAnchors = anchors(triggerRect);
    const contentAnchors = anchors(contentRect);
    const contentRectAtAnchor = (pos: Position) => {
        const triggerAnchor = triggerAnchors[pos];
        const contentAnchor = contentAnchors[opposites[pos]];
        // Translates contentRect so contentAnchor is on top of triggerAnchor
        // NOTE: this doesn't account for the extra offset that the tooltip arrow provides.
        // That offset should be small, and it's tricky to get it from the CSS.
        return new DOMRect(
            contentRect.x + (triggerAnchor.x - contentAnchor.x),
            contentRect.y + (triggerAnchor.y - contentAnchor.y),
            contentRect.width,
            contentRect.height,
        );
    };

    const defaultOpposite = opposites[props.defaultPosition];
    const crossPosition =
        props.defaultPosition === "top" || props.defaultPosition === "bottom"
            ? "left"
            : "top";
    const crossOpposite = opposites[crossPosition];
    // In descending order of priority
    const positions: Position[] = [
        props.defaultPosition,
        defaultOpposite,
        crossPosition,
        crossOpposite,
    ];
    let maxOverlap = 0;
    for (const position of positions) {
        const overlap = intersectionArea(
            viewRect,
            contentRectAtAnchor(position),
        );
        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestPosition = position;
        }
    }
    return bestPosition;
}

// --- Helper Functions ---

function intersectionArea(a: DOMRect, b: DOMRect): number {
    const left = Math.max(a.left, b.left);
    const right = Math.min(a.right, b.right);
    const top = Math.max(a.top, b.top);
    const bottom = Math.min(a.bottom, b.bottom);
    return Math.max(right - left, 0) * Math.max(bottom - top, 0);
}

/**
 * @param rect the bounding rectangle of the trigger element
 * @return the "anchor points" (points where the arrow attaches) for each side of the tooltip
 */
const anchors = (rect: DOMRect): Record<Position, Point> => ({
    top: { x: (rect.left + rect.right) * 0.5, y: rect.top },
    bottom: { x: (rect.left + rect.right) * 0.5, y: rect.bottom },
    left: { x: rect.left, y: (rect.top + rect.bottom) * 0.5 },
    right: { x: rect.right, y: (rect.top + rect.bottom) * 0.5 },
});
</script>

<template>
    <Teleport :to="teleportTo" :disabled="teleportDisabled">
        <template v-if="teleportDisabled">
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
