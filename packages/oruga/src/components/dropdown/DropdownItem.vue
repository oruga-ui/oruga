<template>
    <component
        :is="'div'"
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
    configField: 'dropdown',
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
                this.computedClass('itemClass', 'o-drop__item'),
                { [this.computedClass('itemDisabledClass', 'o-drop__item--disabled')]: (this.parent.disabled || this.disabled) },
                { [this.computedClass('itemActiveClass', 'o-drop__item--active')]: this.isActive }
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
