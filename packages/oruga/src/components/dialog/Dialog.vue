<template>
    <transition :name="animation">
        <div
            v-if="isActive"
            :class="rootClasses"
            v-trap-focus="trapFocus"
            :role="ariaRole"
            :aria-modal="ariaModal">
            <div :class="backgroundClasses" @click="cancel('outside')"/>
            <div :class="cardClasses">
                <header :class="headerClasses" v-if="title">
                    <p>{{ title }}</p>
                </header>

                <section :class="contentClasses"
                         :style="customStyle">
                    <div class="media">
                        <div
                            class="media-left"
                            v-if="hasIcon && (icon || iconByVariant)">
                            <o-icon
                                :icon="icon ? icon : iconByVariant"
                                :pack="iconPack"
                                :variant="variant"
                                :both="!icon"
                                size="large"/>
                        </div>
                        <div class="media-content">
                            <p>
                                <template v-if="$slots.default">
                                    <slot />
                                </template>
                                <template v-else>
                                    <div v-html="message" />
                                </template>
                            </p>

                            <div v-if="hasInput" class="field">
                                <div class="control">
                                    <o-input
                                        v-model="prompt"
                                        ref="input"
                                        :class="{ 'danger': validationMessage }"
                                        v-bind="inputAttrs"
                                        @keyup.enter="confirm"></o-input>
                                </div>
                                <p class="danger">{{ validationMessage }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer :class="footerClasses">
                    <o-button
                        native-type="button"
                        v-if="showCancel"
                        ref="cancelButton"
                        @click="cancel('button')">{{ cancelText }}</o-button>
                    <o-button
                        ref="confirmButton"
                        native-type="button"
                        @click="confirm">{{ confirmText }}</o-button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import Modal from '../modal/Modal'
import Button from '../button/Button'
import Icon from '../icon/Icon'
import Input from '../input/Input'

import trapFocus from '../../directives/trapFocus'
import config from '../../utils/config'
import { removeElement } from '../../utils/helpers'

/**
 * Dialogs inform users about a specific task and may contain critical information or require decisions
 * @displayName Dialog
 * @example ./examples/Dialog.md
 */
export default {
    name: 'ODialog',
    components: {
        [Icon.name]: Icon,
        [Button.name]: Button,
        [Input.name]: Input
    },
    directives: {
        trapFocus
    },
    extends: Modal,
    props: {
        title: String,
        message: [String, Array],
        icon: String,
        iconPack: String,
        hasIcon: Boolean,
        variant: {
            type: String,
            default: 'primary'
        },
        size: String,
        confirmText: {
            type: String,
            default: () => {
                return config.defaultDialogConfirmText
                    ? config.defaultDialogConfirmText
                    : 'OK'
            }
        },
        cancelText: {
            type: String,
            default: () => {
                return config.defaultDialogCancelText
                    ? config.defaultDialogCancelText
                    : 'Cancel'
            }
        },
        hasInput: Boolean, // Used internally to know if it's prompt
        inputAttrs: {
            type: Object,
            default: () => ({})
        },
        onConfirm: {
            type: Function,
            default: () => {}
        },
        closeOnConfirm: {
            type: Boolean,
            default: true
        },
        container: {
            type: String,
            default: () => {
                return config.defaultContainerElement
            }
        },
        focusOn: {
            type: String,
            default: 'confirm'
        },
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.defaultTrapFocus
            }
        },
        ariaRole: {
            type: String,
            validator: (value) => {
                return [
                    'dialog',
                    'alertdialog'
                ].indexOf(value) >= 0
            }
        },
        ariaModal: Boolean
    },
    data() {
        const prompt = this.hasInput
            ? this.inputAttrs.value || ''
            : ''

        return {
            prompt,
            isActive: false,
            validationMessage: ''
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('dialog', 'rootClass', 'o-dialog'),
                { [this.computedClass('dialog', 'fullScreenClass', 'o-dialog-fullscreen')]: this.fullScreen }
            ]
        },
        backgroundClasses() {
            return [
                this.computedClass('dialog', 'backgroundClass', 'o-dialog-background')
            ]
        },
        cardClasses() {
            return [
                this.computedClass('dialog', 'cardClass', 'o-dialog-card')
            ]
        },
        contentClasses() {
            return [
                this.computedClass('dialog', 'contentClass', 'o-dialog-content'),
                { [this.computedClass('dialog', 'is-titleless', 'is-titleless')]: !this.title },
                { [this.computedClass('dialog', 'is-flex', 'is-flex')]: this.hasIcon }
            ]
        },
        headerClasses() {
            return [
                this.computedClass('dialog', 'headerClass', 'o-dialog-header')
            ]
        },
        footerClasses() {
            return [
                this.computedClass('dialog', 'footerClass', 'o-dialog-footer')
            ]
        },
        closeClasses() {
            return [
                this.computedClass('dialog', 'closeClass', 'o-dialog-close')
            ]
        },
        /**
         * Icon name (MDI) based on the type.
         */
        iconByVariant() {
            switch (this.variant) {
                case 'info':
                    return 'information'
                case 'success':
                    return 'check-circle'
                case 'warning':
                    return 'alert'
                case 'danger':
                    return 'alert-circle'
                default:
                    return null
            }
        },
        showCancel() {
            return this.cancelOptions.indexOf('button') >= 0
        }
    },
    methods: {
        /**
         * If it's a prompt Dialog, validate the input.
         * Call the onConfirm prop (function) and close the Dialog.
         */
        confirm() {
            if (this.$refs.input !== undefined) {
                if (!this.$refs.input.checkValidity()) {
                    this.validationMessage = this.$refs.input.validationMessage
                    this.$nextTick(() => this.$refs.input.select())
                    return
                }
            }
            this.$emit('confirm', this.prompt)
            this.onConfirm(this.prompt, this)
            if (this.closeOnConfirm) this.close()
        },

        /**
         * Close the Dialog.
         */
        close() {
            this.isActive = false
            // Timeout for the animation complete before destroying
            setTimeout(() => {
                this.$destroy()
                removeElement(this.$el)
            }, 150)
        }
    },
    beforeMount() {
        // Insert the Dialog component in the element container
        if (typeof window !== 'undefined') {
            this.$nextTick(() => {
                const container = document.querySelector(this.container) || document.body
                container.appendChild(this.$el)
            })
        }
    },
    mounted() {
        this.isActive = true

        if (typeof this.inputAttrs.required === 'undefined') {
            this.$set(this.inputAttrs, 'required', true)
        }

        this.$nextTick(() => {
            // Handle which element receives focus
            if (this.hasInput) {
                this.$refs.input.focus()
            } else if (this.focusOn === 'cancel' && this.showCancel) {
                this.$refs.cancelButton.focus()
            } else {
                this.$refs.confirmButton.$el.focus()
            }
        })
    }
}
</script>
