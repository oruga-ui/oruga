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
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * @displayName DropdownItem
 */
export default {
    name: 'ODropdownItem',
    mixins: [BaseComponentMixin],
    inject: ["$dropdown"],
    props: {
        /**
         * The value that will be returned on events and v-model
         */
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: null
        },
        /**
         * Item is disabled
         */
        disabled: Boolean,
        /**
         * Item is not a clickable item
         */
        custom: Boolean,
        tabindex: {
            type: [Number, String],
            default: 0
        },
        ariaRole: {
            type: String,
            default: ''
        },
        itemClass: String,
        itemActiveClass: String,
        itemDisabledClass: String,
    },
    computed: {
        parent() {
            return this.$dropdown
        },
        rootClasses() {
            return [
                this.computedClass('dropdown', 'itemClass', 'o-dropdown-item'),
                { [this.computedClass('dropdown', 'itemDisabledClass', 'o-dropdown-item-disabled')]: (this.parent.disabled || this.disabled) },
                { [this.computedClass('dropdown', 'itemActiveClass', 'o-dropdown-item-active')]: this.isActive }
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
            throw new Error('You should wrap oDropdownItem on a oDropdown')
        }
    }
}
</script>
