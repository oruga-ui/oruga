<script
    setup
    lang="ts"
    generic="
        T extends object | typeof File,
        IsMultiple extends boolean = false
    ">
import { computed, ref, useAttrs, useTemplateRef, watch } from "vue";

import { getDefault } from "@/utils/config";
import { File } from "@/utils/ssr";
import { isTrueish } from "@/utils/helpers";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { UploadProps } from "./props";

/**
 * Upload one or more files.
 * @displayName Upload
 * @style _upload.scss
 */
defineOptions({
    isOruga: true,
    name: "OUpload",
    configField: "upload",
    inheritAttrs: false,
});

type ModelValue = UploadProps<T, IsMultiple>["modelValue"];

const props = withDefaults(defineProps<UploadProps<T, IsMultiple>>(), {
    override: undefined,
    modelValue: undefined,
    // multiple: false,
    variant: () => getDefault("upload.variant"),
    disabled: false,
    accept: undefined,
    dragDrop: false,
    expanded: false,
    native: true,
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidity: "",
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {object | object[] | File | File[]} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on input focus event
     * @param event {Event} native event
     */
    focus: [event: Event];
    /**
     * on input blur event
     * @param event {Event} native event
     */
    blur: [event: Event];
    /**
     * on input invalid event
     * @param event {Event} native event
     */
    invalid: [event: Event];
}>();

const inputRef = useTemplateRef("inputElement");

// use form input functionality
const { checkHtml5Validity, onFocus, onBlur, onInvalid, isValid, setFocus } =
    useInputHandler(inputRef, emits, props);

// inject parent field component if used inside one
const { parentField } = injectField();

const vmodel = defineModel<ModelValue>({ default: undefined });

const dragDropFocus = ref(false);

/**
 * When v-model is changed:
 * 1. Reset interna input file value
 * 2. If it's invalid, validate again.
 */
watch(vmodel, (value) => {
    if (!value || (Array.isArray(value) && value.length === 0))
        if (inputRef.value) inputRef.value.value = "";
    if (!isValid.value && !props.dragDrop) checkHtml5Validity();
});

/**
 * Listen change event on input type 'file',
 * emit 'input' event and validate
 */
function onFileChange(event: Event | DragEvent): void {
    if (props.disabled) return;
    if (props.dragDrop) updateDragDropFocus(false);
    const value =
        (event.target as HTMLInputElement).files ||
        (event as DragEvent).dataTransfer?.files ||
        [];
    // no file selected
    if (value.length === 0) {
        if (!vmodel.value) return;
        if (props.native) vmodel.value = undefined;
    }

    // multiple upload
    if (isTrueish(props.multiple)) {
        // always new values if native or undefined local
        const values =
            props.native || !vmodel.value || !Array.isArray(vmodel.value)
                ? []
                : [...vmodel.value];

        for (let i = 0; i < value.length; i++) {
            const file = value[i];
            // add file when type is valid
            if (checkType(file)) values.push(file);
        }
        vmodel.value = values as ModelValue;
    }
    // single uplaod
    else {
        // only one element in case drag drop mode and isn't multiple
        if (props.dragDrop && value.length !== 1) return;
        else {
            const file = value[0];
            // add file when type is valid
            if (checkType(file)) vmodel.value = file as ModelValue;
            // else clear input
            else if (vmodel.value) {
                vmodel.value = undefined;
                clearInput();
            } else {
                // Force input back to empty state and recheck validity
                clearInput();
                checkHtml5Validity();
                return;
            }
        }
    }

    if (!props.dragDrop) checkHtml5Validity();
}

/** Reset file input value */
function clearInput(): void {
    if (inputRef.value) inputRef.value.value = "";
}

/** Listen drag-drop to update internal variable */
function updateDragDropFocus(focus: boolean): void {
    if (!props.disabled) dragDropFocus.value = focus;
}

/** Check mime type of file s*/
function checkType(file: File): boolean {
    if (!props.accept) return true;
    const types = props.accept.split(",");
    if (types.length === 0) return true;
    for (let i = 0; i < types.length; i++) {
        const type = types[i].trim();
        if (type) {
            if (type.substring(0, 1) === ".") {
                const extension = file.name.toLowerCase().slice(-type.length);
                if (extension === type.toLowerCase()) return true;
            } else {
                // check mime type
                if (file.type.match(type)) return true;
            }
        }
    }
    return false;
}

function onClick(event: Event): void {
    if (props.disabled) return;

    // click input if not drag and drop is used
    if (!props.dragDrop) {
        event.preventDefault();
        if (inputRef.value) inputRef.value.click();
    }
}

// --- Computed Component Classes ---

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField?.value?.inputAttrs,
    ...attrs,
}));

const rootClasses = defineClasses(
    ["rootClass", "o-upl"],
    ["expandedClass", "o-upl--expanded", null, computed(() => props.expanded)],
    ["disabledClass", "o-upl--disabled", null, computed(() => props.disabled)],
);

const draggableClasses = defineClasses(
    ["draggableClass", "o-upl__draggable"],
    [
        "hoveredClass",
        "o-upl__draggable--hovered",
        null,
        computed(() => !props.variant && dragDropFocus.value),
    ],
    [
        "variantClass",
        "o-upl__draggable--hovered-",
        computed(() => props.variant),
        computed(() => !!props.variant && dragDropFocus.value),
    ],
);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <label :class="rootClasses" data-oruga="upload">
        <template v-if="!dragDrop">
            <!--
                @slot Default content
                @binding {(event:Event): void} onclick - click handler, only needed if a button is used
            -->
            <slot :onclick="onClick" />
        </template>

        <div
            v-else
            :class="draggableClasses"
            role="button"
            tabindex="0"
            @mouseenter="updateDragDropFocus(true)"
            @mouseleave="updateDragDropFocus(false)"
            @dragover.prevent="updateDragDropFocus(true)"
            @dragleave.prevent="updateDragDropFocus(false)"
            @dragenter.prevent="updateDragDropFocus(true)"
            @drop.prevent="onFileChange">
            <!--
                @slot Default content     
                @binding {(event:Event): void} onclick - click handler, only needed if a button is used
            -->
            <slot :onclick="onClick" />
        </div>

        <input
            v-bind="inputBind"
            ref="inputElement"
            type="file"
            data-oruga-input="file"
            :multiple="props.multiple"
            :accept="accept"
            :disabled="disabled"
            @change="onFileChange"
            @focus="onFocus"
            @blur="onBlur"
            @invalid="onInvalid" />
    </label>
</template>
