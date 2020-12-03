<template>
    <label :class="rootClasses">
        <template v-if="!dragDrop">
            <slot/>
        </template>

        <div
            v-else
            :class="draggableClasses"
            @mouseenter="updateDragDropFocus(true)"
            @mouseleave="updateDragDropFocus(false)"
            @dragover.prevent="updateDragDropFocus(true)"
            @dragleave.prevent="updateDragDropFocus(false)"
            @dragenter.prevent="updateDragDropFocus(true)"
            @drop.prevent="onFileChange">
            <slot/>
        </div>

        <input
            ref="input"
            type="file"
            v-bind="$attrs"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabled"
            @change="onFileChange">
    </label>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import FormElementMixin from '../../utils/FormElementMixin'
import { File } from '../../utils/ssr'

/**
 * Upload one or more files
 * @displayName Upload
 * @example ./examples/Upload.md
 * @style _upload.scss
 */
export default {
    name: 'OUpload',
    mixins: [BaseComponentMixin, FormElementMixin],
    inheritAttrs: false,
    provide() {
        return {
            $elementRef: 'input'
        }
    },
    props: {
        /** @model */
        value: [Object, File, Array],
        /** Same as native, also push new item to v-model instead of replacing */
        multiple: Boolean,
        /** Same as native disabled */
        disabled: Boolean,
        /** Same as native accept */
        accept: String,
        /** Accepts drag & drop and change its style */
        dragDrop: Boolean,
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: {
            type: String
        },
        /** Replace last chosen files every time (like native file input element) */
        native: {
            type: Boolean,
            default: false
        },
        /** Upload will be expanded (full-width) */
        expanded: {
            type: Boolean,
            default: false
        },
        rootClass: String,
        draggableClass: String,
        variantClass: String,
        expandedClass: String,
        disabledClass: String,
        hoveredClass: String
    },
    data() {
        return {
            newValue: this.value,
            dragDropFocus: false
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('upload', 'rootClass', 'o-upl'),
                { [this.computedClass('upload', 'expandedClass', 'o-upl--expanded')]: this.expanded }
            ]
        },
        draggableClasses() {
            return [
                this.computedClass('upload', 'draggableClass', 'o-upl__draggable'),
                { [`${this.computedClass('upload', 'variantClass', 'o-upl__draggable--', this.variant)}`]: this.variant },
                { [this.computedClass('upload', 'hoveredClass', 'o-upl__draggable--hovered')]: !this.variant && this.dragDropFocus },
                { [`${this.computedClass('upload', 'variantClass', 'o-upl__draggable--hovered-', this.variant)}`]: this.variant && this.dragDropFocus },
                { [this.computedClass('upload', 'disabledClass', 'o-upl__draggable--disabled')]: this.disabled }
            ]
        }
    },
    watch: {
        /**
         *   When v-model is changed:
         *   1. Set internal value.
         *   2. Reset interna input file value
         *   3. If it's invalid, validate again.
         */
        value(value) {
            this.newValue = value
            if (!value || (Array.isArray(value) && value.length === 0)) {
                this.$refs.input.value = null
            }
            !this.isValid && !this.dragDrop && this.checkHtml5Validity()
        },
    },
    methods: {
        /**
        * Listen change event on input type 'file',
        * emit 'input' event and validate
        */
        onFileChange(event) {
            if (this.disabled || this.loading) return
            if (this.dragDrop) this.updateDragDropFocus(false)
            const value = event.target.files || event.dataTransfer.files
            if (value.length === 0) {
                if (!this.newValue) return
                if (this.native) this.newValue = null
            } else if (!this.multiple) {
                // only one element in case drag drop mode and isn't multiple
                if (this.dragDrop && value.length !== 1) return
                else {
                    const file = value[0]
                    if (this.checkType(file)) this.newValue = file
                    else if (this.newValue) this.newValue = null
                    else return
                }
            } else {
                // always new values if native or undefined local
                let newValues = false
                if (this.native || !this.newValue) {
                    this.newValue = []
                    newValues = true
                }
                for (let i = 0; i < value.length; i++) {
                    const file = value[i]
                    if (this.checkType(file)) {
                        this.newValue.push(file)
                        newValues = true
                    }
                }
                if (!newValues) return
            }
            this.$emit('input', this.newValue)
            !this.dragDrop && this.checkHtml5Validity()
        },

        /**
        * Listen drag-drop to update internal variable
        */
        updateDragDropFocus(focus) {
            if (!this.disabled) {
                this.dragDropFocus = focus
            }
        },

        /**
        * Check mime type of file
        */
        checkType(file) {
            if (!this.accept) return true
            const types = this.accept.split(',')
            if (types.length === 0) return true
            for (let i = 0; i < types.length; i++) {
                const type = types[i].trim()
                if (type) {
                    if (type.substring(0, 1) === '.') {
                        // check extension
                        const extIndex = file.name.lastIndexOf('.')
                        const extension = extIndex >= 0
                            ? file.name.substring(extIndex) : ''
                        if (extension.toLowerCase() === type.toLowerCase()) {
                            return true
                        }
                    } else {
                        // check mime type
                        if (file.type.match(type)) return true
                    }
                }
            }
            return false
        }
    }
}
</script>
