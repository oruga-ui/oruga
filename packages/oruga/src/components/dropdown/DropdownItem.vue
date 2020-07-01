<template>
    <component
        :is="custom ? 'div' : 'a'"
        :class="rootClasses"
        @click="selectItem"
        :role="ariaRoleItem"
        :tabindex="tabindex">
        <slot/>
    </component>
</template>

<script>
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * @displayName DropdownItem
 */
export default {
    name: 'ODropdownItem',
    inject: {
        $dropdown: { name: '$dropdown', default: false }
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        itemClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.itemClass', '')
                return getCssClass(clazz, override, 'o-dropdown-item')
            }
        },
        itemActiveClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.itemActiveClass', '')
                return getCssClass(clazz, override, 'o-dropdown-item-active')
            }
        },
        itemDisabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.itemDisabledClass', '')
                return getCssClass(clazz, override, 'o-dropdown-item-disabled')
            }
        },
        disabled: Boolean,
        custom: Boolean,
        tabindex: {
            type: [Number, String],
            default: 0
        },
        ariaRole: {
            type: String,
            default: ''
        }
    },
    computed: {
        parent() {
            return this.$dropdown
        },
        rootClasses() {
            return [this.itemClass,
                (this.parent.disabled || this.disabled) && this.itemDisabledClass,
                this.isActive && this.itemActiveClass
            ]
        },
        ariaRoleItem() {
            return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null
        },
        isClickable() {
            return !this.parent.disabled && !this.disabled && !this.custom
        },
        isActive() {
            if (this.parent.selected === null) return false
            if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0
            return this.value === this.parent.selected
        }
    },
    methods: {
        /**
        * Click listener, select the item.
        */
        selectItem() {
            if (!this.isClickable) return

            this.parent.selectItem(this.value)
            this.$emit('click')
        }
    },
    created() {
        if (!this.parent) {
            this.$destroy()
            throw new Error('You should wrap oDropdownItem on a oDropdown')
        }
    }
}
</script>
