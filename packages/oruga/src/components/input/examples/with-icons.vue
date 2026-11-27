<script setup lang="ts">
import { ref } from "vue";

const email = ref("");

function searchIconClick(): void {
    alert("You wanna make a search?");
}

function clearIconClick(): void {
    email.value = "";
    alert("Email cleared!");
}
</script>

<template>
    <section>
        <o-field>
            <o-input
                placeholder="Search..."
                aria-label="Search with left icon"
                type="search"
                icon="search"
                icon-clickable
                @icon-click="searchIconClick" />
        </o-field>

        <o-field>
            <o-input
                placeholder="Search..."
                aria-label="Search with right icon"
                type="search"
                icon-right="search"
                icon-right-clickable />
        </o-field>

        <o-field>
            <o-input
                v-model="email"
                placeholder="Email"
                aria-label="Email address"
                type="email"
                icon="envelope"
                icon-right="times-circle"
                icon-right-clickable
                @icon-right-click="clearIconClick" />
        </o-field>
    </section>
</template>
