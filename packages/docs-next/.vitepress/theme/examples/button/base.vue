<script setup>
const clickMe = () => {
    alert("Clicked!");
};
</script>

<template>
    <section>
        <o-button @click="clickMe">Click Me</o-button>
    </section>
</template>
