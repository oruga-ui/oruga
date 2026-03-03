<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Triggers from "./triggers.vue";
import TriggersCode from "./triggers.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";

import Selectable from "./selectable.vue";
import SelectableCode from "./selectable.vue?raw";

import Scrollable from "./scrollable.vue";
import ScrollableCode from "./scrollable.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";
</script>

<template>
    <h3 id="base">Base (Menu)</h3>
    <p>
        By default the dropdown will be a simple unselectable menu using the
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role">
            ARIA: menu role
        </a>
        . A menu generally represents a list of actions or functions that the
        user can invoke.
    </p>
    <p>
        When a user clicks an option in a menu that has been opened, the menu
        usually closes. This can be changed with the
        <code>keepOpen</code> property. When a menu opens, keyboard focus can be
        placed on the first menu item using the <code>keepFirst</code> property.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="triggers">Triggers</h3>
    <p>
        The trigger can be defined by placing any element in the
        <code>trigger</code> template slot. To open the dropdown, the component
        can detect several different interaction variants, such as
        <code>openOnHover</code> or <code>openOnContextmenu</code> to only open
        on right click instead of left click. By default, only
        <code>openOnClick</code> is set.
    </p>
    <p>
        The action that close the component can also be customised using the
        <code>closeOnOutside</code> and <code>closeOnScroll</code> properties.
    </p>
    <p>
        Adding the <code>teleport</code> prop will move the dropdown menu to the
        referenced DOM location instead.
    </p>
    <ExampleViewer :component="Triggers" :code="TriggersCode" />

    <h3 id="options">Options</h3>
    <p>
        Instead of using the <code>&lt;o-dropdown-item&gt;</code> component
        directly inside the default template slot, an <code>options</code> prop
        can be defined, which can be used to specify the options
        programmatically. It accepts several different value formats:
    </p>
    <ul>
        <li>An array of primitives <code>['A', 'B', 'C']</code></li>
        <li>
            An object literal with key-value pairs
            <code>{ a: 'A', b: 'B', c: 'C' }</code>
        </li>
        <li>An array of objects where each object represent an item</li>
        <li>
            An array of grouped items where each group object has its own
            <code>options</code> property
        </li>
    </ul>

    <div class="info custom-block">
        <p class="custom-block-title">TypeScript</p>
        <p>
            The options property type is defined by the
            <code>DropdownOptions</code> type.
        </p>
    </div>

    <h4 id="options-primitives">Array of primitives</h4>
    <p>
        The simplest way to provide options is an array of primitives like
        strings or numbers, where the primitive will be used for both the string
        casted <code>label</code> representation and the <code>value</code> of
        the option.
    </p>
    <ExampleViewer
        :component="OptionsPrimitives"
        :code="OptionsPrimitivesCode" />

    <h4 id="options-object">Key-Value pair object</h4>
    <p>
        You may also provide the <code>options</code> prop where the keys are
        values and the values of each property are the labels.
    </p>
    <ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

    <h4 id="options-array">Array of objects</h4>
    <p>
        The most flexible way to define options is to provide an array of
        objects. The object has the same properties as the
        <code>&lt;o-dropdown-item&gt;</code> component.
    </p>
    <ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

    <h4 id="options-grouped">Grouped options</h4>
    <p>
        You can also use the array of objects syntax to create grouped options,
        wrapping each group of options in an object with a
        <code>label</code> and an <code>options</code> property. The object has
        the same properties as the
        <code>&lt;o-dropdown-item&gt;</code> component.
    </p>
    <ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

    <h3 id="selectable">Selectable (Combobox)</h3>
    <p>
        The component can be configured to have the options as a selectable list
        by adding the <code>selectable</code> property. This applies the
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role">
            ARIA: combobox role
        </a>
        to the root element and changes the menu to an
        <a
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role">
            ARIA: listbox role
        </a>
        . The combobox role identifies an element as either an input or a button
        that controls another element, that can dynamically pop up to help the
        user set a value.
    </p>
    <p>
        By default only one option can be selected and the selected option will
        be refereced by the <code>modelValue</code> property. Adding the
        <code>multiple</code> property will change the
        <code>modelValue</code> to an array of selected options.
    </p>
    <ExampleViewer :component="Selectable" :code="SelectableCode" />

    <h3 id="scrollable">Scrollable</h3>
    <p>
        When having to many options, consider adding the
        <code>scrollable</code> property, which allows the options container to
        remain at a fixed height. The <code>max-height</code> property can be
        used to define the max container height.
    </p>
    <ExampleViewer :component="Scrollable" :code="ScrollableCode" />

    <h3 id="modal">Modal</h3>
    <p>
        The content can be opened in an <i>modal</i> mode either for mobile or
        desktop only, or for both, by adding the <code>mobile-modal</code> and
        <code>desktop-modal</code> properties.
    </p>
    <ExampleViewer :component="Modal" :code="ModalCode" />

    <h3 id="position">Position</h3>
    <p>
        The direction in which the dropdown menu opens can be changed by the
        <code>position</code> property. By default, the direction is
        automatically calculated from the distance to the edges of the window.
        Adding the <code>teleport</code> prop additionally will move the
        dropdown menu to the referenced DOM location instead.
    </p>
    <ExampleViewer :component="Position" :code="PositionCode" />
</template>
