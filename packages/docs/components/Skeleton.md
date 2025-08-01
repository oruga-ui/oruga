# Skeleton

<section class="odocs-head">

The **Skeleton** component can be used as a loading animations or space-fillers while waiting for the actual content to load.

</section>

<section class="odocs-examples">

## Examples

<example-skeleton />

</section>

<section class="odocs-specs">

## Skeleton component

> A placeholder for content to load.

```html
<o-skeleton></o-skeleton>
```

### Props

| Prop name | Description                                  | Type                            | Values                      | Default                                                                                                                                           |
| --------- | -------------------------------------------- | ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | Show or hide loader                          | boolean                         | -                           | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                        |
| animated  | Show a loading animation                     | boolean                         | -                           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>skeleton: {<br>&nbsp;&nbsp;animated: true<br>}</code> |
| circle    | Show a circle shape                          | boolean                         | -                           | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| count     | Number of shapes to display                  | number                          | -                           | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                           |
| height    | Custom height                                | number \| string                | -                           |                                                                                                                                                   |
| override  | Override existing theme classes completely   | boolean                         | -                           |                                                                                                                                                   |
| position  | Skeleton position in relation to the element | "centered" \| "left" \| "right" | `left`, `centered`, `right` | <code style='white-space: nowrap; padding: 0;'>"left"</code>                                                                                      |
| rounded   | Enable rounded style                         | boolean                         | -                           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>skeleton: {<br>&nbsp;&nbsp;rounded: true<br>}</code>  |
| size      | Size of skeleton                             | string                          | `small`, `medium`, `large`  |                                                                                                                                                   |
| width     | Custom width                                 | number \| string                | -                           |                                                                                                                                                   |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-skeleton-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable           | Default                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| $skeleton-background    | linear-gradient( 90deg, $grey-lighter 25%,    rgba($grey-lighter, 0.5) 50%, $grey-lighter 75%) |
| $skeleton-border-radius | var(--#{$prefix}base-border-radius)                                                            |
| $skeleton-duration      | 1.5s                                                                                           |
| $skeleton-margin        | 0.5rem 0 0 0                                                                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_skeleton.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable           | Default              |
| ----------------------- | -------------------- |
| $skeleton-duration      | 1.5s                 |
| $skeleton-margin-top    | 0.5rem               |
| $skeleton-border-radius | css.getVar("radius") |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_skeleton.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable      | Default                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| $skeleton-bg-color | $dark-bg-subtle                                                                                               |
| $skeleton-bg       | linear-gradient( 90deg, $skeleton-bg-color 25%,    rgba($skeleton-bg-color, 0.5) 50%, $skeleton-bg-color 75%) |
| $skeleton-duration | 1.5s                                                                                                          |
| $skeleton-margin   | 0.5rem 0 0 0                                                                                                  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_skeleton.scss)

</div>

</section>
