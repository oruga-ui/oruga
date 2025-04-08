<script setup lang="ts">
import { ref } from "vue";
import type { OptionsPropItem } from "@oruga-ui/oruga-next";

const isFetching = ref(false);
const page = ref(1);
const totalPages = ref(1);

const options = ref<OptionsPropItem<any>[]>([]);
const selected = ref<any>();
const value = ref("");

async function getAsyncData(_value: string): Promise<void> {
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

        const movies: OptionsPropItem[] = _data.results.map((v) => ({
            value: v,
            label: v.title,
        }));

        options.value = [...options.value, ...movies];
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
    <section class="odocs-spaced">
        <o-field label='Find a movie in the "The Movie Database (TMDB)"'>
            <o-autocomplete
                v-model="selected"
                :options="options"
                placeholder="e.g. Fight Club"
                expanded
                check-scroll
                backend-filtering
                :debounce="500"
                @input="getAsyncData"
                @scroll-end="getMoreAsyncData">
                <template #default="{ value }">
                    <div class="media">
                        <div class="media-left">
                            <img
                                width="32"
                                :src="`https://image.tmdb.org/t/p/w500/${value.poster_path}`" />
                        </div>
                        <div class="media-content">
                            {{ value.title }}
                            <br />
                            <small>
                                Released at {{ value.release_date }}, rated
                                <b>{{ value.vote_average }}</b>
                            </small>
                        </div>
                    </div>
                </template>

                <template v-if="page > totalPages || !options.length" #footer>
                    <span class="ex-text-grey">
                        Thats it! No more movies found.
                    </span>
                </template>
            </o-autocomplete>

            <p><b>Selected:</b> {{ selected?.title }}</p>
        </o-field>
    </section>
</template>

<style scoped>
.ex-text-grey {
    color: grey;
}
</style>
