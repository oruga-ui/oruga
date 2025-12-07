<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";

import Alert from "./alert.vue";
import AlertCode from "./alert.vue?raw";

import Form from "./form.vue";
import FormCode from "./form.vue?raw";

import Fullscreen from "./fullscreen.vue";
import FullscreenCode from "./fullscreen.vue?raw";

import Image from "./image.vue";
import ImageCode from "./image.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";

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
        A dialog is seperated into <i>header</i>, <i>body</i> and
        <i>footer</i> sections, which can be defined separately either through
        properties or template slots.
        <br />
        Be sure to provide a mechanism that allows users to close the dialog.
        The most reliable way to enable all users to close the dialogue box is
        to include an explicit button for this purpose, such as a 'Confirm',
        'Cancel' or 'Close' button. The component specifies different types of
        user action that can be used to close the dialogue box. The main
        <code>closeable</code> property will add a close button to the dialog
        header. The <code>closeOnBackdrop</code> property adds a a light dismiss
        user action, which closes the dialog box when the user clicks or taps
        outside of it. The <code>closeOnEscape</code> property allows
        platform-specific user actions, such as pressing the <kbd>ESC</kbd> key
        on desktop platforms, or performing a "back" or "dismiss" gesture on
        mobile platforms, to close the dialog box. Furthermore, by setting the
        <code>cancelButton</code> or <code>confirmButton</code> properties,
        associated buttons will be rendered in the footer section. With
        <code>closeOnConfirm</code>, the confirm button can also be used to
        close the dialog.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="modal">Modal</h3>
    <p>
        A simple <i>modal</i> dialog box is created by setting the
        <code>backdrop</code> property, which inert the background. By default,
        attempting to interact with the backdrop closes the dialog box. Setting
        the <code>blockScroll</code> property removes the body scrollbar.
        However, the body retains a non-scrollable scrollbar to prevent the
        background from shifting. This will set the body to
        <code>position="fixed"</code>, which may cause some layouts to break.
    </p>
    <ExampleViewer :component="Modal" :code="ModalCode" />

    <h3 id="alert">Alert</h3>
    <p>
        An <i>alert</i> dialog box is a modal dialog that interrupts the user's
        workflow to communicate an important message and acquire a response. It
        is defined by setting the <code>alert</code> property. Examples include
        action confirmation prompts and error message confirmations. The dialog
        will have the <code>alertdialog</code> <i>WAI-ARIA role</i>, enabling
        assistive technologies and browsers to distinguish it from other dialogs
        and giving them the option to treat it specially, e.g. by playing a
        system alert sound.
    </p>
    <ExampleViewer :component="Alert" :code="AlertCode" />

    <h3 id="form">Form</h3>
    <p>
        One useful purpose of a dialog is to display forms within it. Each slot
        provides the <code>close()</code> and <code>confirm()</code>functions,
        which can be called from inside the slot content to trigger component
        events. Using the
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus"
            target="_blank">
            <code>autofocus</code>
        </a>
        attribute to explicitly indicate the initial focus placement will help
        ensure the focus is initially set on the focusable element deemed to be
        the best initial focus placement for any particular dialog.
    </p>
    <ExampleViewer :component="Form" :code="FormCode" />

    <h3 id="fullscreen">Fullscreen</h3>
    <p>
        Another variant of the component is the option to display a dialog that
        covers the full user viewport, which is available via the
        <code>fullscreen</code> property.
    </p>
    <ExampleViewer :component="Fullscreen" :code="FullscreenCode" />

    <h3 id="image">Image</h3>
    <p>
        The component provides a separate image section in the
        <i>body</i> where an image can be placed using the
        <code>imageSrc</code> property. For accessibility reasons, don't forget
        to add an <code>imageAlt</code> property too.
    </p>
    <ExampleViewer :component="Image" :code="ImageCode" />

    <h3 id="position">Position</h3>
    <p>
        You can quickly change the alignment of all the text in the dialog box
        using the <code>textPosition</code> property. Additionally, you can
        align the footer buttons independently using the
        <code>buttonPosition</code> property.
    </p>
    <ExampleViewer :component="Position" :code="PositionCode" />

    <h3 id="slots">Slots</h3>
    <p>
        The component provides <code>header</code>, <code>title</code>,
        <code>subtitle</code>, <code>content</code>, <code>footer</code> as well
        as <code>confirmButton</code> and <code>cancelButton</code> named slots
        templates to customise HTML content.
    </p>
    <ExampleViewer :component="Slots" :code="SlotsCode" />

    <h3 id="component">Dynamic Component</h3>
    <p>
        Rather than using the default slot, the <code>component</code> prop
        allows to pass any component that will be programmatically rendered
        inside the dialog component. Furthermore, an inline component created
        with a
        <a href="https://vuejs.org/guide/extras/render-function.html">
            render function
        </a>
        can also be passed. Props and events can be passed to the component with
        <code>props</code> and <code>events</code> properties too.
    </p>
    <ExampleViewer :component="Component" :code="ComponentCode" />

    <h3 id="teleport">Teleport</h3>
    <p>
        The <code>teleport</code> prop allows the dialog to be "teleported" into
        any DOM node outside the DOM hierarchy of the component placed in. By
        default, if only a boolean is passed, the diaog will be teleported to
        the document body. In addition, any other destination could be passed as
        <i>string</i> or the DOM Node element.
    </p>
    <ExampleViewer :component="Teleport" :code="TeleportCode" />

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

    <p>
        A programmatic instance returns a promise to await for. The promise gets
        resolved when the dialog gets closed.
    </p>
    <ExampleViewer
        :component="ProgrammaticallyAsync"
        :code="ProgrammaticallyAsyncCode" />
</template>
