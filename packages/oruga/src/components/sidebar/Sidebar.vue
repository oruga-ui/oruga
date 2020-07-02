<template>
    <div :class="rootClass">
        <div
            :class="backgroundClass"
            v-if="overlay && isOpen"
        />
        <transition
            :name="transitionName"
            @before-enter="beforeEnter"
            @after-enter="afterEnter">
            <div
                v-show="isOpen"
                ref="sidebarContent"
                :class="contentClasses">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
import config from '../../utils/config'
import { removeElement, getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * A sidebar to use as left/right overlay or static
 * @displayName Sidebar
 * @example ./examples/Sidebar.md
 * @style _sidebar.scss
 */
export default {
    name: 'OSidebar',
    props: {
        open: Boolean,
        variant: [String, Object],
        overlay: Boolean,
        position: {
            type: String,
            default: 'fixed',
            validator: (value) => {
                return [
                    'fixed',
                    'absolute',
                    'static'
                ].indexOf(value) >= 0
            }
        },
        fullheight: Boolean,
        fullwidth: Boolean,
        right: Boolean,
        mobile: {
            type: String
        },
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean,
        canCancel: {
            type: [Array, Boolean],
            default: () => ['escape', 'outside']
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.rootClass', '')
                return getCssClass(clazz, override, 'o-sidebar')
            }
        },
        backgroundClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.backgroundClass', '')
                return getCssClass(clazz, override, 'o-sidebar-background')
            }
        },
        contentClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.contentClass', '')
                return getCssClass(clazz, override, 'o-sidebar-content')
            }
        },
        fixedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.fixedClass', '')
                return getCssClass(clazz, override, 'o-sidebar-fixed')
            }
        },
        staticClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.staticClass', '')
                return getCssClass(clazz, override, 'o-sidebar-static')
            }
        },
        absoluteClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.absoluteClass', '')
                return getCssClass(clazz, override, 'o-sidebar-absolute')
            }
        },
        fullheightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.fullheightClass', '')
                return getCssClass(clazz, override, 'o-sidebar-fullheight')
            }
        },
        fullwidthClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.fullwidthClass', '')
                return getCssClass(clazz, override, 'o-sidebar-fullwidth')
            }
        },
        rightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.rightClass', '')
                return getCssClass(clazz, override, 'o-sidebar-right')
            }
        },
        reduceClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.reduceClass', '')
                return getCssClass(clazz, override, 'o-sidebar-mini')
            }
        },
        expandOnHoverClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.expandOnHoverClass', '')
                return getCssClass(clazz, override, 'o-sidebar-mini-expand')
            }
        },
        expandOnHoverFixedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.expandOnHoverFixedClass', '')
                return getCssClass(clazz, override, 'o-sidebar-expand-mini-hover-fixed')
            }
        },
        mobileReduceClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.mobileReduceClass', '')
                return getCssClass(clazz, override, 'o-sidebar-mini-mobile')
            }
        },
        mobileHideClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.mobileHideClass', '')
                return getCssClass(clazz, override, 'o-sidebar-hidden-mobile')
            }
        },
        mobileFullwidthClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'sidebar.override', false)
                const clazz = getValueByPath(config, 'sidebar.mobileFullwidthClass', '')
                return getCssClass(clazz, override, 'o-sidebar-mini-fullwidth')
            }
        },
    },
    data() {
        return {
            isOpen: this.open,
            transitionName: null,
            animating: true
        }
    },
    computed: {
        contentClasses() {
            return [
                this.contentClass,
                this.variant && ('o-color-' + this.variant),
                this.isFixed && this.fixedClass,
                this.isStatic && this.staticClass,
                this.isAbsolute && this.absoluteClass,
                this.fullheight && this.fullheightClass,
                this.fullwidth && this.fullwidthClass,
                this.right && this.rightClass,
                this.reduce && this.reduceClass,
                this.expandOnHover && this.expandOnHoverClass,
                (this.expandOnHover && this.expandOnHoverFixed) && this.expandOnHoverFixedClass,
                this.mobile === 'reduce' && this.mobileReduceClass,
                this.mobile === 'hide' && this.mobileHideClass,
                this.mobile === 'fullwidth' && this.mobileFullwidthClass
            ]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? ['escape', 'outside']
                    : []
                : this.canCancel
        },
        isStatic() {
            return this.position === 'static'
        },
        isFixed() {
            return this.position === 'fixed'
        },
        isAbsolute() {
            return this.position === 'absolute'
        },
        /**
         * White-listed items to not close when clicked.
         * Add sidebar content and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.sidebarContent)
            // Add all chidren from dropdown
            if (this.$refs.sidebarContent !== undefined) {
                const children = this.$refs.sidebarContent.querySelectorAll('*')
                for (const child of children) {
                    whiteList.push(child)
                }
            }
            return whiteList
        }
    },
    watch: {
        open: {
            handler(value) {
                this.isOpen = value
                const open = this.right ? !value : value
                this.transitionName = !open ? 'slide-prev' : 'slide-next'
            },
            immediate: true
        }
    },
    methods: {

        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (this.isFixed) {
                if (this.isOpen && (key === 'Escape' || key === 'Esc')) this.cancel('escape')
            }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return
            if (this.isStatic) return

            this.onCancel.apply(null, arguments)
            this.close()
        },

        /**
        * Call the onCancel prop (function) and emit events
        */
        close() {
            this.isOpen = false
            this.$emit('close')
            this.$emit('update:open', false)
        },

        /**
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside(event) {
            if (this.isFixed) {
                if (this.isOpen && !this.animating) {
                    if (this.whiteList.indexOf(event.target) < 0) {
                        this.cancel('outside')
                    }
                }
            }
        },

        /**
        * Transition before-enter hook
        */
        beforeEnter() {
            this.animating = true
        },

        /**
        * Transition after-leave hook
        */
        afterEnter() {
            this.animating = false
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
            document.addEventListener('click', this.clickedOutside)
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            if (this.isFixed) {
                document.body.appendChild(this.$el)
            }
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
            document.removeEventListener('click', this.clickedOutside)
        }
        if (this.isFixed) {
            removeElement(this.$el)
        }
    }
}
</script>
