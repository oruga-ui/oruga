<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

```scss
// Settings
$prefix: "oruga" !default;
$enable-host: true !default;

// Animations
$animation-speed-fast: 150ms !default;
$animation-speed: 300ms !default;
$animation-speed-slow: 500ms !default;
$animation-timing: ease-out !default;

// Sizes
$sizes: (
    "small": 0.75rem,
    "medium": 1.25rem,
    "large": 1.5rem,
) !default;

// Colors
$white: #ffffff !default;
$black: #04071a !default;
$grey: #7a7a7a !default;
$grey-light: #b5b5b5 !default;
$grey-lighter: #dbdbdb !default;
$grey-lightest: #f5f5f5 !default;
$grey-dark: #6c6e72 !default;
$grey-darker: #4a4a4a !default;
$grey-darkest: #3f3f3f !default;

$primary: #445e00 !default;
$primary-invert: $white !default;
$secondary: #6c757d !default;
$secondary-invert: $white !default;
$success: #006724 !default;
$success-invert: $white !default;
$info: #005c98 !default;
$info-invert: $white !default;
$warning: #f4c300 !default;
$warning-invert: $black !default;
$danger: #b60000 !default;
$danger-invert: $white !default;

// Colors map
$colors: (
    "primary": (
        $primary,
        $primary-invert,
    ),
    "secondary": (
        $secondary,
        $secondary-invert,
    ),
    "success": (
        $success,
        $success-invert,
    ),
    "info": (
        $info,
        $info-invert,
    ),
    "warning": (
        $warning,
        $warning-invert,
    ),
    "danger": (
        $danger,
        $danger-invert,
    ),
) !default;

// z-index map
$zindex: (
    "dropdown": 10,
    "sticky": 20,
    "fixed": 30,
    "overlay": 40,
    "sidebar": 50,
    "modal": 60,
    "tooltip": 80,
) !default;

// Font
$font-family: // Cross-platform generic font family (default user interface font)
    system-ui,
    // Safari for macOS and iOS (San Francisco)
    -apple-system,
    // Windows
    "Segoe UI",
    // Android
    Roboto,
    // older macOS and iOS
    "Helvetica Neue",
    // Linux
    "Noto Sans",
    "Liberation Sans",
    // Basic web fallback
    Arial,
    // Sans serif fallback
    sans-serif !default;
$font-color: #363636 !default;
$font-size: 1rem !default;
$font-weight: 400 !default;
$line-height: 1.5 !default;

// Base Style
$border-radius: 4px !default;
$border-radius-rounded: 9999px !default;

$control-spacer: 0.5em !default;
$control-brackground-color: $white !default;
$control-border-color: $grey-lighter !default;
$control-border-width: 1px !default;
$control-height: 2.25em !default;
$control-padding-vertical: calc(0.375em - #{$control-border-width}) !default;
$control-padding-horizontal: calc(0.8em - #{$control-border-width}) !default;
$control-disabled-opacity: 0.5 !default;
$control-shadow-color: hsla(0, 0%, 4%, 0.1) !default;
$control-box-shadow: 0 1px 2px 0 $control-shadow-color !default;
$control-box-shadow-inset: inset $control-box-shadow !default;
$control-focus-box-shadow: 0 0 0 0.25rem !default;

$overlay-background-color: hsla(0, 0%, 4%, 0.86) !default;
$overlay-box-shadow: 5px 0px 13px 3px $control-shadow-color !default;
```

See ➜ 📄 [SCSS files](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/)

</div>
