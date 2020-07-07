
# Components

- [o-autocomplete](/components/Autocomplete.md)
- [o-button](/components/Button.md)
- [o-checkbox](/components/Checkbox.md)
- [o-collapse](/components/Collapse.md)
- [o-dropdown](/components/Dropdown.md)
- [o-field](/components/Field.md)
- [o-icon](/components/Icon.md)
- [o-input](/components/Input.md)
- [o-loading](/components/Loading.md)
- [o-modal](/components/Modal.md)
- [o-pagination](/components/Pagination.md)
- [o-radio](/components/Radio.md)
- [o-select](/components/Select.md)
- [o-sidebar](/components/Sidebar.md)
- [o-skeleton](/components/Skeleton.md)
- [o-slider](/components/Slider.md)
- [o-switch](/components/Switch.md)
- [o-table](/components/Table.md)
- [o-tooltip](/components/Tooltip.md)

## Config

Oruga allows to customize each components using config constructor or programmatically using `this.$oruga.config`.

```js
{
    componentname: {
        override: boolean,
        customfieldX: string|boolean|number|function|....
    }
}

```

For example:

```js
{
    button: {
        override: true,
        rootClass: 'btn',
        roundedClass: 'btn-rounded',
        ...
    }
}

```

### Global

| Field                             | Description                                                   | Default                       |
| --------------------------------- | ------------------------------------------------------------- | ----------------------------- |
| statusIcon                        | Show status icon using field and variant prop                 | true                          |
| useHtml5Validation                | Default form components use-html5-validation attribute        | true                          |
| iconPack                          | Icon pack used internally and on the Icon component attribute | 'mdi'                         |

Take a look at each component docs to know all customizable fields/props by config.

## Base Style

| SASS Variable                     | Default                       |
| --------------------------------- | ----------------------------- |
| \$base-border-radius              | 4px                           |
| \$base-font-size                  | 1rem                          |
| \$base-rounded-border-radius      | 9999px                        |
| \$base-line-height                | 1.5                           |
| \$base-disabled-opacity           | 0.5                           |
| \$speed                           | 300ms                         |
| \$speed-slow                      | 150ms                         |
| \$speed-slower                    | 250ms                         |
| \$easing                          | ease-out                      |
| \$control-border-width            | 1px                           |
| \$control-width                   | 2em                           |
| \$white                           | #ffffff                       |
| \$black                           | #000000                       |
| \$grey                            | #7a7a7a                       |
| \$grey-light                      | #b5b5b5                       |
| \$grey-lighter                    | #dbdbdb                       |
| \$primary                         | #94C11F                       |
| \$primary-invert                  | $white                        |
| \$danger                          | #ff3860                       |
| \$danger-invert                   | $white                        |
| \$warning                         | #ffdd57                       |
| \$warning-invert                  | $white                        |
| \$success                         | #23d160                       |
| \$success-invert                  | $white                        |
| \$info                            | #info                         |
| \$info-invert                     | $white                        |
| \$whitelist                       | ()                            |
| \$sass-vars:                      | true                          |
| \$css-vars:                       | true                          |
| \$variable-prefix:                | '--oruga-'                    |
| \$sizes:                          | (<br>"small": .75rem,<br>"medium": 1.25rem,<br>"large": 1.5rem<br>) |
| \$colors:                         | (<br>"primary": ($primary, $primary-invert),<br>"danger": ($danger, $danger-invert),<br>"warning": ($warning, $warning-invert),<br>"success": ($success, $success-invert),<br>"info": ($info, $info-invert)<br>) |
