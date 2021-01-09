<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
        <o-radio v-model="s.checkbox" native-value="default" v-bind="s">Radio</o-radio>
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>

export default {
  data() {
    return {
      inspectData: [
        {
          class: 'rootClass',
          description : ''
        },
        {
          class: 'labelClass',
          description : ''
        },
        {
          class: 'checkClass',
          description : ''
        },
        {
          class: 'checkCheckedClass',
          description : '',
          action: (cmp) => {
            cmp.data.checkbox = 'default';
          }
        },
        {
          class: 'sizeClass',
          description : '',
          action: (cmp) => {
            cmp.data.size = 'large';
          }
        },
        {
          class: 'disabledClass',
          description : '',
          action: (cmp) => {
            cmp.data.disabled = true;
          }
        },
        {
          class: 'variantClass',
          description : '',
          action: (cmp) => {
            cmp.data.variant = 'warning';
          }
        }
      ]
    }
  }
}
</script>
