<script setup lang="ts">
import {
    computed,
    useAttrs,
    ref,
    watch,
    nextTick,
    useTemplateRef,
    type PropType,
} from "vue";

import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";
import OInput from "../input/Input.vue";

import { isDate, isDefined, isMobileAgent, isTrueish } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    getActiveClasses,
    useEventListener,
    useInputHandler,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { ClassBinding, ComponentClass } from "@/types";

/**
 * This is a internal used component.
 * Used by Datepicker and Timepicker.
 */
defineOptions({
    name: "OPickerWrapper",
});

const props = defineProps({
    /** the internal input value */
    value: {
        type: [Date, Array] as PropType<Date | Date[] | undefined>,
        default: undefined,
    },
    /** the active state of the dropdown */
    active: { type: Boolean, default: false },
    /** parent picker component props  */
    pickerProps: { type: Object, required: true },
    /** data-oruga attribute value */
    dataOruga: { type: String, required: true },
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
    type: { type: String, required: true },
    step: { type: String, default: undefined },
    min: { type: Date, default: undefined },
    max: { type: Date, default: undefined },
    stayOpen: { type: Boolean, default: false },
    /** the DateTimeFormat object to watch for to update the parsed input value */
    dtf: { type: Object, default: undefined },
    rootClasses: { type: Array as PropType<ClassBinding[]>, required: true },
    dropdownClasses: {
        type: Array as PropType<ClassBinding[]>,
        required: true,
    },
    boxClass: { type: Array as PropType<ComponentClass>, required: true },
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {Date, Date[]} updated active prop
     */
    "update:value": [value: Date | Date[] | undefined];
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
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
    /** on dropdown left button press event */
    left: [event: Event];
    /** on dropdown right button press event */
    right: [event: Event];
}>();

const isMobileNative = computed(
    () =>
        !isTrueish(props.pickerProps.inline) &&
        isTrueish(props.pickerProps.mobileNative) &&
        isMobileAgent.any(),
);

// inject parent field component if used inside one
const { parentField } = injectField();

const dropdownRef = useTemplateRef("dropdownComponent");
const inputRef = useTemplateRef("inputComponent");
const nativeInputRef = useTemplateRef("nativeInputComponent");

const elementRef = computed(() =>
    isMobileNative.value ? nativeInputRef.value : inputRef.value,
);

// use form input functionality for native input
const {
    input,
    checkHtml5Validity,
    setFocus,
    onBlur,
    onFocus,
    onInvalid,
    isValid,
} = useInputHandler<HTMLInputElement>(elementRef, emits, props.pickerProps);

/**
 * Show input as text for placeholder,
 * when placeholder and no native value is given.
 */
const initialNativeType =
    !isDefined(props.pickerProps.placeholder) || isTrueish(props.value)
        ? props.type
        : "text";

/** the v-model value of the input */
const inputValue = ref("");

/**
 * When v-model is changed:
 *  1. Update internal value.
 *  2. Close picker.
 *  3. If it's invalid, validate again.
 */
watch(
    () => props.value,
    (value) => {
        // update internal value
        inputValue.value = props.formatter(value, isMobileNative.value);

        // toggle picker if not stay open
        if (!isMobileNative.value && !props.stayOpen) togglePicker(false);
        // validate if its invalid
        if (!isValid.value) checkHtml5Validity();
    },
    { immediate: true },
);

// update the parsed input value when the dtf change
watch(
    () => props.dtf,
    () => setValue(inputValue.value),
);

/** Set the vmodel value and update the prop value */
function setValue(value: string): void {
    // parse to date
    let date = props.parser(value, isMobileNative.value);

    // check min/max dates
    if (Array.isArray(date)) date = date.map(checkMinMaxDate);
    else if (isDefined(date)) date = checkMinMaxDate(date);

    nextTick(
        () =>
            // reparse to string for internal value
            (inputValue.value = props.formatter(date, isMobileNative.value)),
    );

    // update the prop value
    emits("update:value", date);
}

function checkMinMaxDate(date: Date): Date {
    if (!isDate(date)) return date;
    if (props.min && date < props.min) date = props.min;
    else if (props.max && date > props.max) date = props.max;
    return date;
}

const isActive = defineModel<boolean>("active", { default: false });

watch(isActive, onActiveChange);

const triggers = computed(() =>
    isTrueish(props.pickerProps.openOnFocus) ? ["click"] : [],
);

if (isClient) useEventListener(document, "keyup", onKeyPress);

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (isActive.value && (event.key === "Escape" || event.key === "Esc"))
        togglePicker(false);
}

// --- PICKER EVENT HANDLER ---

/** Toggle picker */
function togglePicker(active: boolean): void {
    if (!dropdownRef.value) return;
    if (active || isTrueish(props.pickerProps.closeOnClick))
        nextTick(() => (isActive.value = active));
}

/** Avoid dropdown toggle when is already visible */
function onInputClick(event): void {
    if (isActive.value) event.stopPropagation();
}

/** Emit 'blur' event on dropdown is not active (closed) */
function onActiveChange(value: boolean): void {
    if (value) onFocus(new Event("focus"));
    else if (!value) onBlur(new Event("blur"));
}

// --- NATIVE EVENT HANDLER ---

function onChange(event: Event): void {
    setValue((event.target as HTMLInputElement).value);
}

function onNativeClick(event: Event): void {
    // do nothing if client is not mobile
    if (!isMobileNative.value || !input.value) return;

    // when input is not editable jet
    if (input.value.type === "text") {
        event.preventDefault();
        event.stopPropagation();

        // blur the current state to remove active native keyboards for type 'text'
        input.value.blur();

        setTimeout(() => {
            if (!input.value) return;
            // make the input editable
            input.value.readOnly = false;
            input.value.type = props.type;

            // focus the underlaying input element again to open native keyboards for type 'date'
            setFocus();
        }, 50);
    }
}

function onNativeFocus(event: Event): void {
    // do nothing if client is not mobile
    if (!isMobileNative.value || !input.value) return;

    // when input is not editable jet
    if (input.value.type === "text") {
        // prevent focus
        event.preventDefault();
        event.stopPropagation();
    }
    // only emit focus event if editable
    else onFocus(event);
}

function onNativeBlur(event: Event): void {
    // do nothing if client is not mobile
    if (!isMobileNative.value || !input.value) return;

    // when the input does not have any value
    if (!input.value.value) {
        // make the input uneditable
        input.value.readOnly = true;
        input.value.type = "text";
    }
    // emit blur event
    onBlur(event);
}

function onNativeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value
        ? (event.target as HTMLInputElement).value
        : "";

    // when the input does not have any value
    if (!value && input.value) {
        input.value.value = value;
        input.value.blur();
    }

    setValue(value);
}

// --- Computed Component Classes ---

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField?.value?.inputAttrs,
    ...attrs,
    inputClass: props.pickerProps.inputClass,
    ...props.pickerProps.inputClasses,
}));

const dropdownBind = computed(() => ({
    "root-class": getActiveClasses(props.dropdownClasses),
    "teleport-class": getActiveClasses(props.rootClasses),
    ...props.pickerProps.dropdownClasses,
}));

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ checkHtml5Validity, focus: setFocus });
</script>

<template>
    <div :data-oruga="dataOruga" :class="rootClasses" @click="onNativeClick">
        <o-dropdown
            v-if="!isMobileNative"
            ref="dropdownComponent"
            v-bind="dropdownBind"
            v-model:active="isActive"
            :triggers="triggers"
            :position="pickerProps.position"
            :disabled="pickerProps.disabled"
            :inline="pickerProps.inline"
            :mobile-modal="pickerProps.mobileModal"
            :desktop-modal="pickerProps.desktopModal"
            :mobile-breakpoint="pickerProps.mobileBreakpoint"
            :teleport="pickerProps.teleport">
            <template v-if="!pickerProps.inline" #trigger>
                <slot name="trigger">
                    <o-input
                        ref="inputComponent"
                        v-bind="inputBind"
                        v-model="inputValue"
                        :placeholder="pickerProps.placeholder"
                        :size="pickerProps.size"
                        :icon-pack="pickerProps.iconPack"
                        :icon="pickerProps.icon"
                        :icon-right="pickerProps.iconRight"
                        :icon-right-clickable="pickerProps.iconRightClickable"
                        :expanded="pickerProps.expanded"
                        :rounded="pickerProps.rounded"
                        :disabled="pickerProps.disabled"
                        :readonly="pickerProps.readonly"
                        autocomplete="off"
                        :use-html5-validation="false"
                        @invalid="onInvalid"
                        @click="onInputClick"
                        @keyup.enter="togglePicker(true)"
                        @change="onChange"
                        @focus="onFocus"
                        @blur="onBlur"
                        @icon-click="$emit('icon-click', $event)"
                        @icon-right-click="$emit('icon-right-click', $event)" />
                </slot>
            </template>

            <o-dropdown-item
                override
                tag="div"
                :item-class="boxClass"
                :disabled="pickerProps.disabled"
                :clickable="false"
                @keydown.left="$emit('left', $event)"
                @keydown.right="$emit('right', $event)">
                <slot />
            </o-dropdown-item>
        </o-dropdown>

        <!-- Native Picker -->
        <template v-else>
            <slot name="trigger">
                <o-input
                    ref="nativeInputComponent"
                    v-bind="inputBind"
                    v-model="inputValue"
                    :type="initialNativeType"
                    :min="formatter(min, true)"
                    :max="formatter(max, true)"
                    :step="step"
                    :placeholder="pickerProps.placeholder"
                    :size="pickerProps.size"
                    :icon-pack="pickerProps.iconPack"
                    :icon="pickerProps.icon"
                    :icon-right="pickerProps.iconRight"
                    :icon-right-clickable="pickerProps.iconRightClickable"
                    :rounded="pickerProps.rounded"
                    :disabled="pickerProps.disabled"
                    :readonly="initialNativeType == 'text'"
                    autocomplete="off"
                    :use-html5-validation="false"
                    @change="onNativeChange"
                    @focus="onNativeFocus"
                    @blur="onNativeBlur"
                    @invalid="onInvalid"
                    @icon-click="$emit('icon-click', $event)"
                    @icon-right-click="$emit('icon-right-click', $event)" />
            </slot>
        </template>
    </div>
</template>
