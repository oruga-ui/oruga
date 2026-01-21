<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Simple from "./simple.vue";
import SimpleCode from "./simple.vue?raw";

import Positions from "./positions.vue";
import PositionsCode from "./positions.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Disabled from "./disabled.vue";
import DisabledCode from "./disabled.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
</script>

<template>
  <h3 id="base">Base</h3>
  <p>
    The component uses three main properties: the
    <code>current</code> prop,which is two-way bindable and shows the active
    page; the <code>total</code> prop, which defines the total number of
    pages; and the <code>per-page</code> prop, which is used to define the
    number of elements per page. The current page is marked with
    <code>aria-current</code> set to "page" as well. In addition, since
    pages likely have more than one navigation section, it is advisable to
    provide a descriptive <code>aria-label</code> for the
    <code>nav</code> element to reflect its purpose.
  </p>
  <ExampleViewer :component="Base" :code="BaseCode" />

  <h3 id="simple">Simple</h3>
  <p>
    The component can be displayed in a simplified state by using the
    <code>simple</code> prop. This simplified representation uses
    <code>aria-live="polite"</code> to notify the screen reader of changes
    to the pagination state.
  </p>
  <ExampleViewer :component="Simple" :code="SimpleCode" />

  <h3 id="positions">Positions</h3>
  <p>The compoponent can be positioned by the <code>position</code> prop.</p>
  <ExampleViewer :component="Positions" :code="PositionsCode" />

  <h3 id="sizes">Sizes</h3>
  <p>
    The component can be displayed in different sizes using the
    <code>size</code> prop.
  </p>
  <ExampleViewer :component="Sizes" :code="SizesCode" />

  <h3 id="disabled">Disabled</h3>
  <p>
    Use the<code>disabled</code> prop to prevent buttons from being clicked.
  </p>
  <ExampleViewer :component="Disabled" :code="DisabledCode" />

  <h3 id="customise">Customise</h3>
  <ExampleViewer :component="Customise" :code="CustomiseCode" />

  <h3 id="templates">Templates</h3>
  <p>
    The component can be further customised by using template slots to
    override specific buttons.
  </p>
  <ExampleViewer :component="Templates" :code="TemplatesCode" />
</template>
