<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

```scss
$speed-slow: 150ms !default;
$speed-slower: 250ms !default;

// oruga defines an extra secondary color
$secondary: #6c757d !default;

// alternative to focus-shadow-size
$active-shadow-size: 0 0 0.5em !default;

// make the custom colors extandable by providing a new variable to override
$custom-colors: () !default;

@forward "bulma/sass/utilities/derived-variables" with (
    // adding aditional colors to colors map
    $custom-colors:
        map.merge(
            // merge our custom-colors with the overridable map
            ("secondary": $secondary),
            $custom-colors
        )
);


$sizes-map: (
    "small": vars.$size-small,
    "normal": vars.$size-normal,
    "medium": vars.$size-medium,
    "large": vars.$size-large,
) !default;
```

See ➜ 📄 [SCSS files](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/)
</div>
