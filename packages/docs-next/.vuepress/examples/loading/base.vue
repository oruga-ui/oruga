<template>
  <section>
    <o-field>
      <o-button size="medium" variant="primary" @click="openLoading">
        Launch loading
      </o-button>
    </o-field>
    <o-field>
      <o-switch v-model="isFullPage">Display loader over full page</o-switch>
    </o-field>
    <p style="position: relative">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
      fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien
      laoreet elit
      <o-loading
        :full-page="isFullPage"
        :active.sync="isLoading"
        :can-cancel="true"
      ></o-loading>
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      isFullPage: true,
    };
  },
  methods: {
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 10 * 1000);
    },
  },
};
</script>
