<script setup>
// import { reactive } from "vue";

// const clickMe = () => {
//     alert("Clicked!");
// };

// const settings = reactive({
//     rounded: false,
//     tooltip: true,
//     variant: "warning",
//     size: "medium",
// });
</script>

<template>
    <section>
        <!--  align="center" -->
        <o-breadcrumb separator="/" size="medium">
            <breadcrumb-item icon-left="plus">Home</breadcrumb-item>
            <breadcrumb-item active="true">Docs</breadcrumb-item>
            <breadcrumb-item disabled="true">Breadcrumb</breadcrumb-item>
        </o-breadcrumb>
        <!-- <o-breadcrumb>
            <h1>Hello World</h1>
        </o-breadcrumb> -->
    </section>
</template>
