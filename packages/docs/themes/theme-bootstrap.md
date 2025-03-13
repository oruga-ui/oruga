<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

```scss
// adds :root variables also as :host
$enable-host: true !default;

$speed-slow: 150ms !default;
$speed-slower: 250ms !default;
$easing: ease !default;

// sizes variants
$sizes: (
    "x-small": 0.5rem,
    "small": 0.75rem,
    "medium": 1.25rem,
    "large": 1.5rem,
    "x-large": 2rem,
) !default;

// adding aditional gray-light color to colors map
$custom-colors: (
    "gray-light": $gray-300,
);
$colors: map.merge($colors, $custom-colors);

// these theme color maps are available:
// - $theme-colors                -> var(--#{$prefix}#{$name});
// - $theme-colors-contrast       -> var(--#{$prefix}#{$name}-contrast);
// - $theme-colors-text           -> var(--#{$prefix}#{$name}-text-emphasis);
// - $theme-colors-rgb            -> var(--#{$prefix}#{$name}-rgb);
// - $theme-colors-bg-subtle      -> var(--#{$prefix}#{$name}-bg-subtle)
// - $theme-colors-border-subtle  -> var(--#{$prefix}#{$name}-border-subtle)
```

See ➜ 📄 [SCSS files](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/)
</div>
