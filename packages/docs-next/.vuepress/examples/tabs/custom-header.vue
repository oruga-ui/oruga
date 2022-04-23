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

<script>
export default {
  data() {
    return {
      count: 1,
    };
  },
  mounted() {
    setTimeout(() => {
      this.count++;
    }, 3 * 1000);
  },
};
</script>

<style>
.custom-icon {
  margin-right: 5px;
}
</style>
