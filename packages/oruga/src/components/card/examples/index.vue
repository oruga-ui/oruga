<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

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
        A simple Card is created with a title property along with the content as
        children.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="slots">Slots</h3>
    <p>
        The component provides <code>header</code>, <code>title</code>,
        <code>subtitle</code>, <code>content</code> and <code>footer</code> as
        the named templates to place content.
    </p>
    <ExampleViewer :component="Slots" :code="SlotsCode" />

    <h3 id="image">Image</h3>
    <p>Cards can have an image<i>below</i> the header.</p>
    <ExampleViewer :component="Image" :code="ImageCode" />

    <h3 id="form">Form</h3>
    <p>
        Cards can be used to display a user form. They are ideal for use with
        the modal component.
    </p>
    <ExampleViewer :component="Form" :code="FormCode" />
</template>
