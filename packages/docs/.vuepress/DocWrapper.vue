<script>
import { setValueByPath } from '../../oruga/src/utils/helpers'
const UNDERLINE_CLASS = 'odocs-underline-element'

export default {
    beforeDestroy() {
        clearInterval(this.interval)
        this.interval = null
    },
    mounted() {
        this.interval = null
        this.$root.$on('inspect-class', (className, action) => {
            clearInterval(this.interval)
            this.classes = Object.assign({}, {})
            this.data = Object.assign({}, {})
            this.classesApplied = null
            this.$nextTick(() => {
                if (action) {
                    action(this)
                }
                setValueByPath(this.classes, className, () => UNDERLINE_CLASS)
                this.classes = Object.assign({}, this.classes)
                this.data = Object.assign({}, this.data)
                this.$nextTick(() => {
                    this.interval = setInterval(() => {
                        let el = document.getElementsByClassName(UNDERLINE_CLASS)[0]
                        if (el) {
                            clearInterval(this.interval)
                            this.classesApplied = el.className.replace(UNDERLINE_CLASS, '').replace(/\s/g, '&nbsp;&nbsp;&nbsp;')
                        }
                    }, 300)
                })
            })
        })
    },
    data() {
        return {
            classes: {},
            data: {},
            classesApplied: null,
        }
    },
    render (createElement) {
        let el = createElement('span',
        {
            attrs: {
                id: 'docs__element__to__inspect'
            }
        },
        [
            this.classesApplied ? createElement('div', {}, [
                createElement('b', 'Classes applied to the element'),
                createElement(
                    'div',
                    {
                        attrs: {
                            class: 'odocs-classes-applied',
                        },
                        domProps: {
                            innerHTML: this.classesApplied
                        },
                    }
                ),
            ]) : null,
            this.$scopedSlots.default({
                ...this.classes,
                ...this.data,
            })
        ],
        )
        return el
    }
}
</script>

<style>
.odocs-underline-element {
    border: 2px solid #bd1313!important;
}
.odocs-classes-applied {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    background: black;
    color: white;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.3rem;
}
</style>
