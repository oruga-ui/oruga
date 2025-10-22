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
</template>
