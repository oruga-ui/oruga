<script
    setup
    lang="ts"
    generic="
        IsNumber extends boolean,
        ModelValue extends IsNumber extends true ? number : string
    ">
import {
    ref,
    computed,
    nextTick,
    watch,
    onMounted,
    type StyleValue,
    type PropType,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import { defineClasses, useDebounce, useInputHandler } from "@/composables";

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

const props = defineProps({
    /**
     * @type string | number
     * @model
     */
    modelValue: {
        type: [Number, String] as unknown as PropType<ModelValue>,
        default: undefined,
    },
    /** @type boolean */
    number: { type: Boolean as PropType<IsNumber>, default: false },
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: { type: String, default: "text" },
    /**
     * Size of the control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("input.size"),
    },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("input.variant"),
    },
    /** Input placeholder */
    placeholder: { type: String, default: undefined },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /** Makes the element rounded */
    rounded: { type: Boolean, default: false },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Adds the reveal password functionality */
    passwordReveal: { type: Boolean, default: false },
    /** Same as native maxlength, plus character counter */
    maxlength: { type: [Number, String], default: undefined },
    /** Show character counter when maxlength prop is passed */
    counter: {
        type: Boolean,
        default: () => getOption("input.counter", false),
    },
    /** Automatically adjust height in textarea */
    autosize: { type: Boolean, default: false },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("input.iconPack", undefined),
    },
    /** Icon to be shown */
    icon: {
        type: String,
        default: () => getOption("input.icon", undefined),
    },
    /** Makes the icon clickable */
    iconClickable: { type: Boolean, default: false },
    /** Icon to be added on the right side */
    iconRight: {
        type: String,
        default: () => getOption("input.iconRight", undefined),
    },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /** Variant of right icon */
    iconRightVariant: { type: String, default: undefined },
    /** Add a button/icon to clear the inputed text */
    clearable: {
        type: Boolean,
        default: () => getOption("input.clearable", false),
    },
    /** Icon name to be added on the clear button */
    clearIcon: {
        type: String,
        default: () => getOption("input.clearIcon", "close-circle"),
    },
    /** Show status icon using field and variant prop */
    statusIcon: {
        type: Boolean,
        default: () => getOption("statusIcon", true),
    },
    /** Number of milliseconds to delay before to emit input event */
    debounce: {
        type: Number,
        default: () => getOption("autocomplete.debounce", 400),
    },
    /** Native options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("input.autocomplete", "off"),
    },
    /** Same as native id. Also set the for label for o-field wrapper. */
    id: { type: String, default: () => uuid() },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** The message which is shown when a validation error occurs */
    validationMessage: { type: String, default: undefined },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of input when expanded */
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of input when type textarea */
    textareaClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the left icon space inside the input */
    iconLeftSpaceClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the right icon space inside the input */
    iconRightSpaceClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the native input element */
    inputClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of input when rounded */
    roundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of input when disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the left icon */
    iconLeftClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the right icon */
    iconRightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class to display when a right icon is used */
    hasIconRightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the counter element */
    counterClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the input size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the input variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number} updated modelValue prop
     */
    (e: "update:modelValue", value: ModelValue): void;
    /**
     * on input change event
     * @param value {string | number} input value
     * @param event {Event} native event
     */
    (e: "input", value: ModelValue, event: Event): void;
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

const vmodel = defineModel<ModelValue>({ default: undefined });

// if id is given set as `for` property on o-field wrapper
if (props.id) parentField?.value?.setInputId(props.id);

/** Get value length */
const valueLength = computed(() =>
    typeof vmodel.value === "string"
        ? vmodel.value.length
        : typeof vmodel.value === "number"
          ? String(vmodel.value).length
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
            if (!isValid.value) checkHtml5Validity();
        },
        { immediate: true, flush: "post" },
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

let debouncedInput: ReturnType<typeof useDebounce<Parameters<typeof onInput>>>;

watch(
    () => props.debounce,
    () => {
        debouncedInput = useDebounce(onInput, props.debounce || 0);
    },
    { immediate: true },
);

function onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const input = (props.number ? Number(value) : String(value)) as ModelValue;
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
    else if (props.clearable && vmodel.value && props.clearIcon)
        return props.clearIcon;
    else if (props.iconRight) return props.iconRight;
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
        vmodel.value = (props.number ? 0 : "") as ModelValue;
    if (props.iconRightClickable) {
        emits("icon-right-click", event);
        nextTick(() => setFocus());
    }
}

// --- Password Visability Feature ---

const isPasswordVisible = ref(false);

const inputType = computed(() => {
    if (props.passwordReveal)
        return isPasswordVisible.value ? "text" : "password";
    else return props.type;
});

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
defineExpose({ focus: setFocus, value: vmodel.value });
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
            @input="debouncedInput" />

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
            @input="debouncedInput" />

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
