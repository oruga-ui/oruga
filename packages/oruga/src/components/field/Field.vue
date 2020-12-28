<template>
    <div :class="rootClasses">
        <div
            v-if="horizontal"
            :class="labelHorizontalClasses">
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="labelClasses">
                <slot v-if="hasLabelSlot" name="label"/>
                <template v-else>{{ label }}</template>
            </label>
        </div>
        <template v-else>
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="labelClasses">
                <slot v-if="hasLabelSlot" name="label"/>
                <template v-else>{{ label }}</template>
            </label>
        </template>
        <o-field-body v-if="horizontal">
            <slot/>
        </o-field-body>
        <div v-else-if="hasInnerField" :class="bodyClasses">
            <o-field
                :addons="false"
                :variant="newVariant"
                :class="innerFieldClasses">
                <slot/>
            </o-field>
        </div>
        <template v-else>
            <slot/>
        </template>
        <p
            v-if="hasMessage && !horizontal"
            :class="messageClasses"
        >
            <slot v-if="hasMessageSlot" name="message"/>
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
    configField: 'field',
    mixins: [BaseComponentMixin],
    provide() {
        return {
            $field: this
        }
    },
    inject: {
        $field: { name: '$field', default: false }
    },
    props: {
        /**
         * 	Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete
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
         /**
         * Vertical size of input, optional
         * @values small, medium, large
         */
        labelSize: String,
        rootClass: String,
        horizontalClass: String,
        groupedClass: String,
        groupMultilineClass: String,
        labelClass: String,
        labelSizeClass: String,
        labelHorizontalClass: String,
        bodyClass: String,
        bodyHorizontalClass: String,
        addonsClass: String,
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
                this.computedClass('rootClass', 'o-field'),
                { [this.computedClass('horizontalClass', 'o-field--horizontal')]: this.horizontal }
            ]
        },
        messageClasses() {
            return [
                this.computedClass('messageClass', 'o-field__message'),
                { [this.computedClass('variantClass', 'o-field__message-', this.newVariant)]: this.newVariant }
            ]
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-field__label'),
                { [this.computedClass('labelSizeClass', 'o-field__label-', this.labelSize)]: this.labelSize }
            ]
        },
        labelHorizontalClasses() {
            return [
                this.computedClass('labelHorizontalClass', 'o-field__horizontal-label')
            ]
        },
        bodyClasses() {
            return [
                this.computedClass('bodyClass', 'o-field__body')
            ]
        },
        bodyHorizontalClasses() {
            return [
                this.computedClass('bodyHorizontalClass', 'o-field__horizontal-body')
            ]
        },
        innerFieldClasses() {
            return [
                { [this.computedClass('groupMultilineClass', 'o-field--grouped-multiline')]: this.groupMultiline },
                { [this.computedClass('groupedClass', 'o-field--grouped')]: this.grouped },
                { [this.computedClass('addonsClass', 'o-field--addons')]: !this.grouped && this.hasAddons() },
            ]
        },
        parent() {
            return this.$field
        },
        hasLabelSlot() {
            return this.$slots.label
        },
        hasMessageSlot() {
            return this.$slots.message
        },
        hasLabel() {
            return this.label || this.hasLabelSlot
        },
        hasMessage() {
            return ((!this.parent || !this.parent.hasInnerField) && this.newMessage) || this.hasMessageSlot
        },
        hasInnerField() {
            return this.grouped || this.groupMultiline || this.hasAddons()
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
        },

        /**
        * Set parent message if we use Field in Field.
        */
        newMessage(value) {
            if (this.parent && this.parent.hasInnerField) {
                this.parent.newMessage = value
            }
        }
    },
    methods: {
        hasAddons() {
            let renderedNode = 0
            if (this.$slots.default) {
                renderedNode = this.$slots.default.reduce((i, node) => node.tag ? i + 1 : i, 0)
            }
            return (
                renderedNode > 1 &&
                this.addons &&
                !this.horizontal
            )
        }
    }
}
</script>
