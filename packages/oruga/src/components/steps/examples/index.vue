<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Vertical from "./vertical.vue";
import VerticalCode from "./vertical.vue?raw";
</script>

<template>
  <h3 id="base">Base</h3>
  <ExampleViewer :component="Base" :code="BaseCode" />

  <h3 id="variants">Variants</h3>
  <p>
    Different styles can be achieved with the <code>variant</code> prop. The
    <code>variant</code> prop can be set on the <code>Steps</code> as well
    as on the <code>StepItem</code> component.
  </p>
  <ExampleViewer :component="Variants" :code="VariantsCode" />

  <h3 id="sizes">Sizes</h3>
  <p>
    The component can be displayed in different sizes using the
    <code>size</code> prop.
  </p>
  <ExampleViewer :component="Sizes" :code="SizesCode" />

  <h3 id="customise">Customise</h3>
  <ExampleViewer :component="Customise" :code="CustomiseCode" />

  <h3 id="vertical">Vertical</h3>
  <p>
    Adding the <code>vertical</code> prop displays the component vertically
    instead of horizontally.
  </p>
  <ExampleViewer :component="Vertical" :code="VerticalCode" />
</template>
