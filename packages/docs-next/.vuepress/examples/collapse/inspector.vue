
<template>
    <doc-wrapper :inspect-class="inspectClass">
      <template #default="s">
        <o-collapse
          animation="slide"
          v-bind="s"
          :open="true"
          style="border: 1px solid #dfe2e5"
        >
            <template #trigger="props">
                <div
                    class="card-header"
                    role="button"
                >
                    <p class="card-header-title">Collapse Title</p>
                    <a class="card-header-icon">
                        <o-icon :icon="props.open ? 'caret-up' : 'caret-down'"> </o-icon>
                    </a>
                </div>
            </template>
            <div class="card-content">
                <div class="content">Collapse Content</div>
            </div>
        </o-collapse>
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
