<script setup lang="ts">
import {
    computed,
    useAttrs,
    ref,
    watch,
    nextTick,
    type PropType,
    type ComponentInstance,
} from "vue";

import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";
import OInput from "../input/Input.vue";

import { isMobileAgent } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    getActiveClasses,
    useEventListener,
    useInputHandler,
} from "@/composables";

import type { ClassBind, ComponentClass } from "@/types";

/**
 * This is a internal used component.
 * Used by Datepicker and Timepicker.
 */
defineOptions({
    name: "OPickerWrapper",
});

const props = defineProps({
    /** parent picker component props  */
    picker: { type: Object, required: true },
    /** data-oruga attribute value */
    dataOruga: { type: String, required: true },
    /** the internal input value */
    value: { type: [Date, Array], default: undefined },
    /** the active state of the dropdown */
    active: { type: Boolean, default: false },
    /** formatted display value to show when client is desktop */
    formattedValue: { type: String, default: undefined },
    /** native value when client is mobile native */
    nativeValue: { type: [String, Number], default: undefined },
    nativeType: { type: String, required: true },
    nativeStep: { type: String, default: undefined },
    nativeMin: { type: [String, Number], default: undefined },
    nativeMax: { type: [String, Number], default: undefined },
    stayOpen: { type: Boolean, default: false },
    rootClasses: {
        type: Array as PropType<ClassBind[]>,
        required: true,
    },
    dropdownClasses: {
        type: Array as PropType<ClassBind[]>,
        required: true,
    },
    boxClass: {
        type: Array as PropType<ComponentClass>,
        required: true,
    },
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
    /** on value change event */
    (e: "change", value: string): void;
    /** on natvie value change event */
    (e: "native-change", value: string): void;
    /** on input focus event */
    (e: "focus", evt: Event): void;
    /** on input blur event */
    (e: "blur", evt: Event): void;
    /** on input invalid event */
    (e: "invalid", evt: Event): void;
    /** on icon click event */
    (e: "icon-click", evt: Event): void;
    /** on icon right click event */
    (e: "icon-right-click", evt: Event): void;
}>();

const isMobileNative = computed(
    () =>
        !props.picker.inline &&
        props.picker.mobileNative &&
        isMobileAgent.any(),
);

const dropdownRef = ref<ComponentInstance<typeof ODropdown>>();
const inputRef = ref<ComponentInstance<typeof OInput>>();
const nativeInputRef = ref<ComponentInstance<typeof OInput>>();

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
} = useInputHandler<HTMLInputElement>(elementRef, emits, props.picker);

/**
 * Show input as text for placeholder,
 * when placeholder and no native value is given.
 */
const initialNativeType =
    !props.picker.placeholder || !!props.nativeValue
        ? props.nativeType
        : "text";

/** input value based on mobile native or formatted desktop value */
const inputValue = computed(() =>
    isMobileNative.value ? props.nativeValue : props.formattedValue,
);

/** internal o-input vmodel value */
const vmodel = ref(inputValue.value);
// update the o-input vmodel value when prop value change
watch(inputValue, (value) => (vmodel.value = value));

/**
 * When v-model is changed:
 *  1. Update internal value.
 *  2. If it's invalid, validate again.
 */
watch(
    () => props.value,
    () => {
        // reset input value if they not match
        if (vmodel.value !== inputValue.value) vmodel.value = inputValue.value;

        // toggle picker if not stay open
        if (!isMobileNative.value && !props.stayOpen) togglePicker(false);
        if (!isValid.value) checkHtml5Validity();
    },
    { flush: "post" },
);

const isActive = defineModel<boolean>("active", { default: false });

watch(isActive, onActiveChange);

const ariaRole = computed(() => (!props.picker.inline ? "dialog" : undefined));

const triggers = computed(() => (props.picker.openOnFocus ? ["click"] : []));

if (isClient) useEventListener("keyup", onKeyPress);

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (isActive.value && (event.key === "Escape" || event.key === "Esc"))
        togglePicker(false);
}

// --- PICKER EVENT HANDLER ---

/** Toggle picker */
function togglePicker(active: boolean): void {
    if (dropdownRef.value) {
        if (active || props.picker.closeOnClick)
            nextTick(() => (isActive.value = active));
    }
}

/** Avoid dropdown toggle when is already visible */
function onInputClick(event): void {
    if (isActive.value) event.stopPropagation();
}

/** Emit 'blur' event on dropdown is not active (closed) */
function onActiveChange(value: boolean): void {
    if (value) onFocus();
    else if (!value) onBlur();
}

// --- NATIVE EVENT HANDLER ---

function onNativeClick(event: Event): void {
    // do nothing if client is not mobile
    if (!isMobileNative.value) return;

    // when input is not editable jet
    if (input.value.type === "text") {
        event.preventDefault();
        event.stopPropagation();

        // blur the current state to remove active native keyboards for type 'text'
        input.value.blur();

        setTimeout(() => {
            // make the input editable
            input.value.readOnly = false;
            input.value.type = props.nativeType;

            // focus the underlaying input element again to open native keyboards for type 'date'
            setFocus();
        }, 50);
    }
}

function onNativeFocus(event: Event): void {
    // do nothing if client is not mobile
    if (!isMobileNative.value) return;

    // when input is not editable jet
    if (input.value.type === "text") {
        // prevent focus
        event.preventDefault();
        event.stopPropagation();
    }
    // only emit focus event if editable
    else onFocus();
}

function onNativeBlur(): void {
    // do nothing if client is not mobile
    if (!isMobileNative.value) return;

    // when the input does not have any value
    if (!input.value.value) {
        // make the input uneditable
        input.value.readOnly = true;
        input.value.type = "text";
    }
    // emit blur event
    onBlur();
}

function handleNativeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value
        ? (event.target as HTMLInputElement).value
        : null;

    // when the input does not have any value
    if (!value) {
        input.value.value = value;
        input.value.blur();
    }

    emits("native-change", value);
}
// --- Computed Component Classes ---

const attrs = useAttrs();
const inputBind = computed(() => ({
    ...attrs,
    ...props.picker.inputClasses,
}));

const dropdownBind = computed(() => ({
    "root-class": getActiveClasses(props.dropdownClasses),
    ...props.picker.dropdownClasses,
}));

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus });
</script>

<template>
    <div :data-oruga="dataOruga" :class="rootClasses" @click="onNativeClick">
        <o-dropdown
            v-if="!isMobileNative"
            ref="dropdownRef"
            v-bind="dropdownBind"
            v-model:active="isActive"
            :position="picker.position"
            :disabled="picker.disabled"
            :inline="picker.inline"
            :mobile-modal="picker.mobileModal"
            :trap-focus="picker.trapFocus"
            :aria-role="ariaRole"
            :aria-modal="!picker.inline"
            :tabindex="-1"
            :teleport="picker.teleport"
            :triggers="triggers">
            <template v-if="!picker.inline" #trigger>
                <slot name="trigger">
                    <o-input
                        ref="inputRef"
                        v-bind="inputBind"
                        v-model="vmodel"
                        autocomplete="off"
                        :placeholder="picker.placeholder"
                        :size="picker.size"
                        :icon-pack="picker.iconPack"
                        :icon="picker.icon"
                        :icon-right="picker.iconRight"
                        :icon-right-clickable="picker.iconRightClickable"
                        :expanded="picker.expanded"
                        :rounded="picker.rounded"
                        :disabled="picker.disabled"
                        :readonly="picker.readonly"
                        :use-html5-validation="false"
                        @click="onInputClick"
                        @keyup.enter="togglePicker(true)"
                        @change="$emit('change', $event.target.value)"
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
                :disabled="picker.disabled"
                :clickable="false">
                <slot />
            </o-dropdown-item>
        </o-dropdown>

        <!-- Native Picker -->
        <template v-else>
            <slot name="trigger">
                <o-input
                    ref="nativeInputRef"
                    v-bind="inputBind"
                    v-model="vmodel"
                    :type="initialNativeType"
                    :min="nativeMin"
                    :max="nativeMax"
                    :step="nativeStep"
                    :placeholder="picker.placeholder"
                    :size="picker.size"
                    :icon-pack="picker.iconPack"
                    :icon="picker.icon"
                    :icon-right="picker.iconRight"
                    :icon-right-clickable="picker.iconRightClickable"
                    :rounded="picker.rounded"
                    :disabled="picker.disabled"
                    :readonly="initialNativeType == 'text'"
                    autocomplete="off"
                    :use-html5-validation="false"
                    @change="handleNativeChange"
                    @focus="onNativeFocus"
                    @blur="onNativeBlur"
                    @invalid="onInvalid"
                    @icon-click="$emit('icon-click', $event)"
                    @icon-right-click="$emit('icon-right-click', $event)" />
            </slot>
        </template>
    </div>
</template>
