---
sidebarDepth: 2
---

# Breadcrumb

<section class="odocs-head">

The **Breadcrumb** is a simple navigational component that indicates the location of the current page within a list to parent pages in the navigation hierarchy. It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally in front of the main content of a page. The elements are split by a sperator, either by css or by a given string.
The component implements the W3C ARIA APG [Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).

</section>

<section class="odocs-examples">

## Examples

<example-breadcrumb />

</section>

<section class="odocs-specs">

## Breadcrumb component

> The classic breadcrumb, in different colors, sizes, and states

```html
<o-breadcrumb></o-breadcrumb>
```

### Props

| Prop name | Description                                                      | Type                            | Values                                                                          | Default                                                                                                                                                   |
| --------- | ---------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel | Accessibility aria-label to be passed to the nav wrapper element | string                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;ariaLabel: "breadcrumb"<br>}</code>   |
| options   | breadcrumb items, unnecessary when default slot is used          | SimpleOptionsProp               | -                                                                               |                                                                                                                                                           |
| override  | Override existing theme classes completely                       | boolean                         | -                                                                               |                                                                                                                                                           |
| position  | Position of the breadcrumb                                       | "centered" \| "left" \| "right" | `left`, `centered`, `right`                                                     | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;position: "left"<br>}</code>     |
| separator | The separator between breadcrumb items                           | string                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;separator: undefined<br>}</code> |
| size      | Size of the breadcrumb                                           | string                          | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;size: "small"<br>}</code>        |
| variant   | Color variant of the breadcrumb                                  | string                          | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;variant: "primary"<br>}</code>   |

### Slots

| Name    | Description                 | Bindings |
| ------- | --------------------------- | -------- |
| default | Place breadcrumb items here |          |

</section>

<section class="odocs-specs">

## BreadcrumbItem component

> The classic breadrcumb item, in different colors, sizes, and states

```html
<o-breadcrumb-item></o-breadcrumb-item>
```

### Props

| Prop name | Description                                       | Type             | Values                                                      | Default                                                                                                                                                  |
| --------- | ------------------------------------------------- | ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | Whether item is active or not                     | boolean          | -                                                           | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                              |
| disabled  | Item is disabled                                  | boolean          | -                                                           | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                              |
| hidden    | Define whether the item is visible or not         | boolean          | -                                                           | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                              |
| iconLeft  | Icon name to show on the left                     | string           | -                                                           |                                                                                                                                                          |
| iconPack  | Icon pack to use                                  | string           | `mdi`, `fa`, `fas and any other custom icon pack`           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconRight | Icon name to show on the right                    | string           | -                                                           |                                                                                                                                                          |
| iconSize  | Icon size                                         | string           | `small`, `medium`, `large`                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code> |
| label     | Item label, unnecessary when default slot is used | string           | -                                                           |                                                                                                                                                          |
| override  | Override existing theme classes completely        | boolean          | -                                                           |                                                                                                                                                          |
| tag       | Item tag name                                     | DynamicComponent | `li`, `a`, `router-link`, `nuxt-link (or other nuxt alias)` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;tag: "a"<br>}</code>            |

### Slots

| Name      | Description    | Bindings                                  |
| --------- | -------------- | ----------------------------------------- |
| seperator | Item seperator | **seperator** `string` - seperator string |
| default   | Override label |                                           |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-breadcrumb-viewer />

</section>

<section class="odocs-style">

## Sass variables

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
