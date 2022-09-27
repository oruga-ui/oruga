<template>
    <li :role="ariaRoleMenu">
        <component
            :is="tag"
            v-bind="$attrs"
            :class="itemClasses"
            @click="onClick($event)"
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
        onClick() {
            if (this.disabled) return
            const menu = this.getMenu()
            this.reset(this.$parent, menu)
            this.newExpanded = this.$props.expanded || !this.newExpanded
            this.$emit('update:expanded', this.newExpanded)
            if (menu && menu.activable) {
                this.newActive = true
                this.$emit('update:active', this.newActive)
            }
        },
        reset(parent, menu) {
            const items = parent.$children.filter((c) => c.name === this.name)
            items.forEach((item) => {
                if (item !== this) {
                    this.reset(item, menu)
                    if (!parent.$data.isMenu || (parent.$data.isMenu && parent.accordion)) {
                        item.newExpanded = false
                        item.$emit('update:expanded', item.newActive)
                    }
                    if (menu && menu.activable) {
                        item.newActive = false
                        item.$emit('update:active', item.newActive)
                    }
                }
            })
        },
        getMenu() {
            let parent = this.$parent
            while (parent && !parent.$data.isMenu) {
                parent = parent.$parent
            }
            return parent
        }
    }
})
</script>
