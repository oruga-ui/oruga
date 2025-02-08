<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import CustomHeader from "./custom-header.vue";
import CustomHeaderCode from "./custom-header.vue?raw";

import LongHeader from "./long-header.vue";
import LongHeaderCode from "./long-header.vue?raw";

import Vertical from "./vertical.vue";
import VerticalCode from "./vertical.vue?raw";

import Expanded from "./expanded.vue";
import ExpandedCode from "./expanded.vue?raw";

import Types from "./types.vue";
import TypesCode from "./types.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <p>
            Each item component can have a <code>value</code> prop. The active
            tab is represented by the value of the item as the
            <code>modelValue</code> prop of the tabs component.
        </p>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="types">Types</h3>
        <p>
            The tabs header can be displayed in different styles using the
            <code>type</code> prop.
        </p>
        <ExampleViewer :component="Types" :code="TypesCode" />

        <h3 id="position">Position</h3>
        <p>
            The tabs header can be positioned by the <code>position</code> prop.
        </p>
        <ExampleViewer :component="Position" :code="PositionCode" />

        <h3 id="expanded">Expanded</h3>
        <p>
            When the <code>expanded</code> prop is set, the tabs header will be
            occupy the full with it can have.
        </p>
        <ExampleViewer :component="Expanded" :code="ExpandedCode" />

        <h3 id="sizes">Sizes</h3>
        <p>
            The component can be displayed in different sizes using the
            <code>size</code> prop.
        </p>
        <ExampleViewer :component="Sizes" :code="SizesCode" />

        <h3 id="vertical">Vertical</h3>
        <p>
            Adding the <code>vertical</code> prop displays the component
            vertically instead of horizontally.
        </p>
        <ExampleViewer :component="Vertical" :code="VerticalCode" />

        <h3 id="custom">Custom header</h3>
        <p>
            The individual tab label can be customised using the
            <code>header</code> slot.
        </p>
        <ExampleViewer :component="CustomHeader" :code="CustomHeaderCode" />

        <h3 id="long">Long header</h3>
        <p>
            The <code>multiple</code> prop allows to break the tab header to be
            broken into multiple lines if there are too many tabs for one line.
        </p>
        <ExampleViewer :component="LongHeader" :code="LongHeaderCode" />
    </div>
</template>
