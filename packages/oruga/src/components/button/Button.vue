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
import { getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * The classic button, in different colors, sizes, and states
 */
export default {
    name: 'OButton',
    components: {
        [Icon.name]: Icon
    },
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
            default: () => getValueByPath(config, 'button.rounded', false)
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
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.rootClass', '')
                return getCssClass(clazz, override, 'o-button')
            }
        },
        outlinedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.outlinedClass', '')
                return getCssClass(clazz, override, 'o-button-outlined')
            }
        },
        invertedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.invertedClass', '')
                return getCssClass(clazz, override, 'o-button-inverted')
            }
        },
        expandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.expandedClass', '')
                return getCssClass(clazz, override, 'o-button-expanded')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.roundedClass', '')
                return getCssClass(clazz, override, 'o-button-rounded')
            }
        },
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.size && ('o-size-' + this.size), 
                this.variant && ('o-color-' + this.variant),
                this.outlined && this.outlinedClass,
                this.inverted && this.invertedClass,
                this.expanded && this.expandedClass, 
                this.rounded && this.roundedClass
            ]
        },
        computedTag() {
            if (this.$attrs.disabled !== undefined && this.$attrs.disabled !== false) {
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
