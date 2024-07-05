<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    nextTick,
    onBeforeUnmount,
    onMounted,
    type Component,
    type PropType,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { vTrapFocus } from "@/directives/trapFocus";
import { getOption } from "@/utils/config";
import { removeElement, toCssDimension } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    getActiveClasses,
    useClickOutside,
    useEventListener,
    useMatchMedia,
    useProgrammaticComponent,
} from "@/composables";

import type { ComponentClass, ProgrammaticInstance } from "@/types";

/**
 * Classic modal overlay to include any content you may need
 * @displayName Modal
 * @style _modal.scss
 */
defineOptions({
    isOruga: true,
    name: "OModal",
    configField: "modal",
    inheritAttrs: false,
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Whether modal is active or not, use v-model:active to make it two-way binding */
    active: { type: Boolean, default: false },
    /** Display modal as full screen */
    fullScreen: { type: Boolean, default: false },
    /** Text content, unnecessary when default slot is used */
    content: { type: [String, Object], default: undefined },
    /** Width of the Modal */
    width: {
        type: [String, Number],
        default: () => getOption("modal.width", 960),
    },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("modal.animation", "zoom-out"),
    },
    /** Show an overlay  */
    overlay: {
        type: Boolean,
        default: () => getOption("modal.overlay", true),
    },
    /**
     * Is Modal cancleable by clicking 'X', pressing escape or clicking outside
     * @values escape, x, outside, button, true, false
     */
    cancelable: {
        type: [Array, Boolean] as PropType<string[] | boolean>,
        default: () =>
            getOption("modal.cancelable", ["escape", "x", "outside"]),
    },
    /** Callback function to call on close (programmatically close or user canceled) */
    onClose: { type: Function as PropType<() => void>, default: () => {} },
    /**
     * Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
     * but will set body to position fixed, might break some layouts.
     * @values keep, clip
     */
    scroll: {
        type: String,
        default: () => getOption("modal.scroll", "keep"),
        validator: (value: string) => ["keep", "clip"].indexOf(value) >= 0,
    },
    /** Trap focus inside the modal */
    trapFocus: {
        type: Boolean,
        default: () => getOption("modal.trapFocus", true),
    },
    /**
     * Role attribute to be passed to the div wrapper for better accessibility.
     * @values dialog, alertdialog
     */
    ariaRole: {
        type: String,
        default: () => getOption("modal.ariaRole"),
        validator: (value: string) =>
            ["dialog", "alertdialog"].indexOf(value) >= 0,
    },
    /** Accessibility aria-label to be passed to the div wrapper element */
    ariaLabel: {
        type: String,
        default: () => getOption("modal.ariaLabel"),
    },
    /** Destroy modal on hide - default `true` for programmatic usage */
    destroyOnHide: {
        type: Boolean,
        default: () => getOption("modal.destroyOnHide", false),
    },
    /** Automatically focus modal when active */
    autoFocus: {
        type: Boolean,
        default: () => getOption("modal.autoFocus", true),
    },
    /** Close icon name */
    closeIcon: {
        type: String,
        default: () => getOption("modal.closeIcon", "close"),
    },
    /**
     * Size of close icon
     * @values small, medium, large
     */
    closeIconSize: {
        type: String,
        default: () => getOption("modal.closeIconSize", "medium"),
    },
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("modal.mobileBreakpoint"),
    },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("modal.teleport", false),
    },
    /**
     * Component to be injected, used to open a component modal programmatically.
     * Close modal within the component by emitting a 'close' event — emits('close')
     */
    component: {
        type: [Object, Function] as PropType<Component>,
        default: undefined,
    },
    /** Props to be binded to the injected component */
    props: { type: Object, default: undefined },
    /** Events to be binded to the injected component */
    events: { type: Object, default: () => ({}) },
    /** DOM element where the modal component will be created on (for programmatic usage) */
    container: {
        type: [Object, String] as PropType<string | HTMLElement | null>,
        default: () => getOption("modal.container", "body"),
    },
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    programmatic: {
        type: Object as PropType<ProgrammaticInstance>,
        default: undefined,
    },
    /**
     * This is used internally for programmatic usage
     * @ignore
     */
    promise: { type: Promise, default: undefined },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of modal component when its active */
    activeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the modal overlay */
    overlayClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the modal content */
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the close button */
    closeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the modal when fullscreen */
    fullScreenClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of modal component when on mobile */
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the modal when scroll is clip */
    scrollClipClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the modal when scroll is not clip */
    noScrollClass: {
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
const contentRef = ref();

const isActive = defineModel<boolean>("active", { default: false });

function handleClose(...args: any[]): void {
    if (typeof props.onClose === "function" && isActive.value)
        props.onClose.apply(args);
    isActive.value = false;
    emits("close", args);
}

/** add programmatic usage to this component */
const { close, cancel } = useProgrammaticComponent(rootRef, {
    container: props.container,
    programmatic: props.programmatic,
    cancelable: props.cancelable,
    destroy: props.destroyOnHide,
    onClose: handleClose,
});

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const _teleport = computed(() =>
    typeof props.teleport === "boolean"
        ? { to: "body", disabled: !props.teleport }
        : { to: props.teleport, disabled: false },
);

const showX = computed(() =>
    Array.isArray(props.cancelable)
        ? props.cancelable.indexOf("x") >= 0
        : props.cancelable,
);

const customStyle = computed(() =>
    !props.fullScreen ? { maxWidth: toCssDimension(props.width) } : null,
);

const savedScrollTop = ref(null);

watch(isActive, (value) => {
    if (props.overlay) handleScroll();
    // if autoFocus focus the element
    if (value && rootRef.value && props.autoFocus)
        nextTick(() => rootRef.value.focus());
    // destoyed the modal after it get closed
    if (!value && props.destroyOnHide)
        // wait for transition finish
        setTimeout(() => removeElement(rootRef.value));
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
        useClickOutside(contentRef, clickedOutside, {
            trigger: isActive,
        });
}

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (!isActive.value) return;
    if (event.key === "Escape" || event.key === "Esc") cancel("escape");
}

/** Close fixed sidebar if clicked outside. */
function clickedOutside(event: Event): void {
    if (!isActive.value || isAnimating.value) return;
    if (props.overlay || !event.composedPath().includes(contentRef.value))
        event.preventDefault();
    cancel("outside");
}

function handleScroll(): void {
    if (!isClient) return;

    if (props.scroll === "clip") {
        if (scrollClass.value) {
            if (isActive.value)
                document.documentElement.classList.add(...scrollClass.value);
            else
                document.documentElement.classList.remove(...scrollClass.value);
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
    ["rootClass", "o-modal"],
    ["mobileClass", "o-modal--mobile", null, isMobile],
    ["activeClass", "o-modal--active", null, isActive],
);

const overlayClasses = defineClasses(["overlayClass", "o-modal__overlay"]);

const contentClasses = defineClasses(
    ["contentClass", "o-modal__content"],
    [
        "fullScreenClass",
        "o-modal__content--full-screen",
        null,
        computed(() => props.fullScreen),
    ],
);

const closeClasses = defineClasses(["closeClass", "o-modal__close"]);

const scrollClasses = defineClasses(["scrollClipClass", "o-clipped"]);
const noScrollClasses = defineClasses(["noScrollClass", "o-noscroll"]);

const scrollClass = computed(() =>
    getActiveClasses(
        props.scroll === "clip" ? scrollClasses.value : noScrollClasses.value,
    ),
);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close, promise: props.promise });
</script>

<template>
    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <transition
            :name="animation"
            @after-enter="afterEnter"
            @before-leave="beforeLeave">
            <div
                v-show="isActive"
                v-bind="$attrs"
                ref="rootRef"
                v-trap-focus="trapFocus"
                data-oruga="modal"
                :class="rootClasses"
                :tabindex="-1"
                :role="ariaRole"
                :aria-label="ariaLabel"
                :aria-modal="isActive">
                <div
                    v-if="overlay"
                    :class="overlayClasses"
                    tabindex="-1"
                    aria-hidden="true"
                    @click="clickedOutside" />

                <div
                    ref="contentRef"
                    :class="contentClasses"
                    :style="customStyle">
                    <!-- injected component for programmatic usage -->
                    <component
                        v-bind="$props.props"
                        :is="component"
                        v-if="component"
                        v-on="$props.events"
                        @close="close" />
                    <!--
                        @slot Modal default content, default is content prop
                        @binding {(...args): void} close - function to close the component
                    -->
                    <slot v-else :close="close">
                        <div v-if="content">{{ content }}</div>
                    </slot>

                    <o-icon
                        v-if="showX"
                        v-show="!isAnimating"
                        clickable
                        both
                        :class="closeClasses"
                        :icon="closeIcon"
                        :size="closeIconSize"
                        @click="cancel('x')" />
                </div>
            </div>
        </transition>
    </Teleport>
</template>
