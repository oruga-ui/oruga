<template>
    <transition :name="animation" >
        <div
            :class="rootClasses"
            v-if="isActive">
            <div
                :class="overlayClasses"
                @click="cancel('outside')"
            />
            <slot>
                <o-icon
                    :icon="icon"
                    :spin="iconSpin"
                    :size="iconSize"
                    :class="iconClasses"
                    both
                />
            </slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Icon from '../icon/Icon.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'

import { getOptions } from '../../utils/config'
import { removeElement, getValueByPath } from '../../utils/helpers'
import { HTMLElement } from '../../utils/ssr'

/**
 * A simple loading overlay
 * @displayName Loading
 * @style _loading.scss
 */
export default defineComponent({
    name: 'OLoading',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin],
    configField: 'loading',
     emits: ['update:active', 'close', 'update:full-page'],
    props: {
        /** Whether loading is active or not, use v-model:active to make it two-way binding */
        active: Boolean,
        /** @ignore */
        programmatic: Object,
        /** @ignore */
        promise: Promise,
        container: [Object, Function, HTMLElement],
        /** Loader will overlay the full page */
        fullPage: {
            type: Boolean,
            default: true
        },
        /* Custom animation (transition name) */
        animation: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'loading.animation', 'fade') }
        },
        /** Can close Loading by pressing escape or clicking outside */
        canCancel: {
            type: Boolean,
            default: false
        },
        /** Callback function to call after user canceled (pressed escape / clicked outside) */
        onCancel: {
            type: Function,
            default: () => {}
        },
        /** Icon name */
        icon: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'loading.icon', 'loading') }
        },
        /** Enable spin effect on icon */
        iconSpin: {
            type: Boolean,
            default: true
        },
        iconSize: {
            type: String,
            default: 'medium'
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        fullPageClass:[String, Function, Array]
    },
    data() {
        return {
            isActive: this.active || false,
            displayInFullPage: this.fullPage
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        },
        fullPage(value) {
            this.displayInFullPage = value
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-load'),
                { [this.computedClass('fullPageClass', 'o-load--fullpage')]: this.displayInFullPage }
            ]
        },
        overlayClasses() {
            return [
                this.computedClass('overlayClass', 'o-load__overlay')
            ]
        },
        iconClasses() {
            return [
                this.computedClass('iconClass', 'o-load__icon')
            ]
        }
    },
    methods: {
        /**
        * Close the Modal if canCancel.
        */
        cancel(method) {
            if (!this.canCancel || !this.isActive) return

            this.close({action: 'cancel', method})
        },
        /**
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.onCancel.apply(null, arguments)
            this.$emit('close')
            this.$emit('update:active', false)

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                if (this.programmatic.instances) {
                    this.programmatic.instances.remove(this)
                }
                if (this.programmatic.resolve) {
                    this.programmatic.resolve.apply(null, arguments)
                }
                this.isActive = false
                window.requestAnimationFrame(() => {
                    removeElement(this.$el)
                })
            }
        },
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc') this.cancel('escape')
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    mounted() {
        if (this.programmatic) {
            if (this.programmatic.instances) {
                this.programmatic.instances.add(this)
            }
            // Insert the Loading component in body tag
            // only if it's programmatic
            if (!this.container) {
                document.body.appendChild(this.$el)
            } else {
                this.displayInFullPage = false
                this.$emit('update:full-page', false)
                this.container.appendChild(this.$el)
            }
            this.isActive = true
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
})
</script>
