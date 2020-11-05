<template>
    <component
        :is="computedTag"
        v-bind="$attrs"
        :type="computedNativeType"
        :class="rootClasses"
        v-on="$listeners"
    >
        <o-icon
            v-if="iconLeft"
            :pack="iconPack"
            :icon="iconLeft"
            :size="size"
            :both="iconBoth"
        />
        <span v-if="label">{{ label }}</span>
        <span v-else-if="$slots.default">
            <slot />
        </span>
        <o-icon
            v-if="iconRight"
            :pack="iconPack"
            :icon="iconRight"
            :size="size"
            :both="iconBoth"
        />
    </component>
</template>

<script>
import Icon from '../icon/Icon'

import config from '../../utils/config'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { getValueByPath } from '../../utils/helpers'

/**
 * The classic button, in different colors, sizes, and states
 * @displayName Button
 * @example ./examples/Button.md
 * @style _button.scss
 */
export default {
    name: 'OButton',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin],
    inheritAttrs: false,
    props: {
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],
        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: String,
        /**
         * Button label, optional when default slot
         */
        label: String,
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,
        /**
         * Icon name to show on the left
         */
        iconLeft: String,
        /**
         * Icon name to show on the right
         */
        iconRight: String,
        /**
         * Rounded style
         */
        rounded: {
            type: Boolean,
            default: () => { return getValueByPath(config, 'button.rounded', false) }
        },
        /**
         * Outlined style
         */
        outlined: Boolean,
        /**
         * Button will be expanded (full-width)	
         */
        expanded: Boolean,
        inverted: Boolean,
        /**
         * Button type, like native
         */
        nativeType: {
            type: String,
            default: 'button',
            validator: (value) => {
                return [
                    'button',
                    'submit',
                    'reset'
                ].indexOf(value) >= 0
            }
        },
        /**
         * Button tag name
         * @values button, a, input, router-link, nuxt-link or other nuxt alias
         */
        tag: {
            type: String,
            default: 'button'
        },
        /**
         * Button will be disabled
         */
        disabled: Boolean,
        /**  @ignore */
        iconBoth: Boolean, // This is used internally
        rootClass: String,
        outlinedClass: String,
        invertedClass: String,
        expandedClass: String,
        roundedClass: String,
        disabledClass: String,
        sizeClass: String,
        variantClass: String
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('button', 'rootClass', 'o-button'),
                { [`${this.computedClass('button', 'sizeClass', 'o-size-')}${this.size}`]: this.size },
                { [`${this.computedClass('button', 'variantClass', 'o-color-', true)}${this.variant}`]: this.variant },
                { [this.computedClass('button', 'outlinedClass', 'o-button-outlined')]: this.outlined },
                { [this.computedClass('button', 'invertedClass', 'o-button-inverted')]: this.inverted },
                { [this.computedClass('button', 'expandedClass', 'o-button-expanded')]: this.expanded },
                { [this.computedClass('button', 'roundedClass', 'o-button-rounded')]: this.rounded },
                { [this.computedClass('button', 'disabledClass', 'o-button-disabled')]: this.disabled },
            ]
        },
        computedTag() {
            if (this.disabled !== undefined && this.disabled !== false) {
                return 'button'
            }
            return this.tag
        },
        computedNativeType() {
            if (this.tag === 'a') {
                return
            }
            return this.nativeType
        }
    }
}
</script>
