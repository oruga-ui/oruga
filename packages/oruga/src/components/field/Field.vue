<template>
    <div :class="[rootClasses, fieldType()]">
        <div
            v-if="horizontal"
            :class="labelHorizontalClass">
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="labelClass">
                <slot v-if="$slots.label" name="label"/>
                <template v-else>{{ label }}</template>
            </label>
        </div>
        <template v-else>
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="labelClass">
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

import config from '../../utils/config'
import { getCssClass, getValueByPath } from '../../utils/helpers'

/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @style _field.scss 
 */
export default {
    name: 'OField',
    components: {
        [FieldBody.name]: FieldBody
    },
    provide() {
        return {
            $field: this
        }
    },
    props: {
        variant: [String, Object],
        label: String,
        labelFor: String,
        message: String,
        grouped: Boolean,
        groupMultiline: Boolean,
        expanded: Boolean,
        horizontal: Boolean,
        addons: {
            type: Boolean,
            default: true
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'field.override', false)
                const clazz = getValueByPath(config, 'field.rootClass', '')
                return getCssClass(clazz, override, 'o-field')
            }
        },
        horizontalClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'field.override', false)
                const clazz = getValueByPath(config, 'field.horizontalClass', '')
                return getCssClass(clazz, override, 'o-field-horizontal')
            }
        },
        labelClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'field.override', false)
                const clazz = getValueByPath(config, 'field.labelClass', '')
                return getCssClass(clazz, override, 'o-field-label')
            }
        },
        labelHorizontalClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'field.override', false)
                const clazz = getValueByPath(config, 'field.labelHorizontalClass', '')
                return getCssClass(clazz, override, 'o-field-horizontal-label')
            }
        },
        contentHorizontalClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'field.override', false)
                const clazz = getValueByPath(config, 'field.contentHorizontalClass', '')
                return getCssClass(clazz, override, 'o-field-horizontal-content')
            }
        },
        messageClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'field.override', false)
                const clazz = getValueByPath(config, 'field.messageClass', '')
                return getCssClass(clazz, override, 'o-field-message')
            }
        }
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
                this.rootClass,
                this.horizontal && this.horizontalClass,
                {
                    'o-field-expanded': this.expanded,
                    'o-field-grouped-multiline': this.groupMultiline
                }
            ]
        },
        messageClasses() {
            return [
                this.messageClass,
                this.newVariant && ('o-color-' + this.variant)
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
