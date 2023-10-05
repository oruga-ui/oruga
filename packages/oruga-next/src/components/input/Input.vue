<script setup lang="ts">
import {
    ref,
    computed,
    nextTick,
    watch,
    onMounted,
    type StyleValue,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useInputHandler,
} from "@/composables";

import { injectField } from "../field/useFieldShare";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: [String, Number], default: "" },
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: {
        type: String,
        default: "text",
    },
    /**
     * Size of the control, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("input.size"),
    },
    /**
     * Color of the control, optional
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
    maxlength: { type: Number, default: undefined },
    /** Show character counter when maxlength prop is passed */
    hasCounter: {
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
    /** Icon name to be shown */
    icon: {
        type: String,
        default: () => getOption("input.icon", undefined),
    },
    /** Makes the icon clickable */
    iconClickable: { type: Boolean, default: false },
    /** Icon name to be added on the right side */
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
    /** Native options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("input.autocomplete", "off"),
    },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** The message which is shown when a validation error occurs */
    validationMessage: { type: String, default: undefined },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "expandedClass",
        "iconLeftSpaceClass",
        "iconRightSpaceClass",
        "inputClass",
        "roundedClass",
        "iconLeftClass",
        "iconRightClass",
        "counterClass",
        "sizeClass",
        "variantClass",
    ]),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number} updated modelValue prop
     */
    (e: "update:modelValue", value: string | number): void;
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

const vmodel = useVModelBinding<string | number>(props, emits);

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
        if (textareaRef.value) {
            const scrollHeight = textareaRef.value.scrollHeight;
            height.value = scrollHeight + "px";
        }
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

// --- Icon Feature ---

const hasIconRight = computed(
    () =>
        props.passwordReveal ||
        (props.statusIcon && statusVariantIcon.value) ||
        (props.clearable && vmodel.value && props.clearIcon) ||
        props.iconRight,
);

const computedIconRight = computed(() => {
    if (props.passwordReveal) {
        return passwordVisibleIcon.value;
    } else if (props.clearable && vmodel.value && props.clearIcon) {
        return props.clearIcon;
    } else if (props.iconRight) {
        return props.iconRight;
    }
    return statusVariantIcon.value;
});

const computedIconRightVariant = computed(() =>
    props.passwordReveal || props.iconRight
        ? props.iconRightVariant || props.variant || null
        : statusVariant.value,
);

function iconClick(emit, event): void {
    emits(emit, event);
    nextTick(() => setFocus());
}

function rightIconClick(event: Event): void {
    if (props.passwordReveal) togglePasswordVisibility();
    else if (props.clearable) vmodel.value = "";
    if (props.iconRightClickable) iconClick("icon-right-click", event);
}

// --- Password Visability Feature ---

const isPasswordVisible = ref(false);
const inputType = ref(props.type);

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
    inputType.value = isPasswordVisible.value ? "text" : "password";
    nextTick(() => setFocus());
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-ctrl-input"),
    {
        [useComputedClass("expandedClass", "o-ctrl-input--expanded")]:
            props.expanded,
    },
]);

const inputClasses = computed(() => [
    useComputedClass("inputClass", "o-input"),
    {
        [useComputedClass("roundedClass", "o-input--rounded")]: props.rounded,
    },
    {
        [useComputedClass("sizeClass", "o-input--", props.size)]: props.size,
    },
    {
        [useComputedClass(
            "variantClass",
            "o-input--",
            statusVariant.value || props.variant,
        )]: statusVariant.value || props.variant,
    },
    {
        [useComputedClass("textareaClass", "o-input__textarea")]:
            props.type === "textarea",
    },
    {
        [useComputedClass("iconLeftSpaceClass", "o-input-iconspace-left")]:
            props.icon,
    },
    {
        [useComputedClass("iconRightSpaceClass", "o-input-iconspace-right")]:
            hasIconRight.value,
    },
]);

const iconLeftClasses = computed(() => [
    useComputedClass("iconLeftClass", "o-input__icon-left"),
]);

const iconRightClasses = computed(() => [
    useComputedClass("iconRightClass", "o-input__icon-right"),
]);

const counterClasses = computed(() => [
    useComputedClass("counterClass", "o-input__counter"),
]);

// --- Expose Public Functionalities ---

const rootRef = ref();
defineExpose({
    // expose the html root element of this component
    $el: computed(() => rootRef.value),
    // expose the input element
    $inputRef: computed(() => elementRef.value),
});
</script>

<template>
    <div ref="rootRef" :class="rootClasses">
        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click="iconClick('icon-click', $event)" />

        <input
            v-if="type !== 'textarea'"
            v-bind="$attrs"
            ref="inputRef"
            v-model="vmodel"
            :type="inputType"
            :class="inputClasses"
            :maxlength="maxlength"
            :autocomplete="autocomplete"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid" />

        <textarea
            v-else
            v-bind="$attrs"
            ref="textareaRef"
            v-model="vmodel"
            :class="inputClasses"
            :maxlength="maxlength"
            :style="computedStyles"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid" />

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
            v-if="maxlength && hasCounter && isFocused && type !== 'number'"
            :class="counterClasses">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>
