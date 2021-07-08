<template>
  <section class="section">
    <div class="grid">
      <div class="grid-item"
        v-for="item in items"
        :key="item.id">
        <slot v-bind:item="item" name="item">
          <a
            target="_blank"
            class="grid-item-link"
            :href="item.url">
            <img
              :src="`https://res.cloudinary.com/nuxt/image/upload/w_${imageWidth},h_${imageWidth * 6 / 8},f_auto,q_auto/${item.screenshotUrl}`"
              class="grid-item-image"
            >
            <div class="grid-item-details">
              <p class="grid-item-url">
                <strong>{{ item.hostname }}</strong>
              </p>
              <div class="grid-item-plugins">
                <a
                  target="_blank"
                  class="grid-item-link"
                  :href="`https://vuetelescope.com/explore/${item.slug}`">
                  <img class="grid-item-plugin-image" v-if="item.ui" :src="`https://icons.vuetelescope.com${item.ui.imgPath}`"/>
                  <img class="grid-item-plugin-image" v-if="item.framework" :src="`https://icons.vuetelescope.com${item.framework.imgPath}`"/>
                </a>
              </div>
            </div>
          </a>
        </slot>
      </div>
    </div>
    <div class="controls">
      <div v-if="loading">
        <slot v-bind:loading="loading" name="loading">{{labelLoading}}</slot>
      </div>
      <div v-if="!loading && items.length && items.length < count">
        <slot name="buttons" v-bind:loadMore="loadMore">
          <button class="button" @click="loadMore">{{labelLoadMore}}</button>
        </slot>
      </div>
      <div v-if="retry">
        <slot name="retry" v-bind:firstLoadItems="firstLoadItems">
          <div class="retry-label">{{labelError}}</div>
          <button class="button" @click="firstLoadItems">{{labelRetry}}</button>
        </slot>
      </div>
    </div>
  </section>
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
    },
    labelRetry: {
      type: String,
      default: "Retry"
    },
    labelError: {
      type: String,
      default: "Something went wrong!"
    },
    labelLoadMore: {
      type: String,
      default: "Load More"
    },
    labelLoading: {
      type: String,
      default: "Loading..."
    }
  },
  data() {
    return {
      items: [],
      count: 0,
      loading: false,
      limit: 12,
      start: 0,
      client: new VueTelescopeClient(),
      retry: false
    }
  },
  methods: {
    firstLoadItems() {
      this.retry = false;
      this.client.getItemsCount(this.slugs, this.sortField, this.sortDirection)
        .then(data => {
          this.count = parseInt(data, 10)
          this.loadItems()
        }).catch(() => {
          this.retry = true;
        })
    },
    loadItems() {
      this.loading = true;
      this.client.getItems(this.slugs, this.sortField, this.sortDirection, this.limit, this.start)
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
    this.firstLoadItems()
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
  transition: transform .3s;
}

.grid-item-image:hover {
  transform: scale(1.02);
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
  text-decoration:none !important;
}

@media screen and (min-width: 719px) {
  .grid-item {
    flex: none;
    width: 50%;
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
  padding: calc(.5em - 1px) 1em;
  text-align: center;
  white-space: nowrap;
  border-radius: 4px;
  padding-left: 1rem;
  padding-right: 1rem;
}

.retry-label {
  padding: 1rem;
}

.section {
  position: relative;
  width: 100%;
}
</style>
