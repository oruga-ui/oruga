<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItHighlightjs from "markdown-it-highlightjs";

const markdown = new MarkdownIt().use(MarkdownItHighlightjs);

const props = defineProps({
    code: {
        type: String,
        required: true,
    },
    component: {
        type: Object,
        default: () => ({}),
    },
    showCode: {
        type: Boolean,
        default: () => true,
    },
});

const uid = Date.now().toString(36) + Math.random().toString(36).substring(2);

const isOpen = ref(false);
const tab = ref("HTML");

const codeComputed = computed(() => {
    const code = props.code;
    return code
        .replace(/\.\.\//g, "")
        .replace("oruga-next/dist/oruga", "@oruga-ui/oruga-next");
});

const jsCode = computed(() =>
    codeComputed.value.includes("<script setup>")
        ? codeComputed.value.substring(
              codeComputed.value.indexOf("<script setup>") +
                  "<script setup>".length,
              codeComputed.value.indexOf("/script>") - 1,
          )
        : "",
);

const htmlCode = computed(() =>
    codeComputed.value
        .substring(
            codeComputed.value.indexOf("<template>") + "<template>".length,
            codeComputed.value.indexOf("</template>"),
        )
        // remove prefix whitespace
        .split(/(\r\n|\n|\r)/gm)
        .map((l) => l.replace("    ", ""))
        .join(""),
);

const nodeRef = ref<any>(null);

onMounted(() => {
    let node = nodeRef.value?.parentNode;
    while (node) {
        if (node && node.classList && node.classList.contains("vp-doc")) {
            if (node.parentNode && node.parentNode.classList.contains("main")) {
                node.classList.remove("vp-doc");
                break;
            }
        }
        node = node.parentNode;
    }
});

function copy(val: string) {
    setTimeout(() => {
        navigator.clipboard.writeText(val);
    }, 300);
}
</script>

<template>
    <div ref="nodeRef" class="odocs-example odocs-mt">
        <component :is="component" />
    </div>
    <div v-if="showCode" class="vp-doc odocs-mt">
        <o-collapse
            v-model:open="isOpen"
            root-class="odocs-panel"
            trigger-class="odocs-panel-trigger"
            content-class="odocs-panel-content">
            <template #trigger>{{ isOpen ? "Hide" : "Show" }} code</template>

            <div class="vp-code-group">
                <div class="tabs">
                    <input
                        :id="`tab-html-${uid}`"
                        v-model="tab"
                        type="radio"
                        value="HTML" />
                    <label :for="`tab-html-${uid}`">HTML</label>
                    <template v-if="jsCode">
                        <input
                            :id="`tab-js-${uid}`"
                            v-model="tab"
                            type="radio"
                            value="JS" />
                        <label :for="`tab-js-${uid}`">JS</label>
                    </template>
                </div>
                <div class="blocks">
                    <div
                        class="language-html"
                        :class="{ active: tab == 'HTML' }">
                        <button
                            title="Copy Code"
                            class="copy"
                            @click="copy(htmlCode)" />
                        <span class="lang">html</span>
                        <div
                            v-html="
                                markdown.render('```html ' + htmlCode + ' ```')
                            " />
                    </div>
                    <div class="language-js" :class="{ active: tab == 'JS' }">
                        <button
                            title="Copy Code"
                            class="copy"
                            @click="copy(jsCode)" />
                        <span class="lang">html</span>
                        <div
                            v-html="
                                markdown.render('```js ' + jsCode + ' ```')
                            " />
                    </div>
                </div>
            </div>
        </o-collapse>
    </div>
</template>

<style lang="scss">
.odocs-mt {
    margin-top: 1rem;
}

.odocs-example .odocs-spaced > * {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
}

.odocs-panel {
    .odocs-panel-trigger {
        cursor: pointer;
        text-align: center;
        padding: 0.5rem;
        background-color: var(--vp-button-alt-bg);
    }

    .odocs-panel-content {
        pre {
            background-color: #0d1117;
        }
    }
}
</style>
