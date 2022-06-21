<template>
  <section>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a movie">
      <o-autocomplete
        :data="data"
        placeholder="e.g. Fight Club"
        field="title"
        :loading="isFetching"
        check-infinite-scroll
        :debounce-typing="500"
        @typing="getAsyncData"
        @select="(option) => (selected = option)"
        @infinite-scroll="getMoreAsyncData"
      >
        <template #default="props">
          <div class="media">
            <div class="media-left">
              <img
                width="32"
                :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`"
              />
            </div>
            <div class="media-content">
              {{ props.option.title }}
              <br />
              <small>
                Released at {{ props.option.release_date }}, rated
                <b>{{ props.option.vote_average }}</b>
              </small>
            </div>
          </div>
        </template>
        <template #footer>
          <span v-show="page > totalPages" class="has-text-grey">
            Thats it! No more movies found.
          </span>
        </template>
      </o-autocomplete>
    </o-field>
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isFetching = ref(false);
    const page = ref(1);
    const totalPages = ref(1);

    const data = ref([]);
    const selected = ref(null);
    const name = ref('');

    async function getAsyncData(_name) {
      if (name.value !== _name) {
        name.value = _name;
        data.value = [];
        page.value = 1;
        totalPages.value = 1;
      }

      // String cleared
      if (!_name.length) {
        data.value = [];
        page.value = 1;
        totalPages.value = 1;

        return;
      }

      // Reached last page
      if (page.value > totalPages.value) {
        return;
      }

      isFetching.value = true;
      try {
        const _data = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${_name}&page=${page.value}`
        ).then((response) => response.json())

        data.value = _data.results;
        page.value += 1;
        totalPages.value = _data.total_pages;
      } catch(error) {
        throw error;
      } finally {
        isFetching.value = false;
      }
    }

    function getMoreAsyncData() {
      getAsyncData(name.value);
    }

    return {
      isFetching,
      page,
      totalPages,
      data,
      selected,
      name,
      getAsyncData,
      getMoreAsyncData,
    };
  },
});
</script>
