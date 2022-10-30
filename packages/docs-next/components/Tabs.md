---
title: Tabs
---

# Tabs

<div class="vp-doc">

> Responsive horizontal navigation tabs, switch between contents with ease

</div>
<example-tabs />

## Class props

<br />

<inspector-tabs-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name | Description                                     | Type    | Values            | Default                                                                                                                            |
| --------- | ----------------------------------------------- | ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| animated  | Tab will have an animation                      | boolean | -                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tabs: {<br>&nbsp;&nbsp;animated: true<br>}</code> |
| expanded  | Tabs will be expanded (full-width)              | boolean | -                 |                                                                                                                                    |
| multiline | Show tab items multiline when there is no space | boolean | -                 |                                                                                                                                    |
| override  |                                                 | boolean | -                 |                                                                                                                                    |
| type      | Tab type                                        | string  | `boxed`, `toggle` | 'default'                                                                                                                          |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| start   |             |          |
| end     |             |          |
| default |             |          |

---

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__tabs.scss.scss)

| CSS Variable                                       | SASS Variable                                | Default                 |
| -------------------------------------------------- | -------------------------------------------- | ----------------------- |
| --oruga-tabs-disabled-opacity                      | \$tabs-disabled-opacity                      | \$base-disabled-opacity |
| --oruga-tabs-font-size                             | \$tabs-font-size                             | \$base-font-size        |
| --oruga-tabs-icon-margin                           | \$tabs-icon-margin                           | 0.5em                   |
| --oruga-tabs-content-padding                       | \$tabs-content-padding                       | 1rem                    |
| --oruga-tabs-margin-bottom                         | \$tabs-margin-bottom                         | 1.5rem                  |
| --oruga-tabs-border-bottom-color                   | \$tabs-border-bottom-color                   | \$grey-lighter          |
| --oruga-tabs-border-bottom-style                   | \$tabs-border-bottom-style                   | solid                   |
| --oruga-tabs-border-bottom-width                   | \$tabs-border-bottom-width                   | 1px                     |
| --oruga-tabs-link-color                            | \$tabs-link-color                            | hsl(0, 0%, 29%)         |
| --oruga-tabs-link-active-border-bottom-color       | \$tabs-link-active-border-bottom-color       | \$primary               |
| --oruga-tabs-link-active-color                     | \$tabs-link-active-color                     | \$primary               |
| --oruga-tabs-link-line-height                      | \$tabs-link-line-height                      | \$base-line-height      |
| --oruga-tabs-link-padding                          | \$tabs-link-padding                          | 0.5em 1em               |
| --oruga-tabs-boxed-link-radius                     | \$tabs-boxed-link-radius                     | \$base-border-radius    |
| --oruga-tabs-boxed-link-hover-background-color     | \$tabs-boxed-link-hover-background-color     | hsl(0, 0%, 96%)         |
| --oruga-tabs-boxed-link-hover-border-bottom-color  | \$tabs-boxed-link-hover-border-bottom-color  | hsl(0, 0%, 86%)         |
| --oruga-tabs-boxed-link-active-background-color    | \$tabs-boxed-link-active-background-color    | hsl(0, 0%, 100%)        |
| --oruga-tabs-boxed-link-active-border-color        | \$tabs-boxed-link-active-border-color        | hsl(0, 0%, 86%)         |
| --oruga-tabs-boxed-link-active-border-bottom-color | \$tabs-boxed-link-active-border-bottom-color | transparent             |
| --oruga-tabs-toggle-link-border-color              | \$tabs-toggle-link-border-color              | hsl(0, 0%, 86%)         |
| --oruga-tabs-toggle-link-border-style              | \$tabs-toggle-link-border-style              | solid                   |
| --oruga-tabs-toggle-link-border-width              | \$tabs-toggle-link-border-width              | 1px                     |
| --oruga-tabs-toggle-link-hover-background-color    | \$tabs-toggle-link-hover-background-color    | hsl(0, 0%, 96%)         |
| --oruga-tabs-toggle-link-hover-border-color        | \$tabs-toggle-link-hover-border-color        | hsl(0, 0%, 71%)         |
| --oruga-tabs-toggle-link-radius                    | \$tabs-toggle-link-radius                    | \$base-border-radius    |
| --oruga-tabs-toggle-link-active-background-color   | \$tabs-toggle-link-active-background-color   | \$primary               |
| --oruga-tabs-toggle-link-active-border-color       | \$tabs-toggle-link-active-border-color       | \$primary               |
| --oruga-tabs-toggle-link-active-color              | \$tabs-toggle-link-active-color              | \$primary-invert        |

</div>
