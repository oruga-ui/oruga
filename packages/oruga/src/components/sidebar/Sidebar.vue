<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    type Component,
    type PropType,
} from "vue";

import { getOption } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    getActiveClasses,
    useClickOutside,
    useEventListener,
    useMatchMedia,
} from "@/composables";

import type { ComponentClass } from "@/types";

/**
 * A sidebar to use as left/right overlay or static
 * @displayName Sidebar
 * @style _sidebar.scss
 */
defineOptions({
    isOruga: true,
    name: "OSidebar",
    configField: "sidebar",
    inheritAttrs: false,
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Whether siedbar is active or not, use v-model:active to make it two-way binding */
    active: { type: Boolean, default: false },

    /** Show an overlay like modal */
    overlay: {
        type: Boolean,
        default: () => getOption("sidebar.overlay", false),
    },
    /** Display the Sidebear inline */
    inline: { type: Boolean, default: false },
    /**
     * Sidebar position
     * @values top, right, bottom, left
     */
    position: {
        type: String as PropType<"top" | "right" | "bottom" | "left">,
        default: () => getOption("sidebar.position", "left"),
        validator: (value: string) =>
            ["top", "right", "bottom", "left"].indexOf(value) >= 0,
    },
    /** Show sidebar in fullheight */
    fullheight: {
        type: Boolean,
        default: () => getOption("sidebar.fullheight", false),
    },
    /** Show sidebar in fullwidth */
    fullwidth: {
        type: Boolean,
        default: () => getOption("sidebar.fullwidth", false),
    },
    /** Show a small sidebar */
    reduce: {
        type: Boolean,
        default: () => getOption("sidebar.reduce", false),
    },
    /**
     * Custom layout on mobile
     * @values fullwidth, reduced, hidden
     */
    mobile: {
        type: String as PropType<"fullwidth" | "reduced" | "hidden">,
        default: () => getOption("sidebar.mobile"),
        validator: (value: string) =>
            ["fullwidth", "reduced", "hidden"].indexOf(value) >= 0,
    },
    /** Expand sidebar on hover when reduced or mobile is reduce */
    expandOnHover: {
        type: Boolean,
        default: () => getOption("sidebar.expandOnHover", false),
    },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("sidebar.animation"),
    },
    /**
     * Is Sidebar cancleable by pressing escape or clicking outside.
     * @values escape, outside, true, false
     */
    cancelable: {
        type: [Array, Boolean] as PropType<string[] | boolean>,
        default: () => getOption("sidebar.cancelable", ["escape", "outside"]),
    },
    /**
     * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
     * but will set body to position fixed, might break some layouts.
     * @values keep, clip
     */
    scroll: {
        type: String as PropType<"clip" | "keep">,
        default: () => getOption("sidebar.scroll", "clip"),
        validator: (value: string) => ["clip", "keep"].indexOf(value) >= 0,
    },
    /** Destroy sidebar on hide */
    destroyOnHide: {
        type: Boolean,
        default: () => getOption("sidebar.destroyOnHide", false),
    },
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("sidebar.mobileBreakpoint"),
    },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("sidebar.teleport", false),
    },
    /**
     * Component to be injected, used to open a component sidebar programmatically.
     * Close sidebar within the component by emitting a 'close' event — emits('close')
     */
    component: {
        type: [Object, Function] as PropType<Component>,
        default: undefined,
    },
    /** Props to be binded to the injected component. */
    props: { type: Object, default: undefined },
    /** Events to be binded to the injected component. */
    events: { type: Object, default: () => ({}) },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of sidebar component when its active */
    activeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of sidebar when teleported */
    teleportClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar overlay */
    overlayClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar content */
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar position */
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar when is fullheight */
    fullheightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar when is fullwidth */
    fullwidthClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar when its inlined */
    inlineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar when reduced */
    reduceClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar when expanded on hover */
    expandOnHoverClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of sidebar component when on mobile */
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the body when sidebar clipped */
    crollClipClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the body when sidebar is not clipped */
    noScrollClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar content when sidebar is hidden */
    hiddenClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sidebar content when sidebar is visible */
    visibleClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on component close event
     * @param value {unknown} - close event data
     */
    (e: "close", ...args: unknown[]): void;
}>();

const rootRef = ref();
const contentRef = ref();

const isActive = defineModel<boolean>("active", { default: false });

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const _teleport = computed(() =>
    typeof props.teleport === "boolean"
        ? { to: "body", disabled: !props.teleport }
        : { to: props.teleport, disabled: false },
);

const transitionName = computed(() => {
    if (props.animation) return props.animation;

    const vertical = props.position === "top" || props.position === "bottom";
    const right = props.position === "right";
    const open = right ? !isActive.value : isActive.value;

    return open
        ? vertical
            ? "slide-down"
            : "slide-next"
        : vertical
          ? "slide-up"
          : "slide-prev";
});

const hideOnMobile = computed(
    () => props.mobile === "hidden" && isMobile.value,
);

const savedScrollTop = ref(null);

watch(isActive, () => {
    if (props.overlay) handleScroll();
});

onMounted(() => {
    if (isActive.value && props.overlay) handleScroll();
});

onBeforeUnmount(() => {
    if (isClient && props.overlay) {
        // reset scroll
        const scrollto = savedScrollTop.value
            ? savedScrollTop.value
            : document.documentElement.scrollTop;
        if (scrollClass.value) {
            document.body.classList.remove(...scrollClass.value);
            document.documentElement.classList.remove(...scrollClass.value);
        }
        document.documentElement.scrollTop = scrollto;
        document.body.style.top = null;
    }
});

// --- Events Feature ---

if (isClient) {
    // register onKeyPress event listener when is active
    useEventListener("keyup", onKeyPress, rootRef.value, { trigger: isActive });
    if (!props.overlay)
        // register outside click event listener when is active
        useClickOutside(contentRef, clickedOutside, { trigger: isActive });
}

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (!isActive.value) return;
    if (event.key === "Escape" || event.key === "Esc") cancel("escape");
}

/** Close fixed sidebar if clicked outside. */
function clickedOutside(event: Event): void {
    if (props.inline || !isActive.value || isAnimating.value) return;
    if (props.overlay || !event.composedPath().includes(contentRef.value))
        event.preventDefault();
    cancel("outside");
}

/**
 * Check if method is cancelable.
 * Call close() with action `cancel`.
 * @param method Cancel method
 */
function cancel(method: string): void {
    // check if method is cancelable
    if (
        (typeof props.cancelable === "boolean" && !props.cancelable) ||
        !props.cancelable ||
        (Array.isArray(props.cancelable) && !props.cancelable.includes(method))
    )
        return;
    close({ action: "cancel", method });
}

/** set active to false and emit close event */
function close(...args: unknown[]): void {
    isActive.value = false;
    emits("close", args);
}

function handleScroll(): void {
    if (!isClient) return;

    if (props.scroll === "clip") {
        if (scrollClass.value?.length) {
            if (isActive.value) {
                document.documentElement.classList.add(...scrollClass.value);
            } else {
                document.documentElement.classList.remove(...scrollClass.value);
            }
        }
        return;
    }

    savedScrollTop.value = savedScrollTop.value
        ? savedScrollTop.value
        : document.documentElement.scrollTop;

    if (scrollClass.value) {
        if (isActive.value) document.body.classList.add(...scrollClass.value);
        else document.body.classList.remove(...scrollClass.value);
    }

    if (isActive.value) {
        document.body.style.top = `-${savedScrollTop.value}px`;
        return;
    }

    document.documentElement.scrollTop = savedScrollTop.value;
    document.body.style.top = null;
    savedScrollTop.value = null;
}

// --- Animation Feature ---

const isAnimating = ref(!props.active);

/** Transition after-enter hook */
function afterEnter(): void {
    isAnimating.value = false;
}

/** Transition before-leave hook */
function beforeLeave(): void {
    isAnimating.value = true;
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-side"],
    ["mobileClass", "o-side--mobile", computed(() => props.mobile), isMobile],
    ["activeClass", "o-side--active", null, isActive],
    [
        "teleportClass",
        "o-side--teleport",
        null,
        computed(() => !!props.teleport),
    ],
    ["inlineClass", "o-side--inline", null, computed(() => props.inline)],
);

const overlayClasses = defineClasses(["overlayClass", "o-side__overlay"]);

const contentClasses = defineClasses(
    ["contentClass", "o-side__content"],
    [
        "positionClass",
        "o-side__content--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
    [
        "fullheightClass",
        "o-side__content--fullheight",
        null,
        computed(() => props.fullheight),
    ],
    [
        "fullwidthClass",
        "o-side__content--fullwidth",
        null,
        computed(
            () =>
                props.fullwidth ||
                (props.mobile === "fullwidth" && isMobile.value),
        ),
    ],
    [
        "reduceClass",
        "o-side__content--reduced",
        null,
        computed(
            () =>
                props.reduce || (props.mobile === "reduced" && isMobile.value),
        ),
    ],
    [
        "expandOnHoverClass",
        "o-side__content--reduced-expand",
        null,
        computed(
            () =>
                props.expandOnHover &&
                (!isMobile.value || props.mobile !== "fullwidth"),
        ),
    ],
    ["visibleClass", "o-side__content--visible", null, isActive],
    [
        "hiddenClass",
        "o-side__content--hidden",
        null,
        computed(() => !isActive.value),
    ],
);

const scrollClasses = defineClasses(["scrollClipClass", "o-clipped"]);
const noScrollClasses = defineClasses(["noScrollClass", "o-noscroll"]);

const scrollClass = computed(() =>
    getActiveClasses(
        props.scroll === "clip" ? scrollClasses.value : noScrollClasses.value,
    ),
);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });
</script>

<template>
    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <div
            v-show="!hideOnMobile"
            ref="rootRef"
            v-bind="$attrs"
            :class="rootClasses"
            data-oruga="sidebar">
            <div
                v-if="overlay && isActive"
                :class="overlayClasses"
                :tabindex="-1"
                aria-hidden="true"
                @click="clickedOutside" />

            <transition
                :name="transitionName"
                @after-enter="afterEnter"
                @before-leave="beforeLeave">
                <div v-show="isActive" ref="contentRef" :class="contentClasses">
                    <!--
                        @slot Sidebar default content, default is component prop
                        @binding {(...args):void} close - function to close the component
                    -->
                    <slot :close="close">
                        <!-- injected component for programmatic usage -->
                        <component
                            :is="component"
                            v-if="component"
                            v-bind="$props.props"
                            v-on="$props.events"
                            @close="close" />
                    </slot>
                </div>
            </transition>
        </div>
    </Teleport>
</template>
