<template>
  <section>
    <div class="field">
      <o-checkbox>Basic</o-checkbox>
    </div>
    <div class="field">
      <o-checkbox v-model="checkbox">
        {{ checkbox }}
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox v-model="checkboxCustom" true-value="Yes" false-value="No">
        {{ checkboxCustom }}
      </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox :indeterminate="true"> Indeterminate </o-checkbox>
    </div>
    <div class="field">
      <o-checkbox disabled>Disabled</o-checkbox>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checkbox: false,
      checkboxCustom: 'Yes',
    };
  },
};
</script>
