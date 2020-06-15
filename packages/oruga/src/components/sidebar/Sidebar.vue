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
        }
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
                {
                    'o-sidebar-fixed': this.isFixed,
                    'o-sidebar-static': this.isStatic,
                    'o-sidebar-absolute': this.isAbsolute,
                    'o-sidebar-fullheight': this.fullheight,
                    'o-sidebar-fullwidth': this.fullwidth,
                    'o-sidebar-right': this.right,
                    'o-sidebar-mini': this.reduce,
                    'o-sidebar-mini-expand': this.expandOnHover,
                    'o-sidebar-mini-expand-fixed': this.expandOnHover && this.expandOnHoverFixed,
                    'o-sidebar-mini-mobile': this.mobile === 'reduce',
                    'o-sidebar-hidden-mobile': this.mobile === 'hide',
                    'o-sidebar-fullwidth-mobile': this.mobile === 'fullwidth'
                }
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

<style lang="scss">
@import "../../scss/oruga.scss";

.o-sidebar {
    .o-sidebar-content {
        background-color: $sidebar-content-background-color;
        box-shadow: $sidebar-box-shadow;
        width: $sidebar-width;
        z-index: $sidebar-zindex + 1;
        @each $name, $pair in $colors {
            $color: nth($pair, 1);
            &.o-color-#{$name} {
                background-color: $color;
            }
        }
        &.o-sidebar-fixed {
            position: fixed;
            left: 0;
            top: 0;
            &.o-sidebar-right {
                left: auto;
                right: 0;
            }
        }
        &.o-sidebar-absolute {
            position: absolute;
            left: 0;
            top: 0;
            &.o-sidebar-right {
                left: auto;
                right: 0;
            }
        }
        &.o-sidebar-mini {
            width: $sidebar-mobile-width;
            &.o-sidebar-mini-expand:hover {
                transition: width $speed-slow $easing;
                &:not(.o-sidebar-fullwidth) {
                    width: $sidebar-width;
                    &.o-sidebar-mini-expand-fixed {
                        position: fixed;
                    }
                }
            }
        }
        &.o-sidebar-static {
            position: static;
        }
        &.o-sidebar-absolute, &.o-sidebar-static {
            transition: width $speed-slow $easing;
        }
        &.o-sidebar-fullwidth {
            width: 100%;
            max-width: 100%;
        }
        &.o-sidebar-fullheight {
            height: 100%;
            max-height: 100%;
            overflow: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-content: stretch;
        }
        @media screen and (max-width: $dropdown-mobile-breakpoint - 1px) {
            &.o-sidebar-mini-mobile {
                width: $sidebar-mobile-width;
                &.o-sidebar-mini-expand:hover {
                    &:not(.o-sidebar-fullwidth-mobile) {
                        width: $sidebar-width;
                        &.o-sidebar-mini-expand-fixed {
                            position: fixed;
                        }
                    }
                }
            }
            &.o-sidebar-hidden-mobile {
                width: 0;
                height: 0;
                overflow: hidden;
            }
            &.o-sidebar-fullwidth-mobile {
                width: 100%;
                max-width: 100%;
            }
        }
    }
    .o-sidebar-background {
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: $sidebar-background;
        position: fixed;
        z-index: $sidebar-zindex;
    }
}

</style>