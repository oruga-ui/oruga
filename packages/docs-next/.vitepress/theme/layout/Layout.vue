<script setup>
import { ref } from 'vue'
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'

const { hasSidebar } = useSidebar()

const selectedTheme = ref('')

const themes =  [
    { 
        label: 'Oruga Base Theme', 
        value: 'theme-orugabase'
    },
    { 
        label: 'Oruga Full Theme', 
        value: 'theme-orugafull'
    },
    { 
        label: 'Bulma Theme', 
        value: 'theme-bulma'
    },
    { 
        label: 'Bootstrap Theme', 
        value: 'theme-bootstrap'
    }
]

const onThemeChange = function (value) {
    localStorage.setItem('oruga.io_theme', selectedTheme.value)
    location.reload()
}

if (typeof window !== 'undefined') {
    selectedTheme.value = localStorage.getItem('oruga.io_theme') || themes[0].value;
}
</script>

<template>
    <Layout :class="selectedTheme">
        <template #doc-before>
            <client-only>
                <Teleport to=".VPNavBar .container .content .content-body">
                    <div class="theme-selector" v-if="hasSidebar">
                        Theme ->
                        <select
                            v-model="selectedTheme"
                            @change="onThemeChange"
                        >
                            <option v-for="item in themes" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                </Teleport>
            </client-only>
        </template>
    </Layout>
</template>

<style scoped>
.theme-selector {
    position: absolute;
    left: 0;
    flex: auto;
    margin-left: 10px;
    align-items: center;
    padding: 0 12px;
    line-height: var(--vp-nav-height-mobile);
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    transition: color 0.25s;
}
@media (max-width: 959px) {
    .theme-selector {
        /* hamburger width + margin */
        right: calc(48px + 2rem);
        left: auto;
    }
}
.theme-selector select {
    cursor: pointer;
    appearance: menulist;
    background: transparent;
}
</style>
