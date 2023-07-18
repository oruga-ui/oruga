---
title: Collapse
---

# Collapse

<div class="vp-doc">

> An easy way to toggle what you want

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-collapse />

</div>
<div class="vp-doc">

## Class props

<inspector-collapse-viewer />

</div>

<div class="vp-doc">

## Collapse Component

### Props

| Prop name | Description                                                              | Type    | Values          | Default                                                                                                                                               |
| --------- | ------------------------------------------------------------------------ | ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation | Custom animation (transition name)                                       | string  | -               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> collapse: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| ariaId    |                                                                          | string  | -               | ''                                                                                                                                                    |
| open      | Whether collapse is open or not, v-model:open to make it two-way binding | boolean | -               | true                                                                                                                                                  |
| override  |                                                                          | boolean | -               |                                                                                                                                                       |
| position  | Trigger position                                                         | string  | `top`, `bottom` | 'top'                                                                                                                                                 |

### Events

| Event name  | Properties | Description |
| ----------- | ---------- | ----------- |
| update:open |            |
| open        |            |
| close       |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

</div>

<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_collapse.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_collapse.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>
