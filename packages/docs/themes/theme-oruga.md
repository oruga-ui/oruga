<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

```scss
// Settings
$prefix: "oruga-" !default;
$enable-host: true !default;

// Animations
$animation-speed: 150ms !default;
$animation-speed-fast: 300ms !default;
$animation-timing: ease-out !default;

// Font
$base-font-family: 
// Cross-platform generic font family (default user interface font)
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
$base-font-size: 1rem !default;
$base-font-weight: 400 !default;
$base-line-height: 1.5 !default;

// Base Style
$base-border-radius: 4px !default;
$base-border-radius-rounded: 9999px !default;
$base-line-height: 1.5 !default;
$base-disabled-opacity: 0.5 !default;

$control-brackground-color: #f5f5f5 !default;
$control-border-width: 1px !default;
$control-height: 2.25em !default;
$control-padding-vertical: calc(0.25em - #{$control-border-width});
$control-padding-horizontal: calc(1em - #{$control-border-width});
$control-box-shadow: inset 0 1px 2px hsla(0, 0%, 4%, 0.1);

// Sizes
$sizes: (
    "small": 0.75rem,
    "medium": 1.25rem,
    "large": 1.5rem,
) !default;

// Colors
$white: #ffffff !default;
$black: #000000 !default;
$grey: #7a7a7a !default;
$grey-light: #b5b5b5 !default;
$grey-lighter: #dbdbdb !default;
$grey-dark: #4a4a4a !default;

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
```

See ➜ 📄 [SCSS files](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/)
</div>
