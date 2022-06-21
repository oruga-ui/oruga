
<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <o-field label="Select time">
        <o-timepicker v-bind="s" placeholder="Click to select..." ref="timepicker">
          <div>This is the footer</div>
        </o-timepicker>
      </o-field>
    </template>
  </doc-wrapper>
  <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
  methods: {
    openTimePicker() {
      setTimeout(() => {
        this.$refs.timepicker.$el.getElementsByClassName('o-drop__trigger')[0].click()
      }, 500)
    }
  },
  data() {
    return {
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element",
        },
        {
          class: "sizeClass",
          description: "Class of the Timepicker component size",
          properties: ["size"],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
            this.openTimePicker();
          },
        },
        {
          class: "boxClass",
          description: "Class of the Timepicker component box where you choose the date",
          action: () => {
            this.openTimePicker();
          }
        },
        {
          class: "separatorClass",
          description: "Class of the Timepicker separator",
          action: () => {
            this.openTimePicker();
          },
        },
        {
          class: "footerClass",
          description: "Class of the Timepicker footer",
          action: () => {
            this.openTimePicker();
          }
        },
        {
          class: "mobileClass",
          description: "Class of the Table when on mobile",
          warning: "Switch to mobile view to see it in action!"
        },
        {
          class: "inputClasses",
          realClass: "inputClasses.rootClass",
          description: "Classes to apply on internal input.",
          componentRef: "Input"
        },
        {
          class: "dropdownClasses",
          realClass: "dropdownClasses.rootClass",
          description: "Classes to apply on dropdown.",
          componentRef: "Dropdown",
          action: () => {
            this.openTimePicker();
          }
        },
        {
          class: "selectClasses",
          realClass: "selectClasses.selectClass",
          description: "Classes to apply on select.",
          componentRef: "Select",
          action: () => {
            this.openTimePicker();
          }
        },
      ],
    };
  }
}
</script>

<style>
.datepicker__table {
  border-collapse: collapse;
}
</style>
