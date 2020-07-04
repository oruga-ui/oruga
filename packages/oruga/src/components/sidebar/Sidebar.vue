<template>
    <div :class="rootClasses">
        <div
            :class="backgroundClasses"
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
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { removeElement, getValueByPath } from '../../utils/helpers'

/**
 * A sidebar to use as left/right overlay or static
 * @displayName Sidebar
 * @example ./examples/Sidebar.md
 * @style _sidebar.scss
 */
export default {
    name: 'OSidebar',
    mixins: [BaseComponentMixin],
    props: {
        open: Boolean,
        variant: [String, Object],
        overlay: Boolean,
        position: {
            type: String,
            default: () => { return getValueByPath(config, 'sidebar.position', 'fixed') },
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
        mobile: String,
        reduce: Boolean,
        expandOnHover: Boolean,
        expandOnHoverFixed: Boolean,
        canCancel: {
            type: [Array, Boolean],
            default: () => { return getValueByPath(config, 'sidebar.canCancel', ['escape', 'outside']) }
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        rootClass: String,
        backgroundClass: String,
        contentClass: String,
        fixedClass: String,
        staticClass: String,
        absoluteClass: String,
        fullheightClass: String,
        fullwidthClass: String,
        rightClass: String,
        reduceClass: String,
        expandOnHoverClass: String,
        expandOnHoverFixedClass: String,
        mobileReduceClass: String,
        mobileHideClass: String,
        mobileFullwidthClass: String,
        variantClass: String
    },
    data() {
        return {
            isOpen: this.open,
            transitionName: null,
            animating: true
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('sidebar', 'rootClass', 'o-sidebar')
            ]
        },
        backgroundClasses() {
            return [
                this.computedClass('sidebar', 'backgroundClass', 'o-sidebar-background')
            ]
        },
        contentClasses() {
            return [
                this.computedClass('sidebar', 'contentClass', 'o-sidebar-content'),
                { [`${this.computedClass('sidebar', 'variantClass', 'o-color-')}${this.variant}`]: this.variant },
                { [this.computedClass('sidebar', 'fixedClass', 'o-sidebar-fixed')]: this.isFixed },
                { [this.computedClass('sidebar', 'staticClass', 'o-sidebar-static')]: this.isStatic },
                { [this.computedClass('sidebar', 'absoluteClass', 'o-sidebar-absolute')]: this.isAbsolute },
                { [this.computedClass('sidebar', 'fullheightClass', 'o-sidebar-fullheight')]: this.fullheight },
                { [this.computedClass('sidebar', 'fullwidthClass', 'o-sidebar-fullwidth')]: this.fullwidth },
                { [this.computedClass('sidebar', 'rightClass', 'o-sidebar-right')]: this.right },
                { [this.computedClass('sidebar', 'reduceClass', 'o-sidebar-mini')]: this.reduce },
                { [this.computedClass('sidebar', 'expandOnHoverClass', 'o-sidebar-mini-expand')]: this.expandOnHover },
                { [this.computedClass('sidebar', 'expandOnHoverFixedClass', 'o-sidebar-expand-mini-hover-fixed')]: (this.expandOnHover && this.expandOnHoverFixed) },
                { [this.computedClass('sidebar', 'mobileReduceClass', 'o-sidebar-mini-mobile')]: this.mobile === 'reduce' },
                { [this.computedClass('sidebar', 'mobileHideClass', 'o-sidebar-hidden-mobile')]: this.mobile === 'hide' },
                { [this.computedClass('sidebar', 'mobileFullwidthClass', 'o-sidebar-mini-fullwidth')]: this.mobile === 'fullwidth' }
            ]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? getValueByPath(config, 'sidebar.canCancel', ['escape', 'outside'])
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
