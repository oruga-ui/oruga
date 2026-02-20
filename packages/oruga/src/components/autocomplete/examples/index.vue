<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

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
        There are several ways to define options for the component. They are
        similiar to the options definition of the
        <a href="/components/dropdown.html">
            <b>Dropdown</b>
        </a>
        component:
    </p>
    <ul>
        <li>An array of primitives <code>['A', 'B', 'C']</code></li>
        <li>
            An object literal with key-value pairs
            <code>{ a: 'A', b: 'B', c: 'C' }</code>
        </li>
        <li>An array of item objects where each object represent an item</li>
        <li>
            An array of grouped items where each group object has its own
            <code>options</code> property
        </li>
        <li>
            Using the native <code>&lt;o-dropdown-item&gt;</code>
            component directly inside the default template slot
        </li>
    </ul>

    <div class="info custom-block">
        <p class="custom-block-title">TypeScript</p>
        <p>
            The options property type is defined by the
            <code>AutocompleteOptions</code> type.
        </p>
    </div>

    <h4 id="options-array">Array of objects</h4>
    <p>
        The most flexible way to define options is to provide an array of
        objects. The object has the same properties as the
        <code>&lt;o-dropdown-item&gt;</code> component.
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

    <h3 id="templates">Templates</h3>
    <p>
        Instead of using the <code>options</code> prop the options can also be
        defined by using the <code>o-dropdown-item</code> component in the
        <code>default</code> template slot. Additionally a header and a footer
        can be added to the options list by using the <code>header</code> and
        <code>footer</code> template slots. The header and footer can be made
        clickable by adding the <code>selectable-header</code> and
        <code>selectable-footer</code> props. Clicking them will clear the
        input.
    </p>
    <div class="info custom-block">
        <p class="custom-block-title">Known limitations</p>
        <p>
            Due to the way the Vue reactivity system works, it is not possible
            to define a JavaScript object for the <code>value</code> property of
            the <code>o-dropdown-item</code> component directly in the template
            block. This will result in a recursive rendering error. In order to
            use an object as a value, the object must be defined as variable in
            the script block. (See
            <a href="https://github.com/oruga-ui/oruga/issues/1531">
                <!-- eslint-disable-next-line vue/html-closing-bracket-newline -->
                Issue #1531</a
            >)
        </p>
    </div>
    <ExampleViewer :component="Templates" :code="TemplatesCode" />

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
