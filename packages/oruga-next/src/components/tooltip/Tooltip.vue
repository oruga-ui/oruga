<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    nextTick,
    onBeforeUnmount,
    onMounted,
    type PropType,
} from "vue";
import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    usePropBinding,
    useEventListener,
} from "@/composables";
import {
    createAbsoluteElement,
    removeElement,
    isWebKitAgent,
} from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import type { PropBind } from "@/types";

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
    /** Tooltip will be always active */
    always: { type: Boolean, default: false },
    /** Tooltip will be disabled */
    disabled: { type: Boolean, default: false },
    /** Tooltip default animation */
    animation: {
        type: String,
        default: () => getOption("tooltip.animation", "fade"),
    },
    /**
     * Tooltip auto close options
     * @values true, false, inside, outside, escape
     */
    autoClose: {
        type: [Array, Boolean] as PropType<string[] | boolean>,
        default: true,
    },
    /** Tooltip will be multilined */
    multiline: { type: Boolean, default: false },
    /** Append tooltip content to body */
    appendToBody: { type: Boolean, default: false },
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

const rootRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();

const isActive = usePropBinding<boolean>("active", props, emits, {
    passive: true,
});

const triggerStyle = ref({});
const bodyEl = ref<HTMLDivElement>(); // Used to append to body
const metrics = ref<TooltipMetrics>({ content: undefined, trigger: undefined }); // Used for automatic tooltip positioning

const timer = ref();

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
    if (value && props.appendToBody) updateAppendToBody();
});

if (isClient) {
    useEventListener("click", onClickedOutside);
    useEventListener("keyup", onKeyPress);
}

onMounted(() => {
    if (props.appendToBody) {
        bodyEl.value = createAbsoluteElement(contentRef.value);
        updateAppendToBody();
    }
});

onBeforeUnmount(() => {
    if (props.appendToBody) removeElement(bodyEl.value);
});

const coputedPosition = computed((): Position => {
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

/** White-listed items to not close when clicked. */
function isInWhiteList(el: Element): boolean {
    if (el === contentRef.value) return true;
    if (el === triggerRef.value) return true;
    // All chidren from content
    if (contentRef.value !== undefined) {
        const children = contentRef.value.querySelectorAll("*");
        for (const child of children) {
            if (el === child) return true;
        }
    }
    // All children from trigger
    if (triggerRef.value !== undefined) {
        const children = triggerRef.value.querySelectorAll("*");
        for (const child of children) {
            if (el === child) return true;
        }
    }
    return false;
}

/** Append element to body feature */
function updateAppendToBody(): void {
    if (rootRef.value && triggerRef.value) {
        // update wrapper tooltip
        const tooltipEl = bodyEl.value.children[0] as HTMLElement;
        tooltipEl.classList.forEach((item) =>
            tooltipEl.classList.remove(...item.split(" ")),
        );
        rootClasses.value.forEach((item) => {
            if (typeof item === "object") {
                Object.keys(item)
                    .filter((key) => key && item[key])
                    .forEach((key) => tooltipEl.classList.add(key));
            } else {
                tooltipEl.classList.add(...item.split(" "));
            }
        });
        tooltipEl.style.width = `${triggerRef.value.clientWidth}px`;
        tooltipEl.style.height = `${triggerRef.value.clientHeight}px`;
        const rect = triggerRef.value.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        const wrapper = bodyEl.value;
        wrapper.style.position = "absolute";
        wrapper.style.top = `${top}px`;
        wrapper.style.left = `${left}px`;
        wrapper.style.zIndex = isActive.value || props.always ? "99" : "-1";
        triggerStyle.value = {
            zIndex: isActive.value || props.always ? "100" : undefined,
        };
    }
}

// --- Event Handler ---

const cancelOptions = computed<string[]>(() =>
    typeof props.autoClose === "boolean"
        ? props.autoClose
            ? ["escape", "inside", "outside"]
            : []
        : props.autoClose,
);

/** Close tooltip if clicked outside. */
function onClickedOutside(event: MouseEvent): void {
    if (props.always) return;
    if (!isActive.value) return;

    if (
        (cancelOptions.value.indexOf("outside") >= 0 &&
            !isInWhiteList(event.target as Element)) ||
        (cancelOptions.value.indexOf("inside") >= 0 &&
            isInWhiteList(event.target as Element))
    )
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

function onHover(): void {
    if (props.triggers.indexOf("hover") < 0) return;
    open();
}

function onFocus(): void {
    if (props.triggers.indexOf("focus") < 0) return;
    open();
}

function onContextMenu(event: Event): void {
    if (props.triggers.indexOf("contextmenu") < 0) return;
    event.preventDefault();
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
    if (typeof props.autoClose === "boolean") isActive.value = !props.autoClose;
    if (timer.value && props.autoClose) clearTimeout(timer.value);
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
            coputedPosition.value,
        )]: coputedPosition.value,
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
            coputedPosition.value,
        )]: coputedPosition.value,
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
        <div
            ref="triggerRef"
            :class="triggerClasses"
            :style="triggerStyle"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="onClose"
            @mouseleave="onClose">
            <!--
                @slot Tooltip trigger slot
            -->
            <slot />
        </div>
    </div>
</template>
