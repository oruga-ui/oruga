<script setup>
import { ref } from "vue";

const animated = ref(true);
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-switch v-model="animated">Animated</o-switch>
        </o-field>

        <o-skeleton width="20%" :animated="animated" />

        <o-skeleton width="40%" :animated="animated" />

        <o-skeleton width="80%" :animated="animated" />

        <o-skeleton :animated="animated" />

        <o-skeleton :animated="animated" circle width="64px" height="64px" />

        <o-skeleton :animated="animated" size="large" :count="2" />
    </section>
</template>
