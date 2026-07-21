<script setup lang="ts" generic="C extends Component">
import {
    ref,
    watch,
    computed,
    useId,
    useTemplateRef,
    onMounted,
    type Component,
} from "vue";

import CloseButton from "@/components/utils/CloseButton.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    unrefElement,
    usePopoverAPI,
    usePreventScrolling,
    useTeleport,
    type MaybeElement,
} from "@/composables";

import type { PopoverProps } from "./props";

/**
 * A popover is a content container that displays rich content over the top of other content.
 * @experimental
 * @displayName Popover
 * @style _popover.scss
 */
defineOptions({
    isOruga: true,
    name: "OPopover",
    configField: "popover",
});

const props = withDefaults(defineProps<PopoverProps<C>>(), {
    override: undefined,
    active: false,
    id: () => useId(),
    title: undefined,
    content: undefined,
    behavior: "auto",
    position: () => getDefault("popover.position", "top"),
    delay: undefined,
    disabled: false,
    backdrop: false,
    modal: false,
    role: undefined,
    closeable: () => getDefault("popover.closeable", false),
    iconPack: () => getDefault("popover.iconPack"),
    closeIcon: () => getDefault("popover.closeIcon", "close"),
    closeIconSize: () => getDefault("popover.closeIconSize"),
    ariaCloseLabel: () => getDefault("popover.ariaCloseLabel", "Close"),
    animation: () => getDefault("popover.animation", "fade"),
    teleport: () => getDefault("popover.teleport", false),
    clipScroll: () => getDefault("popover.clipScroll", false),
    target: undefined,
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
     * on active state changes to false
     * @param event {Event} - native event
     */
    close: [event: Event];
    /**
     * on active state changes to true
     * @param event {Event} - native event
     */
    open: [event: Event];
}>();

defineSlots<{
    /**
     * Define a trigger here
     * @param active {boolean} - popover active state
     * @param open {(): void} - function to open the popover
     */
    default?(props: { active: boolean; open: () => void }): void;
    /**
     * Override the popover title, default is title prop
     * @param close {(): void} - function to close the popover
     */
    title?(props: { close: () => void }): void;
    /**
     * Override the popover content, default is content prop
     * @param close {(): void} - function to close the popover
     */
    content?(props: { close: () => void }): void;
    /** Define a custom close icon */
    close?(): void;
}>();

const isActive = defineModel<boolean>("active", { default: false });

const rootRef = useTemplateRef("rootElement");
const contentRef = useTemplateRef("contentElement");
const triggerRef = ref<Element>();

onMounted(() => {
    if (!rootRef.value) return;

    // get the trigger element
    // which can eather be a custom target
    // or should be the first element in the default slot
    const trigger =
        unrefElement<MaybeElement>(props.target) ??
        props.container ??
        rootRef.value.firstElementChild;

    if (!props.target && (!trigger || trigger === contentRef.value))
        throw new Error("The popover require an element in the default slot.");

    if (!(trigger instanceof Element))
        throw new Error(
            "The popover trigger element must be a valid HTMLElement.",
        );

    triggerRef.value = trigger;
});

const _teleport = useTeleport(props.teleport);

const popoverPosition = computed(() =>
    props.modal ? "centered" : props.position,
);

const { open, close, toggle } = usePopoverAPI({
    position: popoverPosition,
    delay: props.delay,
    behavior: props.behavior,
    trigger: isActive,
    disabled: () => props.disabled,
    targetTrigger: !props.target,
    targetRef: triggerRef,
    contentRef,
    onToggle,
    onBeforeToggle,
});

const toggleScroll = usePreventScrolling(props.clipScroll);

watch(
    isActive,
    (value) => {
        if (props.backdrop || props.modal) toggleScroll(value);
    },
    { flush: "post" },
);

// #region --- Event Handler ---

function onBeforeToggle(event: ToggleEvent): void {
    if (event.newState === "open") emits("open", event);
    else emits("close", event);
}

function onToggle(event: ToggleEvent): void {
    if (event.newState === "open") isActive.value = true;
    else isActive.value = false;
}

// #endregion --- Event Handler ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-popover"],
    [
        "disabledClass",
        "o-popover--disabled",
        null,
        computed(() => props.disabled),
    ],
    ["activeClass", "o-popover--active", null, isActive],
    [
        "teleportClass",
        "o-popover--teleport",
        null,
        computed(() => !_teleport.disabled),
    ],
);

const contentClasses = defineClasses(
    ["contentClass", "o-popover__content"],
    ["contentActiveClass", "o-popover__content--active", null, isActive],
    [
        "contentModalClass",
        "o-popover__content--modal",
        null,
        computed(() => props.modal),
    ],
    [
        "contentBackdropClass",
        "o-popover__content--backdrop",
        null,
        computed(() => props.backdrop || props.modal),
    ],
);

const headerClasses = defineClasses(["headerClass", "o-popover__header"]);

const bodyClasses = defineClasses(["bodyClass", "o-popover__body"]);

const closeClasses = defineClasses(["closeClass", "o-popover__close"]);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close, open, toggle });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <div ref="rootElement" data-oruga="popover" :class="rootClasses">
        <slot :active="isActive" :open="open" />

        <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
            <transition :name="animation">
                <!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
                <div
                    :id="id"
                    ref="contentElement"
                    :class="contentClasses"
                    :role="role"
                    popover>
                    <div v-if="title || $slots['title']" :class="headerClasses">
                        <slot name="title" :close="close">
                            {{ title }}
                        </slot>
                    </div>

                    <CloseButton
                        v-if="closeable"
                        :pack="iconPack"
                        :icon="closeIcon"
                        :size="closeIconSize"
                        :label="ariaCloseLabel"
                        :classes="closeClasses"
                        @click="close">
                        <slot v-if="$slots['close']" name="close" />
                    </CloseButton>

                    <div :class="bodyClasses">
                        <!-- injected component for programmatic usage -->
                        <component
                            :is="$props.component"
                            v-if="$props.component"
                            v-bind="$props.props"
                            v-on="$props.events || {}"
                            @close="close" />

                        <slot v-else name="content" :close="close">
                            {{ content }}
                        </slot>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>
