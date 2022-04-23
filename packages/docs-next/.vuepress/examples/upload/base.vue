<template>
  <o-field class="file">
    <o-upload v-model="file">
      <o-button tag="a" variant="primary">
        <o-icon icon="upload"></o-icon>
        <span>Click to upload</span>
      </o-button>
    </o-upload>
    <span class="file-name" v-if="file">
      {{ file.name }}
    </span>
  </o-field>
</template>

<script>
export default {
  data() {
    return {
      file: null,
    };
  },
};
</script>
