<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { File } from "@/utils/ssr";
import { uuid } from "@/utils/helpers";
import {
    defineClasses,
    useVModelBinding,
    useInputHandler,
} from "@/composables";

import type { ComponentClass } from "@/types";

/**
 * Upload one or more files
 * @displayName Upload
 * @style _upload.scss
 */
defineOptions({
    isOruga: true,
    name: "OUpload",
    configField: "upload",
    inheritAttrs: false,
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** @model */
    modelValue: {
        type: [Object, Array] as PropType<
            object | typeof File | object[] | (typeof File)[]
        >,
        default: undefined,
    },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("upload.variant"),
    },
    /** Same as native, also push new item to v-model instead of replacing */
    multiple: { type: Boolean, default: false },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native accept */
    accept: { type: String, default: undefined },
    /** Accepts drag & drop and change its style */
    dragDrop: { type: Boolean, default: false },
    /** Upload will be expanded (full-width) */
    expanded: { type: Boolean, default: false },
    /** Replace last chosen files every time (like native file input element) */
    native: { type: Boolean, default: true },
    /** Accessibility id to establish relationship between the input and control label' */
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
    /** Class of the Upload when draggable */
    draggableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Upload variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Upload when expanded */
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Upload when disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Upload when hovered */
    hoveredClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {Object | Object[] | File | File[]} updated modelValue prop
     */
    (e: "update:modelValue", value: Object | Object[] | File | File[]): void;
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
}>();

const inputRef = ref<HTMLInputElement>();

const vmodel = useVModelBinding<Object | Object[] | File | File[]>(
    props,
    emits,
);

// use form input functionality
const { checkHtml5Validity, onFocus, onBlur, isValid } = useInputHandler(
    inputRef,
    emits,
    props,
);

const dragDropFocus = ref(false);

/**
 * When v-model is changed:
 * 1. Reset interna input file value
 * 2. If it's invalid, validate again.
 */
watch(
    () => props.modelValue,
    (value) => {
        if (!value || (Array.isArray(value) && value.length === 0))
            inputRef.value.value = null;
        if (!isValid.value && !props.dragDrop) checkHtml5Validity();
    },
);

/**
 * Listen change event on input type 'file',
 * emit 'input' event and validate
 */
function onFileChange(event: Event | DragEvent): void {
    if (props.disabled) return;
    if (props.dragDrop) updateDragDropFocus(false);
    const value =
        (event.target as HTMLInputElement).files ||
        (event as DragEvent).dataTransfer.files;
    // no file selected
    if (value.length === 0) {
        if (!vmodel.value) return;
        if (props.native) vmodel.value = null;
    }
    // single uplaod
    else if (!props.multiple) {
        // only one element in case drag drop mode and isn't multiple
        if (props.dragDrop && value.length !== 1) return;
        else {
            const file = value[0];
            if (checkType(file)) vmodel.value = file;
            else if (vmodel.value) {
                vmodel.value = null;
                clearInput();
            } else {
                // Force input back to empty state and recheck validity
                clearInput();
                checkHtml5Validity();
                return;
            }
        }
    }
    // multiple upload
    else {
        // always new values if native or undefined local
        let newValues = false;
        if (props.native || !vmodel.value || !Array.isArray(vmodel.value)) {
            vmodel.value = [] as any;
            newValues = true;
        }
        for (let i = 0; i < value.length; i++) {
            const file = value[i];
            if (checkType(file) && Array.isArray(vmodel.value)) {
                vmodel.value.push(file);
                newValues = true;
            }
        }
        if (!newValues) return;
    }

    if (!props.dragDrop) checkHtml5Validity();
}

/** Reset file input value */
function clearInput(): void {
    inputRef.value.value = null;
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
        inputRef.value.click();
    }
}

// --- Computed Component Classes ---

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
        computed(() => props.variant && dragDropFocus.value),
    ],
);
</script>

<template>
    <label :class="rootClasses" data-oruga="upload" :for="id">
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
            @focus="updateDragDropFocus(true)"
            @focusout="updateDragDropFocus(false)"
            @dragover.prevent="updateDragDropFocus(true)"
            @dragleave.prevent="updateDragDropFocus(false)"
            @dragenter.prevent="updateDragDropFocus(true)"
            @drop.prevent="onFileChange">
            <!--
                @slot Default content
            -->
            <slot />
        </div>

        <input
            v-bind="$attrs"
            :id="id"
            ref="inputRef"
            type="file"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabled"
            :aria-labelledby="ariaLabelledby"
            @change="onFileChange"
            @focus="onFocus"
            @blur="onBlur" />
    </label>
</template>
