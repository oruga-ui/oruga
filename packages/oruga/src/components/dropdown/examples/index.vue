<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Triggers from "./triggers.vue";
import TriggersCode from "./triggers.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";

import Selectable from "./selectable.vue";
import SelectableCode from "./selectable.vue?raw";

import Scrollable from "./scrollable.vue";
import ScrollableCode from "./scrollable.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>The dropdown will be a simple unselectable menu list by default.</p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="triggers">Triggers</h3>
    <p>
        The component accepts several different trigger variants, such as open
        on hover or open only on right click instead of left click.
    </p>
    <p>
        Adding the <code>teleport</code> prop will move the dropdown menu to the
        referenced DOM location instead.
    </p>
    <ExampleViewer :component="Triggers" :code="TriggersCode" />

    <h3 id="options">Options</h3>
    <p>
        Instead of using the <code>&lt;o-dropdown-item&gt;</code> component
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

    <h3 id="selectable">Selectable</h3>
    <p>
        Components with the prop <code>selectable</code> will have options as a
        selectable list.
    </p>
    <p>
        Adding the <code>multiple</code> prop will change the
        <code>modelValue</code> prop to an array of selected options.
    </p>
    <ExampleViewer :component="Selectable" :code="SelectableCode" />

    <h3 id="inline">Inline</h3>
    <p>
        Components with the <code>inline</code> prop set will render the options
        list directly, and will not have a trigger element rendered.
    </p>
    <ExampleViewer :component="Inline" :code="InlineCode" />

    <h3 id="modal">Modal</h3>
    <p>
        The content can be opened in an <i>modal</i> mode either for mobile or
        desktop only, or for both, by adding the <code>mobile-modal</code> and
        <code>desktop-modal</code> props.
    </p>
    <ExampleViewer :component="Modal" :code="ModalCode" />

    <h3 id="scrollable">Scrollable</h3>
    <p>
        When having to many options, consider adding the
        <code>scrollable</code> prop, which allows the menu to remain at a fixed
        height.
    </p>
    <ExampleViewer :component="Scrollable" :code="ScrollableCode" />

    <h3 id="position">Position</h3>
    <p>
        The direction in which the dropdown menu opens can be defined by the
        <code>position</code> prop. By default, the direction is automatically
        calculated from the distance to the edge of the window. Adding the
        <code>teleport</code> prop additionally will move the dropdown menu to
        the referenced DOM location instead.
    </p>
    <ExampleViewer :component="Position" :code="PositionCode" />
</template>
