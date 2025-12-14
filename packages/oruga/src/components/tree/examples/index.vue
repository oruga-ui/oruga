<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Links from "./links.vue";
import LinksCode from "./links.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="links">Links</h3>
    <p>
        Instead of using the HTML <code>button</code> tag, the HTML tag can be
        customised using the <code>tag</code> prop.
    </p>
    <ExampleViewer :component="Links" :code="LinksCode" />

    <h3 id="options">Options</h3>
    <p>
        Instead of using the <code>&lt;o-menu-item&gt;</code> component directly
        inside the default slot, an <code>options</code> prop can be set, which
        can be used to define the options programmatically. It accepts several
        different formats of values:
    </p>
    <ul>
        <li>An array of primitives <code>['A', 'B', 'C']</code></li>
        <li>
            An object literal with key-value pairs
            <code>{ a: 'A', b: 'B', c: 'C' }</code>
        </li>
        <li>
            An array of objects with <code>label</code> and
            <code>value</code> properties
        </li>
        <li>
            Grouped options by adding additional
            <code>options</code> to the option object.
        </li>
    </ul>

    <div class="info custom-block">
        <p class="custom-block-title">Note</p>
        <p>
            The <code>options</code> prop works the same as the
            <a href="/components/select.html">
                <b>Select</b>
            </a>
            input component <code>options</code> prop.
        </p>
    </div>
    <ExampleViewer :component="Options" :code="OptionsCode" />
</template>
