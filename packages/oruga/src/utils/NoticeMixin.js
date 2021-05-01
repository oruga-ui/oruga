import { getOptions } from './config'
import { getValueByPath} from './helpers'
import { removeElement } from './helpers'

export default {
    props: {
        type: {
            type: String,
            default: '--dark'
        },
        message: [String, Array],
        duration: Number,
        queue: {
            type: Boolean,
            default: undefined
        },
        indefinite: {
            type: Boolean,
            default: false
        },
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
        container: String
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
            this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.o-notices.o-notices--top')
            this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + '>.o-notices.o-notices--bottom')

            if (this.parentTop && this.parentBottom) return

            if (!this.parentTop) {
                this.parentTop = document.createElement('div')
                this.parentTop.className = 'o-notices o-notices--top'
            }

            if (!this.parentBottom) {
                this.parentBottom = document.createElement('div')
                this.parentBottom.className = 'o-notices o-notices--bottom'
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
