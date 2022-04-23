<template>
  <div>
    <o-field>
      <o-button size="medium" variant="primary" @click="openLoading">
        Launch loading
      </o-button>
    </o-field>
    <o-field>
      <o-switch v-model="isFullPage">Display loader over full page</o-switch>
    </o-field>
    <p style="position: relative" ref="element">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
      fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien
      laoreet elit
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullPage: true,
    };
  },
  methods: {
    openLoading() {
      const loadingComponent = this.$oruga.loading.open({
        fullPage: this.isFullPage,
        container: this.isFullPage ? null : this.$refs.element,
      });
      setTimeout(() => loadingComponent.close(), 3 * 1000);
    },
  },
};
</script>
