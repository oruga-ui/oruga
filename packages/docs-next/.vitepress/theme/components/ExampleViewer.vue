<template>
    <div class="odocs-example odocs-mt">
        <component :is="component"></component>
    </div>
    <ClientOnly>
        <div
            v-if="showCode"
            class="odocs-mt">
            <o-collapse
                root-class="odocs-panel"
                trigger-class="odocs-panel-trigger"
                content-class="odocs-panel-content"
                v-model:open="isOpen">
                <template #trigger>{{ isOpen ? 'Hide' : 'Show' }} code</template>
                <highlightjs :code="codeComputed" />
            </o-collapse>
        </div>
    </ClientOnly>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import 'highlight.js/styles/github-dark.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import hljsVuePlugin from "@highlightjs/vue-plugin"

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)

export default defineComponent({
    components: {
        highlightjs: hljsVuePlugin.component
    },
    props: {
        component: {
            type: Object,
            default: () => {}
        },
        code: String,
        showCode: {
            type: Boolean,
            default: () => true
        }
    },
    setup(props) {

        const isOpen = ref(false)

        const codeComputed = computed(() => {
            const code = props.code
            return code.replace(/\.\.\//g, '')
                .replace('oruga-next/dist/oruga', '@oruga-ui/oruga-next')
        })

        return {
            isOpen,
            codeComputed
        }
    }
})
</script>

<style lang="scss">

.odocs-mt {
    margin-top: 1rem;
}

.odocs-panel {
    border: 1px solid var(--vp-button-alt-bg);
}

.odocs-spaced > *:not(:last-child) {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.odocs-panel-trigger {
    cursor: pointer;
    text-align: center;
    padding: 0.5rem;
    background-color: var(--vp-button-alt-bg);
}

.odocs-panel-content {
    display: flex;
    background-color: var(--code-bg-color);
    pre {
        padding: 0;
        margin: 0;
        width: 100%;
    }
}
</style>
