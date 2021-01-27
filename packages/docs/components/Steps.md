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
        labelPosition: 'bottom'
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
    <h4>Warning</h4>
    <o-steps variant="warning">
      <o-step-item label="Account" icon="user-lock"></o-step-item>
      <o-step-item label="Profile" icon="user"></o-step-item>
      <o-step-item label="Social" icon="user-plus"></o-step-item>
    </o-steps>

    <h4>Info</h4>
    <o-steps variant="info">
      <o-step-item label="Account" icon="user-lock"></o-step-item>
      <o-step-item label="Profile" icon="user"></o-step-item>
      <o-step-item label="Social" icon="user-plus"></o-step-item>
    </o-steps>

    <h4>Success</h4>
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

## Class props

<br />
<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-steps v-bind="s" v-model="activeStep">
                    <o-step-item v-bind="s" label="Account" icon="user-lock" step="1">
                        <h1 class="title has-text-centered">Account</h1>
                        Lorem ipsum dolor sit amet.
                    </o-step-item>
                    <o-step-item v-bind="s" label="Profile" icon="user" clickable step="2">
                        <h1 class="title has-text-centered">Profile</h1>
                        Lorem ipsum dolor sit amet.
                    </o-step-item>
                    <o-step-item v-bind="s" label="Social" icon="user-plus" step="3">
                        <h1 class="title has-text-centered">Social</h1>
                        Lorem ipsum dolor sit amet.
                    </o-step-item>
                </o-steps>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData" :subitem="subitem"></inspector>
        <br/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeStep: 1,
            subitem: 'step-item',
            inspectData: [
                {
                    class: "rootClass",
                    description: "Root class of the element",
                },
                {
                    class: "sizeClass",
                    description: "Size of the steps",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    }
                },
                {
                    class: "verticalClass",
                    description: "Class of the tooltip trigger",
                    properties: ['vertical'],
                    action: (cmp) => {
                        cmp.data.vertical = true
                    }
                },
                {
                    class: "positionClass",
                    description: "Class of the Steps component when is vertical and its position changes",
                    properties: ['position', 'vertical'],
                    suffixes: ['bottom', 'left', 'right'],
                    action: (cmp) => {
                        cmp.data.vertical = true
                        cmp.data.position = 'right'
                    }
                },
                {
                    class: "itemClass",
                    description: "Class of the content item",
                    subitem: true
                },
                {
                    class: "itemHeaderClass",
                    description: "Class of the nav item",
                    subitem: true
                },
                {
                    class: "itemHeaderActiveClass",
                    description: "Class of the nav item when active",
                    subitem: true
                },
                {
                    class: "itemHeaderPreviousClass",
                    description: "Class of the nav item behind the active one",
                    subitem: true,
                    action: () => {
                        this.activeStep = 2;
                    }
                },
                {
                    class: "stepsClass",
                    description: "Class of the steps container",
                    action: () => {
                    }
                },
                {
                    class: "animatedClass",
                    description: "Class of Steps component when animation gets triggered",
                    properties: ['animated'],
                    action: (cmp) => {
                        cmp.data.animated = true
                    }
                },
                {
                    class: "stepMarkerRoundedClass",
                    description: "Class of the Steps markers trigger when are rounded",
                    properties: ['rounded'],
                    action: (cmp) => {
                        cmp.data.position = 'right'
                    }
                },
                {
                    class: "stepDividerClass",
                    description: "Class of the Steps component dividers",
                    action: () => {
                    }
                },
                {
                    class: "stepMarkerClass",
                    description: "Class of the Steps component marker",
                    action: () => {
                    }
                },
                {
                    class: "stepContentClass",
                    description: "Class of the Steps component content",
                    action: () => {
                    }
                },
                {
                    class: "stepContentTransitioningClass",
                    description: "Class of the Steps component content when transition is happening",
                    warning: "Click on a marker to see it in action",
                    action: () => {
                    }
                },
                {
                    class: "stepNavigationClass",
                    description: "Class of the Steps component navigation element",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkLabelClass",
                    description: "Class of the Step component link label",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkClass",
                    description: "Class of the Steps component link",
                    action: () => {
                    }
                },
                {
                    class: "stepLinkClickableClass",
                    description: "Class of the Steps component link when clickable",
                    properties: ["clickable"],
                    action: () => {
                    }
                },
                {
                    class: "stepLinkLabelPositionClass",
                    description: "Class of the Step component link label when positioned",
                    properties: ['labelPosition'],
                    suffixes: ['bottom', 'right', 'left'],
                    action: (cmp) => {
                        cmp.data.labelPosition = "right"
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the Steps component variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = 'warning';
                    }
                }
            ]
        };
    },
};
</script>

<br />
<br />

## Props

| Prop name         | Description                                                                                                                   | Type           | Values                                                                          | Default                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| animated          | Step navigation is animated                                                                                                   | boolean        | -                                                                               | true                                                                                                                                          |
| ariaNextLabel     |                                                                                                                               | string         | -                                                                               |                                                                                                                                               |
| ariaPreviousLabel |                                                                                                                               | string         | -                                                                               |                                                                                                                                               |
| destroyOnHide     | Destroy tab on hide                                                                                                           | boolean        | -                                                                               | false                                                                                                                                         |
| hasNavigation     | Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items. | boolean        | -                                                                               | true                                                                                                                                          |
| iconNext          | Icon to use for navigation button                                                                                             | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> steps {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          | Icon pack to use for the navigation                                                                                           | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                               |
| iconPrev          | Icon to use for navigation button                                                                                             | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> steps {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| labelPosition     | Position of the marker label, optional                                                                                        | string         | `bottom`, `right`, `left`                                                       | 'bottom'                                                                                                                                      |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                                                                          | string         | -                                                                               |                                                                                                                                               |
| override          |                                                                                                                               | boolean        | -                                                                               |                                                                                                                                               |
| position          | Position of the tab, optional                                                                                                 | string         | `centered`, `right`                                                             |                                                                                                                                               |
| rounded           | Rounded step markers                                                                                                          | boolean        | -                                                                               | true                                                                                                                                          |
| size              | Tab size, optional                                                                                                            | string         | `small`, `medium`, `large`                                                      |                                                                                                                                               |
| v-model           |                                                                                                                               | string\|number | -                                                                               |                                                                                                                                               |
| variant           | Color of the control, optional                                                                                                | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                               |
| vertical          | Show tab in vertical layout                                                                                                   | boolean        | -                                                                               | false                                                                                                                                         |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |

### Slots

| Name       | Description | Bindings |
| ---------- | ----------- | -------- |
| default    |             |          |
| navigation |             | <br>     |

---

# Step Item

## Props

| Prop name | Description                                                                                                                         | Type           | Values | Default   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------ | --------- |
| clickable | Item can be used directly to navigate. If undefined, previous steps are clickable while the others are not                          | boolean        | -      | undefined |
| icon      | Icon on the left                                                                                                                    | string         | -      |           |
| iconPack  | Icon pack                                                                                                                           | string         | -      |           |
| label     | Item label                                                                                                                          | string         | -      |           |
| override  |                                                                                                                                     | boolean        | -      |           |
| step      | Step marker content (when there is no icon)                                                                                         | string\|number | -      |           |
| value     | Item value (it will be used as v-model of wrapper component)                                                                        | string\|number | -      |           |
| variant   | Default style for the step, optional This will override parent type. Could be used to set a completed step to "success" for example | string\|object | -      |           |
| visible   | Show/hide item                                                                                                                      | boolean        | -      | true      |

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
| --oruga-steps-item-line-height             | \$steps-item-line-height             | \$base-line-height           |
| --oruga-steps-link-color                   | \$steps-link-color                   | hsl(0, 0%, 29%)              |
| --oruga-steps-content-padding              | \$steps-content-padding              | 1rem                         |
| --oruga-steps-font-size                    | \$steps-font-size                    | \$base-font-size             |
| --oruga-steps-details-title-font-weight    | \$steps-details-title-font-weight    | 600                          |
