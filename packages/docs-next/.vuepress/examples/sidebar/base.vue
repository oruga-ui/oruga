<template>
  <section>
    <o-sidebar
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open.sync="open"
    >
      <o-button
        v-if="fullwidth"
        icon-left="times"
        label="Close"
        @click="open = false"
      />
      <img
        width="128"
        src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
        alt="Lightweight UI components for Vue.js"
      />
      <h3>Example</h3>
    </o-sidebar>
    <div class="block">
      <o-field grouped group-multiline>
        <o-switch v-model="overlay">Overlay</o-switch>
        <o-switch v-model="fullheight">Fullheight</o-switch>
        <o-switch v-model="fullwidth">Fullwidth</o-switch>
        <o-switch v-model="right">Right</o-switch>
      </o-field>
    </div>

    <br />

    <o-button @click="open = true">Show</o-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false,
    };
  },
};
</script>
