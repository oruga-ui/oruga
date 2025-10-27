<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Confirm from "./confirm.vue";
import ConfirmCode from "./confirm.vue?raw";

import Image from "./image.vue";
import ImageCode from "./image.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";

import Form from "./form.vue";
import FormCode from "./form.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        A simple dialog is created with a <code>title</code> and
        <code>content</code> property.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="confirm">Confirm Check</h3>
    <p>
        The component can be used to require decisions or show critical
        information. Using the <code>confirmButton</code> and
        <code>cancelButton</code> properties confirm checks can be made.
    </p>
    <ExampleViewer :component="Confirm" :code="ConfirmCode" />

    <h3 id="slots">Slots</h3>
    <p>
        The component provides <code>header</code>, <code>title</code>,
        <code>subtitle</code>, <code>content</code>, <code>footer</code> as well
        as <code>confirmButton</code> and <code>cancelButton</code> named slots
        templates to customise HTML content.
    </p>
    <ExampleViewer :component="Slots" :code="SlotsCode" />

    <h3 id="image">Image</h3>
    <p>You can place an image <i>below</i> the header.</p>
    <ExampleViewer :component="Image" :code="ImageCode" />

    <h3 id="form">Form</h3>
    <p>A useful purpose for a dialog is to display forms in it.</p>
    <ExampleViewer :component="Form" :code="FormCode" />

    <h3 id="programmatically">Programmatically</h3>
    <p>
        This component provides a programmatic interface that can be accessed by
        the
        <a href="/documentation/composables.html">
            <code>useOruga()</code>
        </a>
        composable. The composable can be used from outside of the Vue instance.
        For example, it can be used in Pinia or Vue Router with this syntax:
    </p>

    <div class="language-js">
        <pre>
    import { useOruga } from "@oruga-ui/oruga-next";
    const oruga = useOruga();
    oruga.dialog.open({...});
        </pre>
    </div>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
    <br />
</template>
