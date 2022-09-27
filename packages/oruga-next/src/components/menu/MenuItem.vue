<template>
    <li :role="ariaRoleMenu">
        <component
            :is="tag"
            v-bind="$attrs"
            :class="itemClasses"
            @click="handleClick($event)"
        >
            <o-icon
                v-if="icon"
                :icon="icon"
                :pack="iconPack"
                :size="size"
            />
            <span v-if="label"> {{ label }} </span>
            <slot
                v-else
                name="label"
                :expanded="newExpanded"
                :active="newActive"
            />
        </component>
        <!-- sub menu items -->
        <template v-if="$slots.default">
            <transition :name="animation">
                <ul v-show="newExpanded">
                    <slot />
                </ul>
            </transition>
        </template>
    </li>
</template>

<script lang="ts">
import BaseComponentMixin from '../../utils/BaseComponentMixin';
import {defineComponent} from "vue";

export default defineComponent({
    name: 'OMenuItem',
    mixins: [BaseComponentMixin],
    configField: 'menu',
    inheritAttrs: false,
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'active',
        event: 'update:active'
    },
    props: {
        label: String,
        active: Boolean,
        expanded: Boolean,
        disabled: Boolean,
        iconPack: String,
        icon: String,
        animation: {
            type: String,
            default: 'slide'
        },
        tag: {
            type: String,
            default: 'a'
        },
        ariaRole: {
            type: String,
            default: ''
        },
        /**
         * Icon size, optional
         * @values small, medium, large
         */
        size: String,
    },
    data() {
        return {
            newActive: this.active,
            newExpanded: this.expanded
        }
    },
    computed: {
        ariaRoleMenu() {
            return this.ariaRole === 'menuitem' ? this.ariaRole : null
        },
        itemClasses() {
            return {
                [this.computedClass('itemClass', 'o-menu-item')]: true,
                [this.computedClass('itemActiveClass', 'o-menu-item--active')]: this.newActive,
                [this.computedClass('itemDisabledClass', 'o-menu-item--disabled')]: this.disabled,
                [this.computedClass('itemIconTextClass', 'o-menu-item--icon-text')]: this.icon,
            }
        },
    },
    watch: {
        active(value) {
            this.newActive = value
        },
        expanded(value) {
            this.newExpanded = value
        }
    },
    methods: {
        handleClick() {
            if (this.disabled) return
            this.triggerReset()
            this.newExpanded = this.$props.expanded || !this.newExpanded
            this.$emit('update:expanded', this.newExpanded)
            if (this.activable) {
                this.newActive = true
                this.$emit('update:active', this.newActive)
            }
        },
        triggerReset(child?) {
            // The point of this method is to collect references to the clicked item and any parent, this way we can skip resetting those elements.
            if (this.triggerParentReset) {
                this.triggerParentReset(this)
            } else if (this.resetMenu) {
                this.resetMenu([this, child])
            }
        },
        reset() {
            if (!this.$parent.$data.isMenu || (this.$parent.$data.isMenu && this.accordion)) {
                this.newExpanded = false
                this.$emit('update:expanded', this.newExpanded)
            }
            if (this.activable) {
                this.newActive = false
                this.$emit('update:active', this.newActive)
            }
        },
    },
    mounted() {
        if (this.registerMenuItem) {
            this.registerMenuItem(this)
        }
    },
    provide() {
        return {
            triggerParentReset: this.triggerReset,
        }
    },
    inject: {
        registerMenuItem: { default: false },
        resetMenu: { default: false },
        triggerParentReset: { default: false },
        accordion: { default: false },
        activable: { default: false },
    },
})
</script>
