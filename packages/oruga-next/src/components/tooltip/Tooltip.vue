<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    nextTick,
    type PropType,
    type Component,
} from "vue";
import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    usePropBinding,
    useEventListener,
    useClickOutside,
} from "@/composables";
import { isWebKitAgent } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import type { PropBind } from "@/types";
import TeleportWrapper from "@/utils/TeleportWrapper.vue";

type Position = "top" | "bottom" | "left" | "right";

const opposites: Record<Position, Position> = {
    top: "bottom",
    bottom: "top",
    right: "left",
    left: "right",
};

type TooltipMetrics = {
    content: DOMRect;
    trigger: DOMRect;
};

type Point = { x: number; y: number };

/**
 * Display a brief helper text to your user
 * @displayName Tooltip
 * @style _tooltip.scss
 */
defineOptions({
    isOruga: true,
    name: "OTooltip",
    configField: "tooltip",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Whether tooltip is active or not, use v-model:active to make it two-way binding */
    active: { type: Boolean, default: false },
    /** Tooltip text, unnecessary when content slot is used */
    label: { type: String, default: undefined },
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("tooltip.variant"),
    },
    /**
     * Tooltip position in relation to the element
     * @values top, bottom, left, right, auto
     */
    position: {
        type: String as PropType<Position | "auto">,
        default: () => getOption("tooltip.position", "top"),
        validator: (value: string) =>
            ["top", "bottom", "left", "right", "auto"].indexOf(value) > -1,
    },
    /** Tooltip will be always active */
    always: { type: Boolean, default: false },
    /** Tooltip will be disabled */
    disabled: { type: Boolean, default: false },
    /** Tooltip default animation */
    animation: {
        type: String,
        default: () => getOption("tooltip.animation", "fade"),
    },
    /** Tooltip will be multilined */
    multiline: { type: Boolean, default: false },
    /** Tooltip trigger tag name */
    triggerTag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("tooltip.triggerTag", "div"),
    },
    /**
     * Tooltip trigger events
     * @values hover, click, focus, contextmenu
     */
    triggers: {
        type: Array as PropType<string[]>,
        default: () => getOption("tooltip.triggers", ["hover"]),
        validator: (values: string[]) =>
            values.filter(
                (value) =>
                    ["click", "hover", "contextmenu", "focus"].indexOf(value) >
                    -1,
            ).length === values.length,
    },
    /** Tooltip delay before it appears (number in ms) */
    delay: { type: Number, default: undefined },
    /**
     * Tooltip auto close options (pressing escape, clicking the content or outside)
     * @values true, false, content, outside, escape
     */
    closeable: {
        type: [Array, Boolean] as PropType<string[] | boolean>,
        default: () =>
            getOption("tooltip.closeable", ["escape", "outside", "content"]),
    },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("dropdown.teleport", false),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "contentClass",
        "orderClass",
        "triggerClass",
        "multilineClass",
        "alwaysClass",
        "variantClass",
        "arrowClass",
        "arrowOrderClass",
    ]),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    (e: "update:active", value: boolean): void;
    /** on active change to false event */
    (e: "close"): void;
    /** on active change to true event */
    (e: "open"): void;
}>();

const isActive = usePropBinding<boolean>("active", props, emits, {
    passive: true,
});

const timer = ref();

const computedPosition = computed((): Position => {
    if (props.position !== "auto") return props.position;

    // detect auto position
    const defaultPosition = getOption<Position>("tooltip.position", "top");
    let bestPosition = defaultPosition;
    if (metrics.value != null) {
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
        const triggerAnchors = anchors(metrics.value.trigger);
        const contentRect = metrics.value.content;
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
    return bestPosition;
});

const rootRef = ref<HTMLElement>();

const metrics = ref<TooltipMetrics>({ content: undefined, trigger: undefined }); // Used for automatic tooltip positioning

watch(isActive, (value) => {
    if (value) emits("open");
    else emits("close");
    if (value && props.position === "auto") {
        nextTick(() => {
            metrics.value = {
                content: contentRef.value.getBoundingClientRect(),
                trigger: triggerRef.value.getBoundingClientRect(),
            };
        });
    }
});

// --- Event Handler ---

const contentRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();

const eventCleanups = ref([]);

watch(isActive, (value) => {
    // on active set event handler
    if (value && isClient) {
        setTimeout(() => {
            if (cancelOptions.value.indexOf("outside") >= 0) {
                // set outside handler
                eventCleanups.value.push(
                    useClickOutside(contentRef, onClickedOutside, [triggerRef]),
                );
            }

            if (cancelOptions.value.indexOf("escape") >= 0) {
                // set keyup handler
                eventCleanups.value.push(
                    useEventListener("keyup", onKeyPress, document, {
                        immediate: true,
                    }),
                );
            }
        });
    } else if (!value) {
        // on close cleanup event handler
        eventCleanups.value.forEach((fn) => fn());
        eventCleanups.value.length = 0;
    }
});

const cancelOptions = computed<string[]>(() =>
    typeof props.closeable === "boolean"
        ? props.closeable
            ? ["escape", "outside", "content"]
            : []
        : props.closeable,
);

/** Close tooltip if clicked outside. */
function onClickedOutside(): void {
    if (!isActive.value || props.always) return;
    if (cancelOptions.value.indexOf("outside") < 0) return;
    isActive.value = false;
}

/** Keypress event that is bound to the document */
function onKeyPress(event: KeyboardEvent): void {
    if (isActive.value && (event.key === "Escape" || event.key === "Esc")) {
        if (cancelOptions.value.indexOf("escape") < 0) return;
        isActive.value = false;
    }
}

function onClick(): void {
    if (props.triggers.indexOf("click") < 0) return;
    // if not active, toggle after clickOutside event
    // this fixes toggling programmatic
    nextTick(() => setTimeout(() => open()));
}

function onContextMenu(event: Event): void {
    if (props.triggers.indexOf("contextmenu") < 0) return;
    event.preventDefault();
    open();
}

function onFocus(): void {
    if (props.triggers.indexOf("focus") < 0) return;
    open();
}

function onHover(): void {
    if (props.triggers.indexOf("hover") < 0) return;
    open();
}

function open(): void {
    if (props.disabled) return;
    if (props.delay) {
        timer.value = setTimeout(() => {
            isActive.value = true;
            timer.value = null;
        }, props.delay);
    } else {
        isActive.value = true;
    }
}

function onClose(): void {
    if (cancelOptions.value.indexOf("content") < 0) return;
    isActive.value = !props.closeable;
    if (timer.value && props.closeable) clearTimeout(timer.value);
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

// --- Computed Component Classes ---

const rootClasses = computed<PropBind>(() => [
    useComputedClass("rootClass", "o-tip"),
]);

const triggerClasses = computed(() => [
    useComputedClass("triggerClass", "o-tip__trigger"),
]);

const arrowClasses = computed(() => [
    useComputedClass("arrowClass", "o-tip__arrow"),
    {
        [useComputedClass(
            "arrowOrderClass",
            "o-tip__arrow--",
            computedPosition.value,
        )]: computedPosition.value,
    },
    {
        [useComputedClass(
            "variantArrowClass",
            "o-tip__arrow--",
            props.variant,
        )]: props.variant,
    },
]);

const contentClasses = computed(() => [
    useComputedClass("contentClass", "o-tip__content"),
    {
        [useComputedClass(
            "orderClass",
            "o-tip__content--",
            computedPosition.value,
        )]: computedPosition.value,
    },
    {
        [useComputedClass("variantClass", "o-tip__content--", props.variant)]:
            props.variant,
    },
    {
        [useComputedClass("multilineClass", "o-tip__content--multiline")]:
            props.multiline,
    },
    {
        [useComputedClass("alwaysClass", "o-tip__content--always")]:
            props.always,
    },
]);
</script>

<template>
    <div ref="rootRef" :class="rootClasses" data-oruga="tooltip">
        <TeleportWrapper
            :teleport="teleport"
            :class="rootClasses"
            :trigger="triggerRef"
            :content="contentRef">
            <transition
                :name="animation"
                @after-leave="metrics = null"
                @enter-cancelled="metrics = null">
                <div
                    v-show="isActive || (always && !disabled)"
                    ref="contentRef"
                    :class="contentClasses">
                    <span :class="arrowClasses"></span>

                    <!--
                        @slot Tooltip content, default is label prop
                    -->
                    <slot name="content">{{ label }}</slot>
                </div>
            </transition>
        </TeleportWrapper>
        <component
            :is="triggerTag"
            ref="triggerRef"
            :class="triggerClasses"
            aria-haspopup="true"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="onClose"
            @mouseleave="onClose">
            <!--
                @slot Tooltip trigger slot
                @binding {boolean} active - tooltip active state
            -->
            <slot :active="isActive" />
        </component>
    </div>
</template>
