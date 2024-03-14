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
        <o-breadcrumb tag="ul" separator="has-arrow-separator" size="medium" align="center">
            <o-breadcrumb-item tag="li" icon-left="plus" active='true'>Home</o-breadcrumb-item>
            <o-breadcrumb-item tag="li" icon-left="plus" disabled="true">Docs</o-breadcrumb-item>
            <o-breadcrumb-item tag="li" icon-left="plus">Breadcrumb</o-breadcrumb-item>
        </o-breadcrumb>
        <!-- <o-breadcrumb>
            <h1>Hello World</h1>
        </o-breadcrumb> -->
    </section>
</template>
