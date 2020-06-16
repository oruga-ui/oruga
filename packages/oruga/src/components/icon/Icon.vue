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
import config from '../../utils/config'
import getIcons from '../../utils/icons'
import { getValueByPath, getCssClass } from '../../utils/helpers'

export default {
    name: 'OIcon',
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
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'icon.override', false)
                const clazz = getValueByPath(config, 'icon.rootClass', '')
                return getCssClass(clazz, override, 'o-icon')
            }
        },
        clickableClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'icon.override', false)
                const clazz = getValueByPath(config, 'icon.clickableClass', '')
                return getCssClass(clazz, override, 'o-icon-clickable')
            }
        },
        spinClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'icon.override', false)
                const clazz = getValueByPath(config, 'icon.spinClass', '')
                return getCssClass(clazz, override, 'o-icon-spin')
            }
        },
        both: Boolean // This is used internally to show both MDI and FA icon
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.clickable && this.clickableClass,
                this.spin && this.spinClass,
                this.size && ('o-size-' + this.size),
                this.newVariant && ('o-color-' + this.newVariant)
            ]
        },
        iconConfig() {
            let allIcons = getIcons()
            return allIcons[this.newPack]
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

<style lang="scss" src="./icon.scss"></style>