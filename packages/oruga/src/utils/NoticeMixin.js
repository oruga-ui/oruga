import { getOptions } from './config'
import { getValueByPath} from './helpers'
import { removeElement } from './helpers'

export default {
    props: {
        /** Type (color) of the notification, optional. */
        type: {
            type: String,
        },
        /** Message text (can contain HTML). */
        message: [String, Array],
        /** Visibility duration in miliseconds. */
        duration: {
            type: Number,
            default: () => {
                return getValueByPath(getOptions(), 'notification.duration', 1000)
            }
        },
        /** If should queue with others notices (snackbar/toast/notification). */
        queue: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'notification.noticeQueue', false)
            }
        },
        /** Show the Notification indefinitely until it is dismissed when programmatically. */
        indefinite: {
            type: Boolean,
            default: false
        },
        /** Which position the notification will appear when programmatically. */
        position: {
            type: String,
            default: 'top',
            validator(value) {
                return [
                    'top-right',
                    'top',
                    'top-left',
                    'bottom-right',
                    'bottom',
                    'bottom-left'
                ].indexOf(value) > -1
            }
        },
        /** DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. */
        container: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'notification.containerElement', undefined)
            }
        },
        /** internal property for handling promise resolving */
        programmatic: Object,
        /** A promise object that can be awaited on for notification dismissal */
        promise: undefined,
        /** Callback function to call after close (programmatically close or user canceled) */
        onClose: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            isActive: false,
            parentTop: null,
            parentBottom: null,
            newDuration: this.duration,
            newContainer: this.container
        }
    },
    computed: {
        correctParent() {
            switch (this.position) {
                case 'top-right':
                case 'top':
                case 'top-left':
                    return this.parentTop

                case 'bottom-right':
                case 'bottom':
                case 'bottom-left':
                    return this.parentBottom
            }
        },
        transition() {
            switch (this.position) {
                case 'top-right':
                case 'top':
                case 'top-left':
                    return {
                        enter: 'fadeInDown',
                        leave: 'fadeOut'
                    }
                case 'bottom-right':
                case 'bottom':
                case 'bottom-left':
                    return {
                        enter: 'fadeInUp',
                        leave: 'fadeOut'
                    }
            }
        }
    },
    methods: {
        shouldQueue() {
            if (!this.queue) return false
            return (
                this.parentTop.childElementCount > 0 ||
                this.parentBottom.childElementCount > 0
            )
        },

        close() {
            clearTimeout(this.timer)
            this.$emit('close')
            this.onClose.apply(null, arguments)

            if (this.programmatic && this.programmatic.resolve) {
                this.programmatic.resolve.apply(null, arguments)
            }

            // Timeout for the animation complete before destroying
            setTimeout(() => {
                this.isActive = false
                this.$destroy()
                removeElement(this.$el)
            }, 150)
        },

        showNotice() {
            if (this.shouldQueue()) this.correctParent.innerHTML = ''
            this.correctParent.insertAdjacentElement('afterbegin', this.$el)
            this.isActive = true

            if (!this.indefinite) {
                this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration)
            }
        },

        setupContainer() {
            this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + `>.${this.rootClasses().join('.')}.${this.positionClasses('top').join('.')}`)
            this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + `>.${this.rootClasses().join('.')}.${this.positionClasses('bottom').join('.')}`)

            if (this.parentTop && this.parentBottom) return

            if (!this.parentTop) {
                this.parentTop = document.createElement('div')
                this.parentTop.className = `${this.rootClasses().join(' ')} ${this.positionClasses('top').join(' ')}`
            }

            if (!this.parentBottom) {
                this.parentBottom = document.createElement('div')
                this.parentBottom.className = `${this.rootClasses().join(' ')} ${this.positionClasses('bottom').join(' ')}`
            }

            const container = document.querySelector(this.newContainer) || document.body

            container.appendChild(this.parentTop)
            container.appendChild(this.parentBottom)

            if (this.newContainer) {
                this.parentTop.classList.add('has-custom-container')
                this.parentBottom.classList.add('has-custom-container')
            }
        },

        timeoutCallback() {
            return this.close({action: 'close', method: 'timeout'})
        }
    },
    beforeMount() {
        this.setupContainer()
    },
    mounted() {
        this.showNotice()
    }
}
