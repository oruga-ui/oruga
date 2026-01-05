<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";
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

    <h3 id="Selection">Selection</h3>
    <p>
        Trees can be "single-select", allowing users to choose just one item for
        an action, or "multi-select", where users are able to select more than
        one item for an action.
    </p>

    <h4 id="single">Single</h4>
    <p>
        When a single-select tree receives focus, if none of the tree items are
        selected before the tree receives focus, focus is set on the first node.
        If a tree item is selected before the tree receives focus, focus is set
        on the selected tree item.
    </p>

    <h4 id="multiple">Multiple</h4>
    <p>
        When a multi-select tree receives focus, if none of the tree items are
        selected before the tree receives focus, focus is set on the first tree
        item. If one or more tree items are selected before the tree receives
        focus, focus is set on the first selected node. In multi-select trees,
        the selected state is always independent of the focus. For example, in a
        typical file system navigator, the user can move focus to select any
        number of files for an action, such as copy or move. The visual design
        should make it clear which items are selected and which item has focus.
    </p>

    <h4 id="checkbox">Checkbox</h4>

    <h3 id="scrollable">Scrollable</h3>
</template>
