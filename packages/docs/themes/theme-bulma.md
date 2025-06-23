<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

```scss
// This file is home to defaulted variables which DO reference bulma but are not part of a particular component


$sizes-map: (
    "small": dv.$size-small,
    "normal": dv.$size-normal,
    "medium": dv.$size-medium,
    "large": dv.$size-large,
) !default;
// This file is home to defaulted variables which need to be passed to Bulma, or to general defaulted variables which are not part of a particular component


$speed-slow: 150ms !default;
$speed-slower: 250ms !default;

// oruga defines an extra secondary color
$secondary: #6c757d !default;

// alternative to focus-shadow-size
$active-shadow-size: 0 0 0.5em !default;

$theme-bulma-custom-colors: () !default;

// Merge any user-defined custom colors with the custom colors defined by the theme. This will be passes to Bulma as $custom-colors
// This is the one variable in this file which is not defaulted, but it collects defaulted values so it counts. It's going to be passed into bulma so it has to be here so it comes first
// merge our custom-colors with the overridable map
$theme-bulma-custom-colors-merged: map.merge(
    (
        "secondary": $secondary,
    ),
    $theme-bulma-custom-colors
);

$theme-bulma-variables-host: ":root, :host" !default;
```

See ➜ 📄 [SCSS files](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/)
</div>
