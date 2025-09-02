# Card

<section class="odocs-head">

The **Card** component is a flexible and extensible content container.
Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization.

</section>

<section class="odocs-examples">

## Examples

<example-card />

</section>

<section class="odocs-specs">

## Card Component

> A flexible and extensible content container.

```html
<o-card></o-card>
```

### Props

| Prop name      | Description                                                                                           | Type                      | Values                                            | Default                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCloseLabel | Accessibility label for the close button                                                              | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>card: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close"<br>}</code>  |
| closeIcon      | Close icon name                                                                                       | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>card: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>       |
| closeIconSize  | Close icon size                                                                                       | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>card: {<br>&nbsp;&nbsp;closeIconSize: undefined<br>}</code> |
| closeable      | Adds close button to the header                                                                       | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>card: {<br>&nbsp;&nbsp;closeable: false<br>}</code>         |
| content        | Card body content, unnecessary when content slot is used                                              | string                    | -                                                 |                                                                                                                                                         |
| iconPack       | Icon pack to use for the close icon                                                                   | string                    | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>card: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| imageAlt       | Card image alt, unnecessary when image slot is used                                                   | string                    | -                                                 |                                                                                                                                                         |
| imageSrc       | Card image src, unnecessary when image slot is used                                                   | string                    | -                                                 |                                                                                                                                                         |
| loading        | Show a loading spinner in the card                                                                    | boolean                   | -                                                 |                                                                                                                                                         |
| loadingLabel   | Show label beside the loading icon                                                                    | string                    | -                                                 |                                                                                                                                                         |
| override       | Override existing theme classes completely                                                            | boolean                   | -                                                 |                                                                                                                                                         |
| subtitle       | Card header subtitle, unnecessary when subtitle slot is used<br/>Class of the header subtitle element | (string & ComponentClass) | -                                                 |                                                                                                                                                         |
| title          | Card header title, unnecessary when title slot is used                                                | string                    | -                                                 |                                                                                                                                                         |

### Events

| Event name | Properties                       | Description              |
| ---------- | -------------------------------- | ------------------------ |
| close      | **event** `Event` - native event | close button click event |

### Slots

| Name     | Description                                            | Bindings                                                            |
| -------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| header   | Override the header                                    | **close** `(event: Event): void` - function to emit a `close` event |
| title    | Override the header title, default is title prop       |                                                                     |
| subtitle | Override the header subtitle, default is subtitle prop |                                                                     |
| close    | Override the close icon                                |                                                                     |
| image    | Override the image                                     |                                                                     |
| default  | Override the default card body                         |                                                                     |
| content  | Override the body content, default is content prop     |                                                                     |
| footer   | Override the footer                                    | **close** `(event: Event): void` - function to emit a `close` event |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-card-viewer />

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
