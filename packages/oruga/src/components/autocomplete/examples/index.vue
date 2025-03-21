<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";

import Selection from "./selection.vue";
import SelectionCode from "./selection.vue?raw";

import Scroll from "./scroll.vue";
import ScrollCode from "./scroll.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="selection">Selection</h3>
    <p>
        The autocomplete input can only contain one item at a time. For the
        multiple selection version, see the
        <a href="/components/taginput.html">
            <b>Taginput</b>
        </a>
        component.
    </p>
    <ExampleViewer :component="Selection" :code="SelectionCode" />

    <h3 id="options">Options</h3>
    <p>
        The <code>options</code> prop can accept several different formats of
        values:
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
    <ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

    <h3 id="scroll">Slots</h3>
    <p>
        A header and a footer can be added to the options list by using the
        <code>header</code> and <code>footer</code> slots. The header and footer
        can be made clickable by adding the <code>selectable-header</code> and
        <code>selectable-footer</code> props. Clicking them will clear the
        input.
    </p>
    <ExampleViewer :component="Slots" :code="SlotsCode" />

    <h3 id="scroll">Infinite Scroll & Async Data</h3>
    <p>
        When <code>check-scroll</code> prop is set, the component will emits the
        <code>scroll-start</code> and <code>scroll-end</code> events. These
        events can be used to load more options as needed. Consider adding
        <code>backend-filtering</code> when manually updating options on input
        values changes.
    </p>
    <div class="info custom-block">
        <p class="custom-block-title">Note</p>
        <p>
            The autocomplete component does not have a default slot for defining
            options. The default slot is used to override the option element
            template.
        </p>
    </div>
    <ExampleViewer :component="Scroll" :code="ScrollCode" />
</template>
