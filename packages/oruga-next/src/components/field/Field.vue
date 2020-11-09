<template>
    <div :class="rootClasses()">
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
        <o-field-body
            v-if="horizontal">
            <slot/>
        </o-field-body>
        <div v-else-if="hasInnerField" :class="contentHorizontalClasses">
            <o-field
                :addons="false"
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

<script lang="ts">
import { defineComponent } from 'vue'

import FieldBody from './FieldBody.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @example ./examples/Field.md
 * @style _field.scss 
 */
export default defineComponent({
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
    inject: ['$field'],
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
        groupedClass: String,
        groupMultilineClass: String,
        labelClass: String,
        labelHorizontalClass: String,
        contentHorizontalClass: String,
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
        messageClasses() {
            return [
                this.computedClass('field', 'messageClass', 'o-field-message'),
                { [`${this.computedClass('field', 'variantClass', 'o-color-', true)}${this.newVariant}`]: this.newVariant }
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
        innerFieldClasses() {
            return [
                { [this.computedClass('field', 'groupMultilineClass', 'o-field-grouped-multiline')]: this.groupMultiline },
                this.fieldType()
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
            return this.label || this.$slots.label
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
        rootClasses() {
            return [
                this.computedClass('field', 'rootClass', 'o-field')
            ]
        },
        /**
        * Field has addons if there are more than one slot
        * (element / component) in the Field.
        * Or is grouped when prop is set.
        * Is a method to be called when component re-render.
        */
        fieldType() {
            if (this.grouped) return this.computedClass('field', 'groupedClass', 'o-field-grouped')
            if (this.hasAddons()) return this.computedClass('field', 'addonsClass', 'o-field-addons')
        },
        hasAddons() {
            let renderedNode = 0
            if (this.$slots.default) {
                renderedNode = this.$slots.default().reduce((i: number, node: any) => node.tag ? i + 1 : i, 0)
            }
            return (
                renderedNode > 1 &&
                this.addons &&
                !this.horizontal
            )
        }
    }
})
</script>
