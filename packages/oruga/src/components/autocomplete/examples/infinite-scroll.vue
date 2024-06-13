<script setup lang="ts">
import { ref } from "vue";

const isFetching = ref(false);
const page = ref(1);
const totalPages = ref(1);

const options = ref([]);
const selected = ref(null);
const value = ref("");

async function getAsyncData(_value): Promise<void> {
    if (value.value !== _value) {
        value.value = _value;
        options.value = [];
        page.value = 1;
        totalPages.value = 1;
    }

    // String cleared
    if (!_value.length) {
        options.value = [];
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
            `https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${_value}&page=${page.value}`,
        ).then((response) => response.json());

        options.value = [...options.value, ..._data.results];
        page.value += 1;
        totalPages.value = _data.total_pages;
    } catch (err) {
        console.error(err);
    } finally {
        isFetching.value = false;
    }
}

function getMoreAsyncData(): void {
    getAsyncData(value.value);
}
</script>

<template>
    <section>
        <o-field label="Find a movie">
            <o-autocomplete
                v-model="selected"
                :options="options"
                placeholder="e.g. Fight Club"
                field="title"
                expanded
                check-scroll
                open-on-focus
                :debounce="500"
                @input="getAsyncData"
                @scroll-end="getMoreAsyncData">
                <template #default="{ option }">
                    <div class="media">
                        <div class="media-left">
                            <img
                                width="32"
                                :src="`https://image.tmdb.org/t/p/w500/${option.poster_path}`" />
                        </div>
                        <div class="media-content">
                            {{ option.title }}
                            <br />
                            <small>
                                Released at {{ option.release_date }}, rated
                                <b>{{ option.vote_average }}</b>
                            </small>
                        </div>
                    </div>
                </template>
                <template v-if="page > totalPages" #footer>
                    <span class="ex-text-grey">
                        Thats it! No more movies found.
                    </span>
                </template>
            </o-autocomplete>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>

<style scoped>
.ex-text-grey {
    color: grey;
}
</style>
