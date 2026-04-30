[//]: # "This file is generated and should not be edited by hand!"

# Popover

<section class="odocs-head">
<Badge type="warning" text="experimental" />

The **Popover** component is a wrapper for rich content that floats above other elements on the page. It is shown or hidden by interacting with a trigger element such as a button. Unlike a _tooltip_, it is usually triggered via click instead of hover, and it can contain interactive elements.
The component is implemented using the native [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).

</section>

<section class="odocs-examples">

## Examples

<example-popover />

</section>

<section class="odocs-specs">

## Popover Component

> A popover is a content container that displays rich content over the top of other content.

```html
<o-popover></o-popover>
```

### Props

| Prop name | Description                                                                                                                                                                      | Type                                               | Values                                     | Default                                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | Whether popover is active or not, use v-model:active to make it two-way binding                                                                                                  | boolean                                            | -                                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| animation | Show and dismiss animation                                                                                                                                                       | string                                             | -                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code> |
| backdrop  | Adds a backdrop to the background                                                                                                                                                | boolean                                            | -                                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| behavior  | The behavior of the popover.                                                                                                                                                     | "auto" \| "hint" \| "manuell"                      | `auto`, `hint`, `manuell`                  | <code style='white-space: nowrap; padding: 0;'>"auto"</code>                                                                                        |
| content   | Content text, unnecessary when content slot is used                                                                                                                              | string                                             | -                                          |                                                                                                                                                     |
| delay     | Defines a delay (in ms) before the content appears                                                                                                                               | number                                             | -                                          |                                                                                                                                                     |
| disabled  | The component will be disabled                                                                                                                                                   | boolean                                            | -                                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| id        | A unique HTML id for the popover element                                                                                                                                         | string                                             | -                                          | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                       |
| modal     | Defines if the popover should be shown as centered modal - position is ignored when `true`                                                                                       | boolean                                            | -                                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| override  | Override existing theme classes completely                                                                                                                                       | boolean                                            | -                                          |                                                                                                                                                     |
| position  | The position of the popover relative to the trigger                                                                                                                              | "bottom" \| "center" \| "left" \| "right" \| "top" | `top`, `bottom`, `left`, `right`, `center` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;position: "top"<br>}</code>   |
| teleport  | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                        | -                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;teleport: false<br>}</code>   |

### Events

| Event name    | Properties                                | Description                      |
| ------------- | ----------------------------------------- | -------------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding      |
| close         | **event** `Event` - native event          | on active state changes to false |
| open          | **event** `Event` - native event          | on active state changes to true  |

### Slots

| Name    | Description                                           | Bindings                                                                                           |
| ------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| default | Define a trigger here                                 | **active** `boolean` - popover active state<br/>**open** `(): void` - function to open the popover |
| content | Override the popover content, default is content prop | **close** `(): void` - function to close the popover                                               |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-popover />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>
