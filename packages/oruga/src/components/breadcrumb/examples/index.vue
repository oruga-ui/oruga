<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import Separators from "./separators.vue";
import SeparatorsCode from "./separators.vue?raw";

import Icons from "./icons.vue";
import IconsCode from "./icons.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Positions from "./positions.vue";
import PositionsCode from "./positions.vue?raw";

import Tags from "./tags.vue";
import TagsCode from "./tags.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        Since breadcrumbs provide a navigation, it's a good idea to add a
        meaningful label such as <code>aria-label="breadcrumb"</code> to
        describe the type of navigation provided in the
        <code>nav</code> element. To determine the current page, set the
        <code>active</code> prop. This applies an
        <code>aria-current="page"</code> to the item to indicate that it
        represents the current page. Individual items can also be disabled using
        the <code>disabled</code> prop.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="separators">Separators</h3>
    <p>
        Dividers are automatically added in CSS by the theme. In addition, the
        component allows you to customise the seperator using the
        <code>seperator</code> prop. The <code>seperator</code> slot can be used
        if further customisation is needed.
    </p>
    <ExampleViewer :component="Separators" :code="SeparatorsCode" />

    <h3 id="options">Options</h3>
    <p>
        Instead of using the <code>&lt;o-breadcrumb-item&gt;</code> component
        directly inside the default slot, an <code>options</code> prop can be
        set, which allows the options to be set programmatically. It accepts
        several different formats of values:
    </p>
    <ul>
        <li>An array of primitives <code>['A', 'B', 'C']</code></li>
        <li>
            An array of objects with <code>label</code> and
            <code>attrs</code> properties
        </li>
    </ul>
    <ExampleViewer :component="Options" :code="OptionsCode" />

    <h3 id="variants">Variants</h3>
    <p>Different styles can be achieved with the <code>variant</code> prop.</p>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="sizes">Sizes</h3>
    <p>
        The component can be displayed in different sizes using the
        <code>size</code> prop.
    </p>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="positions">Positions</h3>
    <p>
        For alternative alignments, the breadcrumb can be positioned by the
        <code>position</code> prop.
    </p>
    <ExampleViewer :component="Positions" :code="PositionsCode" />

    <h3 id="icons">Icons</h3>
    <p>
        You can add an icon to the item to explain its function more visually.
    </p>
    <ExampleViewer :component="Icons" :code="IconsCode" />

    <h3 id="tags">Tags</h3>
    <p>
        By default the breadcrumb items are represented as HTML
        <code>a</code> tag elements. The HTML tag can be customised using the
        <code>tag</code> prop for an item, for example to define links using
        <a href="https://router.vuejs.org/" target="_blank">vue-router</a> and
        <code>router-link</code> tag.
    </p>
    <ExampleViewer :component="Tags" :code="TagsCode" />
</template>
