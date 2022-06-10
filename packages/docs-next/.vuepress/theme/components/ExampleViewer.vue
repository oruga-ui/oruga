<template>
    <div class="odocs-example odocs-mt">
        <component :is="cmp"></component>
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
            <highlightjs :code="code" />
        </o-collapse>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, markRaw, onBeforeMount } from 'vue'
import 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css'
import hljsVuePlugin from "@highlightjs/vue-plugin";

export default defineComponent({
    components: {
        highlightjs: hljsVuePlugin.component
    },
    props: {
        example: {
            required: true,
            type: String
        },
        showCode: {
            type: Boolean,
            default: () => true
        },
    },
    setup(props) {
        const isOpen = ref(false);
        const cmp = ref(null);
        const code = ref('');

        onBeforeMount(() => {
            import(`../../examples/${props.example}.vue`).then(val => {
                cmp.value = markRaw(val.default);
            })
            import(`../../examples/${props.example}.vue?raw`).then(val => {
                code.value = val.default
            })
        });

        return {
            code,
            cmp,
            isOpen,
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
    }
}
</style>
