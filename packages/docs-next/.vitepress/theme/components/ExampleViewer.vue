<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    code: {
        type: String,
        required: true,
    },
    component: {
        type: Object,
        default: () => {}
    },
    showCode: {
        type: Boolean,
        default: () => true
    }
});

const isOpen = ref(false)

const codeComputed = computed(() => {
    const code = props.code
    return code.replace(/\.\.\//g, '')
        .replace('oruga-next/dist/oruga', '@oruga-ui/oruga-next')
})

const nodeRef = ref<any>(null)

onMounted(() => {
    let node = nodeRef.value?.parentNode
    while (node) {
        if (node && node.classList && node.classList.contains('vp-doc')) {
            if (node.parentNode && node.parentNode.classList.contains('main')) {
                node.classList.remove('vp-doc')
                break
            }
        }
        node = node.parentNode
    }
})

</script>

<template>
    <div
        ref="nodeRef"
        class="odocs-example odocs-mt">
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
            <highlightjs :code="codeComputed" />
        </o-collapse>
    </div>
</template>

<style lang="scss">

.odocs-mt {
    margin-top: 1rem;
}

.odocs-example .odocs-spaced > *{
    margin-bottom: 0.5rem;
    &:not(:last-child) {
        margin-right: 0.5rem;
    }
}

.odocs-panel {
    border: 1px solid var(--vp-button-alt-bg);
    
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
}

</style>
