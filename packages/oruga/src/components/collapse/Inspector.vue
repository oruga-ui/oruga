<template>
  <div>
    <doc-wrapper>
      <template v-slot:default="s">
        <o-collapse
          animation="slide"
          v-bind="s"
          :open="true"
          style="border: 1px solid #dfe2e5"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
          >
            <p class="card-header-title">
              Collapse Title
            </p>
            <a class="card-header-icon">
              <o-icon :icon="props.open ? 'caret-up' : 'caret-down'"> </o-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              Collapse Content
            </div>
          </div>
        </o-collapse>
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
            class: "rootClass",
            description: "Class of the root element"
        },
        {
            class: "triggerClass",
            description: "Class of the trigger element"
        },
        {
            class: "contentClass",
            description: "Class of the content"
        }
      ],
    };
  },
};
</script>
