<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Closeable from "./closeable.vue";
import CloseableCode from "./closeable.vue?raw";

import Badge from "./badge.vue";
import BadgeCode from "./badge.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="closeable">Closeable</h3>
    <p>
        Closeable tags have a button that can be focused, it emits a
        <code>close</code> event when clicked. The button can be overriden by
        the <code>close</code> slot.
    </p>
    <ExampleViewer :component="Closeable" :code="CloseableCode" />

    <h3 id="badge">Badge</h3>
    <p>
        Using the badge style with the <code>badge</code> prop can highlight
        information to a user or draw their attention to a specific element.
        Badges typically display numbers or icons.
    </p>
    <ExampleViewer :component="Badge" :code="BadgeCode" />

    <h3 id="varaints">Variants</h3>
    <p>
        Like with buttons, different styles can be achieved with the
        <code>variant</code> prop.
    </p>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="sizes">Sizes</h3>
    <p>
        The component can also be displayed in different sizes using the
        <code>size</code> prop.
    </p>
    <ExampleViewer :component="Sizes" :code="SizesCode" />
</template>
