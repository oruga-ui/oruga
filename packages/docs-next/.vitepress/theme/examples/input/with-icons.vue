<script setup>
import { ref } from "vue";

const email = ref("");

function searchIconClick() {
    alert("You wanna make a search?");
}

function clearIconClick() {
    email.value = "";
    alert("Email cleared!");
}
</script>

<template>
    <section>
        <o-field>
            <o-input
                placeholder="Search..."
                type="search"
                icon="search"
                icon-clickable
                @icon-click="searchIconClick" />
        </o-field>

        <o-field>
            <o-input
                placeholder="Search..."
                type="search"
                icon-right="search"
                icon-right-clickable />
        </o-field>

        <o-field>
            <o-input
                v-model="email"
                placeholder="Email"
                type="email"
                icon="envelope"
                icon-right="times-circle"
                icon-right-clickable
                @icon-right-click="clearIconClick" />
        </o-field>
    </section>
</template>
