<script lang="ts">
import { defineComponent, h } from 'vue'
import { setValueByPath } from '../../../../oruga-next/src/utils/helpers'
const UNDERLINE_CLASS = 'odocs-underline-element'

export default defineComponent({
    props: {
        inspectClass: Object
    },
    data() {
        return {
            classes: {},
            data: {},
            classesApplied: null
        }
    },
    beforeUnmount() {
        clearInterval(this.interval)
        this.interval = null
    },
    watch: {
        'inspectClass': {
            deep: true,
            handler({ className, action }) {
                this.interval = null
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
            }
        }
    },
    render () {
        let el = h('span',
        {
            id: 'docs__element__to__inspect'
        },
        [
            this.classesApplied ? h('div', {}, [
                h('b', 'Classes applied to the element'),
                h(
                    'div',
                    {
                        class: 'odocs-classes-applied',
                        innerHTML: this.classesApplied
                    }
                ),
            ]) : null,
            this.$slots.default({
                ...this.classes,
                ...this.data,
            })
        ],
        )
        return el
    }
})
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
