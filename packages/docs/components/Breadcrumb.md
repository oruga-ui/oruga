---
title: Breadcrumb
---

# Breadcrumb

> The classic breadcrumb, in different colors, sizes, and states

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/breadcrumb/examples/Breadcrumb.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
	<section>
		<o-breadcrumb>
			<o-breadcrumb-item>Home</o-breadcrumb-item>
			<o-breadcrumb-item>About</o-breadcrumb-item>
			<o-breadcrumb-item>Contact</o-breadcrumb-item>
		</o-breadcrumb>
	</section>
</template>
<script>
	export default {

	}
</script>
```

:::

### States and Styles

::: demo

```html
<!-- Code here -->
```

:::

### Icons

::: demo

```html
<!-- code here -->
```

:::

### Tags

::: demo

```html
<!-- code here -->
```

:::

## Props

| Prop name | Description                    | Type    | Values                                                                          | Default  |
| --------- | ------------------------------ | ------- | ------------------------------------------------------------------------------- | -------- |
| disabled  | Button will be disabled        | boolean | -                                                                               |          |
| iconLeft  | Icon name to show on the left  | string  | -                                                                               |          |
| iconPack  | Icon pack to use               | string  | `mdi`, `fa`, `fas and any other custom icon pack`                               |          |
| iconRight | Icon name to show on the right | string  | -                                                                               |          |
| override  | Override classes               | boolean | -                                                                               | false    |
| size      | Size of button, optional       | string  | `small`, `medium`, `large`                                                      |          |
| tag       | breadcrumb tag name            | string  | `a`, `router-link`                                                              | 'button' |
| variant   | Color of the control, optional | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |          |

## Style

| CSS Variable | SASS Variable | Default |
| ------------ | ------------- | ------- |

