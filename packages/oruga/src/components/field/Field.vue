<template>
    <div :class="[rootClasses, fieldType()]">
        <div
            v-if="horizontal"
            :class="labelHorizontalClasses">
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="labelClasses">
                <slot v-if="$slots.label" name="label"/>
                <template v-else>{{ label }}</template>
            </label>
        </div>
        <template v-else>
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="labelClasses">
                <slot v-if="$slots.label" name="label"/>
                <template v-else>{{ label }}</template>
            </label>
        </template>
        <o-field-body
            v-if="horizontal">
            <slot/>
        </o-field-body>
        <template v-else>
            <slot/>
        </template>
        <p
            v-if="hasMessage && !horizontal"
            :class="messageClasses"
        >
            <slot v-if="$slots.message" name="message"/>
            <template v-else>{{ message }}</template>
        </p>
    </div>
</template>

<script>
import FieldBody from './FieldBody'

import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @example ./examples/Field.md
 * @style _field.scss 
 */
export default {
    name: 'OField',
    components: {
        [FieldBody.name]: FieldBody
    },
    mixins: [BaseComponentMixin],
    provide() {
        return {
            $field: this
        }
    },
    props: {
        /**
         * 	Type (color) of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete
         *  @values primary, info, success, warning, danger, and any other custom color
         */
        variant: [String, Object],
        /**
         * Field label
         */
        label: String,
        /**
         * Same as native for set on the label
         */
        labelFor: String,
        /**
         * Help message text
         */
        message: String,
        /**
         * Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)
         */
        grouped: Boolean,
        /**
         * Allow controls to fill up multiple lines, making it responsive
         */
        groupMultiline: Boolean,
        expanded: Boolean,
        /**
         * Group label and control on the same line for horizontal forms
         */
        horizontal: Boolean,
        /**
         * Field automatically attach controls together
         */
        addons: {
            type: Boolean,
            default: true
        },
        rootClass: String,
        horizontalClass: String,
        expandedClass: String,
        groupMultilineClass: String,
        labelClass: String,
        labelHorizontalClass: String,
        contentHorizontalClass: String,
        messageClass: String,
        variantClass: String
    },
    data() {
        return {
            newVariant: this.variant,
            newMessage: this.message
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('field', 'rootClass', 'o-field'),
                { [this.computedClass('field', 'horizontalClass', 'o-field-horizontal')]: this.horizontal },
                { [this.computedClass('field', 'expandedClass', 'o-field-expanded')]: this.expanded },
                { [this.computedClass('field', 'groupMultiline', 'o-field-grouped-multiline')]: this.groupMultiline }
            ]
        },
        messageClasses() {
            return [
                this.computedClass('field', 'messageClass', 'o-field-message'),
                { [`${this.computedClass('field', 'variantClass', 'o-color-')}${this.newVariant}`]: this.newVariant }
            ]
        },
        labelClasses() {
            return [
                this.computedClass('field', 'labelClass', 'o-field-label')
            ]
        },
        labelHorizontalClasses() {
            return [
                this.computedClass('field', 'labelHorizontalClass', 'o-field-horizontal-label')
            ]
        },
        contentHorizontalClasses() {
            return [
                this.computedClass('field', 'contentHorizontalClass', 'o-field-horizontal-content')
            ]
        },
        hasLabel() {
            return this.label || this.$slots.label
        },
        hasMessage() {
            return this.newMessage || this.$slots.message
        }
    },
    watch: {
        /**
        * Set internal variant when prop change.
        */
        variant(value) {
            this.newVariant = value
        },

        /**
        * Set internal message when prop change.
        */
        message(value) {
            this.newMessage = value
        }
    },
    methods: {
        /**
        * Field has addons if there are more than one slot
        * (element / component) in the Field.
        * Or is grouped when prop is set.
        * Is a method to be called when component re-render.
        */
        fieldType() {
            if (this.grouped) return 'o-field-grouped'
            let renderedNode = 0
            if (this.$slots.default) {
                renderedNode = this.$slots.default.reduce((i, node) => node.tag ? i + 1 : i, 0)
            }
            if (
                renderedNode > 1 &&
                this.addons &&
                !this.horizontal
            ) {
                return 'o-field-addons'
            }
        }
    }
}
</script>
