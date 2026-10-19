<script setup lang="ts">
import { computed, ref, watch, nextTick, useTemplateRef } from "vue";

import OInput from "../input/Input.vue";

import {
    checkMinMaxDate,
    isDefined,
    isMobileAgent,
    isTrueish,
} from "@/utils/helpers";
import { unrefElement, usePopoverAPI } from "@/composables";

import type { AnimationName, ComponentClass, PopoverPosition } from "@/types";
import { useTeleport } from "@/composables/useTeleport";

/**
 * This is an internal used component.
 * Used by Datepicker and Timepicker.
 */
defineOptions({
    name: "OPickerInput",
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        /** the internal input value */
        value?: Date | Date[];
        /** the active state of the content */
        active?: boolean;
        /** format props value to input value */
        formatter: (
            value: Date | Date[] | undefined,
            isNative: boolean,
        ) => string;
        /** parse input value to props value */
        parser: (value: string, isNative: boolean) => Date | Date[] | undefined;
        /** the DateTimeFormat object to watch for to update the parsed input value */
        dtf?: object;

        /** Show content inline */
        inline?: boolean;
        /** Show the content in a centered modal instead of a popover */
        modal?: boolean;
        /** Use the native browser picker on mobile devices */
        enableMobileNative?: boolean;
        /** Open the content when the input receives focus */
        openOnFocus?: boolean;
        /** Position of the content relative to the input */
        position: PopoverPosition;
        /** Teleport the content to another DOM node, `true` targets the body */
        teleport?: boolean | string | object;
        /** Open/close animation, played via the Web Animations API. Set to `false` to disable. */
        animation?: AnimationName | false;

        // input props
        /** Placeholder of the input */
        placeholder?: string;
        /** Type of the input */
        type: string;
        /** Step of the native input */
        step?: string;
        /** Minimum selectable date */
        min?: Date;
        /** Maximum selectable date */
        max?: Date;
        /** Size of the input */
        size?: string;
        /** Icon pack of the icons */
        iconPack?: string;
        /** Icon displayed on the left of the input */
        icon?: string;
        /** Icon displayed on the right of the input */
        iconRight?: string;
        /** Make the right icon clickable */
        iconRightClickable?: boolean;
        /** Variant of the right icon */
        iconRightVariant?: string;
        /** Size of the icons */
        iconSize?: string;
        /** Make the input full width */
        expanded?: boolean;
        /** Make the input rounded */
        rounded?: boolean;
        /** Disable the input */
        disabled?: boolean;
        /** Make the input readonly */
        readonly?: boolean;
        /** Enable HTML 5 native validation */
        useHtml5Validation: boolean;
        /** Custom HTML 5 validation error to set on the form control */
        customValidity?:
            | string
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            | ((currentValue: any, state: ValidityState) => string);

        // class props
        /** Classes of the trigger element */
        triggerClass: ComponentClass;
        /** Classes of the content element */
        contentClass: ComponentClass;
        /** Classes of the input element */
        inputClass: ComponentClass;
        /** Additional attributes passed to the input element */
        inputAttrs?: object;
    }>(),
    {
        // keep `undefined` for the optional booleans so they don't cast to false
        enableMobileNative: undefined,
        iconRightClickable: undefined,
        expanded: undefined,
        rounded: undefined,
        disabled: undefined,
        readonly: undefined,
        teleport: false,
        animation: undefined,
        inputAttrs: () => ({}),
    },
);

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
    const input = el?.querySelector("input");
    return input ?? el?.firstElementChild ?? el;
});

const _teleport = useTeleport(props.teleport);

// #region --- PICKER FEATURE ---

if (!props.inline) {
    const popoverPosition = computed(() =>
        props.modal ? "centered" : props.position,
    );

    usePopoverAPI({
        position: popoverPosition,
        behavior: "auto",
        trigger: isActive,
        animation: () => props.animation,
        targetRef: triggerRef,
        contentRef: contentRef,
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

    // Compare by formatted string: if the input value is identical to what the
    // current prop formats to, nothing changed from the UI's perspective.
    // This avoids false emits when the prop value has a time component that
    // the formatter strips, which would make an isEqual(Date, Date) check fail.
    if (props.formatter(props.value, isMobileNative.value) !== value)
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
                v-bind="{ ...$attrs, ...inputAttrs }"
                v-model="inputValue"
                :placeholder="placeholder"
                :size="size"
                :icon-pack="iconPack"
                :icon="icon"
                :icon-size="iconSize"
                :icon-right="iconRight"
                :icon-right-clickable="iconRightClickable"
                :icon-right-variant="iconRightVariant"
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
                v-bind="{ ...$attrs, ...inputAttrs }"
                v-model="inputValue"
                :type="initialNativeType"
                :min="formatter(min, true)"
                :max="formatter(max, true)"
                :step="step"
                :placeholder="placeholder"
                :size="size"
                :icon-pack="iconPack"
                :icon="icon"
                :icon-size="iconSize"
                :icon-right="iconRight"
                :icon-right-clickable="iconRightClickable"
                :icon-right-variant="iconRightVariant"
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
        <div
            ref="contentElement"
            :class="contentClass"
            :popover="inline ? undefined : ''">
            <slot />
        </div>
    </Teleport>
</template>
