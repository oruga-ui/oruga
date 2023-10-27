<script setup lang="ts">
import {
    computed,
    nextTick,
    ref,
    watch,
    onMounted,
    onUnmounted,
    type Component,
    type PropType,
    type Ref,
} from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useMatchMedia,
    useEventListener,
} from "@/composables";
import { vTrapFocus } from "../../directives/trapFocus";
import {
    removeElement,
    createAbsoluteElement,
    toCssDimension,
    isMobileAgent,
} from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import { provideDropdown } from "./useDropdownShare";

/**
 * Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
 * @displayName Dropdown
 * @requires ./DropdownItem.vue
 * @style _dropdown.scss
 */
defineOptions({
    isOruga: true,
    name: "ODropdown",
    configField: "dropdown",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        default: undefined,
    },
    /** The active state of the dropdown, use v-model:active to make it two-way binding. */
    active: { type: Boolean, default: false },
    /** Trigger label, unnecessary when trgger slot is used */
    label: { type: String, default: undefined },
    /** Dropdown is disabled */
    disabled: { type: Boolean, default: false },
    /** Dropdown content (items) are shown inline, trigger is removed */
    inline: { type: Boolean, default: false },
    /** Dropdown content will be scrollable */
    scrollable: { type: Boolean, default: false },
    /** Max height of dropdown content */
    maxHeight: {
        type: Number,
        default: () => getOption("dropdown.maxHeight", 200),
    },
    /**
     * Optional, position of the dropdown relative to the trigger
     * @values 'top-right', 'top-left', 'bottom-left', 'bottom-right'
     */
    position: {
        type: String,
        validator: (value: string) =>
            ["top-right", "top-left", "bottom-left", "bottom-right"].indexOf(
                value,
            ) > -1,
        default: undefined,
    },
    /** Dropdown content (items) are shown into a modal on mobile */
    mobileModal: {
        type: Boolean,
        default: () => getOption("dropdown.mobileModal", true),
    },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("dropdown.animation", "fade"),
    },
    /** Allows multiple selections */
    multiple: { type: Boolean, default: false },
    /** Trap focus inside the dropdown. */
    trapFocus: {
        type: Boolean,
        default: () => getOption("dropdown.trapFocus", true),
    },
    /**
     * Can close dropdown by pressing escape, clicking the content or outside
     * @values escape, outside, content
     */
    closeable: {
        type: [Array, Boolean] as PropType<string[] | boolean>,
        default: () =>
            getOption("dropdown.closeable", ["escape", "outside", "content"]),
    },
    /** Dropdown will be expanded (full-width) */
    expanded: { type: Boolean, default: false },
    /** Dropdown menu tag name */
    menuTag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("dropdown.menuTag", "div"),
    },
    /** Dropdown trigger tag name */
    triggerTag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("dropdown.triggerTag", "div"),
    },
    /**
     * Dropdown will be triggered by any events
     * @values 'click', 'hover', 'contextmenu', 'focus'
     */
    triggers: {
        type: Array as PropType<string[]>,
        default: () => getOption("dropdown.triggers", ["click"]),
        validator: (values: string[]) =>
            values.filter(
                (value) =>
                    ["click", "hover", "contextmenu", "focus"].indexOf(value) >
                    -1,
            ).length === values.length,
    },
    /** Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key) */
    tabindex: { type: Number, default: 0 },
    /**
     * Role attribute to be passed to the list container for better accessibility.
     * Use menu only in situations where your dropdown is related to a navigation menu.
     * @values list, menu, dialog
     */
    ariaRole: {
        type: String,
        default: getOption("dropdown.ariaRole", "list"),
        validator: (value: string) =>
            ["menu", "list", "dialog"].indexOf(value) > -1,
    },
    /** Append dropdown content to body */
    appendToBody: {
        type: Boolean,
        default: () => getOption("dropdown.appendToBody", false),
    },
    /** @ignore */
    appendToBodyCopyParent: Boolean,
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "triggerClass",
        "inlineClass",
        "menuMobileOverlayClass",
        "menuClass",
        "menuPositionClass",
        "menuActiveClass",
        "mobileClass",
        "disabledClass",
        "expandedClass",
    ]),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {[String, Number, Boolean, Object, Array]} updated modelValue prop
     */
    (
        e: "update:modelValue",
        value: [string, number, boolean, object, Array<any>],
    ): void;
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * change event
     * @param value {any} selected value
     */
    (e: "change", value: any): void;
}>();

const rootRef = ref();
const menuRef = ref();
const triggerRef = ref();

const vmodel = useVModelBinding<[string, number, boolean, object, Array<any>]>(
    props,
    emits,
    { passive: true },
) as Ref<any>;

const isActive = ref(props.active);

/** toggle isActive value when prop is changed */
watch(
    () => props.active,
    (value) => {
        if (!value) isActive.value = value;
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        else setTimeout(() => (isActive.value = value));
    },
);

/** emit event when isActive value is changed */
watch(isActive, (value) => {
    emits("update:active", value);
    if (props.appendToBody) nextTick(() => updateAppendToBody());
});

const { isMobile } = useMatchMedia();

if (isClient) {
    useEventListener("click", onClickedOutside);
    useEventListener("keyup", onKeyPress);
}

const bodyEl = ref<HTMLDivElement>(); // Used to append to body

onMounted(() => {
    if (props.appendToBody) {
        bodyEl.value = createAbsoluteElement(menuRef.value);
        updateAppendToBody();
    }
});

onUnmounted(() => {
    if (props.appendToBody) {
        removeElement(bodyEl.value);
    }
});

// check if mobile modal should be shown
const isMobileModal = computed(() => props.mobileModal && !props.inline);

// check if client is mobile native
const isMobileNative = computed(() => props.mobileModal && isMobileAgent.any());

const menuStyle = computed(() => ({
    maxHeight: props.scrollable ? toCssDimension(props.maxHeight) : null,
    overflow: props.scrollable ? "auto" : null,
}));

const hoverable = computed(() => props.triggers.indexOf("hover") >= 0);

/** White-listed items to not close when clicked. */
function isInWhiteList(el: Element): boolean {
    if (el === menuRef.value) return true;
    if (el === triggerRef.value) return true;
    // All chidren from dropdown
    if (menuRef.value !== undefined) {
        const children = menuRef.value.querySelectorAll("*");
        for (const child of children) {
            if (el === child) {
                return true;
            }
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
    const dropdownMenu = menuRef.value;
    const trigger = triggerRef.value;
    if (dropdownMenu && trigger) {
        // update wrapper dropdown
        const dropdown = bodyEl.value.children[0];
        dropdown.classList.forEach((item) =>
            dropdown.classList.remove(...item.split(" ")),
        );
        rootClasses.value.forEach((item) => {
            if (item) {
                if (typeof item === "object") {
                    Object.keys(item)
                        .filter((key) => key && item[key])
                        .forEach((key) => dropdown.classList.add(key));
                } else {
                    dropdown.classList.add(...item.split(" "));
                }
            }
        });
        if (props.appendToBodyCopyParent) {
            const parentNode = rootRef.value.parentNode;
            const parent = bodyEl.value;
            parent.classList.forEach((item) =>
                parent.classList.remove(...item.split(" ")),
            );
            parentNode.classList.forEach((item) =>
                parent.classList.add(...item.split(" ")),
            );
        }
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;
        if (!props.position || props.position.indexOf("bottom") >= 0) {
            top += trigger.clientHeight;
        } else {
            top -= dropdownMenu.clientHeight;
        }
        if (props.position && props.position.indexOf("left") >= 0) {
            left -= dropdownMenu.clientWidth - trigger.clientWidth;
        }
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.top = `${top}px`;
        dropdownMenu.style.left = `${left}px`;
        dropdownMenu.style.zIndex = "9999";
    }
}

// --- Event Handler ---

const cancelOptions = computed(() =>
    typeof props.closeable === "boolean"
        ? props.closeable
            ? ["escape", "outside", "content"]
            : []
        : props.closeable,
);

/** Close dropdown if clicked outside. */
function onClickedOutside(event: MouseEvent): void {
    if (props.inline) return;
    if (cancelOptions.value.indexOf("outside") < 0) return;
    if (!isInWhiteList(event.target as Element)) isActive.value = false;
}

/** Keypress event that is bound to the document */
function onKeyPress(event: KeyboardEvent): void {
    if (isActive.value && (event.key === "Escape" || event.key === "Esc")) {
        if (cancelOptions.value.indexOf("escape") < 0) return;
        isActive.value = false;
    }
}

function onClick(): void {
    if (props.triggers.indexOf("click") >= 0 || isMobileNative.value) toggle();
}

function onContextMenu(event: MouseEvent): void {
    if (props.triggers.indexOf("contextmenu") >= 0) {
        event.preventDefault();
        toggle();
    }
}
function onFocus(): void {
    if (props.triggers.indexOf("focus") >= 0) toggle();
}

const isHovered = ref(false);
function onHover(): void {
    if (!isMobileNative.value && props.triggers.indexOf("hover") >= 0) {
        isHovered.value = true;
        toggle();
    }
}
function onHoverLeave(): void {
    if (!isMobileNative.value && isHovered.value) {
        toggle();
        isHovered.value = false;
    }
}

/** Toggle dropdown if it's not disabled. */
function toggle(): void {
    if (props.disabled) return;
    if (isActive.value) isActive.value = !isActive.value;
    // if not active, toggle after clickOutside event
    // this fixes toggling programmatic
    else nextTick(() => (isActive.value = !isActive.value));
}

// --- Field Dependency Injection Feature ---

/**
 * Click listener from DropdownItem.
 *   1. Set new selected item.
 *   2. Emit input event to update the user v-model.
 *   3. Close the dropdown.
 */
function selectItem(value: any): void {
    if (props.multiple) {
        if (vmodel.value && Array.isArray(vmodel.value)) {
            if (vmodel.value.indexOf(value) === -1) {
                // Add value
                vmodel.value = [...vmodel.value, value];
            } else {
                // Remove value
                vmodel.value = vmodel.value.filter((val) => val !== value);
            }
        } else {
            // Init value array
            vmodel.value = [value];
        }
        emits("change", vmodel.value);
    } else {
        if (vmodel.value !== value) {
            // Upodate value
            vmodel.value = value;
            emits("change", vmodel.value);
        }
    }
    if (!props.multiple) {
        if (cancelOptions.value.indexOf("content") < 0) return;
        isActive.value = false;
        isHovered.value = false;
    }
}

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    props,
    selected: vmodel.value,
    selectItem,
}));

// Provide field component data via dependency injection.
provideDropdown(provideData);

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-drop"),
    {
        [useComputedClass("disabledClass", "o-drop--disabled")]: props.disabled,
    },
    {
        [useComputedClass("expandedClass", "o-drop--expanded")]: props.expanded,
    },
    {
        [useComputedClass("inlineClass", "o-drop--inline")]: props.inline,
    },
    {
        [useComputedClass("mobileClass", "o-drop--mobile")]:
            isMobileModal.value && isMobile.value && !hoverable.value,
    },
]);

const triggerClasses = computed(() => [
    useComputedClass("triggerClass", "o-drop__trigger"),
]);

const menuMobileOverlayClasses = computed(() => [
    useComputedClass("menuMobileOverlayClass", "o-drop__overlay"),
]);

const menuClasses = computed(() => [
    useComputedClass("menuClass", "o-drop__menu"),
    {
        [useComputedClass(
            "menuPositionClass",
            "o-drop__menu--",
            props.position,
        )]: props.position,
    },
    {
        [useComputedClass("menuActiveClass", "o-drop__menu--active")]:
            isActive.value || props.inline,
    },
]);
</script>

<template>
    <div
        ref="rootRef"
        data-oruga="dropdown"
        :class="rootClasses"
        @mouseleave="onHoverLeave">
        <component
            :is="triggerTag"
            v-if="!inline"
            ref="triggerRef"
            :tabindex="disabled ? null : tabindex"
            :class="triggerClasses"
            aria-haspopup="true"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus">
            <!--
                @slot Override the trigger element, default is label prop 
                @binding {active} active is active state representation
            -->
            <slot name="trigger" :active="isActive">
                {{ label }}
            </slot>
        </component>

        <transition :name="animation">
            <div
                v-if="isMobileNative"
                v-show="isActive"
                :class="menuMobileOverlayClasses"
                :aria-hidden="!isActive" />
        </transition>

        <transition :name="animation">
            <component
                :is="menuTag"
                v-show="(!disabled && (isActive || isHovered)) || inline"
                ref="menuRef"
                v-trap-focus="trapFocus"
                :class="menuClasses"
                :aria-hidden="!isActive"
                :role="ariaRole"
                :aria-modal="!inline"
                :style="menuStyle">
                <!--
                    @slot Place dropdown items here 
                    @binding {active} active is active state representation
                    @binding {toggle} toggle toggle active state function
                -->
                <slot :active="isActive" :toggle="toggle" />
            </component>
        </transition>
    </div>
</template>
