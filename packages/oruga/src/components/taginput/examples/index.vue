<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Autocomplete from "./autocomplete.vue";
import AutocompleteCode from "./autocomplete.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";

import Limits from "./limits.vue";
import LimitsCode from "./limits.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Disabled from "./disabled.vue";
import DisabledCode from "./disabled.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="autocomplete">Autocomplete</h3>
        <p>
            Unlike the dropdown or autocomplete components, the taginput
            component allows you to enter an arbitrary value (a value taht is
            not in the list of options). This is useful for creating new tags on
            the fly. To enable this feature, set the <code>allow-new</code> prop
            to true.
        </p>
        <p>
            The <code>options</code> prop can accept several different formats
            of values:
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
        <ExampleViewer :component="Autocomplete" :code="AutocompleteCode" />

        <h3 id="slots">Slots</h3>
        <p>Different parts of the component can be customised using slots.</p>
        <ExampleViewer :component="Slots" :code="SlotsCode" />

        <h3 id="limits">Limits</h3>
        <p>
            The number of entered items can be limited either by the character
            length of the item using the <code>maxlength</code> prop and by the
            number of times using the <code>maxitems</code> prop.
        </p>
        <ExampleViewer :component="Limits" :code="LimitsCode" />

        <h3 id="disabled">Disabled</h3>
        <p>Prevent inputs with the <code>disabled</code> prop.</p>
        <ExampleViewer :component="Disabled" :code="DisabledCode" />

        <h3 id="varaints">Variants</h3>
        <p>
            Different styles can be achieved with the <code>variant</code> prop.
        </p>
        <ExampleViewer :component="Variants" :code="VariantsCode" />
    </div>
</template>
