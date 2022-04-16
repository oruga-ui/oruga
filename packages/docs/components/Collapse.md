---
title: Collapse
---

# Collapse

> An easy way to toggle what you want

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/collapse/examples/Collapse.md" class="docgen-edit-link">edit on github</a>

## Examples

::: demo

```html
<template>
  <section>
    <o-collapse :open="false" aria-id="contentIdForA11y1">
      <template #trigger="props">
        <o-button variant="primary" aria-controls="contentIdForA11y1" :aria-expanded="props.open">Click me!</o-button>
      </template>
      <div class="notification">
        <h3>
          Subtitle
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />
          Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
        </p>
      </div>
    </o-collapse>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Accordion

::: demo

```html
<template>
  <section>
    <o-collapse class="card" animation="slide" v-for="(collapse, index) of collapses" :key="index" :open="isOpen == index" @open="isOpen = index">
      <template #trigger="props">
        <div class="card-header" role="button" :aria-controls="'contentIdForA11y5-' + index" :aria-expanded="isOpen">
          <p class="card-header-title">
            {{ collapse.title }}
          </p>
          <a class="card-header-icon">
            <o-icon :icon="props.open ? 'caret-up' : 'caret-down'"> </o-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">
          {{ collapse.text }}
        </div>
      </div>
    </o-collapse>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isOpen: 0,
        collapses: [
          {
            title: 'Title 1',
            text: 'Text 1'
          },
          {
            title: 'Title 2',
            text: 'Text 2'
          },
          {
            title: 'Title 3',
            text: 'Text 3'
          }
        ]
      }
    }
  }
</script>

<style>
  .card {
    background-color: #fff;
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
    color: #4a4a4a;
    max-width: 100%;
    position: relative;
  }
  .card-header {
    background-color: transparent;
    align-items: stretch;
    box-shadow: 0 1px 2px hsla(0, 0%, 4%, 0.1);
    display: flex;
  }
  .card-header-title {
    align-items: center;
    color: #363636;
    display: flex;
    flex-grow: 1;
    font-weight: 700;
    padding: 0.75rem;
    margin: 0;
  }
  .card-header-icon {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 0.75rem;
    justify-content: center;
  }
  .card-content {
    padding: 1.5rem;
    background-color: transparent;
  }
</style>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_collapse.scss)

<br />
<template>
  <div>
    <doc-wrapper>
      <template v-slot:default="s">
        <o-collapse
          animation="slide"
          v-bind="s"
          :open="true"
          style="border: 1px solid #dfe2e5"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
          >
            <p class="card-header-title">
              Collapse Title
            </p>
            <a class="card-header-icon">
              <o-icon :icon="props.open ? 'caret-up' : 'caret-down'"> </o-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              Collapse Content
            </div>
          </div>
        </o-collapse>
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inspectData: [
        {
            class: "rootClass",
            description: "Class of the root element"
        },
        {
            class: "triggerClass",
            description: "Class of the trigger element"
        },
        {
            class: "contentClass",
            description: "Class of the content"
        }
      ],
    };
  },
};
</script>

<br />
<br />

## Props

| Prop name | Description                                                                                                            | Type    | Values          | Default                                                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| animation | Custom animation (transition name)                                                                                     | string  | -               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> collapse: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| ariaId    |                                                                                                                        | string  | -               | ''                                                                                                                                        |
| open      | Whether collapse is open or not, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding | boolean | -               | true                                                                                                                                      |
| override  | Override classes                                                                                                       | boolean | -               | false                                                                                                                                     |
| position  | Trigger position                                                                                                       | string  | `top`, `bottom` | 'top'                                                                                                                                     |

## Events

| Event name  | Properties | Description |
| ----------- | ---------- | ----------- |
| update:open |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

## Style

| CSS Variable | SASS Variable | Default |
| ------------ | ------------- | ------- |

