<template>
    <transition :name="animation" >
        <div
            :class="rootClasses"
            v-if="isActive">
            <div :class="backgroundClass" @click="cancel"/>
            <slot>
                <div :class="iconClass">
                    <o-icon :icon="icon" :spin="iconSpin" both />
                </div>
            </slot>
        </div>
    </transition>
</template>

<script>
import Icon from '../icon/Icon'

import config from '../../utils/config'
import { removeElement, getValueByPath, getCssClass } from '../../utils/helpers'
import { HTMLElement } from '../../utils/ssr'

export default {
    name: 'OLoading',
    components: {
        [Icon.name]: Icon
    },
    props: {
        active: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],
        fullPage: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        canCancel: {
            type: Boolean,
            default: false
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        icon: {
            type: String,
            default: 'spin'
        },
        iconSpin: {
            type: Boolean,
            default: true
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'loading.override', false)
                const clazz = getValueByPath(config, 'loading.rootClass', '')
                return getCssClass(clazz, override, 'o-loading-overlay')
            }
        },
        backgroundClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'loading.override', false)
                const clazz = getValueByPath(config, 'loading.backgroundClass', '')
                return getCssClass(clazz, override, 'o-loading-background')
            }
        },
        iconClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'loading.override', false)
                const clazz = getValueByPath(config, 'loading.iconClass', '')
                return getCssClass(clazz, override, 'o-loading-icon')
            }
        },
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
                this.rootClass,
                this.displayInFullPage && 'o-loading-fullpage'
            ]
        }
    },
    methods: {
        /**
        * Close the Modal if canCancel.
        */
        cancel() {
            if (!this.canCancel || !this.isActive) return

            this.close()
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
                this.isActive = false
                setTimeout(() => {
                    this.$destroy()
                    removeElement(this.$el)
                }, 150)
            }
        },
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc') this.cancel()
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeMount() {
        // Insert the Loading component in body tag
        // only if it's programmatic
        if (this.programmatic) {
            if (!this.container) {
                document.body.appendChild(this.$el)
            } else {
                this.displayInFullPage = false
                this.$emit('update:full-page', false)
                this.container.appendChild(this.$el)
            }
        }
    },
    mounted() {
        if (this.programmatic) this.isActive = true
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/oruga.scss";

$loading-background-legacy: #7f7f7f !default;
$loading-background: rgba(255,255,255,0.5) !default;
$loading-icon-size: 2.5em !default;
$loading-full-page-icon-size: 5em !default;
$loading-zindex: 999 !default;

.o-loading-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    z-index: $loading-zindex;
    &.o-loadind-full-page {
        position: fixed;
        .o-loading-icon {
            top: calc(50% - #{$loading-full-page-icon-size / 2});
            left: calc(50% - #{$loading-full-page-icon-size / 2});
            .o-icon {
                * {
                    width: $loading-full-page-icon-size;
                    height: $loading-full-page-icon-size;
                }
            }
        }
    }
    &:not(.o-loadind-full-page) {
        .o-loading-icon {
            top: calc(50% - #{$loading-icon-size / 2});
            left: calc(50% - #{$loading-icon-size / 2});
            .o-icon {    
                * {
                    width: $loading-icon-size;
                    height: $loading-icon-size;
                }
            }
        }
    }
    .o-loading-background {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: $loading-background-legacy;
        background: $loading-background;
        
    }
}

</style>