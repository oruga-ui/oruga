<script setup lang="ts">
import { ref, onMounted } from "vue";

const count = ref(1);

onMounted(() => {
    setTimeout(() => {
        count.value++;
    }, 3000);
});
</script>

<template>
    <section>
        <o-tabs type="boxed">
            <o-tab-item>
                <template #header>
                    <o-icon icon="info-circle" root-class="custom-icon" />
                    <span> Issues 3 </span>
                </template>
            </o-tab-item>

            <o-tab-item>
                <template #header>
                    <o-icon icon="retweet" root-class="custom-icon" />
                    <span> Pull Requests {{ count }} </span>
                </template>
            </o-tab-item>
        </o-tabs>
    </section>
</template>

<style lang="scss">
.custom-icon {
    margin-right: 5px;
}
</style>
