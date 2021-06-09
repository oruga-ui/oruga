<template>
    <client-only>
        <section class="section">
            <o-loading :full-page="false" :active="loading"></o-loading>
            <div class="grid">
                <div class="grid-item"
                    v-for="item in items"
                    :key="item.id">
                    <a
                        target="_blank"
                        :href="item.url">
                        <img
                            :src="`https://res.cloudinary.com/nuxt/image/upload/w_${imageWidth},h_${imageWidth * 6 / 8},f_auto,q_auto/${item.screenshotUrl}`"
                            class="grid-item-image"
                        >
                        <p>
                            <strong>{{ item.hostname }}</strong>
                        </p>
                    </a>
                </div>
            </div>
            <div
                class="buttons"
                v-if="items.length && items.length < count">
                <o-button @click="loadMore" variant="primary">Load more</o-button>
            </div>
        </section>
    </client-only>
</template>

<script>
import VueTelescopeClient from "./VueTelescopeClient.js"

export default {
    name: "VueTelescopeExpo",
    props: {
        slugs: Object,
        imageWidth: {
            type: Number,
            default: 800
        },
        sortField: {
            type: String,
            default: "rank"
        },
        sortDirection: {
            type: String,
            default: "desc"
        }
    },
    data() {
        return {
            items: [],
            count: 0,
            loading: false,
            limit: 12,
            start: 0,
            client: new VueTelescopeClient()
        }
    },
    methods: {
        loadItems() {
            this.loading = true;
            this.client.loadItems(this.slugs, this.sortField, this.sortDirection, this.limit, this.start)
                .then(data => {
                    this.items = [...this.items, ...data.filter(d => d.isPublic)]
                }).finally(() => {
                    this.loading = false
                });
        },
        loadMore() {
            this.start += this.limit
            this.loadItems();
        }
    },
    beforeMount() {
        this.client.loadCount(this.slugs, this.sortField, this.sortDirection)
            .then(data => {
                this.count = parseInt(data, 10)
                this.loadItems()
            });
    }
}
</script>

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
}

@media screen and (min-width: 719px) {
    .grid-item {
        flex: none;
        width: 50%;
    }
}

.buttons {
    text-align: center;
}

.section {
    position: relative;
    width: 100%;
}
</style>
