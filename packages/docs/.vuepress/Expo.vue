<template>
    <client-only>
        <section class="section">
            <o-loading :full-page="false" :active="loading"></o-loading>
            <div class="grids">
                <div class="grid"
                    v-for="item in items"
                    :key="item.id">
                    <a
                        target="_blank"
                        :href="item.url">
                        <img :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,h_900,f_auto,q_auto/${item.screenshotUrl}`">
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
export default {
    data() {
        return {
            items: [],
            count: 0,
            loading: false,
            slug: 'oruga',
            limit: 12,
            start: 0,
            sortField: 'createdAt',
            sortDirection: 'desc'
        }
    },
    methods: {
        loadItems() {
            this.loading = true;
            fetch(`https://api.vuetelescope.com/showcases?ui.slug=${this.slug}&_limit=${this.limit}&_start=${this.start}&_sort=${this.sortField}%3A${this.sortDirection}`)
                .then(response => response.json())
                .then(data => {
                    this.items = [...this.items, ...data.filter(d => d.isPublic)]
                }).finally(() => {
                    this.loading = false
                });
        },
        loadCount() {
            fetch(`https://api.vuetelescope.com/showcases/count?ui.slug=${this.slug}&_sort=${this.sortField}%3A${this.sortDirection}`)
                .then(response => response.json())
                .then(data => {
                    this.count = parseInt(data, 10)
                });
        },
        loadMore() {
            this.start += this.limit
            this.loadItems();
        }
    },
    beforeMount() {
        if (typeof window !== 'undefined') {
            this.loadCount()
            this.loadItems()
        }
    }
}
</script>

<style scoped>
.grids {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.grid {
    padding: 5px;
    width: 100%;
    text-align: center;
}

@media screen and (min-width: 719px) {
    .grid {
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
