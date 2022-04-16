<template>
  <section>
    <o-collapse class="card" animation="slide" v-for="(collapse, index) of collapses" :key="index" :open="isOpen == index" @open="isOpen = index">
      <template #trigger="props">
        <div class="card-header" role="button" :aria-controls="'contentIdForA11y5-' + index" :aria-expanded="isOpen">
          <p class="card-header-title">
            {{ collapse.title }}
          </p>
          <a class="card-header-icon">
            <o-icon :icon="props.open ? 'caret-up' : 'caret-down'"> </o-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">
          {{ collapse.text }}
        </div>
      </div>
    </o-collapse>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OCollapse from "../Collapse.vue";
export default defineComponent({
    data() {
      return {
        isOpen: 0,
        collapses: [
          {
            title: 'Title 1',
            text: 'Text 1'
          },
          {
            title: 'Title 2',
            text: 'Text 2'
          },
          {
            title: 'Title 3',
            text: 'Text 3'
          }
        ]
      }
    },
  components: {
    [OCollapse.name]: OCollapse,
  }
});
</script>

<style>
</style>
