<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
        <o-checkbox v-model="s.checkbox" v-bind="s">Checkbox</o-checkbox>
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
            cmp.data.checkbox = true;
          }
        },
        {
          class: 'checkIndeterminateClass',
          description : '',
          action: (cmp) => {
            cmp.data.indeterminate = true;
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
