<script setup lang="ts" generic="C extends Component">
import {
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    useTemplateRef,
    type Component,
} from "vue";

import { getDefault } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    getActiveClasses,
    useClickOutside,
    useEventListener,
    useMatchMedia,
} from "@/composables";

import type { SidebarProps } from "./props";

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

const props = withDefaults(defineProps<SidebarProps<C>>(), {
    override: undefined,
    active: false,
    overlay: () => getDefault("sidebar.overlay", false),
    inline: false,
    position: () => getDefault("sidebar.position", "left"),
    fullheight: () => getDefault("sidebar.fullheight", false),
    fullwidth: () => getDefault("sidebar.fullwidth", false),
    reduce: () => getDefault("sidebar.reduce", false),
    mobile: () => getDefault("sidebar.mobile"),
    expandOnHover: () => getDefault("sidebar.expandOnHover", false),
    animation: () => getDefault("sidebar.animation"),
    cancelable: () => getDefault("sidebar.cancelable", ["escape", "outside"]),
    scroll: () => getDefault("sidebar.scroll", "clip"),
    mobileBreakpoint: () => getDefault("sidebar.mobileBreakpoint"),
    teleport: () => getDefault("sidebar.teleport", false),
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on component close event
     * @param value {unknown} - close event data
     */
    close: [...args: unknown[]];
}>();

const rootRef = useTemplateRef("rootElement");
const contentRef = useTemplateRef("contentElement");

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

const savedScrollTop = ref<number>();

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
        document.body.style.top = "";
    }
});

// --- Events Feature ---

if (isClient) {
    // register onKeyPress event listener when is active
    useEventListener(rootRef, "keyup", onKeyPress, { trigger: isActive });

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
    if (
        props.overlay ||
        (contentRef.value && !event.composedPath().includes(contentRef.value))
    )
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
    document.body.style.top = "";
    savedScrollTop.value = undefined;
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
    ["mobileClass", "o-side--mobile", null, isMobile],
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
                (props.mobile === "expanded" && isMobile.value),
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
                (!isMobile.value || props.mobile !== "expanded"),
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
    getActiveClasses(props.scroll === "clip" ? scrollClasses : noScrollClasses),
);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });
</script>

<template>
    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <div
            v-show="!hideOnMobile"
            ref="rootElement"
            v-bind="$attrs"
            :class="rootClasses"
            data-oruga="sidebar">
            <div
                v-if="overlay && isActive"
                :class="overlayClasses"
                :tabindex="-1"
                @click="clickedOutside" />

            <transition
                :name="transitionName"
                @after-enter="afterEnter"
                @before-leave="beforeLeave">
                <div
                    v-show="isActive"
                    ref="contentElement"
                    :class="contentClasses">
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
                            v-on="$props.events || {}"
                            @close="close" />
                    </slot>
                </div>
            </transition>
        </div>
    </Teleport>
</template>
