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
        Listboxes are great and accessible select menus for your app, complete
        with robust support for keyboard navigation and, unlike HTML
        <code>&lt;select&gt;</code> elements, may contain images. The
        <code>v-model</code> can be used to bind the selected value. By default
        the component allows a single option to be chosen.
    </p>

    <div class="info custom-block">
        <p class="custom-block-title">Accessibility Note:</p>
        When assistive technologies present a listbox, the name of an option is
        calculated by the browser as a flat string. Therefore, the content of an
        option should not contain any semantic information, such as a heading.
        In addition, assistive technologies does not provide an accessible way
        to present a list of interactive elements for the listbox role, such as
        links, buttons, or checkboxes.
    </div>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="multiple">Multiple</h3>
    <p>
        When the
        <code>multiple</code> prop is used, the component become a multi-select
        listbox that allows multiple options to be selected. The
        <code>v-model</code> now contains a list of all selected items.
    </p>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="options">Options</h3>
    <p>
        Instead of using the <code>&lt;o-list-item&gt;</code> component directly
        inside the default slot, an <code>options</code> prop can be defined,
        which can be used to specify the options programmatically. It accepts
        several different formats of values:
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
        The component provides a built-in filtering feature, which can be
        enabled by adding the <code>filterable</code> property. A custom filter
        function can be defined using the <code>filter</code> property. By
        default, a lowercased label string comparison is performed.
    </p>
    <ExampleViewer :component="Filterable" :code="FilterableCode" />

    <h3 id="scroll">Slots</h3>
    <p>
        A custom header and footer can be added before and after the options
        list by using the <code>header</code> and <code>footer</code> slots. You
        can also display content, when no options are visible, either because
        there are no options or because they are hidden through filtering, using
        the <code>empty</code> slot.
    </p>
    <ExampleViewer :component="Slots" :code="SlotsCode" />

    <h3 id="scroll">Infinite Scroll & Async Data</h3>
    <p>
        When having to many options, consider adding a max height using the
        <code>scrollHeight</code> property, which allows to cap the list at a
        fixed <code>max-height</code>. This will render a long list of options
        with a scrollbar. The component will emit a <code>scroll-start</code> or
        <code>scroll-end</code> event, when the top or bottom of the list is
        reached. These events can be used to load more options as needed.
        Consider adding <code>backend-filtering</code> when updating options
        manually in response to changes in the filter value.
    </p>
    <ExampleViewer :component="Scroll" :code="ScrollCode" />
</template>
