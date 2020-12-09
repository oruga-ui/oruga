---
title: Upload
---

# Upload

> Upload one or more files

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/upload/examples/Upload.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <o-field class="file">
    <o-upload v-model="file">
      <o-button tag="a" variant="primary">
        <o-icon icon="upload"></o-icon>
        <span>Click to upload</span>
      </o-button>
    </o-upload>
    <span class="file-name" v-if="file">
      {{ file.name }}
    </span>
  </o-field>
</template>

<script>
  export default {
    data() {
      return {
        file: null
      }
    }
  }
</script>
```

:::

### Drag&Drop

::: demo

```html
<template>
  <section>
    <o-field>
      <o-upload v-model="dropFiles" multiple drag-drop>
        <section class="ex-center">
          <p>
            <o-icon icon="upload" size="is-large"> </o-icon>
          </p>
          <p>Drop your files here or click to upload</p>
        </section>
      </o-upload>
    </o-field>

    <div class="tags">
      <span v-for="(file, index) in dropFiles" :key="index">
        {{file.name}}
        <o-button icon-left="times" size="small" native-type="button" @click="deleteDropFile(index)"> </o-button>
      </span>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        dropFiles: []
      }
    },
    methods: {
      deleteDropFile(index) {
        this.dropFiles.splice(index, 1)
      }
    }
  }
</script>

<style>
  .ex-center {
    text-align: center;
  }
</style>
```

:::

## Props

| Prop name          | Description                                                           | Type                | Values                                                                          | Default                                            |
| ------------------ | --------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| expanded           | Upload will be expanded (full-width)                                  | boolean             | -                                                                               | false                                              |
| rounded            | Makes the element rounded                                             | boolean             | -                                                                               |                                                    |
| icon               | Icon name to be added                                                 | string              | -                                                                               |                                                    |
| iconPack           | Icon pack to use                                                      | string              | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                    |
| autocomplete       | Native options to use in HTML5 validation                             | string              | -                                                                               |                                                    |
| maxlength          | Same as native maxlength, plus character counter                      | number\|string      | -                                                                               |                                                    |
| useHtml5Validation | Enable html 5 native validation                                       | boolean             | -                                                                               | Config -> <code> "useHtml5Validation": true</code> |
| statusIcon         | Show status icon using field and variant prop                         | boolean             | -                                                                               | Config -> <code> "statusIcon": true</code>         |
| validationMessage  | The message which is shown when a validation error occurs             | string              | -                                                                               |                                                    |
| v-model            |                                                                       | object\|File\|array | -                                                                               |                                                    |
| multiple           | Same as native, also push new item to v-model instead of replacing    | boolean             | -                                                                               |                                                    |
| disabled           | Same as native disabled                                               | boolean             | -                                                                               |                                                    |
| accept             | Same as native accept                                                 | string              | -                                                                               |                                                    |
| dragDrop           | Accepts drag & drop and change its style                              | boolean             | -                                                                               |                                                    |
| variant            | Color of the control, optional                                        | string              | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                    |
| native             | Replace last chosen files every time (like native file input element) | boolean             | -                                                                               | false                                              |
| rootClass          |                                                                       | string              | -                                                                               |                                                    |
| draggableClass     |                                                                       | string              | -                                                                               |                                                    |
| variantClass       |                                                                       | string              | -                                                                               |                                                    |
| expandedClass      |                                                                       | string              | -                                                                               |                                                    |
| disabledClass      |                                                                       | string              | -                                                                               |                                                    |
| hoveredClass       |                                                                       | string              | -                                                                               |                                                    |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| blur       | undefined |
| focus      | undefined |
| input      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                                | SASS Variable                         | Default                 |
| ------------------------------------------- | ------------------------------------- | ----------------------- |
| --oruga-upload-draggable-border             | \$upload-draggable-border             | 1px dashed \$grey-light |
| --oruga-upload-draggable-border-radius      | \$upload-draggable-border-radius      | \$base-border-radius    |
| --oruga-upload-draggable-disabled-opacity   | \$upload-draggable-disabled-opacity   | \$base-disabled-opacity |
| --oruga-upload-draggable-hover-border-color | \$upload-draggable-hover-border-color | \$grey                  |
| --oruga-upload-draggable-padding            | \$upload-draggable-padding            | 0.25em                  |
