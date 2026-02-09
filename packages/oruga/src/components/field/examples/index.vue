<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Addons from "./addons.vue";
import AddonsCode from "./addons.vue?raw";

import Grouped from "./grouped.vue";
import GroupedCode from "./grouped.vue?raw";

import Horizontal from "./horizontal.vue";
import HorizontalCode from "./horizontal.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="addons">Addons</h3>
    <p>
        Use the <code>addons</code> prop to attach multiple controls together.
    </p>
    <ExampleViewer :component="Addons" :code="AddonsCode" />

    <h3 id="grouped">Grouped</h3>
    <p>
        Use the <code>grouped</code> prop to group several controls that belong
        together.
    </p>
    <ExampleViewer :component="Grouped" :code="GroupedCode" />

    <h3 id="horizontal">Horizontal</h3>
    <p>
        When the <code>horizontal</code> prop is set, the component will align
        horizontally.
    </p>
    <ExampleViewer :component="Horizontal" :code="HorizontalCode" />

    <h3 id="templates">Templates</h3>
    <p>
        The <code>label</code> and the <code>message</code> can be customised
        using template slots if needed.
    </p>
    <ExampleViewer :component="Templates" :code="TemplatesCode" />
</template>
