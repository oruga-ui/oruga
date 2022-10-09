<script setup>
import { ref, computed } from 'vue'
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'

const { hasSidebar } = useSidebar()

const selected = ref('')

const themeOptions = ref([
    { label: 'Base CSS', value: 'basecss' },
    { label: 'Full CSS', value: 'fullcss' },
    { label: 'Bulma CSS', value: 'bulmacss' }
])

const onThemeChange = function () {
    localStorage.setItem('oruga.io_theme', selected.value)
    location.reload()
}

const selectedOption = computed(() => {
    return themeOptions.value.filter(t => t.value === selected.value)[0]
})

if (typeof window !== 'undefined') {
    selected.value = localStorage.getItem('oruga.io_theme') || 'fullcss'
}
</script>

<template>
    <Layout>
        <template #doc-before>
            <client-only>
                <Teleport to=".VPNavBar .container .content">
                    <div class="theme-selector" v-if="hasSidebar">
                        Theme ->
                        <select
                            v-model="selected"
                            @update:modelValue="onThemeChange"
                        >
                            <option v-for="item in themeOptions" :value="item.value">
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
