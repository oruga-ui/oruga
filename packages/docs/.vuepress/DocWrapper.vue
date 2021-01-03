
<script>
export default {
    mounted() {
        this.$root.$on('inspect-class', (className, action) => {
            this.classes = Object.assign({}, {})
            this.data = Object.assign({}, {})
            this.$nextTick(() => {
                if (action) {
                    action(this)
                }
                this.classes[className] = () => 'odocs-underline-element'
                this.classes = Object.assign({}, this.classes)
                this.data = Object.assign({}, this.data)
            })
        })
    },
    data() {
        return {
            classes: {},
            data: {}
        }
    },
    render (createElement) {
        let el = createElement('span', [
            this.$scopedSlots.default({
                ...this.classes,
                ...this.data,
            })
        ])
        return el
    }
}
</script>

<style>
.odocs-underline-element {
    border: 1px solid red!important;
}
</style>
