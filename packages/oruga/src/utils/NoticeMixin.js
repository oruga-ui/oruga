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
            type: Number
        },
        /** If should queue with others notices (snackbar/toast/notification). */
        queue: {
            type: Boolean,
            default: undefined
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
        container: String,
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
            newContainer: this.container || getValueByPath(getOptions(), 'notification.defaultContainerElement', undefined)
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
            const queue = this.queue !== undefined
                ? this.queue
                : getValueByPath(getOptions(), 'notification.defaultNoticeQueue', undefined)

            if (!queue) return false

            return (
                this.parentTop.childElementCount > 0 ||
                this.parentBottom.childElementCount > 0
            )
        },

        close() {
            clearTimeout(this.timer)
            this.isActive = false
            this.$emit('close')
            this.onClose.apply(null, arguments)

            // Timeout for the animation complete before destroying
            setTimeout(() => {
                this.$destroy()
                removeElement(this.$el)
            }, 150)
        },

        showNotice() {
            if (this.shouldQueue()) {
                // Call recursively if should queue
                setTimeout(() => this.showNotice(), 250)
                return
            }
            this.correctParent.insertAdjacentElement('afterbegin', this.$el)
            this.isActive = true

            if (!this.indefinite) {
                this.timer = setTimeout(() => this.close(), this.newDuration)
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
        }
    },
    beforeMount() {
        this.setupContainer()
    },
    mounted() {
        this.showNotice()
    }
}
