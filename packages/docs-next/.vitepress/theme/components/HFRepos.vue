<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps({
    filter_fullname: {
        type: String,
        default: null,
    },
});
const repos = ref<any[]>([]);

const filteredRepos = computed(() => {
    if (!props.filter_fullname) {
        return repos.value;
    }
    const regex = new RegExp(props.filter_fullname, "gi");
    return repos.value.filter((repo) => repo.full_name.match(regex));
});
onMounted(() => {
    fetch("/hfrepos.json")
        .then((data) => data.json())
        .then((data) => (repos.value = data.items));
});

function goToIssues(repo: any) {
    window.location.href = `${repo.html_url}/issues/?q=is:issue+is:open+label:hacktoberfest`;
}
function goToRepo(repo: any) {
    window.location.href = repo.html_url;
}
</script>

<template>
    <client-only>
        <div>
            <div class="hfrepos__container">
                <o-loading :full-page="false" :active="repos.length === 0" />
                <div
                    v-for="repo of filteredRepos"
                    :key="repo.id"
                    class="hfrepo">
                    <div class="hfrepo__header">
                        <div class="hfrepo__title">{{ repo.name }}</div>
                        <p class="hfrepo__subtitle">{{ repo.description }}</p>
                    </div>
                    <div class="hfrepo__actions">
                        <o-button
                            override
                            root-class="hfrepo__btn"
                            @click="goToRepo(repo)"
                            >Explore repo</o-button
                        >
                        <o-button
                            override
                            root-class="hfrepo__btn"
                            @click="goToIssues(repo)"
                            >See issues</o-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<style lang="scss" scoped>
.hfrepos__container {
    position: relative;
    min-height: 100px;
}

.hfrepo {
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: #f4f0e1;
    color: #2b3531;
    padding: 1rem;
    border-radius: 1rem;
    width: 80%;
}

@media (max-width: 1100px) {
    .hfrepo {
        width: 100%;
    }
}

.hfrepo__title {
    font-weight: 800;
    text-transform: capitalize;
}

.hfrepo__header {
    margin-bottom: 1.7rem;
}

.hfrepo__btn {
    cursor: pointer;
    background: #f74700;
    color: white;
    padding: 0.9rem;
    border: 0;
    border-radius: 0.5rem;
    text-decoration: none !important;
    min-width: 8rem;
    box-shadow: none;
    outline: 0;
    -webkit-appearance: none;
    font-weight: bold;
}
</style>
