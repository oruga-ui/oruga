import Icon from '../components/icon/Icon.vue'
import { defineComponent } from 'vue';


export default defineComponent({
    components: {
        [Icon.name]: Icon
    },
    props: {
        /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: {
            type: Boolean,
            default: true
        },
        /** Adds an 'X' button that closes the notification. */
        closable: {
            type: Boolean,
            default: false
        },
        /** Message text (can contain HTML). */
        message: String,
        /** Type (color) of the notification, optional. */
        type: String,
        /** Adds an icon on the left side depending on the type (or the icon prop if defined). */
        hasIcon: Boolean,
        /** Icon name to use with has-icon. */
        icon: String,
        /** Icon pack to use. */
        iconPack: String,
        /** Icon size */
        iconSize: {
            type: String,
            default: 'large'
        },
        /** Hide notification after duration only not programmatic. */
        autoClose: {
            type: Boolean,
            default: false
        },
        /** Visibility duration in miliseconds. */
        duration: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            isActive: this.active
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        },
        isActive(value) {
            if (value) {
                this.setAutoClose()
            } else {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
            }
        }
    },
    computed: {
        /**
         * Icon name (MDI) based on type.
         */
        computedIcon() {
            if (this.icon) {
                return this.icon
            }
            switch (this.type) {
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
        }
    },
    methods: {
        /**
         * Close the Message and emit events.
         */
        close(...args) {
            this.isActive = false
            this.$emit('close', ...args)
            this.$emit('update:active', false)
        },
        /**
         * Set timer to auto close message
         */
        setAutoClose() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    if (this.isActive) {
                        this.close({action: 'close', method: 'timeout'})
                    }
                }, this.duration)
            }
        }
    },
    mounted() {
        this.setAutoClose()
    }
})
