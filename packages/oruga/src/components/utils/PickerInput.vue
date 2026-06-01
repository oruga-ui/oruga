<script setup lang="ts">
import {
    computed,
    ref,
    watch,
    nextTick,
    useTemplateRef,
    type PropType,
} from "vue";

import OInput from "../input/Input.vue";

import {
    checkMinMaxDate,
    isDefined,
    isMobileAgent,
    isTrueish,
} from "@/utils/helpers";
import { unrefElement, usePopoverAPI } from "@/composables";

import type { ComponentClass, PopoverPosition } from "@/types";
import { useTeleport } from "@/composables/useTeleport";

/**
 * This is an internal used component.
 * Used by Datepicker and Timepicker.
 */
defineOptions({
    name: "OPickerInput",
    inheritAttrs: false,
});

const props = defineProps({
    /** the internal input value */
    value: {
        type: [Date, Array] as PropType<Date | Date[] | undefined>,
        default: undefined,
    },
    /** the active state of the content */
    active: { type: Boolean, default: false },
    /** format props value to input value */
    formatter: {
        type: Function as PropType<
            (value: Date | Date[] | undefined, isNative: boolean) => string
        >,
        required: true,
    },
    /** parse input value to props value */
    parser: {
        type: Function as PropType<
            (value: string, isNative: boolean) => Date | Date[] | undefined
        >,
        required: true,
    },
    /** the DateTimeFormat object to watch for to update the parsed input value */
    dtf: { type: Object, default: undefined },

    /** Show content inline */
    inline: { type: Boolean, default: false },
    enableMobileNative: { type: Boolean, default: undefined },
    stayOpen: { type: Boolean, default: false },
    openOnFocus: { type: Boolean, default: false },
    position: { type: String as PropType<PopoverPosition>, required: true },
    teleport: { type: [Boolean, String, Object], default: false },
    animation: { type: String, default: undefined },

    // input props
    placeholder: { type: String, default: undefined },
    type: { type: String, required: true },
    step: { type: String, default: undefined },
    min: { type: Date, default: undefined },
    max: { type: Date, default: undefined },
    size: { type: String, default: undefined },
    iconPack: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
    iconRightClickable: { type: Boolean, default: undefined },
    expanded: { type: Boolean, default: undefined },
    rounded: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
    readonly: { type: Boolean, default: undefined },
    /** Enable HTML 5 native validation */
    useHtml5Validation: { type: Boolean, required: true },
    /** Custom HTML 5 validation error to set on the form control */
    customValidity: {
        type: [String, Function] as PropType<
            string | ((currentValue: any, state: ValidityState) => string)
        >,
        default: undefined,
    },

    // class props
    triggerClass: { type: Array as PropType<ComponentClass>, required: true },
    contentClass: { type: Array as PropType<ComponentClass>, required: true },
    inputClass: { type: Array as PropType<ComponentClass>, required: true },
    inputClasses: { type: Object, default: undefined },
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {Date, Date[]} - updated active prop
     */
    "update:value": [value: Date | Date[] | undefined];
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /** on input focus event */
    focus: [event: Event];
    /** on input blur event */
    blur: [event: Event];
    /** on input invalid event */
    invalid: [event: Event];
    /** on icon click event */
    "icon-click": [event: Event];
    /** on icon right click event */
    "icon-right-click": [event: Event];
}>();

const isActive = defineModel<boolean>("active", { default: false });

const triggerContainerRef = useTemplateRef("triggerElement");
const contentRef = useTemplateRef("contentElement");

// use the html input element as trigger element
const triggerRef = computed(() => {
    const el = unrefElement(triggerContainerRef);
    const input = el?.querySelector("[data-oruga-input]");
    return input ?? el?.firstElementChild ?? el;
});

const _teleport = useTeleport(props.teleport);

// #region --- PICKER FEATURE ---

if (!props.inline) {
    usePopoverAPI({
        position: props.position,
        behavior: "auto",
        trigger: isActive,
        triggerRef,
        contentRef,
        onToggle,
    });

    /** on popover state change event handler */
    function onToggle(event: ToggleEvent): void {
        if (event.newState === "open" && isActive.value !== true)
            isActive.value = true;
        else if (event.newState === "closed" && isActive.value !== false)
            isActive.value = false;
    }
}

// #endregion --- PICKER FEATURE ---

// #region --- INPUT FEATURE ---

const isMobileNative = computed(
    () =>
        !isTrueish(props.inline) &&
        isTrueish(props.enableMobileNative) &&
        isMobileAgent.any(),
);

/**
 * Show input as text for placeholder,
 * when placeholder and no native value is given.
 */
const initialNativeType =
    !isDefined(props.placeholder) || isTrueish(props.value)
        ? props.type
        : "text";

/** the v-model value of the input component */
const inputValue = ref("");

// update internal value when v-model:value changes
watch(
    () => props.value,
    (value) => {
        // update internal value
        inputValue.value = props.formatter(value, isMobileNative.value);
    },
    { immediate: true },
);

// update the parsed input value when the dtf changes
watch(
    () => props.dtf,
    () => setValue(inputValue.value),
);

/** Set the vmodel value and update the prop value */
function setValue(value: string): void {
    // parse to date
    let date = props.parser(value, isMobileNative.value);

    // check min/max dates
    if (Array.isArray(date))
        date = date.map((date) => checkMinMaxDate(date, props.min, props.max));
    else if (isDefined(date))
        date = checkMinMaxDate(date, props.min, props.max);

    nextTick(
        () =>
            // reparse to string for internal value
            (inputValue.value = props.formatter(date, isMobileNative.value)),
    );

    // update the prop value
    emits("update:value", date);
}

/** Get the value from html element behind the event and update the external value. */
function setEventValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);
}

// #endregion --- INPUT FEATURE ---

// #region  --- INPUT EVENT HANDLER ---

function onFocus(event: Event): void {
    setTimeout(() => {
        // check open state after click handler got processed
        if (props.openOnFocus && !isActive.value) {
            isActive.value = true;
        }
    }, 250);

    emits("focus", event);
}

function onBlur(event: Event): void {
    setEventValue(event);
    emits("blur", event);
}

function onNativeClick(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;

    // do nothing if client is not mobile
    if (!input) return;

    // when input is not editable jet
    if (input.type === "text") {
        event.preventDefault();
        event.stopPropagation();

        // blur the current state to remove active native keyboards for type 'text'
        input.blur();

        setTimeout(() => {
            if (!input) return;
            // make the input editable
            input.readOnly = false;
            input.type = props.type;

            // focus the underlaying input element again to open native keyboards for type 'date'
            input.focus();
        }, 50);
    }
}

function onNativeFocus(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;

    // do nothing if client is not mobile
    if (!input) return;

    // when input is not editable jet
    if (input.type === "text") {
        // prevent focus
        event.preventDefault();
        event.stopPropagation();
    }
    // only emit focus event if editable
    else {
        emits("focus", event);
    }
}

function onNativeBlur(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;

    // do nothing if client is not mobile
    if (!input) return;

    // when the input does not have any value
    if (!input.value) {
        // make the input uneditable
        input.readOnly = true;
        input.type = "text";
    }
    // emit blur event
    emits("blur", event);
}

function onNativeChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const value = input.value ?? "";

    // when the input does not have any value
    if (input && !value) {
        input.value = value;
        input.blur();
    }

    setValue(value);
}

// #endregion  --- NATIVE EVENT HANDLER ---

// #region --- Expose Public Functionalities ---

function setFocus(): void {
    const oInput = unrefElement(triggerRef);
    oInput?.focus();
}

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <div v-if="!inline" ref="triggerElement" :class="triggerClass">
        <slot name="trigger">
            <!-- Web Picker -->
            <o-input
                v-if="!isMobileNative"
                v-bind="{ ...$attrs, ...inputClasses }"
                v-model="inputValue"
                :placeholder="placeholder"
                :size="size"
                :icon-pack="iconPack"
                :icon="icon"
                :icon-right="iconRight"
                :icon-right-clickable="iconRightClickable"
                :expanded="expanded"
                :rounded="rounded"
                :disabled="disabled"
                :readonly="readonly"
                autocomplete="off"
                :use-html5-validation="useHtml5Validation"
                :custom-validity="customValidity"
                :input-class="inputClass"
                @keyup.enter="setEventValue"
                @focus="onFocus"
                @blur="onBlur"
                @invalid="$emit('invalid', $event)"
                @icon-click="$emit('icon-click', $event)"
                @icon-right-click="$emit('icon-right-click', $event)" />

            <!-- Native Picker -->
            <o-input
                v-else
                v-bind="{ ...$attrs, ...inputClasses }"
                v-model="inputValue"
                :type="initialNativeType"
                :min="formatter(min, true)"
                :max="formatter(max, true)"
                :step="step"
                :placeholder="placeholder"
                :size="size"
                :icon-pack="iconPack"
                :icon="icon"
                :icon-right="iconRight"
                :icon-right-clickable="iconRightClickable"
                :rounded="rounded"
                :disabled="disabled"
                :readonly="initialNativeType == 'text'"
                autocomplete="off"
                :use-html5-validation="useHtml5Validation"
                :custom-validity="customValidity"
                :input-class="inputClass"
                @click="onNativeClick"
                @change="onNativeChange"
                @focus="onNativeFocus"
                @blur="onNativeBlur"
                @invalid="$emit('invalid', $event)"
                @icon-click="$emit('icon-click', $event)"
                @icon-right-click="$emit('icon-right-click', $event)" />
        </slot>
    </div>

    <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
        <transition :name="animation">
            <!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
            <div
                ref="contentElement"
                :class="contentClass"
                :popover="inline ? undefined : ''">
                <slot />
            </div>
        </transition>
    </Teleport>
</template>
