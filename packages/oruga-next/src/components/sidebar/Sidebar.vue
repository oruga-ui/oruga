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

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    useComputedClass,
    useMatchMedia,
    useProgrammaticComponent,
} from "@/composables";

import type { ComponentClass, ProgrammaticInstance } from "@/types";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Whether siedbar is active or not, use v-model:active to make it two-way binding. */
    active: { type: Boolean, default: false },
    /**
     * Color of the sidebar
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("sidebar.variant"),
    },
    /** Show an overlay like modal */
    overlay: { type: Boolean, default: getOption("sidebar.overlay", false) },
    /** Display the Sidebear inline */
    inline: { type: Boolean, default: false },
    /**
     * Sidebar position
     * @values top, right, bottom, left
     */
    position: {
        type: String as PropType<"top" | "right" | "bottom" | "left">,
        default: () => getOption("sidebar.position", "left"),
    },
    /** Show sidebar in fullheight */
    fullheight: {
        type: Boolean,
        default: getOption("sidebar.fullheight", false),
    },
    /** Show sidebar in fullwidth */
    fullwidth: {
        type: Boolean,
        default: getOption("sidebar.fullwidth", false),
    },
    /** Show a small sidebar */
    reduce: { type: Boolean, default: getOption("sidebar.reduce", false) },
    /**
     * Custom layout on mobile
     * @values fullwidth, reduced, hidden
     */
    mobile: {
        type: String,
        default: getOption("sidebar.mobile"),
        validator: (value: string) =>
            ["fullwidth", "reduced", "hidden"].indexOf(value) >= 0,
    },
    /** Expand sidebar on hover when reduced or mobile is reduce */
    expandOnHover: {
        type: Boolean,
        default: getOption("sidebar.expandOnHover", false),
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
    /** Callback function to call after user canceled (pressed escape / clicked outside) */
    onCancel: { type: Function as PropType<() => void>, default: () => {} },
    /** Callback function to call after close (programmatically close or user canceled) */
    onClose: { type: Function as PropType<() => void>, default: () => {} },
    /**
     * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
     * but will set body to position fixed, might break some layouts.
     * @values keep, clip
     */
    scroll: {
        type: String,
        default: () => getOption("sidebar.scroll", "clip"),
        validator: (value: string) => ["clip", "keep"].indexOf(value) >= 0,
    },
    /** Destroy sidebar on hide */
    destroyOnHide: {
        type: Boolean,
        default: () => getOption("sidebar.destroyOnHide", false),
    },
    /** Mobile breakpoint as max-width value */
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
    /** DOM element where the sidebar component will be created on (for programmatic usage). */
    container: {
        type: [Object, String] as PropType<string | HTMLElement>,
        default: () => getOption("sidebar.container", "body"),
    },
    /**
     * This is used internally for programmatic usage.
     * @ignore
     */
    programmatic: {
        type: Object as PropType<ProgrammaticInstance>,
        default: undefined,
    },
    /**
     * This is used internally for programmatic usage.
     * @ignore
     */
    promise: { type: Promise, default: undefined },
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    activeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    teleportClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    overlayClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    fullheightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    fullwidthClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    inlineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    reduceClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    expandOnHoverClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    crollClipClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    noScrollClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    hiddenClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
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
     * @param value {any} - close event data
     */
    (e: "close", ...args: any[]): void;
}>();

const rootRef = ref();
const sidebarContent = ref();

/** add programmatic usage to this component */
const { isActive, close, cancel } = useProgrammaticComponent(
    rootRef,
    props,
    emits,
    {
        destroyOnHide: props.destroyOnHide,
        cancelOptions: getOption("sidebar.cancelable", ["escape", "outside"]),
    },
);

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const savedScrollTop = ref(null);
const isAnimating = ref(!props.active);

watch(isActive, (value) => {
    if (props.overlay) handleScroll();
    if (value) addHandler();
    else removeHandler();
});

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

onMounted(() => {
    if (props.active) addHandler();
});

onBeforeUnmount(() => {
    removeHandler();
    if (isClient) {
        if (props.overlay) {
            // reset scroll
            const scrollto = savedScrollTop.value
                ? savedScrollTop.value
                : document.documentElement.scrollTop;
            if (scrollClass.value) {
                document.body.classList.remove(scrollClass.value);
                document.documentElement.classList.remove(scrollClass.value);
            }
            document.documentElement.scrollTop = scrollto;
            document.body.style.top = null;
        }
    }
});

/** add outside click event listener */
function addHandler(): void {
    if (isClient && !props.overlay)
        setTimeout(() => document.addEventListener("click", clickedOutside));
}

/** remove outside click event listener */
function removeHandler(): void {
    document.removeEventListener("click", clickedOutside);
}

/** Close fixed sidebar if clicked outside. */
function clickedOutside(event: Event): void {
    if (props.inline || !isActive.value || isAnimating.value) return;
    if (props.overlay || !event.composedPath().includes(sidebarContent.value))
        event.preventDefault();
    cancel("outside");
}

function handleScroll(): void {
    if (!isClient) return;

    if (props.scroll === "clip") {
        if (scrollClass.value) {
            if (isActive.value)
                document.documentElement.classList.add(scrollClass.value);
            else document.documentElement.classList.remove(scrollClass.value);
        }
        return;
    }

    savedScrollTop.value = savedScrollTop.value
        ? savedScrollTop.value
        : document.documentElement.scrollTop;

    if (scrollClass.value) {
        if (isActive.value) document.body.classList.add(scrollClass.value);
        else document.body.classList.remove(scrollClass.value);
    }

    if (isActive.value) {
        document.body.style.top = `-${savedScrollTop.value}px`;
        return;
    }

    document.documentElement.scrollTop = savedScrollTop.value;
    document.body.style.top = null;
    savedScrollTop.value = null;
}

/** Transition after-enter hook */
function afterEnter(): void {
    isAnimating.value = false;
}

/** Transition before-leave hook */
function beforeLeave(): void {
    isAnimating.value = true;
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-side"),
    {
        [useComputedClass("mobileClass", "o-side--mobile")]: isMobile.value,
    },
    {
        [useComputedClass("activeClass", "o-side--active")]: isActive.value,
    },
    {
        [useComputedClass("teleportClass", "o-side--teleport")]:
            !!props.teleport,
    },
    {
        [useComputedClass("inlineClass", "o-side--inline")]: props.inline,
    },
]);

const overlayClasses = computed(() => [
    useComputedClass("overlayClass", "o-side__overlay"),
]);

const contentClasses = computed(() => [
    useComputedClass("contentClass", "o-side__content"),
    {
        [useComputedClass("variantClass", "o-side__content--", props.variant)]:
            props.variant,
    },
    {
        [useComputedClass(
            "positionClass",
            "o-side__content--",
            props.position,
        )]: props.position,
    },
    {
        [useComputedClass("fullheightClass", "o-side__content--fullheight")]:
            props.fullheight,
    },
    {
        [useComputedClass("fullwidthClass", "o-side__content--fullwidth")]:
            props.fullwidth || (props.mobile === "fullwidth" && isMobile.value),
    },
    {
        [useComputedClass("reduceClass", "o-side__content--reduced")]:
            props.reduce || (props.mobile === "reduced" && isMobile.value),
    },
    {
        [useComputedClass(
            "expandOnHoverClass",
            "o-side__content--reduced-expand",
        )]:
            props.expandOnHover &&
            (!isMobile.value || props.mobile !== "fullwidth"),
    },
    {
        [useComputedClass("visibleClass", "o-side__content--visible")]:
            isActive.value,
    },
    {
        [useComputedClass("hiddenClass", "o-side__content--hidden")]:
            !isActive.value,
    },
]);

const scrollClass = computed(() =>
    props.scroll === "clip"
        ? useComputedClass("scrollClipClass", "o-clipped")
        : useComputedClass("noScrollClass", "o-noscroll"),
);
// computed ref must be computed at least once for programmatic usage
scrollClass.value;

// --- Expose Public Functionality ---

/** expose functionalities for programmatic usage */
defineExpose({ close, promise: props.promise });
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
                @click="(evt) => clickedOutside(evt)" />
            <transition
                :name="transitionName"
                @after-enter="afterEnter"
                @before-leave="beforeLeave">
                <div
                    v-show="isActive"
                    ref="sidebarContent"
                    :class="contentClasses">
                    <!--
                        @slot Sidebar default content, default is component prop
                        @binding {(...args):void} close - function to close the component
                    -->
                    <slot :close="close">
                        <!-- injected component for programmatic usage -->
                        <component
                            v-bind="$props.props"
                            :is="component"
                            v-if="component"
                            v-on="$props.events"
                            @close="close" />
                    </slot>
                </div>
            </transition>
        </div>
    </Teleport>
</template>
