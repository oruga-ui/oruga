---
title: Icon
---

# Icon

> Icons take an important role of any application

---

## Examples

 <example-icon />

## Class props

<br />

<inspector-icon-viewer />

<br />
<br />

## Props

| Prop name   | Description                                                                                                          | Type           | Values                                                                                                                             | Default |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- |
| both        |                                                                                                                      | boolean        | -                                                                                                                                  |         |
| clickable   | When true makes icon clickable                                                                                       | boolean        | -                                                                                                                                  |         |
| component   | Icon component name                                                                                                  | string         | -                                                                                                                                  |         |
| customClass | Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes | string         | -                                                                                                                                  |         |
| customSize  | Overrides icon font size, optional                                                                                   | string         | `Depends on library: null (smallest)`, `fa-lg`, `fa-2x`, `fa-3x`, `fa-4x`, `fa-5x`, `mdi-18px`, `mdi-24px`, `mdi-36px`, `mdi-48px` |         |
| icon        | Icon name                                                                                                            | string         | -                                                                                                                                  |         |
| override    |                                                                                                                      | boolean        | -                                                                                                                                  |         |
| pack        | Icon pack to use                                                                                                     | string         | `mdi`, `fa`, `fas and any other custom icon pack`                                                                                  |         |
| rotation    | Rotation 0-360                                                                                                       | number\|string | -                                                                                                                                  |         |
| size        | Icon size, optional                                                                                                  | string         | `small`, `medium`, `large`                                                                                                         |         |
| spin        | Enable spin effect on icon                                                                                           | boolean        | -                                                                                                                                  |         |
| variant     | Color of the icon, optional                                                                                          | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                                                    |         |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__icon.scss.scss)

| CSS Variable               | SASS Variable        | Default |
| -------------------------- | -------------------- | ------- |
| --oruga-icon-spin-duration | \$icon-spin-duration | 2s      |
