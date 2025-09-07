<script setup lang="ts">
import { ref } from "vue";
import type { OptionsPropItem } from "@oruga-ui/oruga-next";

const isFetching = ref(false);
const page = ref(1);
const totalPages = ref(1);

const options = ref<OptionsPropItem<any>[]>([]);
const selectedValue = ref<any>();
const value = ref("");



const items: OptionsProp<number> =
    Array.from({ length: 100000 }, (_, i) => ({
        label: `Item #${i}`,
        value: i,
    })),


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
        <o-list-box v-model="selectedValue" :options="options" 
            @scroll-end="getMoreAsyncData">
            <template #option="{option}">
                    <div class="media">
                        <div class="media-left">
                            <img
                                width="32"
                                :src="`https://image.tmdb.org/t/p/w500/${value.poster_path}`" />
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
            
                <template v-if="page > totalPages || !options.length" #footer>
                    <span class="ex-text-grey">
                        Thats it! No more movies found.
                    </span>
                </template>
        </o-list-box>

        <p><b>Selected:</b> {{ selectedValue?.title }}</p>
    </section>
</template>

<style scoped>
.ex-text-grey {
    color: grey;
}
</style>
