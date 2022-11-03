<template>
    <component :is="cmp"></component>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'

export default defineComponent({
    props: {
        component: String
    },
    data() {
        return {
            cmp: undefined
        }
    },
    beforeCreate() {
        import(`../../examples/${this.component}/inspector.vue`).then(val => {
            this.cmp = markRaw(val.default)
        })
    }
})
</script>
