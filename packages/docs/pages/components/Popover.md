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

| Prop name      | Description                                                                                                                                                                                                     | Type                                       | Values                                                                                                                 | Default                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active         | Whether popover is active or not, use v-model:active to make it two-way binding                                                                                                                                 | boolean                                    | -                                                                                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| animation      | Show and dismiss animation                                                                                                                                                                                      | string                                     | -                                                                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>        |
| ariaCloseLabel | Accessibility label for the close button                                                                                                                                                                        | string                                     | -                                                                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close"<br>}</code>  |
| backdrop       | Adds a backdrop to the background                                                                                                                                                                               | boolean                                    | -                                                                                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| behavior       | The behavior of the popover.                                                                                                                                                                                    | "auto" \| "hint" \| "manual"               | `auto`, `hint`, `manual`                                                                                               | <code style='white-space: nowrap; padding: 0;'>"auto"</code>                                                                                               |
| clipScroll     | Set `true` to remove the body scrollbar.<br/>When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,<br/>but will set the body to a fixed position, which may break some layouts. | boolean                                    | -                                                                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;clipScroll: false<br>}</code>        |
| closeIcon      | Close icon name                                                                                                                                                                                                 | string                                     | -                                                                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>       |
| closeIconSize  | Close icon size                                                                                                                                                                                                 | string                                     | -                                                                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;closeIconSize: undefined<br>}</code> |
| closeable      | Adds close button to the content                                                                                                                                                                                | boolean                                    | -                                                                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;closeable: false<br>}</code>         |
| component      | Component to be injected.<br/>Close the component by emitting a 'close' event — `$emit('close')`                                                                                                                | C                                          | -                                                                                                                      |                                                                                                                                                            |
| content        | Content body text, unnecessary when content slot is used                                                                                                                                                        | string                                     | -                                                                                                                      |                                                                                                                                                            |
| delay          | Defines a delay (in ms) before the content appears                                                                                                                                                              | number                                     | -                                                                                                                      |                                                                                                                                                            |
| disabled       | The component will be disabled                                                                                                                                                                                  | boolean                                    | -                                                                                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| events         | Events to be binded to the injected component                                                                                                                                                                   | EmitsToProps&lt;ComponentEmit&lt;C&gt;&gt; | -                                                                                                                      |                                                                                                                                                            |
| iconPack       | Icon pack to use for the close icon                                                                                                                                                                             | string                                     | `mdi`, `fa`, `fas and any other custom icon pack`                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| id             | A unique HTML id for the popover element                                                                                                                                                                        | string                                     | -                                                                                                                      | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                              |
| modal          | Defines if the popover should be shown as centered modal - the position is ignored when `true`                                                                                                                  | boolean                                    | -                                                                                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| override       | Override existing theme classes completely                                                                                                                                                                      | boolean                                    | -                                                                                                                      |                                                                                                                                                            |
| position       | The position of the popover relative to the trigger                                                                                                                                                             | PopoverPosition                            | `top`, `bottom`, `left`, `right`, `center`, `[top`, `right]`, `[top`, `left]`, `[bottom`, `left]`, `[bottom`, `right]` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;position: "top"<br>}</code>          |
| props          | Props to be binded to the injected component                                                                                                                                                                    | ComponentProps&lt;C&gt;                    | -                                                                                                                      |                                                                                                                                                            |
| role           | A role for the content element.                                                                                                                                                                                 | "dialog" \| "menu" \| "tooltip"            | -                                                                                                                      |                                                                                                                                                            |
| target         | Define the target element to which the popover gets connected programmatically.                                                                                                                                 | MaybeElement                               | -                                                                                                                      |                                                                                                                                                            |
| teleport       | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.                                | boolean \| object \| string                | -                                                                                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>popover: {<br>&nbsp;&nbsp;teleport: false<br>}</code>          |
| title          | Content header title, unnecessary when title slot is used                                                                                                                                                       | string                                     | -                                                                                                                      |                                                                                                                                                            |

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
| title   | Override the popover title, default is title prop     | **close** `(): void` - function to close the popover                                               |
| close   | Define a custom close icon                            |                                                                                                    |
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

| SASS Variable                     | Default                               |
| --------------------------------- | ------------------------------------- |
| $popover-content-font-size        | 0.85rem                               |
| $popover-content-color            | h.useVar("black")                     |
| $popover-content-font-weight      | h.useVar("font-weight")               |
| $popover-content-line-height      | h.useVar("line-height")               |
| $popover-content-margin           | 0.25em                                |
| $popover-content-padding          | 0.35em 0.75em                         |
| $popover-content-box-shadow       | h.useVar("overlay-box-shadow")        |
| $popover-content-background-color | h.useVar("grey-lightest")             |
| $popover-content-border-color     | h.useVar("grey-lighter")              |
| $popover-content-border-radius    | h.useVar("border-radius")             |
| $popover-close-top                | 0em                                   |
| $popover-close-right              | 0.5em                                 |
| $popover-close-color              | h.useVar("black")                     |
| $popover-close-size               | 2em                                   |
| $popover-close-border-radius      | h.useVar("border-radius-rounded")     |
| $popover-close-background-color   | inherit                               |
| $popover-overlay-background-color | h.useVar( "overlay-background-color") |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_popover.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                     | Default                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| $popover-margin                   | 0.25rem                                                                                             |
| $popover-padding                  | 0.35rem 0.75rem                                                                                     |
| $popover-shadow                   | 0 1px 2px 1px rgba(0, 1, 0, 0.2)                                                                    |
| $popover-border-radius            | css.getVar("radius")                                                                                |
| $popover-background-color         | css.getVar("scheme-main-bis")                                                                       |
| $popover-color                    | hsl( css.getVar("black-h"), css.getVar("black-s"), css.getVar("black-l"))                           |
| $popover-overlay-background-color | hsla( #{css.getVar("scheme-h")}, #{css.getVar("scheme-s")}, #{css.getVar("scheme-invert-l")}, 0.86) |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_popover.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable   | Default |
| --------------- | ------- |
| $popover-margin | 0.25rem |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_popover.scss)

</div>
<div class="theme-tailwind">

> Current theme ➜ _[Tailwind](https://github.com/oruga-ui/theme-tailwind)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>
