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
import {
    defineClasses,
    useDebounce,
    useInputHandler,
    useVModel,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { InputProps } from "./props";

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

const props = withDefaults(defineProps<InputProps<IsNumber>>(), {
    modelValue: undefined,
    // number: false,
    override: undefined,
    type: "text",
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
    debounce: getOption("autocomplete.debounce", 400),
    autocomplete: getOption("input.autocomplete", "off"),
    id: uuid(),
    useHtml5Validation: getOption("useHtml5Validation", true),
    validationMessage: undefined,
});

type ModelValue = typeof props.modelValue;

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

// const vmodel = defineModel<ModelValue>({ default: undefined });
const vmodel = useVModel<ModelValue>();

// if id is given set as `for` property on o-field wrapper
if (props.id) parentField?.value?.setInputId(props.id);

/** Get value length */
const valueLength = computed(() =>
    typeof vmodel.value === "string" || typeof vmodel.value === "number"
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
defineExpose({ focus: setFocus, value: vmodel });
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
