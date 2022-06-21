<template>
  <o-tabs type="boxed">
    <o-tab-item>
      <template #header>
        <o-icon icon="info-circle" rootClass="custom-icon"></o-icon>
        <span> Issues 3 </span>
      </template>
    </o-tab-item>
    <o-tab-item>
      <template #header>
        <o-icon icon="retweet" rootClass="custom-icon"></o-icon>
        <span> Pull Requests {{ count }} </span>
      </template>
    </o-tab-item>
  </o-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
    setup() {
        const count = ref(1)
        onMounted(() => {
            setTimeout(() => {
                this.count++;
            }, 3 * 1000);
        })
        return { count }
    }
})
</script>

<style>
.custom-icon {
  margin-right: 5px;
}
</style>
