# Dialog

<section class="odocs-head">
<Badge type="warning" text="experimental" />

The **Dialog** component is a flexible and extensible content container.
Dialog are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization.
They are particularly well-suited to use with the [Modal](/components/Modal) component.

</section>

<section class="odocs-examples">

## Examples

<example-dialog />

</section>

<section class="odocs-specs">

## Dialog Component

> A flexible and extensible content container.

```html
<o-dialog></o-dialog>
```

### Props

| Prop name      | Description                                                                                             | Type                            | Values                                                                          | Default                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCloseLabel | Accessibility label for the close button                                                                | string                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close"<br>}</code>  |
| buttonPosition | Position of the footer buttons                                                                          | "centered" \| "left" \| "right" | -                                                                               |                                                                                                                                                           |
| cancelButton   | Render a cancel button and set text text as label                                                       | string                          | -                                                                               |                                                                                                                                                           |
| cancelVariant  | Color variant of the cancel button                                                                      | string                          | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                           |
| closeIcon      | Close icon name                                                                                         | string                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>       |
| closeIconSize  | Close icon size                                                                                         | string                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeIconSize: undefined<br>}</code> |
| closeable      | Adds close button to the header                                                                         | boolean                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeable: false<br>}</code>         |
| component      | Component to be injected.<br/>Close the component by emitting a 'close' event — `$emit('close')`        | Component                       | -                                                                               |                                                                                                                                                           |
| confirmButton  | Render a confirm button and set text as label                                                           | string                          | -                                                                               |                                                                                                                                                           |
| confirmVariant | Color variant of the confirm button                                                                     | string                          | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                           |
| content        | Dialog body content, unnecessary when content slot is used                                              | string                          | -                                                                               |                                                                                                                                                           |
| disableCancel  | Disable the cancel button                                                                               | boolean                         | -                                                                               |                                                                                                                                                           |
| disableConfirm | Disable the confirm button                                                                              | boolean                         | -                                                                               |                                                                                                                                                           |
| events         | Events to be binded to the injected component                                                           | {}                              | -                                                                               |                                                                                                                                                           |
| iconPack       | Icon pack to use for the close icon                                                                     | string                          | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| imageAlt       | Dialog image alt, unnecessary when image slot is used                                                   | string                          | -                                                                               |                                                                                                                                                           |
| imageSrc       | Dialog image src, unnecessary when image slot is used                                                   | string                          | -                                                                               |                                                                                                                                                           |
| loading        | Show a loading spinner in the dialog                                                                    | boolean                         | -                                                                               |                                                                                                                                                           |
| loadingLabel   | Show label beside the loading icon                                                                      | string                          | -                                                                               |                                                                                                                                                           |
| override       | Override existing theme classes completely                                                              | boolean                         | -                                                                               |                                                                                                                                                           |
| props          | Props to be binded to the injected component                                                            | any                             | -                                                                               |                                                                                                                                                           |
| subtitle       | Dialog header subtitle, unnecessary when subtitle slot is used<br/>Class of the header subtitle element | (string & ComponentClass)       | -                                                                               |                                                                                                                                                           |
| title          | Dialog header title, unnecessary when title slot is used                                                | string                          | -                                                                               |                                                                                                                                                           |

### Events

| Event name | Properties                       | Description                |
| ---------- | -------------------------------- | -------------------------- |
| close      | **event** `Event` - native event | close button click event   |
| confirm    | **event** `Event` - native event | confirm button click event |

### Slots

| Name          | Description                                            | Bindings                                                                                                                                        |
| ------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| header        | Override the header                                    | **close** `(event: Event): void` - function to emit a `close` event                                                                             |
| title         | Override the header title, default is title prop       |                                                                                                                                                 |
| subtitle      | Override the header subtitle, default is subtitle prop |                                                                                                                                                 |
| close         | Override the close icon                                |                                                                                                                                                 |
| image         | Override the image                                     |                                                                                                                                                 |
| default       | Override the default dialog body                       | **close** `(event: Event): void` - function to emit a `close` event<br/>**confirm** `(event: Event): void` - function to emit a `confirm` event |
| content       | Override the body content, default is content prop     | **close** `(event: Event): void` - function to emit a `close` event<br/>**confirm** `(event: Event): void` - function to emit a `confirm` event |
| footer        | Override the footer                                    | **close** `(event: Event): void` - function to emit a `close` event<br/>**confirm** `(event: Event): void` - function to emit a `confirm` event |
| cancelButton  |                                                        |                                                                                                                                                 |
| confirmButton |                                                        |                                                                                                                                                 |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-dialog-viewer />

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
