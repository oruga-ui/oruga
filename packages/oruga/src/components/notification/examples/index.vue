<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import UseTypes from "./use-types.vue";
import UseTypesCode from "./use-types.vue?raw";

import AddCustomButtons from "./add-custom-buttons.vue";
import AddCustomButtonsCode from "./add-custom-buttons.vue?raw";

import ProgrammaticallyDefault from "./programmatically-default.vue";
import ProgrammaticallyDefaultCode from "./programmatically-default.vue?raw";

import ProgrammaticallyToast from "./programmatically-toast.vue";
import ProgrammaticallyToastCode from "./programmatically-toast.vue?raw";

import ProgrammaticallyCustom from "./programmatically-custom.vue";
import ProgrammaticallyCustomCode from "./programmatically-custom.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>

    <p>
        When a dialogue box seems a bit overkill for the task, notifications are
        a good way to display a simple message to inform the user.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="variants">Variants</h3>
    <p>Different styles can be achieved with the <code>variant</code> prop.</p>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="types">Use types</h3>
    <p>
        The <code>type</code> prop in combination with the
        <code>variant</code> prop adds specific icons to the notification.
    </p>
    <ExampleViewer :component="UseTypes" :code="UseTypesCode" />

    <h3 id="custom">Add custom buttons</h3>
    <ExampleViewer :component="AddCustomButtons" :code="AddCustomButtonsCode" />

    <h3 id="programmatically">Programmatically</h3>
    <p>
        This component provides a programmatic interface that can be accessed by
        the
        <a href="/documentation/composables.html">
            <code>useOruga()</code>
        </a>
        composable. The composable can be used from outside the Vue instance.
        For example, it can be used in Pinia or Vue Router with this syntax:
    </p>

    <div class="language-js">
        <pre>
    import { useOruga } from "@oruga-ui/oruga-next";
    const oruga = useOruga();
    oruga.notification.open('Notify!');
        </pre>
    </div>
    <ExampleViewer
        :component="ProgrammaticallyDefault"
        :code="ProgrammaticallyDefaultCode" />
    <br />

    <p>
        Toasts are lightweight notifications designed to resemble the push
        notifications popularised by mobile and desktop operating systems. They
        should consist of simple text only and be queued so as not to overwhelm
        the user.
    </p>
    <ExampleViewer
        :component="ProgrammaticallyToast"
        :code="ProgrammaticallyToastCode" />
    <br />

    <p>
        For a more advanced experience, you can also pass any custom component
        via the <code>component</code> prop.
    </p>
    <ExampleViewer
        :component="ProgrammaticallyCustom"
        :code="ProgrammaticallyCustomCode" />
</template>
