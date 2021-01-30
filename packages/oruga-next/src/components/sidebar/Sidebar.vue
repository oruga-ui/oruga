<template>
    <div
        :class="rootClasses"
        v-show="!hideOnMobile">
        <div
            :class="overlayClasses"
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

<script lang="ts">
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

import config from '../../utils/config'
import { removeElement, getValueByPath } from '../../utils/helpers'
import { defineComponent } from 'vue'

/**
 * A sidebar to use as left/right overlay or static
 * @displayName Sidebar
 * @example ./examples/Sidebar.md
 * @style _sidebar.scss
 */
export default defineComponent({
    name: 'OSidebar',
    mixins: [BaseComponentMixin, MatchMediaMixin],
    configField: 'sidebar',
    emits: ['update:open', 'close'],
    props: {
        /** To control the behaviour of the sidebar programmatically, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding */
        open: Boolean,
        /**
        * Color of the sidebar, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],
        /** Show an overlay like modal */
        overlay: Boolean,
        /**
         * Skeleton position in relation to the window
         * @values fixed, absolute, static
         */
        position: {
            type: String,
            default: () => { return getValueByPath(config, 'sidebar.position', 'fixed') },
            validator: (value: string) => {
                return [
                    'fixed',
                    'absolute',
                    'static'
                ].indexOf(value) >= 0
            }
        },
        /** Show sidebar in fullheight */
        fullheight: Boolean,
        /** Show sidebar in fullwidth */
        fullwidth: Boolean,
        /** Show the sidebar on right */
        right: Boolean,
        /**
         * Custom layout on mobile
         * @values fullwidth, reduced, hidden
         */
        mobile: {
            type: String,
            validator: (value: string) => {
                return [
                    '',
                    'fullwidth',
                    'reduced',
                    'hidden'
                ].indexOf(value) >= 0
            }
        },
        /** Show a small sidebar */
        reduce: Boolean,
        /** Expand sidebar on hover when reduced or mobile is reduce */
        expandOnHover: Boolean,
        /** Expand sidebar on hover with fixed position when reduced or mobile is reduce */
        expandOnHoverFixed: Boolean,
        /**
         * Sidebar cancel options
         * @values true, false, 'escape', 'outside'
         */
        canCancel: {
            type: [Array, Boolean],
            default: () => { return getValueByPath(config, 'sidebar.canCancel', ['escape', 'outside']) }
        },
        /**
         * Callback on cancel
         */
        onCancel: {
            type: Function,
            default: () => {}
        },
        scroll: {
            type: String,
            default: () => {
                return getValueByPath(config, 'sidebar.scroll', 'clip')
            },
            validator: (value: string) => {
                return [
                    'clip',
                    'keep'
                ].indexOf(value) >= 0
            }
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        fixedClass: [String, Function, Array],
        staticClass: [String, Function, Array],
        absoluteClass: [String, Function, Array],
        fullheightClass: [String, Function, Array],
        fullwidthClass: [String, Function, Array],
        rightClass: [String, Function, Array],
        reduceClass: [String, Function, Array],
        expandOnHoverClass: [String, Function, Array],
        expandOnHoverFixedClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
    },
    data() {
        return {
            isOpen: this.open,
            transitionName: null,
            animating: true,
            savedScrollTop: null
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-side'),
                { [this.computedClass('mobileClass', 'o-side--mobile')]: this.isMatchMedia },
            ]
        },
        overlayClasses() {
            return [
                this.computedClass('overlayClass', 'o-side__overlay')
            ]
        },
        contentClasses() {
            return [
                this.computedClass('contentClass', 'o-side__content'),
                { [this.computedClass('variantClass', 'o-side__content--', this.variant)]: this.variant },
                { [this.computedClass('fixedClass', 'o-side__content--fixed')]: this.isFixed },
                { [this.computedClass('staticClass', 'o-side__content--static')]: this.isStatic },
                { [this.computedClass('absoluteClass', 'o-side__content--absolute')]: this.isAbsolute },
                { [this.computedClass('fullheightClass', 'o-side__content--fullheight')]: this.fullheight },
                { [this.computedClass('fullwidthClass', 'o-side__content--fullwidth')]: this.fullwidth || (this.mobile === 'fullwidth' && this.isMatchMedia) },
                { [this.computedClass('rightClass', 'o-side__content--right')]: this.right },
                { [this.computedClass('reduceClass', 'o-side__content--mini')]: this.reduce || (this.mobile === 'reduced' && this.isMatchMedia) },
                { [this.computedClass('expandOnHoverClass', 'o-side__content--mini-expand')]: (this.expandOnHover && this.mobile !== 'fullwidth') },
                { [this.computedClass('expandOnHoverFixedClass', 'o-side__content--expand-mini-hover-fixed')]: (this.expandOnHover && this.expandOnHoverFixed  && this.mobile !== 'fullwidth') }
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
        hideOnMobile() {
            return this.mobile === 'hidden' && this.isMatchMedia
        }
    },
    watch: {
        open: {
            handler(value) {
                this.isOpen = value
                if (this.overlay) {
                    this.handleScroll()
                }
                const open = this.right ? !value : value
                this.transitionName = !open ? 'slide-prev' : 'slide-next'
            },
            immediate: true
        }
    },
    methods: {
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
        },
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
                    if (this.whiteList().indexOf(event.target) < 0) {
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
        },

        handleScroll() {
            if (typeof window === 'undefined') return
            if (this.scroll === 'clip') {
                if (this.open) {
                    document.documentElement.classList.add('o-clipped')
                } else {
                    document.documentElement.classList.remove('o-clipped')
                }
                return
            }
            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop
            if (this.open) {
                document.body.classList.add('o-noscroll')
            } else {
                document.body.classList.remove('o-noscroll')
            }
            if (this.open) {
                document.body.style.top = `-${this.savedScrollTop}px`
                return
            }
            document.documentElement.scrollTop = this.savedScrollTop
            document.body.style.top = null
            this.savedScrollTop = null
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
            if (this.overlay && this.open) {
                this.handleScroll()
            }
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
            document.removeEventListener('click', this.clickedOutside)
            if (this.overlay) {
                // reset scroll
                document.documentElement.classList.remove('o-clipped')
                const savedScrollTop = !this.savedScrollTop
                    ? document.documentElement.scrollTop
                    : this.savedScrollTop
                document.body.classList.remove('o-noscroll')
                document.documentElement.scrollTop = savedScrollTop
                document.body.style.top = null
            }
        }
        if (this.isFixed) {
            removeElement(this.$el)
        }
    }
})
</script>
