<script setup lang="ts">
import { useEventListener } from "@/composables";
import { watch, computed, type PropType, nextTick } from "vue";
import { isClient } from "./ssr";
import { isWebKitAgent } from "./helpers";

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

const emits = defineEmits<{
    (e: "update:position", value: string);
}>();

const to = computed(() =>
    typeof props.teleport === "boolean" ? "body" : props.teleport,
);

const disabled = computed(() =>
    typeof props.teleport === "boolean" || !props.teleport
        ? !props.teleport
        : false,
);

const computedPosition = computed((): string => {
    console.log("compute position", props.position);
    if (props.position !== "auto") return props.position;

    // detect auto position
    const defaultPosition = "top" as Position;
    let bestPosition = defaultPosition;
    if (props.content && props.trigger && props.updateKey) {
        let viewRect: DOMRect;
        const viewport = window.visualViewport;
        if (viewport != undefined) {
            if (isWebKitAgent()) {
                // On WebKit, getBoundingClientRect offsets relative to the the visual viewport's origin, not the layout viewport's.
                // See https://bugs.webkit.org/show_bug.cgi?id=170981
                viewRect = new DOMRect(0, 0, viewport.width, viewport.height);
            } else {
                viewRect = new DOMRect(
                    viewport.offsetLeft,
                    viewport.offsetTop,
                    viewport.width,
                    viewport.height,
                );
            }
        } else {
            viewRect = new DOMRect(
                0,
                0,
                document.documentElement.clientWidth,
                document.documentElement.clientHeight,
            );
        }

        const contentRect = props.content.getBoundingClientRect();
        const triggerRect = props.trigger.getBoundingClientRect();

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
        const defaultOpposite = opposites[defaultPosition];
        const crossPosition =
            defaultPosition === "top" || defaultPosition === "bottom"
                ? "left"
                : "top";
        const crossOpposite = opposites[crossPosition];
        // In descending order of priority
        const positions: Position[] = [
            defaultPosition,
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
    }

    console.log("emit", bestPosition);
    // two-way bind auto position
    emits("update:position", bestPosition);
    return bestPosition;
});

// trigger compute auto position
if (props.position === "auto") computedPosition.value;

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
        if (computedPosition.value.includes("bottom")) {
            top += trigger.clientHeight;
        } else if (computedPosition.value.includes("top")) {
            top -= content.clientHeight;
        }
        // define horizontal positioning
        if (computedPosition.value === "left") {
            left -= content.clientWidth;
        } else if (computedPosition.value === "right") {
            left += trigger.clientWidth;
        } else if (computedPosition.value.includes("-right")) {
            left += trigger.clientWidth - content.clientWidth;
        }

        // adjust exact vertical positioning
        if (
            computedPosition.value === "top" ||
            computedPosition.value === "bottom"
        ) {
            left += trigger.clientWidth / 2; //- content.clientWidth / 2;
        }
        // adjust exact horizontal positioning
        if (
            computedPosition.value === "left" ||
            computedPosition.value === "right"
        ) {
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
