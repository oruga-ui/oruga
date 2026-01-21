<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import type { InspectData, InspectClassDescription, InspectClass } from "@docs";
import { VPButton } from "vitepress/theme";

const props = defineProps({
  inspectData: { type: Object as PropType<InspectData>, required: true },
});

const emits = defineEmits<{
  (e: "inspect", value: InspectClass): void;
}>();

const showSummary = ref(false);

const selectedElementIndex = ref<number>();

const classesToInspect = computed<InspectClassDescription[]>(() =>
  Object.values(props.inspectData),
);

function addDotToTheEnd(value: string): string {
  return !value.endsWith(".") ? value + "." : value;
}

function setByProperties(props: string[]): string | null {
  return props ? props.join("<br>") : null;
}

function inspectClass(
  index: number,
  selectedClass: InspectClassDescription,
): void {
  selectedElementIndex.value = index;
  emits("inspect", {
    className: selectedClass.relatedClass || selectedClass.class,
    action: selectedClass.action,
  });
  document.getElementById("class-props")?.scrollIntoView();
}
</script>

<template>
  <div class="vp-doc">
    <div class="inspector__summary">
      <div
        class="inspector__summary-trigger"
        role="button"
        tabindex="0"
        @click="showSummary = !showSummary"
        @keydown.enter="showSummary = !showSummary"
        @keydown.space.prevent="showSummary = !showSummary">
        <span
          class="arrow-icon"
          :style="`transform: rotate(${showSummary ? '90' : '0'}deg);`">
          ➜
        </span>
        <span>
          Want to know how does the <i> Class Inspector </i> work?
        </span>
      </div>

      <transition>
        <div
          v-show="showSummary"
          class="inspector__summary-content">
          <div class="inspector__summary-intro">
            <p>
              <i>Class props inspector</i> is useful to see class
              props you want to use to customize Oruga components
              and how they change a component. You can click on
              <b>Inspect</b> button to find the exact element
              where a specific class prop acts. <br><br>
              In the <i>Class props inspector</i> there are other
              columns:
            </p>
          </div>

          <div>
            <h4>Class prop</h4>
            <p>
              This column contains the name of the Class prop you
              want to inspect.<br>
              If you find a name with a link (
              <span>▷ <a>classPropName</a> </span>) this refers to
              a subitem (e.g. <i>Dropdown Item</i> in
              <i>Dropdown</i>).
            </p>
          </div>

          <div>
            <h4>Description</h4>
            <p>
              This column contains the description of the Class
              prop you want to inspect.<br>
              👉 This icon indicates some warning, e.g.
              <i>this Class prop is visible only on mobile.</i>
              <br>
            </p>
          </div>

          <div>
            <h4>Props</h4>
            <p>
              This column contains a list of props that activate
              the class, e.g. if a class prop contains
              <code>disabled</code> prop it means that only when
              the component has <code>disabled</code> prop.
            </p>
          </div>

          <div>
            <h4>Suffixes</h4>
            <p>
              This column contains all the possible suffixes that
              you'll receive if you use a function to customize
              your Class prop.
            </p>
          </div>
        </div>
      </transition>
    </div>

    <!-- eslint-disable vue/no-v-html -->
    <table>
      <tbody>
        <tr>
          <th>Class prop</th>
          <th>Description</th>
          <th>Props</th>
          <th>Suffixes</th>
          <th />
        </tr>
        <tr
          v-for="(data, index) of classesToInspect"
          :key="data.class"
          :class="{
            inspector__highlight: index === selectedElementIndex,
          }">
          <td v-if="!data.subitem">
            <s v-if="data.deprecated">{{ data.class }}</s>
            <span v-else>{{ data.class }}</span>
          </td>
          <td v-else>
            ▷
            <a :href="`#${data.subitem}-component`">
              <s v-if="data.deprecated">{{ data.class }}</s>
              <span v-else>{{ data.class }}</span>
            </a>
          </td>
          <td>
            <template v-if="data.deprecated">
              <div>
                <b>deprecated</b>
                <template
                  v-if="typeof data.deprecated === 'string'">
                  -
                  {{ data.deprecated }}
                </template>
              </div>
              <div>
                <s> {{ addDotToTheEnd(data.description) }} </s>
              </div>
            </template>
            <div v-else>
              {{ addDotToTheEnd(data.description) }}
            </div>
            <div v-if="data.relatedComponent">
              More details
              <a
                target="_blank"
                :href="`/components/${data.relatedComponent}.html#class-inspector`">
                here.
              </a>
            </div>
            <div v-if="data.info">
              👉 <i><span v-html="data.info" /></i>
            </div>
          </td>
          <td>
            <code
              v-if="data.properties"
              style="white-space: nowrap; padding: 0"
              v-html="setByProperties(data.properties)" />
          </td>
          <td>
            <code
              v-if="data.suffixes"
              style="white-space: nowrap; padding: 0"
              v-html="setByProperties(data.suffixes)" />
          </td>
          <td>
            <VPButton
              v-if="!data.nospec === true"
              text="Inspect"
              :theme="
                selectedElementIndex == index ? 'alt' : 'brand'
              "
              @click="inspectClass(index, data)">
              Inspect
            </VPButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.inspector__summary {
    margin-top: 2rem;
}

.inspector__summary-trigger {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    .arrow-icon {
        transition: transform 0.3s;
        display: inline-block;
        width: 20px;
    }
}

.inspector__summary-content {
    border: 1px dashed #dfe2e5;
    padding: 0.5rem;
    border-radius: 2px;

    h4,
    p {
        margin-top: 0.5rem;
    }
}

.inspector__highlight,
.inspector__highlight code,
.inspector__highlight a {
    background: var(--vp-c-note-2) !important;
    color: white !important;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
