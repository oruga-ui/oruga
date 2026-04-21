---
sidebarDepth: 2
---

[//]: # "This file is generated and should not be edited by hand!"

# Dropdown

<section class="odocs-head">

The **Dropdown** component is highly versatile and can be used in various ways, such as for displaying lists as contextual overlays, as a quick menu, or as a selectable list of content options.

Unlike native select elements, the dropdown input allows you to customize both its appearance and behavior.
The component implements both the W3C ARIA APG [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) as well as the W3C ARIA APG [Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions-active-descendant/), depending on whether the options are selectable.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Dropdown/examples/base.vue";
import BaseCode from "@/components/Dropdown/examples/base.vue?raw";

import Triggers from "@/components/Dropdown/examples/triggers.vue";
import TriggersCode from "@/components/Dropdown/examples/triggers.vue?raw";

import OptionsPrimitives from "@/components/Dropdown/examples/options-primitives.vue";
import OptionsPrimitivesCode from "@/components/Dropdown/examples/options-primitives.vue?raw";

import OptionsObject from "@/components/Dropdown/examples/options-object.vue";
import OptionsObjectCode from "@/components/Dropdown/examples/options-object.vue?raw";

import OptionsArray from "@/components/Dropdown/examples/options-array.vue";
import OptionsArrayCode from "@/components/Dropdown/examples/options-array.vue?raw";

import OptionsGrouped from "@/components/Dropdown/examples/options-grouped.vue";
import OptionsGroupedCode from "@/components/Dropdown/examples/options-grouped.vue?raw";

import Modal from "@/components/Dropdown/examples/modal.vue";
import ModalCode from "@/components/Dropdown/examples/modal.vue?raw";

import Selectable from "@/components/Dropdown/examples/selectable.vue";
import SelectableCode from "@/components/Dropdown/examples/selectable.vue?raw";

import Scrollable from "@/components/Dropdown/examples/scrollable.vue";
import ScrollableCode from "@/components/Dropdown/examples/scrollable.vue?raw";

import Position from "@/components/Dropdown/examples/position.vue";
import PositionCode from "@/components/Dropdown/examples/position.vue?raw";
</script>

### Base (Menu)

By default the dropdown will be a simple unselectable menu using the [ARIA: menu role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role). A menu generally represents a list of actions or functions that the user can invoke.

When a user clicks an option in a menu that has been opened, the menu usually closes. This can be changed with the `keepOpen` property. When a menu opens, keyboard focus can be placed on the first menu item using the `keepFirst` property.

<ExampleViewer :component="Base" :code="BaseCode" />

### Triggers

The trigger can be defined by placing any element in the `trigger` template slot. To open the dropdown, the component can detect several different interaction variants, such as `openOnHover` or `openOnContextmenu` to only open on right click instead of left click. By default, only `openOnClick` is set.

The action that close the component can also be customised using the `closeOnOutside` and `closeOnScroll` properties.

Adding the `teleport` prop will move the dropdown menu to the referenced DOM location instead.

<ExampleViewer :component="Triggers" :code="TriggersCode" />

### Options

Instead of using the `<o-dropdown-item>` component directly inside the default template slot, an `options` prop can be defined, which can be used to specify the options programmatically. It accepts several different value formats:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property

::: info TypeScript
The options property type is defined by the `DropdownOptions` type.
:::

#### Array of primitives

The simplest way to provide options is an array of primitives like strings or numbers, where the primitive will be used for both the string casted `label` representation and the `value` of the option.

<ExampleViewer
    :component="OptionsPrimitives"
    :code="OptionsPrimitivesCode" />

#### Key-Value pair object

You may also provide the `options` prop where the keys are values and the values of each property are the labels.

<ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

#### Array of objects

The most flexible way to define options is to provide an array of objects. The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

#### Grouped options

You can also use the array of objects syntax to create grouped options, wrapping each group of options in an object with a `label` and an `options` property. The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

### Selectable (Combobox)

The component can be configured to have the options as a selectable list by adding the `selectable` property. This applies the [ARIA: combobox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role) to the root element and changes the menu to an [ARIA: listbox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role). The combobox role identifies an element as either an input or a button that controls another element, that can dynamically pop up to help the user set a value.

By default only one option can be selected and the selected option will be refereced by the `modelValue` property. Adding the `multiple` property will change the `modelValue` to an array of selected options.

<ExampleViewer :component="Selectable" :code="SelectableCode" />

### Scrollable

When having to many options, consider adding the `scrollable` property, which allows the options container to remain at a fixed height. The `max-height` property can be used to define the max container height.

<ExampleViewer :component="Scrollable" :code="ScrollableCode" />

### Modal

The content can be opened in a _modal_ mode either for mobile or desktop only, or for both, by adding the `mobile-modal` and `desktop-modal` properties.

<ExampleViewer :component="Modal" :code="ModalCode" />

### Position

The direction in which the dropdown menu opens can be changed by the `position` property. By default, the direction is automatically calculated from the distance to the edges of the window. Adding the `teleport` prop additionally will move the dropdown menu to the referenced DOM location instead.

<ExampleViewer :component="Position" :code="PositionCode" />

</section>

<section class="odocs-specs">

## Dropdown Component

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content.

```html
<o-dropdown></o-dropdown>
```

### Props

| Prop name         | Description                                                                                                                                                                                                     | Type                                                                                                             | Values                                                                                           | Default                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active            | The active state of the dropdown, use v-model:active to make it two-way binding                                                                                                                                 | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| animation         | Custom animation (transition name)                                                                                                                                                                              | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>           |
| ariaLabel         | Accessibility aria-label to be passed to the trigger element - usefull if selectable                                                                                                                            | string                                                                                                           | -                                                                                                |                                                                                                                                                                |
| clipScroll        | Set `true` to remove the body scrollbar.<br/>When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,<br/>but will set the body to a fixed position, which may break some layouts. | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;clipScroll: false<br>}</code>           |
| closeOnOutside    | Close Dropdown when clicked outside                                                                                                                                                                             | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;closeOnOutside: true<br>}</code>        |
| closeOnScroll     | Close Dropdown when page get scrolled                                                                                                                                                                           | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;closeOnScroll: false<br>}</code>        |
| delay             | Dropdown delay before it appears (number in ms)                                                                                                                                                                 | number                                                                                                           | -                                                                                                |                                                                                                                                                                |
| desktopModal      | Dropdown content (items) are shown into a modal on desktop                                                                                                                                                      | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;desktopModal: false<br>}</code>         |
| disabled          | Interaction is disabled                                                                                                                                                                                         | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| expanded          | Dropdown will be expanded (full-width)                                                                                                                                                                          | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| <s>inline</s>     | <div><b>deprecated</b> - since 0.13.0, use the `OListbox` component instead</div><div><s>Menu content (items) are shown inline, trigger is removed</s></div>                                                    | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| itemTag           | Dropdown item tag name                                                                                                                                                                                          | DynamicComponent                                                                                                 | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;itemTag: "div"<br>}</code>              |
| keepFirst         | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                                                                  | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;keepFirst: false<br>}</code>            |
| keepOpen          | Keep dropdown list open when item get selected                                                                                                                                                                  | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>             |
| label             | Trigger label, unnecessary when trigger slot is used                                                                                                                                                            | string                                                                                                           | -                                                                                                |                                                                                                                                                                |
| labelledby        | Ensures that each input has an accessible name.                                                                                                                                                                 | string                                                                                                           | -                                                                                                |                                                                                                                                                                |
| maxHeight         | Max height of dropdown content                                                                                                                                                                                  | Numberish                                                                                                        | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;maxHeight: 200<br>}</code>              |
| menuId            | HTML element Id of the dropdown menu element                                                                                                                                                                    | string                                                                                                           | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                                  |
| menuTag           | Dropdown menu tag name                                                                                                                                                                                          | DynamicComponent                                                                                                 | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;menuTag: "div"<br>}</code>              |
| mobileBreakpoint  | Mobile breakpoint as `max-width` value                                                                                                                                                                          | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| mobileModal       | Dropdown content (items) are shown into a modal on mobile                                                                                                                                                       | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>           |
| v-model           | The selected option value, use v-model to make it two-way binding                                                                                                                                               | ValueType&lt;unknown, IsMultiple&gt;                                                                             | -                                                                                                |                                                                                                                                                                |
| multiple          | Allows multiple selections - converts the `modelValue` into an array                                                                                                                                            | IsMultiple                                                                                                       | -                                                                                                |                                                                                                                                                                |
| openOnClick       | Show when clicked on the trigger                                                                                                                                                                                | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnClick: true<br>}</code>            |
| openOnContextmenu | Show when right clicked on the trigger                                                                                                                                                                          | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnContextmenu: false<br>}</code>     |
| openOnFocus       | Show when trigger get focused                                                                                                                                                                                   | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnFocus: false<br>}</code>           |
| openOnHover       | Show when hover over the trigger                                                                                                                                                                                | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnHover: false<br>}</code>           |
| options           | Dropdown options, unnecessary when default slot is used                                                                                                                                                         | DropdownOptions&lt;unknown&gt;                                                                                   | -                                                                                                |                                                                                                                                                                |
| override          | Override existing theme classes completely                                                                                                                                                                      | boolean                                                                                                          | -                                                                                                |                                                                                                                                                                |
| position          | Position of the dropdown relative to the trigger                                                                                                                                                                | "auto" \| "bottom-left" \| "bottom-right" \| "bottom" \| "left" \| "right" \| "top-left" \| "top-right" \| "top" | `auto`, `top`, `bottom`, `left`, `right`, `top-right`, `top-left`, `bottom-left`, `bottom-right` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;position: "bottom-left"<br>}</code>     |
| scrollable        | Menu content will be scrollable                                                                                                                                                                                 | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| selectOnClose     | Select current focused item when closed                                                                                                                                                                         | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;selectOnClose: false<br>}</code>        |
| selectOnFocus     | Select current focused item when focused                                                                                                                                                                        | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;selectOnFocus: false<br>}</code>        |
| selectable        | Enables item selection                                                                                                                                                                                          | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| teleport          | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.                                | boolean \| object \| string                                                                                      | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;teleport: false<br>}</code>             |
| triggerTag        | Dropdown trigger tag name                                                                                                                                                                                       | DynamicComponent                                                                                                 | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;triggerTag: "div"<br>}</code>           |

### Events

| Event name         | Properties                                                 | Description                                      |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------ |
| update:model-value | **value** `unknown \| unknown[]` - updated modelValue prop | modelValue prop two-way binding                  |
| update:active      | **value** `boolean` - updated active prop                  | active prop two-way binding                      |
| select             | **value** `unknown` - selected value                       | on select event - fired before update:modelValue |
| change             | **value** `unknown \| unknown[]` - selected value          |
| open               | **event** `Event` - native event                           | on active state changes to true                  |
| close              | **event** `Event` - native event                           | on active state changes to false                 |
| scroll-start       |                                                            | the list inside the dropdown reached the start   |
| scroll-end         |                                                            | the list inside the dropdown reached it's end    |

### Slots

| Name    | Description                                                                                   | Bindings                                                                                                                                                                    |
| ------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trigger | Override the trigger element, default is label prop                                           | **active** `boolean` - dropdown active state<br/>**value** `unknown \| unknown[]` - the selected value<br/>**toggle** `(event: Event): void` - toggle dropdown active state |
| before  | Define extra `o-dropdown-item` components here, even if you have some options defined by prop | **toggle** `(): void` - toggle dropdown active state                                                                                                                        |
| default | Define the dropdown items here                                                                | **toggle** `(): void` - toggle dropdown active state                                                                                                                        |
| group   | Override the option group                                                                     | **group** `object` - options group item                                                                                                                                     |
| option  | Override the label, default is label prop                                                     | **option** `object` - option item                                                                                                                                           |
| empty   | Define the content to show if the list is empty                                               | **toggle** `(): void` - toggle dropdown active state                                                                                                                        |
| after   | Define extra `o-dropdown-item` components here, even if you have some options defined by prop | **toggle** `(): void` - toggle dropdown active state                                                                                                                        |

</section>

[//]: # "This file is generated and should not be edited by hand!"

<section class="odocs-specs">

## DropdownItem Component

> An option item used by the dropdown component.

```html
<o-dropdown-item></o-dropdown-item>
```

### Props

| Prop name | Description                                                                               | Type                   | Values | Default                                                       |
| --------- | ----------------------------------------------------------------------------------------- | ---------------------- | ------ | ------------------------------------------------------------- |
| clickable | Item is clickable and emit an event                                                       | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>true</code>    |
| disabled  | Item is disabled                                                                          | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>false</code>   |
| hidden    | Define whether the item is visible or not                                                 | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>false</code>   |
| label     | Item label, unnecessary when default slot is used                                         | string                 | -      |                                                               |
| override  | Override existing theme classes completely                                                | boolean                | -      |                                                               |
| tag       | Dropdown item tag name                                                                    | DynamicComponent       | -      |                                                               |
| value     | Item value (it will be used as the v-model of the wrapper component) - default is an uuid | string\|number\|object | -      | <code style='white-space: nowrap; padding: 0;'>useId()</code> |

### Events

| Event name | Properties                                                                 | Description   |
| ---------- | -------------------------------------------------------------------------- | ------------- |
| click      | **value** `unknown` - value prop data<br/>**event** `event` - native event | onclick event |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-dropdown-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| $dropdown-disabled-opacity             | h.useVar("control-disabled-opacity")                                         |
| $dropdown-menu-zindex                  | map.get(vars.$zindex, "dropdown")                                            |
| $dropdown-menu-spacer                  | 0px                                                                          |
| $dropdown-menu-padding                 | h.useVar("control-spacer") 0                                                 |
| $dropdown-menu-box-shadow              | 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02) |
| $dropdown-menu-background-color        | h.useVar("control-background-color")                                         |
| $dropdown-menu-border-color            | h.useVar("control-border-color")                                             |
| $dropdown-menu-border-style            | solid                                                                        |
| $dropdown-menu-border-width            | h.useVar("control-border-width")                                             |
| $dropdown-menu-border-radius           | h.useVar("border-radius")                                                    |
| $dropdown-item-padding                 | 0.25rem 1rem                                                                 |
| $dropdown-item-color                   | h.useVar("font-color")                                                       |
| $dropdown-item-font-size               | h.useVar("font-size")                                                        |
| $dropdown-item-font-weight             | h.useVar("font-weight")                                                      |
| $dropdown-item-line-height             | h.useVar("line-height")                                                      |
| $dropdown-item-background-color        | transparent                                                                  |
| $dropdown-item-active-color            | h.useVar("primary-invert")                                                   |
| $dropdown-item-active-background-color | h.useVar("primary")                                                          |
| $dropdown-item-hover-background-color  | h.useVar("grey-lighter")                                                     |
| $dropdown-item-hover-color             | h.useVar("font-color")                                                       |
| $dropdown-modal-zindex                 | map.get(vars.$zindex, "modal")                                               |
| $dropdown-modal-max-height             | min(50vh, calc(100vh - 160px))                                               |
| $dropdown-modal-max-width              | min(50vw, calc(100vw - 160px))                                               |
| $dropdown-modal-min-width              | min(80vw, 400px)                                                             |
| $dropdown-overlay-background-color     | h.useVar( "overlay-background-color")                                        |
| $dropdown-overlay-zindex               | map.get(vars.$zindex, "overlay")                                             |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_dropdown.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                         | Default                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| $dropdown-content-max-height          | 200px                                                                                               |
| $dropdown-disabled-opacity            | 0.5                                                                                                 |
| $dropdown-gap                         | 0px                                                                                                 |
| $dropdown-z                           | 40                                                                                                  |
| $dropdown-mobile-breakpoint           | iv.$desktop                                                                                         |
| $dropdown-background-background-color | hsla( #{css.getVar("scheme-h")}, #{css.getVar("scheme-s")}, #{css.getVar("scheme-invert-l")}, 0.86) |
| $dropdown-modal-width                 | 75%                                                                                                 |
| $dropdown-modal-min-width             | 25%                                                                                                 |
| $dropdown-modal-max-width             | calc(100vw - 40px)                                                                                  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_dropdown.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                   | Default                |
| ------------------------------- | ---------------------- |
| $dropdown-modal-menu-zindex     | $zindex-modal          |
| $dropdown-modal-backdrop-zindex | $zindex-modal-backdrop |
| $dropdown-modal-width           | 75%                    |
| $dropdown-modal-min-width       | 25%                    |
| $dropdown-modal-max-width       | calc(100vw - 40px)     |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_dropdown.scss)

</div>

</section>
