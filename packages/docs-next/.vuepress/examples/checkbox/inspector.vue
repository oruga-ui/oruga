
<template>
    <doc-wrapper :inspect-class="inspectClass">
      <template v-slot:default="s">
        <o-checkbox v-model="s.checkbox" v-bind="s">Checkbox</o-checkbox>
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>

export default {
  data() {
    return {
      inspectClass: {},
      inspectData: [
        {
          class: 'rootClass',
          description : 'Class of the root element'
        },
        {
          class: 'labelClass',
          description : 'Class of the checkbox label'
        },
        {
          class: 'checkClass',
          description : 'Class of the checkbox'
        },
        {
          class: 'checkedClass',
          description : 'Class of the root element when checked',
          action: (cmp) => {
            cmp.data.checkbox = true;
          }
        },
        {
          class: 'checkCheckedClass',
          description : 'Class of the checkbox when checked',
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
