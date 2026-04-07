[//]: # "This file is generated and should not be edited by hand!"

# Skeleton

<section class="odocs-head">

The **Skeleton** component can be used as a loading animations or space-fillers while waiting for the actual content to load.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Skeleton/examples/base.vue";
import BaseCode from "@/components/Skeleton/examples/base.vue?raw";

import Circle from "@/components/Skeleton/examples/circle.vue";
import CircleCode from "@/components/Skeleton/examples/circle.vue?raw";

import Sizes from "@/components/Skeleton/examples/sizes.vue";
import SizesCode from "@/components/Skeleton/examples/sizes.vue?raw";

import Position from "@/components/Skeleton/examples/position.vue";
import PositionCode from "@/components/Skeleton/examples/position.vue?raw";
</script>

### Base

The length of the loading beam can be defined using the `width` prop.

<ExampleViewer :component="Base" :code="BaseCode" />

### Circle

Make in round using the `circle` prop.

<ExampleViewer :component="Circle" :code="CircleCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Position

Use the `position` prop to define the vertical placement.

<ExampleViewer :component="Position" :code="PositionCode" />

</section>

<section class="odocs-specs">

## Skeleton Component

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

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| $skeleton-spacer                | 0.5em                                                                                                                                 |
| $skeleton-duration              | 1.5s                                                                                                                                  |
| $skeleton-font-size             | h.useVar("font-size")                                                                                                                 |
| $skeleton-background-color      | vars.$grey-lighter                                                                                                                    |
| $skeleton-background            | linear-gradient( 90deg, $skeleton-background-color 25%,    rgba($skeleton-background-color, 0.5) 50%, $skeleton-background-color 75%) |
| $skeleton-border-radius         | h.useVar("border-radius")                                                                                                             |
| $skeleton-border-radius-rounded | h.useVar("border-radius-rounded")                                                                                                     |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_skeleton.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable           | Default              |
| ----------------------- | -------------------- |
| $skeleton-duration      | 1.5s                 |
| $skeleton-margin-top    | 0.5rem               |
| $skeleton-border-radius | css.getVar("radius") |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_skeleton.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable      | Default                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| $skeleton-bg-color | $dark-bg-subtle                                                                                               |
| $skeleton-bg       | linear-gradient( 90deg, $skeleton-bg-color 25%,    rgba($skeleton-bg-color, 0.5) 50%, $skeleton-bg-color 75%) |
| $skeleton-duration | 1.5s                                                                                                          |
| $skeleton-margin   | 0.5rem 0 0 0                                                                                                  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_skeleton.scss)

</div>

</section>
