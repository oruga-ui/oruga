<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
        <o-skeleton v-bind="s" width="264px" :count="2"></o-skeleton>
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
          class: 'animationClass',
          description : 'Class of the skeleton animation',

          action: (cmp) => {
            cmp.data.animated = true;
          }
        },
        {
          class: 'positionClass',
          description : 'Class of the skeleton position',
          properties: ['position'],
          suffixes: ['left', 'centered', 'right'],
          action: (cmp) => {
            cmp.data.position = 'centered';
          }
        },
        {
          class: 'itemClass',
          description : 'Class of the skeleton item'
        },
        {
          class: 'itemRoundedClass',
          description : 'Class of the skeleton item rounded',
          properties: ['rounded'],
          action: (cmp) => {
            cmp.data.rounded = true;
          }
        },
        {
          class: 'sizeClass',
          description : 'Class of the skeleton size',
          properties: ['size'],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
          }
        }
      ]
    }
  }
}
</script>
