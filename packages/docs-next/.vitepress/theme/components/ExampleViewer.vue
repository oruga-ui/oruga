<template>
    <div class="odocs-example odocs-mt">
        <component :is="component"></component>
    </div>
    <div
        v-if="showCode"
        class="odocs-mt">
        <o-collapse
            root-class="odocs-panel"
            trigger-class="odocs-panel-trigger"
            content-class="odocs-panel-content"
            v-model:open="isOpen">
            <template #trigger>{{ isOpen ? 'Hide' : 'Show' }} code</template>
            <component :is="highlightjs" :code="codeComputed" />
        </o-collapse>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed, markRaw } from 'vue'
import 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css'

export default defineComponent({
    props: {
        component: {
            type: Object,
            default: () => {}
        },
        code: String,
        showCode: {
            type: Boolean,
            default: () => true
        },
    },
    setup(props) {

        const isOpen = ref(false);
        const highlightjs = ref(null);

        onBeforeMount(() => {
            // due to esm build (probably better write a new viewer from scratch)
            import('@highlightjs/vue-plugin').then((val) => {
                highlightjs.value = markRaw(<any>val.default.component);
            })
        })

        const codeComputed = computed(() => {
            const code = props.code
            return code.replaceAll('../','').replace('oruga-next/dist/oruga', '@oruga-ui/oruga-next')
        })

        return {
            isOpen,
            highlightjs,
            codeComputed
        };
    }
})
</script>

<style lang="scss">

.odocs-mt {
    margin-top: 1rem;
}

.odocs-panel {
    border: 1px solid #ebebeb;
}

.odocs-spaced > *:not(:last-child) {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.odocs-panel-trigger {
    cursor: pointer;
    text-align: center;
    padding: 0.5rem;
    border-bottom: 1px solid #ebebeb;
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
