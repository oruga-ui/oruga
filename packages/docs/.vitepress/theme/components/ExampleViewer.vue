<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItHighlightjs from "markdown-it-highlightjs";

const markdown = new MarkdownIt().use(MarkdownItHighlightjs);

const props = defineProps({
    code: { type: String, required: true },
    component: { type: Object, default: () => undefined },
    showCode: { type: Boolean, default: () => true },
    open: { type: Boolean, default: false },
});

const uid = Date.now().toString(36) + Math.random().toString(36).substring(2);

const codeComputed = computed(() => {
    const code = props.code;
    return code
        .replace(/\.\.\//g, "")
        .replace("@/oruga", "@oruga-ui/oruga-next");
});

const scriptCode = computed(() =>
    codeComputed.value.includes('<script setup lang="ts">')
        ? codeComputed.value.substring(
              codeComputed.value.indexOf('<script setup lang="ts">') +
                  '<script setup lang="ts">'.length,
              codeComputed.value.lastIndexOf("/script>") - 1,
          )
        : "",
);

const templateCode = computed(() =>
    codeComputed.value.includes("<template>")
        ? codeComputed.value
              .substring(
                  codeComputed.value.indexOf("<template>") +
                      "<template>".length,
                  codeComputed.value.lastIndexOf("</template>"),
              )
              // remove prefix whitespace
              .split(/(\r\n|\n|\r)/gm)
              .map((l) => l.replace("    ", ""))
              .join("")
        : "",
);

const styleCode = computed(() =>
    codeComputed.value.includes("<style")
        ? codeComputed.value
              .substring(
                  codeComputed.value.indexOf("<style") + "<s>".length,
                  codeComputed.value.lastIndexOf("</style>"),
              )
              // remove prefix whitespace
              .split(/(\r\n|\n|\r)/gm)
              .join("")
        : "",
);

const isOpen = ref(props.open);
const tab = ref(
    templateCode.value ? "HTML" : scriptCode.value ? "JS" : "STYLE",
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
    setTimeout(() => navigator.clipboard.writeText(val), 300);
}
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->
    <div v-if="component" ref="nodeRef" class="odocs-example odocs-mt">
        <ClientOnly>
            <component :is="component" />
        </ClientOnly>
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
                    <template v-if="templateCode">
                        <input
                            :id="`tab-tempalte-${uid}`"
                            v-model="tab"
                            type="radio"
                            value="HTML" />
                        <label :for="`tab-tempalte-${uid}`">HTML</label>
                    </template>
                    <template v-if="scriptCode">
                        <input
                            v-if="scriptCode"
                            :id="`tab-script-${uid}`"
                            v-model="tab"
                            type="radio"
                            value="SCRIPT" />
                        <label :for="`tab-script-${uid}`">JS</label>
                    </template>
                    <template v-if="styleCode">
                        <input
                            :id="`tab-style-${uid}`"
                            v-model="tab"
                            type="radio"
                            value="STYLE" />
                        <label :for="`tab-style-${uid}`">SCSS</label>
                    </template>
                </div>
                <div class="blocks">
                    <div
                        class="language-html"
                        :class="{ active: tab == 'HTML' }">
                        <button
                            title="Copy Code"
                            class="copy"
                            @click="copy(templateCode)" />
                        <span class="lang">html</span>
                        <div
                            v-html="
                                markdown.render(
                                    '```html ' + templateCode + ' ```',
                                )
                            " />
                    </div>
                    <div class="language-js" :class="{ active: tab == 'JS' }">
                        <button
                            title="Copy Code"
                            class="copy"
                            @click="copy(scriptCode)" />
                        <span class="lang">html</span>
                        <div
                            v-html="
                                markdown.render('```js ' + scriptCode + ' ```')
                            " />
                    </div>
                    <div
                        class="language-css"
                        :class="{ active: tab == 'STYLE' }">
                        <button
                            title="Copy Code"
                            class="copy"
                            @click="copy(styleCode)" />
                        <span class="lang">scss</span>
                        <div
                            v-html="
                                markdown.render('```css ' + styleCode + ' ```')
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
.vp-doc .vp-code-group .blocks .lang {
    color: var(--vp-code-copy-code-hover-border-color);
}
</style>
