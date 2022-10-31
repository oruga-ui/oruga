<template>
    <li
        :role="ariaRoleMenu"
        :class="wrapperClasses"
    >
        <component
            :is="tag"
            v-bind="$attrs"
            :class="itemClasses"
            @click="onClick()"
            v-on="$listeners">
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
                <ul
                    :class="submenuClasses"
                    v-show="newExpanded"
                >
                    <slot />
                </ul>
            </transition>
        </template>
    </li>
</template>

<script>
import Icon from '../icon/Icon'
import BaseComponentMixin from '../../utils/BaseComponentMixin';

export default {
    name: 'OMenuItem',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin],
    configField: 'menu',
    inheritAttrs: false,
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
        itemClass: [String, Array, Function],
        itemActiveClass: [String, Array, Function],
        itemDisabledClass: [String, Array, Function],
        itemIconTextClass: [String, Array, Function],
        itemSubmenuClass: [String, Array, Function],
        itemWrapperClass: [String, Array, Function],
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
        submenuClasses() {
            return this.computedClass('itemSubmenuClass', 'o-menu-item__submenu')
        },
        wrapperClasses() {
            return this.computedClass('itemWrapperClass', 'o-menu-item__wrapper')
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
}
</script>
