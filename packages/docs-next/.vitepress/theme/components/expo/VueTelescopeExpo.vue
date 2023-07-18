<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import VueTelescopeClient from "./VueTelescopeClient.js";

const props = defineProps({
    slugs: {
        type: Object,
        required: true,
    },
    imageWidth: {
        type: Number,
        default: 800,
    },
    sortBy: {
        type: String,
        default: "rank",
    },
    sortDirection: {
        type: String,
        default: "asc",
    },
    labelRetry: {
        type: String,
        default: "Retry",
    },
    labelError: {
        type: String,
        default: "Something went wrong!",
    },
    labelLoadMore: {
        type: String,
        default: "Load More",
    },
    labelLoading: {
        type: String,
        default: "Loading...",
    },
});

const items = ref<any[]>([]);
const count = ref(0);
const loading = ref(false);
const limit = ref(12);
const start = ref(0);
const client = ref(new VueTelescopeClient());
const retry = ref(false);

const hasMoreItems = computed(() => {
    return items.value.length < count.value;
});

onMounted(() => {
    firstLoadItems();
});

function firstLoadItems() {
    retry.value = false;
    client.value
        .getItemsCount(props.slugs, props.sortBy, props.sortDirection)
        .then((data) => {
            count.value = parseInt(data, 10);
            loadItems();
        })
        .catch(() => {
            retry.value = true;
        });
}

function loadItems() {
    loading.value = true;
    client.value
        .getItems(
            props.slugs,
            props.sortBy,
            props.sortDirection,
            limit.value,
            start.value,
        )
        .then((data) => {
            items.value = [
                ...items.value,
                ...data.filter((d: any) => d.isPublic),
            ];
        })
        .finally(() => {
            loading.value = false;
        });
}
function loadMoreItems() {
    start.value += limit.value;
    loadItems();
}
</script>

<template>
    <section class="section">
        <div class="grid">
            <div v-for="item in items" :key="item.id" class="grid-item">
                <slot :item="item" name="item">
                    <a target="_blank" class="grid-item-link" :href="item.url">
                        <img
                            :src="`https://res.cloudinary.com/nuxt/image/upload/w_${imageWidth},h_${
                                (imageWidth * 6) / 8
                            },f_auto,q_auto/${item.screenshotUrl}`"
                            class="grid-item-image" />
                        <div class="grid-item-details">
                            <p class="grid-item-url">
                                <strong>{{ item.hostname }}</strong>
                            </p>
                            <div class="grid-item-plugins">
                                <a
                                    target="_blank"
                                    class="grid-item-link"
                                    :href="`https://vuetelescope.com/explore/${item.slug}`">
                                    <img
                                        v-if="item.ui"
                                        class="grid-item-plugin-image"
                                        :src="`https://icons.vuetelescope.com${item.ui.imgPath}`" />
                                    <img
                                        v-if="item.framework"
                                        class="grid-item-plugin-image"
                                        :src="`https://icons.vuetelescope.com${item.framework.imgPath}`" />
                                </a>
                            </div>
                        </div>
                    </a>
                </slot>
            </div>
        </div>
        <div class="controls">
            <div v-if="!retry">
                <slot
                    name="buttons"
                    v-bind="{
                        loading,
                        loadMoreItems,
                        hasMoreItems,
                        labelLoadMore,
                        labelLoading,
                    }">
                    <button
                        v-if="hasMoreItems"
                        class="button"
                        @click="loadMoreItems">
                        {{ !loading ? labelLoadMore : labelLoading }}
                    </button>
                </slot>
            </div>
            <div v-if="retry">
                <slot name="retry" :first-load-items="firstLoadItems">
                    <div class="retry-label">{{ labelError }}</div>
                    <button class="button" @click="firstLoadItems">
                        {{ labelRetry }}
                    </button>
                </slot>
            </div>
        </div>
    </section>
</template>

<style scoped>
.grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.grid-item {
    padding: 1rem;
    width: 100%;
    text-align: center;
}

.grid-item-image {
    border-radius: 1rem;
    box-shadow: 2px 2px 4px #424e5a;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    max-width: 100%;
}

.grid-item-image:hover {
    transform: scale(1.02);
    box-shadow: 4px 4px 4px #424e5a;
}

.grid-item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.grid-item-plugin-image {
    width: 1.5rem;
    height: 1.5rem;
}

.grid-item-link {
    text-decoration: none !important;
}

@media screen and (min-width: 719px) {
    .grid-item {
        flex: none;
        width: calc(50% - 2rem);
    }
}

.controls {
    text-align: center;
}

.button {
    background-color: #0bdca0;
    border-color: transparent;
    color: #fff;
    cursor: pointer;
    justify-content: center;
    padding: calc(0.5em - 1px) 1em;
    text-align: center;
    white-space: nowrap;
    border-radius: 4px;
    min-width: 9rem;
    padding: 0.5rem;
}

.retry-label {
    padding: 1rem;
}

.section {
    position: relative;
    width: 100%;
}
</style>
