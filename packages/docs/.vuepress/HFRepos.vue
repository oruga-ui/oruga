<template>
    <client-only>
        <div>
            <div v-for="repo of repos" :key="repo.id" class="hfrepo">
                <div class="hfrepo__header">
                    <div class="hfrepo__title">{{repo.name}}</div>
                    <div class="hfrepo__subtitle">{{repo.description}}</div>
                </div>
                <div class="hfrepo__actions">
                    <o-button override rootClass="hfrepo__btn" @click="goToRepo(repo)">Explore repo</o-button>
                    <o-button override rootClass="hfrepo__btn" @click="goToIssues(repo)">See issues</o-button>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script>
export default {
    data() {
        return {
            repos: []
        }
    },
    mounted: function() {
        fetch("/hfrepos.json")
          .then(data => data.json())
          .then(data => this.repos = data.items)
    },
    methods: {
        goToIssues(repo) {
            window.location.href = `${repo.html_url}/issues/q=is:issue+is:open+label:hacktoberfest`;
        },
        goToRepo(repo) {
            window.location.href = repo.html_url;
        }
    }
}
</script>

<style scoped>
.hfrepo {
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: #f4f0e1;
    color: #2B3531;
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
    margin-bottom: 1.5rem;
}

.hfrepo__btn {
    cursor: pointer;
    background: #F74700;
    color: white;
    padding: 0.8rem;
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
