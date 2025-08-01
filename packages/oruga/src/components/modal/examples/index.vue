<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Alert from "./alert.vue";
import AlertCode from "./alert.vue?raw";

import Component from "./component.vue";
import ComponentCode from "./component.vue?raw";

import Teleport from "./teleport.vue";
import TeleportCode from "./teleport.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";

import ProgrammaticallyAsync from "./programmatically-async.vue";
import ProgrammaticallyAsyncCode from "./programmatically-async.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        Setting the <code>clipScroll</code> prop removes the body scrollbar. By
        default, the body retains a non scrollable scrollbar to prevent the
        background from shifting. However, this will set the body to
        <code>position="fixed"</code>, which may cause some layouts to break.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="alert">Alert</h3>
    <p>
        An alert modal interrupt the user's workflow to communicate an important
        messages and acquire an explicit response, for example confirmation
        prompts and error message confirmations. By setting
        <code>alert</code> prop the <code>alertdialog</code> aria role enables
        assistive technologies and browsers to distinguish alert dialogs from
        other dialogs so they have the option of giving alert dialogs special
        treatment, such as playing a system alert sound.
    </p>
    <ExampleViewer :component="Alert" :code="AlertCode" />

    <h3 id="teleport">Teleport</h3>
    <p>
        The <code>teleport</code> prop allows the modal to be "teleported" into
        any DOM node outside the DOM hierarchy of that component. By default, if
        only a boolean is passed, the modal will be teleported to the document
        body. In addition, any other destination can be passed as a value to the
        <code>teleport</code> prop.
    </p>
    <ExampleViewer :component="Teleport" :code="TeleportCode" />

    <h3 id="component">Dynamic Component</h3>
    <p>
        Instead of using the default slot, the <code>component</code> prop
        allows to pass any component that will be programmatically rendered
        inside the modal. Furthermore, an inline component created with a
        <a href="https://vuejs.org/guide/extras/render-function.html">
            render function
        </a>
        can also be passed. Props and events can be passed to the component with
        <code>props</code> and <code>events</code> props too.
    </p>
    <ExampleViewer :component="Component" :code="ComponentCode" />

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
    oruga.modal.open({...});
        </pre>
    </div>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
    <br />

    <p>
        A programmatic instance returns a promise to await for. The promise gets
        resolved when the modal gets closed.
    </p>
    <ExampleViewer
        :component="ProgrammaticallyAsync"
        :code="ProgrammaticallyAsyncCode" />
</template>
