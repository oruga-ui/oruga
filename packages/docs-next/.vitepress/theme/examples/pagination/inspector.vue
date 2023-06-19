<template>
  <doc-wrapper :inspect-class="inspectClass">
    <template #default="s">
      <o-pagination v-bind='s' :total="total" v-model:current="current" :range-before="rangeBefore"
        :range-after="rangeAfter" :per-page="perPage" aria-next-label="Next page" aria-previous-label="Previous page"
        aria-page-label="Page" aria-current-label="Current page" icon-prev='chevron-left' icon-next='chevron-right'>
      </o-pagination>
    </template>
  </doc-wrapper>
  <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
  data() {
    return {
      total: 200,
      current: 10,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      inspectClass: {},
      inspectData: [
        {
          class: "rootClass",
          description: "Class of the root element",
        },
        {
          class: "mobileClass",
          description: "Class of pagination component when on mobile",
          warning: "Switch to mobile view to see it in action!",
        },
        {
          class: "prevBtnClass",
          description: "Class of the prev. button",
          specificity: "when <b>mobileClass</b> is applied",
        },
        {
          class: "nextBtnClass",
          description: "Class of the next button",
          specificity: "when <b>mobileClass</b> is applied",
        },
        {
          class: "listClass",
          description: "Class of the pagination list",
          specificity: "when <b>mobileClass</b> is applied",
        },
        {
          class: "listItemClass",
          description: "Class of the pagination list items",
        },
        {
          class: "linkClass",
          description: "Class of the link button",
          specificity: "when <b>mobileClass</b> is applied",
        },
        {
          class: "linkCurrentClass",
          description: "Class of the current link",
        },
        {
          class: "ellipsisClass",
          description: "Class of the pagination ellipsis ",
          specificity: "when <b>mobileClass</b> is applied",
        },
        {
          class: "infoClass",
          description: "Class of the info in `simple` mode",
          properties: ['simple'],
          action: (cmp) => {
            cmp.data.simple = true;
          }
        },
        {
          class: "orderClass",
          description: "Class of the pagination order",
          properties: ['order'],
          suffixes: ['centered', 'right', 'left'],
          action: (cmp) => {
            cmp.data.order = 'centered';
          }
        },
        {
          class: "simpleClass",
          description: "Class of the pagination in `simple` mode",
          properties: ['simple'],
          action: (cmp) => {
            cmp.data.simple = true;
          }
        },
        {
          class: "roundedClass",
          description: "Class of the pagination when rounded",
          properties: ['rounded'],
          action: (cmp) => {
            cmp.data.rounded = true;
          }
        },
        {
          class: "linkDisabledClass",
          description: "Class of the disabled link",
          action: () => {
            this.current = 20;
          }
        },
        {
          class: "sizeClass",
          description: "Class for the pagination size",
          properties: ['size'],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'small';
          }
        }
      ],
    };
  },
};
</script>
