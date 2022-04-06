---
title: Radio
---

# Radio

> Select an option from a set

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/radio/examples/Radio.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demote>
<section>
<div class="block">
<o-radio v-model="radio"
                name="name"
                native-value="Flint">
Flint
</o-radio>
<o-radio v-model="radio"
                name="name"
                native-value="Silver">
Silver
</o-radio>
<o-radio v-model="radio"
                name="name"
                native-value="Jack">
Jack
</o-radio>
<o-radio v-model="radio"
                name="name"
                native-value="Vane"
                disabled>
Vane
</o-radio>
</div>
<p class="content">
<b>Selection:</b>
{{ radio }}
</p>
</section>
</template>

<script>
    export default {
        data() {
            return {
                radio: 'Jack'
            }
        }
    }
</script>

:::

### Variants

::: demoction>
<div class="field">
<o-radio v-model="radio"
                native-value="default">
Default
</o-radio>
</div>
<div class="field">
<o-radio v-model="radio"
                native-value="info"
                variant="info">
Info
</o-radio>
</div>
<div class="field">
<o-radio v-model="radio"
                native-value="success"
                variant="success">
Success
</o-radio>
</div>
<div class="field">
<o-radio v-model="radio"
                native-value="danger"
                variant="danger">
Danger
</o-radio>
</div>
<div class="field">
<o-radio v-model="radio"
                native-value="warning"
                variant="warning">
Warning
</o-radio>
</div>
</section>
</template>

<script>
    export default {
        data() {
            return {
                radio: 'default'
            }
        }
    }
</script>

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_radio.scss)

<br />

<br />
<br />

## Props

| Prop name   | Description                    | Type                           | Values                                                                          | Default |
| ----------- | ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------- | ------- |
| disabled    | Same as native disabled        | boolean                        | -                                                                               |         |
| name        | Same as native name            | string                         | -                                                                               |         |
| nativeValue | Same as native value           | string\|number\|boolean\|array | -                                                                               |         |
| override    |                                | boolean                        | -                                                                               |         |
| required    |                                | boolean                        | -                                                                               |         |
| size        | Size of the control, optional  | string                         | `small`, `medium`, `large`                                                      |         |
| v-model     |                                | string\|number\|boolean\|array | -                                                                               |         |
| variant     | Color of the control, optional | string                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| input             |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                             | SASS Variable                      | Default                 |
| ---------------------------------------- | ---------------------------------- | ----------------------- |
| --oruga-radio-active-background-color    | \$radio-active-background-color    | \$primary               |
| --oruga-radio-checked-box-shadow-length  | \$radio-checked-box-shadow-length  | 0 0 0.5em               |
| --oruga-radio-checked-box-shadow-opacity | \$radio-checked-box-shadow-opacity | 0.8                     |
| --oruga-radio-disabled-opacity           | \$radio-disabled-opacity           | \$base-disabled-opacity |
| --oruga-radio-label-padding              | \$radio-label-padding              | 0 0 0 .5em              |
| --oruga-radio-margin-sibiling            | \$radio-margin-sibiling            | 0.5em                   |
| --oruga-radio-size                       | \$radio-size                       | 1rem                    |
| --oruga-radio-line-height                | \$radio-line-height                | 1.25                    |
