<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import OptionsNative from "./options-native.vue";
import OptionsNativeCode from "./options-native.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import WithIcons from "./with-icons.vue";
import WithIconsCode from "./with-icons.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="options">Options</h3>
    <div class="vp-doc">
        <p>There are several ways to provide options for a select input:</p>
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
                Using the native
                <code>&lt;option&gt;</code>
                tags directly inside the default slot.
            </li>
        </ul>
    </div>

    <h4 id="options-primitives">Array of primitives</h4>
    <div class="vp-doc">
        <p>
            The simplest way to provide options is an array of primitives like
            strings or numbers, where the primitive will be used for both
            thestring casted <code>label</code> representation and the
            <code>value</code> of the option.
        </p>
    </div>
    <ExampleViewer
        :component="OptionsPrimitives"
        :code="OptionsPrimitivesCode" />

    <h4 id="options-object">Key-Value pair object</h4>
    <div class="vp-doc">
        <p>
            You may also provide the <code>options</code> prop where the keys
            are values and the values of each property are labels.
        </p>
    </div>
    <ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

    <h4 id="options-array">Array of objects</h4>
    <div class="vp-doc">
        <p>
            The most flexible way to define options is to provide an array of
            objects. The object is defined as: <br />
            <code>{ value: any, label: string, attrs?: object }</code>
            <br />
            The
            <code>value</code> attribute is the real value which will be used by
            the <code>v-model</code> property and other events. The
            <code>label</code> attribute is the visible representation of the
            option. The <code>attrs</code> attribute is an object for additional
            attributes, which will be applied to the option item tag.
        </p>
    </div>
    <ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

    <h4 id="options-grouped">Option groups</h4>
    <div class="vp-doc">
        <p>
            Using the array of objects syntax you can also create grouped
            options (<code>&lt;optgroup&gt;</code> in HTML) by adding an
            <code>options</code> property to the object option.
        </p>
    </div>
    <ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

    <h4 id="options-native">Default Slot</h4>
    <div class="vp-doc">
        <p>
            Sometimes it may be desirable to manually output the contents of a
            select list in order to create specialized structures. This can be
            done by using the <code>default</code> slot to explicitly output
            your options like the native HTML select element.
        </p>
    </div>
    <ExampleViewer :component="OptionsNative" :code="OptionsNativeCode" />

    <h3 id="multiple">Multiple</h3>
    <div class="vp-doc">
        <p>
            The <b>select</b> input also supports a
            <code>multiple</code> attribute that allows for multi-selection.
            When used the <code>v-model</code> attribute will be an array of
            values.
        </p>
        <div class="info custom-block">
            <p class="custom-block-title">Accessibility Notes</p>
            <p>
                Select inputs with the <code>multiple</code> attribute can be
                challenging for some users because they require holding-down the
                control or command keys to perform multiple selections.
                Depending on your audience, you may want to consider using a
                <a href="/components/Checkbox.html#array">
                    <b>checkbox input</b>
                </a>
                instead.
            </p>
        </div>
    </div>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="sizes">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="icons">With Icons</h3>
    <ExampleViewer :component="WithIcons" :code="WithIconsCode" />
</template>
