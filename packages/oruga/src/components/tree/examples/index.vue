<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import Selection from "./selection.vue";
import SelectionCode from "./selection.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Scrollable from "./scrollable.vue";
import ScrollableCode from "./scrollable.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        The component allows the user to select one or more items from a
        hierarchically organized collection. For example, a file system
        navigator that uses a tree view, each item displays a folder or file.
        Folder items can be expanded to reveal the contents of the folder, which
        may be files, folders, or both.
    </p>
    <div class="info custom-block">
        <p class="custom-block-title">Accessibility Note:</p>
        A tree view is primarily navigated with <i>arrow</i> keys on the
        keyboard instead of the <i>tab</i> key. This form of navigation is more
        similar to native applications than to web applications. For this
        reason, consider alternative options to address the functionality you
        need before using a tree component. A tree component is at the most
        times not needed for typical site navigation that is styled to look like
        a tree with expandable sections.
    </div>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="options">Options</h3>
    <p>
        Instead of using the <code>&lt;o-tree-item&gt;</code> component directly
        inside the default template slot, an <code>options</code> prop can be
        set, which can be used to define the options programmatically. It
        accepts several different formats of values:
    </p>
    <ul>
        <li>An array of primitives <code>['A', 'B', 'C']</code></li>
        <li>
            An object literal with key-value pairs
            <code>{ a: 'A', b: 'B', c: 'C' }</code>
        </li>
        <li>An array of objects where each object represent an item</li>
    </ul>

    <div class="info custom-block">
        <p class="custom-block-title">TypeScript</p>
        <p>
            The options property type is defined by the
            <code>TreeOptions</code> type.
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

    <h3 id="Selection">Selection</h3>
    <p>
        When setting the <code>selectable</code> property, users can select any
        item. The current selected item value is available in the
        <code>modelValue</code> property. In "multi-select" trees users are able
        to select more than one item.
    </p>

    <h4 id="single">Single</h4>
    <p>
        When a single-select tree receives focus, if none of the tree items are
        selected before the tree receives focus, focus is set on the first node.
        If a tree item is selected before the tree receives focus, focus is set
        on the selected tree item.
    </p>
    <ExampleViewer :component="Selection" :code="SelectionCode" />

    <h4 id="multiple">Multiple</h4>
    <p>
        You can enable multi-select with the <code>multiple</code> property. In
        multi-select trees, the selected state is always independent of the
        focus. For example, in a typical file system navigator, the user can
        move focus to select any number of files for an action, such as copy or
        move. The visual design should make it clear which items are selected
        and which item has focus. When a multi-select tree receives focus, if
        none of the tree items are selected before the tree receives focus,
        focus is set on the first tree item. If one or more tree items are
        selected before the tree receives focus, focus is set on the first
        selected node.
    </p>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <!-- <h4 id="checkbox">Checkbox</h4> -->

    <h3 id="scrollable">Scrollable</h3>
    <p>
        When having to many options, consider adding a max height using the
        <code>scrollHeight</code> property, which allows to cap the tree at a
        fixed <code>max-height</code>. This will render a long tree of options
        with a scrollbar. The component will emit a <code>scroll-start</code> or
        <code>scroll-end</code> event, when the top or bottom of the tree is
        reached.
    </p>
    <ExampleViewer :component="Scrollable" :code="ScrollableCode" />

    <h3 id="templates">Templates</h3>
    <p>
        The item label can be customised using the <code>label</code> template
        slot.
    </p>
    <ExampleViewer :component="Templates" :code="TemplatesCode" />
</template>
