<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import Teleport from "./teleport.vue";
import TeleportCode from "./teleport.vue?raw";

import Component from "./component.vue";
import ComponentCode from "./component.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        The sidebar can be positioned go appear from each side of the viewport
        using the <code>position</code> prop. Using <code>fullwidht</code> or
        <code>fullheight</code>, the sidebar overlaps the entire viewport width
        or height.
    </p>

    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="inline">Inline</h3>
    <p>
        When the property <code>inline</code> is set, the component will be
        rendered in place. The appearance can be triggered with the
        <code>active</code> prop as usual.
    </p>
    <ExampleViewer :component="Inline" :code="InlineCode" />

    <h3 id="base">Teleport</h3>
    <p>
        The <code>teleport</code> prop allows the sidebar to be "teleported"
        into any DOM node outside the DOM hierarchy of that component. By
        default, if only a boolean is passed, the sidebar will be teleported to
        the document body. In addition, any other destination can be passed as a
        value to the <code>teleport</code> prop.
    </p>
    <ExampleViewer :component="Teleport" :code="TeleportCode" />

    <h3 id="component">Dynamic Prop</h3>
    <p>
        Instead of using the default slot, the <code>component</code> prop
        allows to pass any component that will be programmatically rendered
        inside the sidebar. Furthermore, an inline component created with a
        <a href="https://vuejs.org/guide/extras/render-function.html">
            render function
        </a>
        can also be passed. Props and events can be passed to the component with
        <code>props</code> and <code>events</code> props too.
    </p>
    <ExampleViewer :component="Component" :code="ComponentCode" />

    <h3 id="programmatically">Programmatically</h3>
    <p>
        This component provides a programmatic interface that can be accessed by
        the
        <a href="/documentation/composables.html"><code>useOruga()</code> </a>
        composable.
    </p>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
</template>
