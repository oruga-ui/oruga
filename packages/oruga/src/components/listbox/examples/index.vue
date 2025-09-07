<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import Filterable from "./filterable.vue";
import FilterableCode from "./filterable.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";

import Scroll from "./scroll.vue";
import ScrollCode from "./scroll.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        Listboxes are a great and accessible select menus for your app, 
        complete with robust support for keyboard navigation.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="multiple">Multiple</h3>
    <p>
         Listbox is used with the <code>v-model</code> prop for two-way value and can be used to select one or more values from a list of items.
        </p>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="options">Options</h3>
    <p>
        Instead of using the <code>&lt;o-list-item&gt;</code> component
        directly inside the default slot, an <code>options</code> prop can be
        defined, which can be used to define the options programmatically. It
        accepts several different formats of values:
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

    <h3 id="filterable">Filterable</h3>
    <p>
        Listbox provides built-in filtering that is enabled by adding the
        <code>filterable</code> property.
    </p>
    <ExampleViewer :component="Filterable" :code="FilterableCode" />
    
    <h3 id="scroll">Slots</h3>
    <p>
        A header and a footer can be added before and after the options list by using the
        <code>header</code> and <code>footer</code> slots.
        You can also display some content, when no options are visible, ether by not having any optins or by not showing them through filtering using the <code>emty</code> slot.
    </p>
    <ExampleViewer :component="Slots" :code="SlotsCode" />

    <h3 id="scroll">Scroll</h3>
    <p>
        The list box is capped on a <code>max-height</code> with the <code>scrollHeight</code> prop. 
        A long list of options will be rendere with a scrollbar. 
    </p>
    <ExampleViewer :component="Scroll" :code="ScrollCode" />
</template>
