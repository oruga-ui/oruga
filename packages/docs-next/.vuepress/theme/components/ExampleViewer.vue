<template>
    <div class="odocs-mt">
        <component :is="cmp"></component>
    </div>
    <div class="odocs-mt">
        <o-collapse
            root-class="odocs-panel"
            trigger-class="odocs-panel-trigger"
            :open="open">
            <template #trigger>Show code</template>
            <div class="language-vue ext-vue">
                <pre class="language-vue">
                    <code class="odocs-code">{{ code }}</code>
                </pre>
            </div>
        </o-collapse>
    </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'

export default defineComponent({
    props: {
        example: String
    },
    data() {
        return {
            open: false,
            cmp: undefined,
            code: ''
        }
    },
    beforeCreate() {
        import(`../../examples/${this.example}.vue`).then(val => {
            this.cmp = markRaw(val.default)
        })

        import(`../../examples/${this.example}.vue?raw`).then(val => {
            this.code = val.default
        })
    }
})
</script>

<style lang="scss">
.odocs-mt {
    margin-top: 1rem;
}
.odocs-spaced > *:not(:last-child) {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.odocs-panel-trigger {
    cursor: pointer;
    text-align: center;
    padding: 0.5rem;
    border: 1px solid #ebebeb;
}

.odocs-code {
    display: flex;
    width: 100%;
}
</style>
