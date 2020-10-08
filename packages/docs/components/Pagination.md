---
title: Pagination
---

# Pagination

> A responsive and flexible pagination

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/..\oruga\src\components\pagination\examples\Pagination.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-field label="Total">
        <o-input type="number" v-model="total"></o-input>
      </o-field>
      <o-field label="Items per page">
        <o-input type="number" v-model="perPage"></o-input>
      </o-field>
    </o-field>
    <o-field grouped group-multiline>
      <o-field label="Show buttons before current">
        <o-input type="number" v-model="rangeBefore" min="0"></o-input>
      </o-field>
      <o-field label="Show buttons after current">
        <o-input type="number" v-model="rangeAfter" min="0"></o-input>
      </o-field>
    </o-field>
    <o-field grouped group-multiline>
      <o-field label="Order">
        <o-select v-model="order">
          <option value="">default</option>
          <option value="centered">centered</option>
          <option value="right">right</option>
        </o-select>
      </o-field>
      <o-field label="Size">
        <o-select v-model="size">
          <option value="">default</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </o-select>
      </o-field>
    </o-field>
    <o-field grouped group-multiline>
      <o-field label="Previous icon">
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
    </o-field>
    <div class="block">
      <o-switch v-model="isSimple">Simple</o-switch>
      <o-switch v-model="isRounded">Rounded</o-switch>
    </div>

    <hr />
    <o-pagination
      :total="total"
      :current.sync="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </o-pagination>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        total: 200,
        current: 10,
        perPage: 10,
        rangeBefore: 3,
        rangeAfter: 1,
        order: '',
        size: '',
        isSimple: false,
        isRounded: false,
        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right'
      }
    }
  }
</script>
```

:::

### Slots

::: demo

```html
<template>
  <section>
    <o-pagination :total="200" :current.sync="current" :per-page="10">
      <o-pagination-button slot-scope="props" :page="props.page" :id="`page${props.page.number}`">
        {{ convertToRoman(props.page.number) }}
      </o-pagination-button>

      <o-pagination-button slot="previous" slot-scope="props" :page="props.page">
        Previous
      </o-pagination-button>

      <o-pagination-button slot="next" slot-scope="props" :page="props.page">
        Next
      </o-pagination-button>
    </o-pagination>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        current: 10,
        basicRomanNumeral: [
          '',
          'I',
          'II',
          'III',
          'IV',
          'V',
          'VI',
          'VII',
          'VIII',
          'IX',
          '',
          'X',
          'XX',
          'XXX',
          'XL',
          'L',
          'LX',
          'LXX',
          'LXXX',
          'XC',
          '',
          'C',
          'CC',
          'CCC',
          'CD',
          'D',
          'DC',
          'DCC',
          'DCCC',
          'CM',
          '',
          'M',
          'MM',
          'MMM'
        ]
      }
    },
    methods: {
      convertToRoman(num) {
        const numArray = num.toString().split('')
        const base = numArray.length
        let count = base - 1
        const convertedRoman = numArray.reduce((roman, digit) => {
          const digitRoman = this.basicRomanNumeral[+digit + count * 10]
          const result = roman + digitRoman
          count -= 1
          return result
        }, '')
        return convertedRoman
      }
    }
    /*
        watch: {
            $route: {
                immediate: true,
                handler(newVal, oldVal) {
                    if (newVal.hash) {
                        this.current = parseInt(newVal.hash.replace(/\#page/g, ''))
                    }
                },
            },
        }
        */
  }
</script>
```

:::

## Props

| Prop name         | Description                                                                                                   | Type           | Values                                            | Default                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| total             | Total count of items                                                                                          | number\|string | -                                                 |                                                                |
| perPage           | Items count for each page                                                                                     | number\|string | -                                                 | Config -> <code> 'pagination.perPage': 20</code>               |
| current           | Current page number, use the .sync modifier (Vue 2.x) or v-model:current (Vue 3.x) to make it two-way binding | number\|string | -                                                 | 1                                                              |
| rangeBefore       | Number of pagination items to show before current page                                                        | number\|string | -                                                 | 1                                                              |
| rangeAfter        | Number of pagination items to show after current page                                                         | number\|string | -                                                 | 1                                                              |
| size              | Pagination size, optional                                                                                     | string         | `small`, `medium`, `large`                        |                                                                |
| simple            | Simple style                                                                                                  | boolean        | -                                                 |                                                                |
| rounded           | Rounded button styles                                                                                         | boolean        | -                                                 |                                                                |
| order             | Buttons order, optional                                                                                       | string         | `centered`, `right`, `left`                       |                                                                |
| iconPack          | Icon pack to use                                                                                              | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                |
| iconPrev          | Icon to use for previous button                                                                               | string         | -                                                 | Config -> <code> 'pagination.iconPrev': 'chevron-left'</code>  |
| iconNext          | Icon to use for next button                                                                                   | string         | -                                                 | Config -> <code> 'pagination.iconNext': 'chevron-right'</code> |
| ariaNextLabel     |                                                                                                               | string         | -                                                 |                                                                |
| ariaPreviousLabel |                                                                                                               | string         | -                                                 |                                                                |
| ariaPageLabel     |                                                                                                               | string         | -                                                 |                                                                |
| ariaCurrentLabel  |                                                                                                               | string         | -                                                 |                                                                |
| rootClass         |                                                                                                               | string         | -                                                 |                                                                |
| prevBtnClass      |                                                                                                               | string         | -                                                 |                                                                |
| nextBtnClass      |                                                                                                               | string         | -                                                 |                                                                |
| listClass         |                                                                                                               | string         | -                                                 |                                                                |
| linkClass         |                                                                                                               | string         | -                                                 |                                                                |
| linkCurrentClass  |                                                                                                               | string         | -                                                 |                                                                |
| ellipsisClass     |                                                                                                               | string         | -                                                 |                                                                |
| infoClass         |                                                                                                               | string         | -                                                 |                                                                |
| orderClass        |                                                                                                               | string         | -                                                 |                                                                |
| simpleClass       |                                                                                                               | string         | -                                                 |                                                                |
| roundedClass      |                                                                                                               | string         | -                                                 |                                                                |
| sizeClass         |                                                                                                               | string         | -                                                 |                                                                |

## Events

| Event name     | Type      | Description |
| -------------- | --------- | ----------- |
| change         | undefined |
| update:current | undefined |

## Slots

| Name     | Description | Bindings                                                                                                               |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| previous |             | [<br> {<br> "name": "linkClass"<br> },<br> {<br> "name": "linkCurrentClass"<br> },<br> {<br> "name": "page"<br> }<br>] |
| next     |             | [<br> {<br> "name": "linkClass"<br> },<br> {<br> "name": "linkCurrentClass"<br> },<br> {<br> "name": "page"<br> }<br>] |
| default  |             | [<br> {<br> "name": "page"<br> },<br> {<br> "name": "linkClass"<br> },<br> {<br> "name": "linkCurrentClass"<br> }<br>] |

## Style

| CSS Variable                                     | SASS Variable                              | Default                      |
| ------------------------------------------------ | ------------------------------------------ | ---------------------------- |
| --oruga-pagination-disabled-opacity              | \$pagination-disabled-opacity              | \$base-disabled-opacity      |
| --oruga-pagination-ellipsis-color                | \$pagination-ellipsis-color                | #b5b5b5                      |
| --oruga-pagination-font-size                     | \$pagination-font-size                     | 1rem                         |
| --oruga-pagination-link-border-color             | \$pagination-link-border-color             | #dbdbdb                      |
| --oruga-pagination-link-border-radius            | \$pagination-link-border-radius            | \$base-border-radius         |
| --oruga-pagination-link-border                   | \$pagination-link-border                   | 1px solid transparent        |
| --oruga-pagination-link-color                    | \$pagination-link-color                    | #363636                      |
| --oruga-pagination-link-current-background-color | \$pagination-link-current-background-color | \$primary                    |
| --oruga-pagination-link-current-border-color     | \$pagination-link-current-border-color     | \$primary                    |
| --oruga-pagination-link-current-color            | \$pagination-link-current-color            | #fff                         |
| --oruga-pagination-link-height                   | \$pagination-link-height                   | 2.25em                       |
| --oruga-pagination-link-hover-border-color       | \$pagination-link-hover-border-color       | #b5b5b5                      |
| --oruga-pagination-link-hover-color              | \$pagination-link-hover-color              | #363636                      |
| --oruga-pagination-link-line-height              | \$pagination-link-line-height              | \$base-line-height           |
| --oruga-pagination-link-margin                   | \$pagination-link-margin                   | .25rem                       |
| --oruga-pagination-link-min-width                | \$pagination-link-min-width                | 2.25em                       |
| --oruga-pagination-margin                        | \$pagination-margin                        | -.25rem                      |
| --oruga-pagination-mobile-breakpoint             | \$pagination-mobile-breakpoint             | 768px                        |
| --oruga-pagination-rounded-border-radius         | \$pagination-rounded-border-radius         | \$base-rounded-border-radius |
