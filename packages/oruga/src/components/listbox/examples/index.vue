<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import Filterable from "./filterable.vue";
import FilterableCode from "./filterable.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

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
        inside the default template slot, an <code>options</code> prop can be
        defined, which can be used to specify the options programmatically. It
        accepts several different formats of values:
    </p>
    <ul>
        <li>An array of primitives <code>['A', 'B', 'C']</code></li>
        <li>
            An object literal with key-value pairs
            <code>{ a: 'A', b: 'B', c: 'C' }</code>
        </li>
        <li>An array of objects where each object represent an item</li>
        <li>
            An array of grouped items where each group object has its own
            <code>options</code> property
        </li>
    </ul>

    <div class="info custom-block">
        <p class="custom-block-title">TypeScript</p>
        <p>
            The options property type is defined by the
            <code>ListboxOptions</code> type.
        </p>
    </div>

    <h4 id="options-primitives">Array of primitives</h4>
    <p>
        The simplest way to provide options is an array of primitives like
        strings or numbers, where the primitive will be used for both the string
        casted <code>label</code> representation and the <code>value</code> of
        the option.
    </p>
    <ExampleViewer
        :component="OptionsPrimitives"
        :code="OptionsPrimitivesCode" />

    <h4 id="options-object">Key-Value pair object</h4>
    <p>
        You may also provide the <code>options</code> prop where the keys are
        values and the values of each property are the labels.
    </p>
    <ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

    <h4 id="options-array">Array of objects</h4>
    <p>
        The most flexible way to define options is to provide an array of
        objects. The object has the same properties as the
        <code>&lt;o-list-item&gt;</code> component.
    </p>
    <ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

    <h4 id="options-grouped">Grouped options</h4>
    <p>
        You can also use the array of objects syntax to create grouped options,
        wrapping each group of options in an object with a
        <code>label</code> and an <code>options</code> property. You can also
        define an <code>attrs</code> property for additional attributes, which
        will be applied to the group header option.
    </p>
    <ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

    <h3 id="filterable">Filterable</h3>
    <p>
        The component provides a built-in filtering feature, which can be
        enabled by adding the <code>filterable</code> property. A custom filter
        function can be defined using the <code>filter</code> property. By
        default, a lowercased label string comparison is performed.
    </p>
    <ExampleViewer :component="Filterable" :code="FilterableCode" />

    <h3 id="templates">Templates</h3>
    <p>
        A custom header and footer can be added before and after the options
        list by using the <code>header</code> and <code>footer</code> template
        slots. You can also display content, when no options are visible, either
        because there are no options or because they are hidden through
        filtering, using the <code>empty</code> template slot.
    </p>
    <ExampleViewer :component="Templates" :code="TemplatesCode" />

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
