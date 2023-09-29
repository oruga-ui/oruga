<script lang="ts">
import { getOptions } from "../../utils/config";
import BaseComponentMixin from "../../utils/BaseComponentMixin";
import {
    createAbsoluteElement,
    removeElement,
    getValueByPath,
    isWebKit,
} from "../../utils/helpers";
import type { PropType } from "vue";
import { defineComponent } from "vue";

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

function intersectionArea(a: DOMRect, b: DOMRect): number {
    const left = Math.max(a.left, b.left);
    const right = Math.min(a.right, b.right);
    const top = Math.max(a.top, b.top);
    const bottom = Math.min(a.bottom, b.bottom);
    return Math.max(right - left, 0) * Math.max(bottom - top, 0);
}

type Point = { x: number; y: number };
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

/**
 * Display a brief helper text to your user
 * @displayName Tooltip
 * @style _tooltip.scss
 */
export default defineComponent({
    name: "OTooltip",
    mixins: [BaseComponentMixin],
    configField: "tooltip",
    props: {
        /** Whether tooltip is active or not, use v-model:active to make it two-way binding */
        active: {
            type: Boolean,
            default: true,
        },
        /** Tooltip text */
        label: String,
        /** Tooltip delay before it appears (number in ms) */
        delay: Number,
        /**
         * Tooltip position in relation to the element
         * @values top, bottom, left, right,
         */
        position: {
            type: String as PropType<Position | "auto">,
            default: () => {
                return getValueByPath(getOptions(), "tooltip.position", "top");
            },
            validator: (value: string) => {
                return (
                    ["top", "bottom", "left", "right", "auto"].indexOf(value) >
                    -1
                );
            },
        },
        /**
         * Tooltip trigger events
         * @values hover, click, focus, contextmenu
         */
        triggers: {
            type: Array,
            default: () => {
                return getValueByPath(getOptions(), "tooltip.triggers", [
                    "hover",
                ]);
            },
        },
        /** Tooltip will be always active */
        always: Boolean,
        /** Tooltip will have an animation */
        animated: {
            type: Boolean,
            default: true,
        },
        /** Tooltip default animation */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(
                    getOptions(),
                    "tooltip.animation",
                    "fade",
                );
            },
        },
        /**
         * Tooltip auto close options
         * @values true, false, 'inside', 'outside'
         */
        autoClose: {
            type: [Array, Boolean],
            default: true,
        },
        /** Tooltip will be multilined */
        multiline: Boolean,
        /** Append tooltip content to body */
        appendToBody: Boolean,
        /**
         * Color of the tooltip
         * @values primary, info, success, warning, danger, and any other custom color
         */
        variant: [String, Function, Array],
        rootClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        orderClass: [String, Function, Array],
        triggerClass: [String, Function, Array],
        multilineClass: [String, Function, Array],
        alwaysClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        arrowClass: [String, Function, Array],
        arrowOrderClass: [String, Function, Array],
    },
    emits: ["open", "close"],
    data() {
        return {
            isActive: false,
            triggerStyle: {},
            bodyEl: undefined, // Used to append to body
            metrics: null as TooltipMetrics | null, // Used for automatic tooltip positioning
        };
    },
    computed: {
        rootClasses() {
            return [this.computedClass("rootClass", "o-tip")];
        },
        triggerClasses() {
            return [this.computedClass("triggerClass", "o-tip__trigger")];
        },
        arrowClasses() {
            return [
                this.computedClass("arrowClass", "o-tip__arrow"),
                {
                    [this.computedClass(
                        "arrowOrderClass",
                        "o-tip__arrow--",
                        this.newPosition,
                    )]: this.newPosition,
                },
                {
                    [this.computedClass(
                        "variantArrowClass",
                        "o-tip__arrow--",
                        this.variant,
                    )]: this.variant,
                },
            ];
        },
        contentClasses() {
            return [
                this.computedClass("contentClass", "o-tip__content"),
                {
                    [this.computedClass(
                        "orderClass",
                        "o-tip__content--",
                        this.newPosition,
                    )]: this.newPosition,
                },
                {
                    [this.computedClass(
                        "variantClass",
                        "o-tip__content--",
                        this.variant,
                    )]: this.variant,
                },
                {
                    [this.computedClass(
                        "multilineClass",
                        "o-tip__content--multiline",
                    )]: this.multiline,
                },
                {
                    [this.computedClass(
                        "alwaysClass",
                        "o-tip__content--always",
                    )]: this.always,
                },
            ];
        },
        newAnimation() {
            return this.animated ? this.animation : undefined;
        },
        newPosition(): Position {
            if (this.position !== "auto") {
                return this.position;
            }
            const defaultPosition = getValueByPath<Position>(
                getOptions(),
                "tooltip.position",
                "top",
            );
            let bestPosition = defaultPosition;
            if (this.metrics != null) {
                let viewRect: DOMRect;
                const viewport = (window as any).visualViewport; // Not available with our current types package
                if (viewport != undefined) {
                    if (isWebKit()) {
                        // On WebKit, getBoundingClientRect offsets relative to the the visual viewport's origin, not the layout viewport's.
                        // See https://bugs.webkit.org/show_bug.cgi?id=170981
                        viewRect = new DOMRect(
                            0,
                            0,
                            viewport.width,
                            viewport.height,
                        );
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
                const triggerAnchors = anchors(this.metrics.trigger);
                const contentRect = this.metrics.content;
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
        },
    },
    watch: {
        isActive(value) {
            this.$emit(value ? "open" : "close");
            if (value && this.position === "auto") {
                this.$nextTick(() => {
                    this.metrics = {
                        content: this.$refs.content.getBoundingClientRect(),
                        trigger: this.$refs.trigger.getBoundingClientRect(),
                    };
                });
            }
            if (value && this.appendToBody) {
                this.updateAppendToBody();
            }
        },
    },
    mounted() {
        if (this.appendToBody) {
            this.$data.bodyEl = createAbsoluteElement(this.$refs.content);
            this.updateAppendToBody();
        }
    },
    created() {
        if (typeof window !== "undefined") {
            document.addEventListener("click", this.clickedOutside);
            document.addEventListener("keyup", this.keyPress);
        }
    },
    beforeUnmount() {
        if (typeof window !== "undefined") {
            document.removeEventListener("click", this.clickedOutside);
            document.removeEventListener("keyup", this.keyPress);
        }
        if (this.appendToBody) {
            removeElement(this.$data.bodyEl);
        }
    },
    methods: {
        updateAppendToBody() {
            const tooltip = this.$refs.tooltip;
            const trigger = this.$refs.trigger;
            if (tooltip && trigger) {
                // update wrapper tooltip
                const tooltipEl = this.$data.bodyEl.children[0];
                tooltipEl.classList.forEach((item) =>
                    tooltipEl.classList.remove(...item.split(" ")),
                );
                if (
                    this.$vnode &&
                    this.$vnode.data &&
                    this.$vnode.data.staticClass
                ) {
                    tooltipEl.classList.add(this.$vnode.data.staticClass);
                }
                this.rootClasses.forEach((item) => {
                    if (typeof item === "object") {
                        Object.keys(item)
                            .filter((key) => key && item[key])
                            .forEach((key) => tooltipEl.classList.add(key));
                    } else {
                        tooltipEl.classList.add(...item.split(" "));
                    }
                });
                tooltipEl.style.width = `${trigger.clientWidth}px`;
                tooltipEl.style.height = `${trigger.clientHeight}px`;
                const rect = trigger.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const left = rect.left + window.scrollX;
                const wrapper = this.$data.bodyEl;
                wrapper.style.position = "absolute";
                wrapper.style.top = `${top}px`;
                wrapper.style.left = `${left}px`;
                wrapper.style.zIndex =
                    this.isActive || this.always ? "99" : "-1";
                this.triggerStyle = {
                    zIndex: this.isActive || this.always ? "100" : undefined,
                };
            }
        },
        onClick() {
            if (this.triggers.indexOf("click") < 0) return;
            // if not active, toggle after clickOutside event
            // this fixes toggling programmatic
            this.$nextTick(() => {
                setTimeout(() => this.open());
            });
        },
        onHover() {
            if (this.triggers.indexOf("hover") < 0) return;
            this.open();
        },
        onFocus() {
            if (this.triggers.indexOf("focus") < 0) return;
            this.open();
        },
        onContextMenu(event) {
            if (this.triggers.indexOf("contextmenu") < 0) return;
            event.preventDefault();
            this.open();
        },
        open() {
            if (this.delay) {
                this.timer = setTimeout(() => {
                    this.isActive = true;
                    this.timer = null;
                }, this.delay);
            } else {
                this.isActive = true;
            }
        },
        close() {
            if (typeof this.autoClose === "boolean") {
                this.isActive = !this.autoClose;
            }
            if (this.autoClose && this.timer) clearTimeout(this.timer);
        },
        /**
         * Close tooltip if clicked outside.
         */
        clickedOutside(event) {
            if (this.isActive) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.indexOf("outside") >= 0) {
                        if (!this.isInWhiteList(event.target))
                            this.isActive = false;
                    }
                    if (this.autoClose.indexOf("inside") >= 0) {
                        if (this.isInWhiteList(event.target))
                            this.isActive = false;
                    }
                }
            }
        },
        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (this.isActive && (key === "Escape" || key === "Esc")) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.indexOf("escape") >= 0)
                        this.isActive = false;
                }
            }
        },
        /**
         * White-listed items to not close when clicked.
         */
        isInWhiteList(el) {
            if (el === this.$refs.content) return true;
            // All chidren from content
            if (this.$refs.content !== undefined) {
                const children = this.$refs.content.querySelectorAll("*");
                for (const child of children) {
                    if (el === child) {
                        return true;
                    }
                }
            }
            return false;
        },
    },
});
</script>

<template>
    <div ref="tooltip" :class="rootClasses">
        <transition
            :name="newAnimation"
            @after-leave="metrics = null"
            @enter-cancelled="metrics = null">
            <div
                v-show="active && (isActive || always)"
                ref="content"
                :class="contentClasses">
                <span :class="arrowClasses"></span>
                <template v-if="label">{{ label }}</template>
                <template v-else-if="$slots.default">
                    <slot name="content" />
                </template>
            </div>
        </transition>
        <div
            ref="trigger"
            :class="triggerClasses"
            :style="triggerStyle"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="close"
            @mouseleave="close">
            <slot ref="slot" />
        </div>
    </div>
</template>
