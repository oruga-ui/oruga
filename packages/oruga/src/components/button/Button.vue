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
        variant: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: {
            type: Boolean,
            default: () => { return getValueByPath(config, 'button.rounded', false) }
        },
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
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
        tag: {
            type: String,
            default: 'button'
        },
        disabled: Boolean,
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
                { [`${this.computedClass('button', 'variantClass', 'o-color-')}${this.variant}`]: this.variant },
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
