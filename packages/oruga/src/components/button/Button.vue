<template>
    <component
        :is="computedTag"
        v-bind="$attrs"
        :type="computedNativeType"
        :class="rootClasses"
        v-on="$listeners"
    >
        <span :class="elementsWrapperClasses">
            <o-icon
                v-if="iconLeft"
                :pack="iconPack"
                :icon="iconLeft"
                :size="size"
                :both="iconBoth"
                :class="iconClasses"
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
                :class="iconClasses"
            />
        </span>
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
    configField: 'button',
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
         * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
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
        rootClass: [String, Function, Array],
        outlinedClass: [String, Function, Array],
        invertedClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-btn'),
                { [this.computedClass('sizeClass', 'o-btn--', this.size)]: this.size },
                { [this.computedClass('variantClass', 'o-btn--', this.variant)]: this.variant },
                { [this.computedClass('outlinedClass', 'o-btn--outlined')]: this.outlined && !this.variant },
                { [this.computedClass('invertedClass', 'o-btn--inverted')]: this.inverted && !this.variant },
                { [this.computedClass('outlinedClass', 'o-btn--outlined-', this.variant)]: this.outlined && this.variant },
                { [this.computedClass('invertedClass', 'o-btn--inverted-', this.variant)]: this.inverted && this.variant },
                { [this.computedClass('expandedClass', 'o-btn--expanded')]: this.expanded },
                { [this.computedClass('roundedClass', 'o-btn--rounded')]: this.rounded },
                { [this.computedClass('disabledClass', 'o-btn--disabled')]: this.disabled },
            ]
        },
        iconClasses() {
          return [
            this.computedClass('iconClass', 'o-btn__icon'),
          ]
        },
        elementsWrapperClasses() {
            return [
                this.computedClass('elementsWrapperClass', 'o-btn__wrapper'),
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
