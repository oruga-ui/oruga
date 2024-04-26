<script setup>
import { ref } from "vue";

const animated = ref(true);
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="animated" label="Animated" />
        </o-field>

        <o-field label="20%">
            <o-skeleton width="20%" :animated="animated" />
        </o-field>
        <o-field label="40%">
            <o-skeleton width="40%" :animated="animated" />
        </o-field>
        <o-field label="80%">
            <o-skeleton width="80%" :animated="animated" />
        </o-field>
        <o-field label="100%">
            <o-skeleton :animated="animated" />
        </o-field>
        <o-field label=" Count 2">
            <o-skeleton :animated="animated" :count="2" />
        </o-field>
    </section>
</template>
