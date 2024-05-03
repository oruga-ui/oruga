<script setup lang="ts" generic="IsNumber extends boolean = false">
import {
    ref,
    computed,
    nextTick,
    watch,
    onMounted,
    type StyleValue,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { ComponentClass } from "@/types";

/**
 * Get user Input. Use with Field to access all functionalities
 * @displayName Input
 * @style _input.scss
 */
defineOptions({
    isOruga: true,
    name: "OInput",
    configField: "input",
    inheritAttrs: false,
});

type InputValueType = IsNumber extends true ? number : string;

type Props = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * @type string | number
     * @model
     */
    modelValue?: InputValueType; // eslint-disable-line vue/require-default-prop
    /**
     * @type boolean
     */
    number?: IsNumber; // eslint-disable-line vue/require-default-prop
    /** Same as native id. Also set the for label for o-field wrapper. */
    id?: string;
    /** Input placeholder */
    placeholder?: string;
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type?: string;
    /**
     * Size of the control
     * @values small, medium, large
     */
    size?: string;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the element rounded */
    rounded?: boolean;
    /** Same as native disabled */
    disabled?: boolean;
    /** Adds the reveal password functionality */
    passwordReveal?: boolean;
    /** Same as native maxlength, plus character counter */
    maxlength?: number | string;
    /** Show character counter when maxlength prop is passed */
    counter?: boolean;
    /** Automatically adjust height in textarea */
    autosize?: boolean;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon to be shown */
    icon?: string;
    /** Makes the icon clickable */
    iconClickable?: boolean;
    /** Icon to be added on the right side */
    iconRight?: string;
    /** Make the icon right clickable */
    iconRightClickable?: boolean;
    /** Variant of right icon */
    iconRightVariant?: string;
    /** Add a button/icon to clear the inputed text */
    clearable?: boolean;
    /** Icon name to be added on the clear button */
    clearIcon?: string;
    /** Show status icon using field and variant prop */
    statusIcon?: boolean;
    /** Native options to use in HTML5 validation */
    autocomplete?: string;
    /** Accessibility label to establish relationship between the checkbox and control label */
    ariaLabelledby?: string;
    /** Enable html 5 native validation */
    useHtml5Validation?: boolean;
    /** The message which is shown when a validation error occurs */
    validationMessage?: string;
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass?: ComponentClass; // eslint-disable-line
    /** Class of input when expanded */
    expandedClass?: ComponentClass; // eslint-disable-line
    /** Class of input when type textarea */
    textareaClass?: ComponentClass; // eslint-disable-line
    /** Class of the left icon space inside the input */
    iconLeftSpaceClass?: ComponentClass; // eslint-disable-line
    /** Class of the right icon space inside the input */
    iconRightSpaceClass?: ComponentClass; // eslint-disable-line
    /** Class of the native input element */
    inputClass?: ComponentClass; // eslint-disable-line
    /** Class of input when rounded */
    roundedClass?: ComponentClass; // eslint-disable-line
    /** Class of input when disabled */
    disabledClass?: ComponentClass; // eslint-disable-line
    /** Class of the left icon */
    iconLeftClass?: ComponentClass; // eslint-disable-line
    /** Class of the right icon */
    iconRightClass?: ComponentClass; // eslint-disable-line
    /** Class to display when a right icon is used */
    hasIconRightClass?: ComponentClass; // eslint-disable-line
    /** Class of the counter element */
    counterClass?: ComponentClass; // eslint-disable-line
    /** Class of the input size */
    sizeClass?: ComponentClass; // eslint-disable-line
    /** Class of the input variant */
    variantClass?: ComponentClass; // eslint-disable-line
};

const props = withDefaults(defineProps<Props>(), {
    type: "text",
    id: uuid(),
    size: getOption("input.size"),
    variant: getOption("input.variant"),
    placeholder: undefined,
    expanded: false,
    rounded: false,
    disabled: false,
    passwordReveal: false,
    maxlength: undefined,
    counter: getOption("input.counter", false),
    autosize: false,
    iconPack: getOption("input.iconPack", undefined),
    icon: getOption("input.icon", undefined),
    iconClickable: false,
    iconRight: getOption("input.iconRight", undefined),
    iconRightClickable: false,
    iconRightVariant: undefined,
    clearable: getOption("input.clearable", false),
    clearIcon: getOption("input.clearIcon", "close-circle"),
    statusIcon: getOption("statusIcon", true),
    autocomplete: getOption("input.autocomplete", "off"),
    ariaLabelledby: uuid(),
    useHtml5Validation: getOption("useHtml5Validation", true),
    validationMessage: undefined,
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {typeof modelValue} updated modelValue prop
     */
    (e: "update:modelValue", value: InputValueType): void;
    /**
     * on input change event
     * @param value {typeof modelValue} input value
     * @param event {Event} native event
     */
    (e: "input", value: InputValueType, event: Event): void;
    /**
     * on input focus event
     * @param event {Event} native event
     */
    (e: "focus", event: Event): void;
    /**
     * on input blur event
     * @param event {Event} native event
     */
    (e: "blur", event: Event): void;
    /**
     * on input invalid event
     * @param event {Event} native event
     */
    (e: "invalid", event: Event): void;
    /**
     * on icon click event
     * @param event {Event} native event
     */
    (e: "icon-click", event: Event): void;
    /**
     * on icon right click event
     * @param event {Event} native event
     */
    (e: "icon-right-click", event: Event): void;
}>();

// --- Validation Feature ---

const inputRef = ref<HTMLInputElement>();
const textareaRef = ref<HTMLInputElement>();

const elementRef = computed<HTMLInputElement>(() =>
    props.type === "textarea" ? textareaRef.value : inputRef.value,
);

// use form input functionalities
const {
    checkHtml5Validity,
    onBlur,
    onFocus,
    onInvalid,
    setFocus,
    isValid,
    isFocused,
} = useInputHandler(elementRef, emits, props);

// inject parent field component if used inside one
const { parentField, statusVariant, statusVariantIcon } = injectField();

const vmodel = defineModel<InputValueType>();
// set default value
if (!vmodel.value) vmodel.value = (props.number ? 0 : "") as InputValueType;

// if id is given set as `for` property on o-field wrapper
if (props.id) parentField?.value?.setInputId(props.id);

/** Get value length */
const valueLength = computed(() =>
    typeof vmodel.value === "string"
        ? vmodel.value.length
        : typeof vmodel.value === "number"
          ? vmodel.value.toString().length
          : 0,
);

onMounted(() => {
    /**
     * When v-model is changed:
     *  1. Set parent field filled state.
     *  2. Resize textarea input
     *  3. Check html5 valdiation
     */
    watch(
        () => vmodel.value,
        (value) => {
            if (parentField?.value) parentField.value.setFilled(!!value);
            if (props.autosize) resize();
            if (!isValid.value) nextTick(() => checkHtml5Validity());
        },
        { immediate: true },
    );
});

const height = ref("auto");

function resize(): void {
    height.value = "auto";
    nextTick(() => {
        if (!textareaRef.value) return;
        const scrollHeight = textareaRef.value.scrollHeight;
        height.value = scrollHeight + "px";
    });
}

/** Computed inline styles for autoresize */
const computedStyles = computed(
    (): StyleValue =>
        props.autosize
            ? {
                  resize: "none",
                  height: height.value,
                  overflow: "hidden",
              }
            : {},
);

function onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const input = (
        props.number ? Number(value) : String(value)
    ) as InputValueType;
    emits("input", input, event);
}

// --- Icon Feature ---

const hasIconRight = computed(() => {
    return !!(
        props.passwordReveal ||
        (props.statusIcon && statusVariantIcon.value) ||
        (props.clearable && vmodel.value && props.clearIcon) ||
        props.iconRight
    );
});

const computedIconRight = computed(() => {
    if (props.passwordReveal) return passwordVisibleIcon.value;
    if (props.clearable && vmodel.value && props.clearIcon)
        return props.clearIcon;
    if (props.iconRight) return props.iconRight;
    return statusVariantIcon.value;
});

const computedIconRightVariant = computed(() =>
    props.passwordReveal || props.iconRight
        ? props.iconRightVariant || props.variant || null
        : statusVariant.value,
);

function iconClick(event: Event): void {
    emits("icon-click", event);
    nextTick(() => setFocus());
}

function rightIconClick(event: Event): void {
    if (props.passwordReveal) togglePasswordVisibility();
    else if (props.clearable)
        vmodel.value = (props.number ? 0 : "") as InputValueType;
    if (props.iconRightClickable) {
        emits("icon-right-click", event);
        nextTick(() => setFocus());
    }
}

// --- Password Visability Feature ---

const isPasswordVisible = ref(false);

const inputType = computed(() =>
    props.passwordReveal
        ? isPasswordVisible.value
            ? "text"
            : "password"
        : props.type,
);

/** Current password-reveal icon name. */
const passwordVisibleIcon = computed(() =>
    !isPasswordVisible.value ? "eye" : "eye-off",
);

/**
 * Toggle the visibility of a password-reveal input
 * by changing the type and focus the input right away.
 */
function togglePasswordVisibility(): void {
    isPasswordVisible.value = !isPasswordVisible.value;
    nextTick(() => setFocus());
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-input__wrapper"],
    [
        "expandedClass",
        "o-input__wrapper--expanded",
        null,
        computed(() => props.expanded),
    ],
    [
        "hasIconRightClass",
        "o-input__wrapper--has-icon-right",
        null,
        hasIconRight,
    ],
);

const inputClasses = defineClasses(
    ["inputClass", "o-input"],
    ["roundedClass", "o-input--rounded", null, computed(() => props.rounded)],
    [
        "sizeClass",
        "o-input--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-input--",
        computed(() => statusVariant.value || props.variant),
        computed(() => !!statusVariant.value || !!props.variant),
    ],
    [
        "disabledClass",
        "o-input--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "textareaClass",
        "o-input__textarea",
        null,
        computed(() => props.type === "textarea"),
    ],
    [
        "iconLeftSpaceClass",
        "o-input--iconspace-left",
        null,
        computed(() => !!props.icon),
    ],
    ["iconRightSpaceClass", "o-input--iconspace-right", null, hasIconRight],
);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-input__icon-left"]);

const iconRightClasses = defineClasses([
    "iconRightClass",
    "o-input__icon-right",
]);

const counterClasses = defineClasses(["counterClass", "o-input__counter"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus });
</script>

<template>
    <div data-oruga="input" :class="rootClasses">
        <input
            v-if="type !== 'textarea'"
            v-bind="$attrs"
            :id="id"
            ref="inputRef"
            v-model="vmodel"
            :data-oruga-input="inputType"
            :type="inputType"
            :class="inputClasses"
            :maxlength="maxlength"
            :autocomplete="autocomplete"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />

        <textarea
            v-else
            v-bind="$attrs"
            :id="id"
            ref="textareaRef"
            v-model="vmodel"
            data-oruga-input="textarea"
            :class="inputClasses"
            :maxlength="maxlength"
            :style="computedStyles"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />

        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click="iconClick" />

        <o-icon
            v-if="hasIconRight"
            :class="iconRightClasses"
            :clickable="passwordReveal || clearable || iconRightClickable"
            :icon="computedIconRight"
            :pack="iconPack"
            :size="size"
            :variant="computedIconRightVariant"
            both
            @click="rightIconClick" />

        <small
            v-if="maxlength && counter && isFocused && type !== 'number'"
            :class="counterClasses">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>
