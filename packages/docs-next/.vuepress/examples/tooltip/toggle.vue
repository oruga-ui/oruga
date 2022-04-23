<template>
  <section>
    <o-button @click="active = !active"> Toggle </o-button>

    <hr />

    <o-tooltip label="I'm never closing" :active="active" always>
      <o-button> Always </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip right" position="right" :active="active">
      <o-button> Right </o-button>
    </o-tooltip>
  </section>
</template>

<script>
export default {
  data() {
    return {
      active: true,
    };
  },
};
</script>
