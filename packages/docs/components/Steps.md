---
title: Steps
---

# Steps

> Responsive horizontal process steps

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/steps/examples/Steps.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <p>
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="showSocial"> Show Social step </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isAnimated"> Animated </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isRounded"> Rounded </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isStepsClickable"> Clickable Marker </o-switch>
        </div>
      </o-field>
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="hasNavigation"> Navigation Buttons </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="customNavigation"> Custom Navigation </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isProfileSuccess"> Set <code>success</code> for profile </o-switch>
        </div>
      </o-field>
      <o-field v-if="hasNavigation" grouped group-multiline>
        <o-field label="Prev icon">
          <o-select v-model="prevIcon">
            <option value="chevron-left">Chevron</option>
            <option value="arrow-left">Arrow</option>
          </o-select>
        </o-field>
        <o-field label="Next icon">
          <o-select v-model="nextIcon">
            <option value="chevron-right">Chevron</option>
            <option value="arrow-right">Arrow</option>
          </o-select>
        </o-field>
        <o-field label="Label position">
          <o-select v-model="labelPosition">
            <option value="bottom">Bottom</option>
            <option value="right">Right</option>
            <option value="left">Left</option>
          </o-select>
        </o-field>
        <o-field label="Mobile mode">
          <o-select v-model="mobileMode">
            <option :value="null">-</option>
            <option value="minimalist">Minimalist</option>
            <option value="compact">Compact</option>
          </o-select>
        </o-field>
      </o-field>
    </p>
    <o-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <o-step-item step="1" label="Account" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">Account</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item step="2" label="Profile" :clickable="isStepsClickable" :variant="{'success': isProfileSuccess}">
        <h1 class="title has-text-centered">Profile</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item step="3" :visible="showSocial" label="Social" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">Social</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item :step="showSocial ? '4' : '3'" label="Finish" :clickable="isStepsClickable" disabled>
        <h1 class="title has-text-centered">Finish</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <template v-if="customNavigation" slot="navigation" slot-scope="{previous, next}">
        <o-button outlined variant="danger" icon-pack="fas" icon-left="backward" :disabled="previous.disabled" @click.prevent="previous.action">
          Previous
        </o-button>
        <o-button outlined variant="success" icon-pack="fas" icon-right="forward" :disabled="next.disabled" @click.prevent="next.action">
          Next
        </o-button>
      </template>
    </o-steps>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        activeStep: 0,

        showSocial: false,
        isAnimated: true,
        isRounded: true,
        isStepsClickable: false,

        hasNavigation: true,
        customNavigation: false,
        isProfileSuccess: false,

        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right',
        labelPosition: 'bottom',
        mobileMode: 'minimalist'
      }
    }
  }
</script>
```

:::

### Variants

::: demo

```html
<template>
  <section>
    <o-steps variant="warning">
      <o-step-item label="Account" icon="user-lock"></o-step-item>
      <o-step-item label="Profile" icon="user"></o-step-item>
      <o-step-item label="Social" icon="user-plus"></o-step-item>
    </o-steps>

    <o-steps variant="info">
      <o-step-item label="Account" icon="user-lock"></o-step-item>
      <o-step-item label="Profile" icon="user"></o-step-item>
      <o-step-item label="Social" icon="user-plus"></o-step-item>
    </o-steps>

    <o-steps variant="success">
      <o-step-item label="Account" icon="user-lock"></o-step-item>
      <o-step-item label="Profile" icon="user"></o-step-item>
      <o-step-item label="Social" icon="user-plus"></o-step-item>
    </o-steps>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Vertical

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <div class="control">
        <o-switch v-model="position" true-value="right"> Right position </o-switch>
      </div>
      <o-field label="Size">
        <o-select v-model="size" placeholder="Size">
          <option :value="null">Default</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </o-select>
      </o-field>
      <o-field label="Label position" label-position="on-border">
        <o-select v-model="labelPosition">
          <option value="bottom">Bottom</option>
          <option value="right">Right</option>
          <option value="left">Left</option>
        </o-select>
      </o-field>
    </o-field>

    <o-steps :position="position" :label-position="labelPosition" :size="size" vertical>
      <o-step-item label="Account" icon="user-lock">
        Account: Lorem ipsum dolor sit amet. <br />
        Account: Lorem ipsum dolor sit amet. <br />
        Account: Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item label="Profile" icon="user">
        Profile: Lorem ipsum dolor sit amet. <br />
        Profile: Lorem ipsum dolor sit amet.? <br />
        Profile: Lorem ipsum dolor sit amet. <br />
        Profile: Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item label="Social" icon="user-plus" disabled>
        Social: Lorem ipsum dolor sit amet. <br />
        Social: Lorem ipsum dolor sit amet. <br />
        Social: Lorem ipsum dolor sit amet. <br />
        Social: Lorem ipsum dolor sit amet. <br />
        Social: Lorem ipsum dolor sit amet.
      </o-step-item>
    </o-steps>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'bottom',
        position: null,
        size: null
      }
    }
  }
</script>
```

:::

## Props

| Prop name         | Description                                                                                                                   | Type           | Values                                                                          | Default                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| v-model           |                                                                                                                               | string\|number | -                                                                               |                                                           |
| variant           | Color of the control, optional                                                                                                | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                           |
| size              | Tab size, optional                                                                                                            | string         | `small`, `medium`, `large`                                                      |                                                           |
| animated          |                                                                                                                               | boolean        | -                                                                               | true                                                      |
| vertical          | Show tab in vertical layout                                                                                                   | boolean        | -                                                                               | false                                                     |
| position          | Position of the tab, optional                                                                                                 | string         | `centered`, `right`                                                             |                                                           |
| destroyOnHide     | Destroy tab on hide                                                                                                           | boolean        | -                                                                               | false                                                     |
| iconPack          | Icon pack to use for the navigation                                                                                           | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                           |
| iconPrev          | Icon to use for navigation button                                                                                             | string         | -                                                                               | Config -> <code> 'steps.iconPrev': 'chevron-left'</code>  |
| iconNext          | Icon to use for navigation button                                                                                             | string         | -                                                                               | Config -> <code> 'steps.iconNext': 'chevron-right'</code> |
| hasNavigation     | Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items. | boolean        | -                                                                               | true                                                      |
| labelPosition     | Position of the marker label, optional                                                                                        | string         | `bottom`, `right`, `left`                                                       | 'bottom'                                                  |
| rounded           | Rounded step markers                                                                                                          | boolean        | -                                                                               | true                                                      |
| ariaNextLabel     |                                                                                                                               | string         | -                                                                               |                                                           |
| ariaPreviousLabel |                                                                                                                               | string         | -                                                                               |                                                           |

## Class props

| Prop name                     | Description | Type   | Values | Default |
| ----------------------------- | ----------- | ------ | ------ | ------- |
| rootClass                     |             | string | -      |         |
| sizeClass                     |             | string | -      |         |
| verticalClass                 |             | string | -      |         |
| positionClass                 |             | string | -      |         |
| stepsClass                    |             | string | -      |         |
| variantClass                  |             | string | -      |         |
| animatedClass                 |             | string | -      |         |
| labelPositionClass            |             | string | -      |         |
| stepMarkerRoundedClass        |             | string | -      |         |
| stepDividerClass              |             | string | -      |         |
| stepMarkerClass               |             | string | -      |         |
| stepContentClass              |             | string | -      |         |
| stepContentTransitioningClass |             | string | -      |         |
| stepNavigationClass           |             | string | -      |         |
| stepDetailsClass              |             | string | -      |         |
| stepTitleClass                |             | string | -      |         |
| stepLinkClass                 |             | string | -      |         |
| stepLinkClickableClass        |             | string | -      |         |

### Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| input      | undefined |

### Slots

| Name       | Description | Bindings                                                                  |
| ---------- | ----------- | ------------------------------------------------------------------------- |
| default    |             |                                                                           |
| navigation |             | [<br> {<br> "name": "previous"<br> },<br> {<br> "name": "next"<br> }<br>] |

---

# OStepItem

## Props

| Prop name | Description                                                                                                                         | Type           | Values | Default   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------ | --------- |
| label     | Item label                                                                                                                          | string         | -      |           |
| icon      | Icon on the left                                                                                                                    | string         | -      |           |
| iconPack  | Icon pack                                                                                                                           | string         | -      |           |
| visible   | Show/hide item                                                                                                                      | boolean        | -      | true      |
| value     | Item value (it will be used as v-model of wrapper component)                                                                        | string\|number | -      |           |
| step      | Step marker content (when there is no icon)                                                                                         | string\|number | -      |           |
| variant   | Default style for the step, optional This will override parent type. Could be used to set a completed step to "success" for example | string\|object | -      |           |
| clickable | Item can be used directly to navigate. If undefined, previous steps are clickable while the others are not                          | boolean        | -      | undefined |

## Class props

| Prop name         | Description              | Type                  | Values | Default |
| ----------------- | ------------------------ | --------------------- | ------ | ------- |
| headerClass       | Header class of the item | string\|array\|object | -      |         |
| itemClass         |                          | string                | -      |         |
| variantClass      |                          | string                | -      |         |
| itemActiveClass   |                          | string                | -      |         |
| itemPreviousClass |                          | string                | -      |         |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                               | SASS Variable                        | Default                      |
| ------------------------------------------ | ------------------------------------ | ---------------------------- |
| --oruga-steps-details-background-color     | \$steps-details-background-color     | hsl(0, 0%, 100%)             |
| --oruga-steps-details-padding              | \$steps-details-padding              | .2em                         |
| --oruga-steps-maker-default-background     | \$steps-maker-default-background     | \$grey-light                 |
| --oruga-steps-maker-default-color          | \$steps-maker-default-color          | \$primary-invert             |
| --oruga-steps-marker-default-border        | \$steps-marker-default-border        | .2em solid #fff              |
| --oruga-steps-maker-font-weight            | \$steps-maker-font-weight            | 700                          |
| --oruga-steps-marker-rounded-border-radius | \$steps-marker-rounded-border-radius | \$base-rounded-border-radius |
| --oruga-steps-default-color                | \$steps-default-color                | \$grey-lighter               |
| --oruga-steps-previous-color               | \$steps-previous-color               | \$primary                    |
| --oruga-steps-active-color                 | \$steps-active-color                 | \$primary                    |
| --oruga-steps-divider-height               | \$steps-divider-height               | .2em                         |
| --oruga-steps-vertical-padding             | \$steps-vertical-padding             | 1em 0                        |
| --oruga-steps-mobile-max-width             | \$steps-mobile-max-width             | 769px                        |
| --oruga-steps-item-line-height             | \$steps-item-line-height             | \$base-line-height           |
| --oruga-steps-link-color                   | \$steps-link-color                   | hsl(0, 0%, 29%)              |
| --oruga-steps-content-padding              | \$steps-content-padding              | 1rem                         |
| --oruga-steps-details-title-font-weight    | \$steps-details-title-font-weight    | 600                          |
