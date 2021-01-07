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
          description : 'Class of the root element'
        },
        {
          class: 'labelClass',
          description : 'Class of the label'
        },
        {
          class: 'checkClass',
          description : 'Class of the checkbox'
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
          description : 'Class when checkbox is indeterminate',
          properties: ["indeterminate"],
          action: (cmp) => {
            cmp.data.indeterminate = true;
          }
        },
        {
          class: 'sizeClass',
          description : 'Class of the checkbox size',
          properties: ["size"],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
          }
        },
        {
          class: 'disabledClass',
          description : 'Class when checkbox is disabled',
          properties: ["disabled"],
          action: (cmp) => {
            cmp.data.disabled = true;
          }
        },
        {
          class: 'variantClass',
          description : 'Class of the checkbox variant',
          properties: ["variant"],
          suffixes: ['primary', 'info', 'warning', 'danger'],
          action: (cmp) => {
            cmp.data.variant = 'warning';
          }
        }
      ]
    }
  }
}
</script>
