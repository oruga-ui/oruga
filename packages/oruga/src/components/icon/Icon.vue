<template>
    <span :class="rootClasses">
        <i
            v-if="!useIconComponent"
            :class="[newPack, newIcon, newCustomSize, customClass]"/>

        <component
            v-else
            :is="useIconComponent"
            :icon="[newPack, newIcon]"
            :size="newCustomSize"
            :class="[customClass]"/>
    </span>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import config from '../../utils/config'
import getIcons from '../../utils/icons'
import { getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * Icons take an important role of any application
 * @displayName Icon
 * @example ./examples/Icon.md
 * @style _icon.scss 
 */
export default {
    name: 'OIcon',
    mixins: [BaseComponentMixin],
    props: {
        variant: [String, Object],
        component: String,
        pack: String,
        icon: String,
        size: String,
        customSize: String,
        customClass: String,
        clickable: Boolean,
        spin: Boolean,
        both: Boolean, // This is used internally
        rootClass: String,
        clickableClass: String,
        spinClass: String,
        sizeClass: String,
        variantClass: String
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('icon', 'rootClass', 'o-icon'),
                { [this.computedClass('icon', 'clickableClass', 'o-icon-clickable')]: this.clickable },
                { [this.computedClass('icon', 'spinClass', 'o-icon-spin')]: this.spin },
                { [`${this.computedClass('icon', 'sizeClass', 'o-size-')}${this.size}`]: this.size },
                { [`${this.computedClass('icon', 'variantClass', 'o-color-')}${this.newVariant}`]: this.newVariant }
            ]
        },
        iconConfig() {
            return getIcons()[this.newPack]
        },
        iconPrefix() {
            if (this.iconConfig && this.iconConfig.iconPrefix) {
                return this.iconConfig.iconPrefix
            }
            return ''
        },
        /**
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
            return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`
        },
        newPack() {
            return this.pack || getValueByPath(config, 'iconPack', 'mdi')
        },
        newVariant() {
            if (!this.variant) return
            let newVariant = ''
            if (typeof this.variant === 'string') {
                newVariant = this.variant
            } else {
                newVariant = Object.keys(this.variant).filter(key => this.variant[key])[0]
            }
            return newVariant
        },
        newCustomSize() {
            return this.customSize || this.customSizeByPack
        },
        customSizeByPack() {
            if (this.iconConfig && this.iconConfig.sizes) {
                if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
                    return this.iconConfig.sizes[this.size]
                } else if (this.iconConfig.sizes.default) {
                    return this.iconConfig.sizes.default
                }
            }
            return null
        },
        useIconComponent() {
            return this.component || getValueByPath(config, 'iconComponent')
        }
    },
    methods: {
        /**
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
                return value
            }
            if (this.iconConfig &&
                this.iconConfig.internalIcons &&
                this.iconConfig.internalIcons[value]) {
                return this.iconConfig.internalIcons[value]
            }
            return value
        }
    }
}
</script>
