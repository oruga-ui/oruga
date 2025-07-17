<script setup lang="ts">
import { ref, computed, onMounted, useTemplateRef, nextTick, watch } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
// @ts-expect-error types not found
import { useData } from "vitepress/dist/client/theme-default/composables/data";

const markdown = new MarkdownIt().use(MarkdownItHighlightjs);

const props = defineProps({
    code: { type: String, required: true },
    component: { type: Object, default: undefined },
    showCode: { type: Boolean, default: true },
    open: { type: Boolean, default: false },
});

const uid = Date.now().toString(36) + Math.random().toString(36).substring(2);

const codeComputed = computed(() => {
    const code = props.code;
    return code
        .replace(/\.\.\//g, "")
        .replace("@/oruga", "@oruga-ui/oruga-next");
});

const scriptCode = computed(() => {
    if (!codeComputed.value.includes('<script setup lang="ts">')) return "";

    const startIndex =
        codeComputed.value.indexOf('<script setup lang="ts">') +
        '<script setup lang="ts">'.length;
    const endIndex = codeComputed.value.lastIndexOf("/script>") - 1;

    return codeComputed.value.substring(startIndex, endIndex);
});

const templateCode = computed(() => {
    if (!codeComputed.value.includes("<template>")) return "";

    const startIndex =
        codeComputed.value.indexOf("<template>") + "<template>".length;
    const endIndex = codeComputed.value.lastIndexOf("</template>");

    return (
        codeComputed.value
            .substring(startIndex, endIndex)
            // remove prefix whitespace
            .split(/(\r\n|\n|\r)/gm)
            .map((l) => l.replace("    ", ""))
            .join("")
    );
});

const styleCode = computed(() => {
    if (!codeComputed.value.includes("<style")) return "";

    const _startIndex = codeComputed.value.indexOf("<style");
    const startIndex =
        _startIndex +
        codeComputed.value.substring(_startIndex).indexOf(">") +
        1;
    const endIndex = codeComputed.value.lastIndexOf("</style>");

    return (
        codeComputed.value
            .substring(startIndex, endIndex)
            // remove prefix whitespace
            .split(/(\r\n|\n|\r)/gm)
            .join("")
    );
});

const isOpen = ref(props.open);
const tab = ref(
    templateCode.value ? "HTML" : scriptCode.value ? "SCRIPT" : "STYLE",
);

const showcaseElement = useTemplateRef<HTMLElement>("showcaseRef");

const { isDark } = useData();

// change appearance on theme change
watch(isDark, () => applyAppearance());

function applyAppearance(): void {
    // get example-showcase root
    const shadowRoot = showcaseElement.value?.shadowRoot;
    if (!shadowRoot) return;

    // get only sections in child nodes
    const sections = Array.from(shadowRoot.children).filter(
        (node) => node.tagName === "SECTION",
    );

    // set theme specific attributes to example sections
    sections.forEach((child) => {
        child.setAttribute("data-theme", isDark.value ? "dark" : "light");
        child.setAttribute("data-bs-theme", isDark.value ? "dark" : "light");
    });
}

onMounted(() => {
    // await component got rendered
    nextTick(() => {
        // set default appearance style
        applyAppearance();

        if (!styleCode.value || !props.component) return;

        // get example-showcase root
        const shadowRoot = showcaseElement.value?.shadowRoot;
        if (!shadowRoot) return;

        if (styleCode.value.includes("@import")) {
            const importUrl = styleCode.value.substring(
                styleCode.value.indexOf('"') + 1,
                styleCode.value.indexOf('";'),
            );

            // create an HTML link element for the import
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = importUrl;

            // inject the link within the shadow root.
            shadowRoot.appendChild(link);
        } else {
            // create some CSS to apply to the shadow root
            const stylesheet = new CSSStyleSheet();
            stylesheet.replaceSync(styleCode.value);

            // attach the created style to the shadow root
            shadowRoot.adoptedStyleSheets = [
                ...(shadowRoot.adoptedStyleSheets || []),
                stylesheet,
            ];
        }
    });
});

function copy(val: string): void {
    setTimeout(() => navigator.clipboard.writeText(val), 300);
}
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->
    <div v-if="component" class="odocs-example">
        <!-- web components cannot be rendered in server side -->
        <ClientOnly>
            <!-- wrap example in a shadow root web component -->
            <example-showcase ref="showcaseRef">
                <component :is="component" />
            </example-showcase>
        </ClientOnly>
    </div>

    <div v-if="showCode" class="odocs-code">
        <o-collapse
            v-model:open="isOpen"
            expanded
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
                        v-if="templateCode"
                        class="language-html"
                        :class="{ active: tab === 'HTML' }">
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
                    <div
                        v-if="scriptCode"
                        class="language-js"
                        :class="{ active: tab === 'SCRIPT' }">
                        <button
                            title="Copy Code"
                            class="copy"
                            @click="copy(scriptCode)" />
                        <span class="lang">javascript</span>
                        <div
                            v-html="
                                markdown.render('```js ' + scriptCode + ' ```')
                            " />
                    </div>
                    <div
                        v-if="styleCode"
                        class="language-css"
                        :class="{ active: tab === 'STYLE' }">
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
.odocs-example {
    margin-top: 1rem;
}

.odocs-code {
    margin-top: 1rem;

    .odocs-panel {
        .odocs-panel-trigger {
            cursor: pointer;
            text-align: center;
            padding: 0.5rem;
            background-color: var(--vp-button-alt-bg);
            border-radius: 2px;
            width: 100%;
        }

        .odocs-panel-content {
            pre {
                background-color: #0d1117;
            }
        }
    }

    .vp-code-group {
        .blocks .lang {
            color: var(--vp-code-copy-code-hover-border-color);
        }

        .tabs {
            justify-content: start;
            margin-bottom: 0;
        }
    }
}
</style>
