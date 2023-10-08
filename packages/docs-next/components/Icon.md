---
title: Icon
---

# Icon

<div class="vp-doc">

> Icons take an important role of any application

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-icon />

</div>
<div class="vp-example">

## Class props

<inspector-icon-viewer />

</div>

<div class="vp-doc">

## Icon component

> Icons take an important role of any application

```html
<o-icon></o-icon>
```

### Props

| Prop name   | Description                                                                                                          | Type           | Values                                                                                                                             | Default                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| clickable   | When true makes icon clickable                                                                                       | boolean        | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| component   | Icon component name                                                                                                  | string         | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| customClass | Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes | string         | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| customSize  | Overrides icon font size, optional                                                                                   | string         | `Depends on library: null (smallest)`, `fa-lg`, `fa-2x`, `fa-3x`, `fa-4x`, `fa-5x`, `mdi-18px`, `mdi-24px`, `mdi-36px`, `mdi-48px` | <code style='white-space: nowrap; padding: 0;'></code> |
| icon        | Icon name                                                                                                            | string         | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| override    |                                                                                                                      | boolean        | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| pack        | Icon pack to use                                                                                                     | string         | `mdi`, `fa`, `fas and any other custom icon pack`                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| rotation    | Rotation 0-360                                                                                                       | number\|string | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| size        | Icon size, optional                                                                                                  | string         | `small`, `medium`, `large`                                                                                                         | <code style='white-space: nowrap; padding: 0;'></code> |
| spin        | Enable spin effect on icon                                                                                           | boolean        | -                                                                                                                                  | <code style='white-space: nowrap; padding: 0;'></code> |
| variant     | Color of the icon, optional                                                                                          | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                                                    | <code style='white-space: nowrap; padding: 0;'></code> |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $icon-spin-duration | 2s      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_icon.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $icon-spin-duration | 2s      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_icon.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $icon-spin-duration | 2s      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_icon.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $icon-spin-animation-duration | 1.5s    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_icon.scss)

</div>

</div>
