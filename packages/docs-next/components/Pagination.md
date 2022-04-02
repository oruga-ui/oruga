---
title: Pagination
---

# Pagination

> A responsive and flexible pagination

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/pagination/examples/Pagination.md" class="docgen-edit-link">edit on github</a>

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
        order: "",
        size: "",
        isSimple: false,
        isRounded: false,
        prevIcon: "chevron-left",
        nextIcon: "chevron-right"
      };
    }
  };
</script>
```

:::

### Slots

::: demo

```html
<template>
  <section>
    <o-pagination :total="200" :current.sync="current" :per-page="10">
      <o-pagination-button
        slot-scope="props"
        :page="props.page"
        :id="`page${props.page.number}`"
      >
        {{ convertToRoman(props.page.number) }}
      </o-pagination-button>

      <o-pagination-button
        slot="previous"
        slot-scope="props"
        :page="props.page"
      >
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
          "",
          "I",
          "II",
          "III",
          "IV",
          "V",
          "VI",
          "VII",
          "VIII",
          "IX",
          "",
          "X",
          "XX",
          "XXX",
          "XL",
          "L",
          "LX",
          "LXX",
          "LXXX",
          "XC",
          "",
          "C",
          "CC",
          "CCC",
          "CD",
          "D",
          "DC",
          "DCC",
          "DCCC",
          "CM",
          "",
          "M",
          "MM",
          "MMM"
        ]
      };
    },
    methods: {
      convertToRoman(num) {
        const numArray = num.toString().split("");
        const base = numArray.length;
        let count = base - 1;
        const convertedRoman = numArray.reduce((roman, digit) => {
          const digitRoman = this.basicRomanNumeral[+digit + count * 10];
          const result = roman + digitRoman;
          count -= 1;
          return result;
        }, "");
        return convertedRoman;
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
  };
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_pagination.scss)

<br />

<br />
<br />

## Props

| Prop name         | Description                                                                                                   | Type           | Values                                            | Default                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel  |                                                                                                               | string         | -                                                 |                                                                                                                                                     |
| ariaNextLabel     |                                                                                                               | string         | -                                                 |                                                                                                                                                     |
| ariaPageLabel     |                                                                                                               | string         | -                                                 |                                                                                                                                                     |
| ariaPreviousLabel |                                                                                                               | string         | -                                                 |                                                                                                                                                     |
| current           | Current page number, use the .sync modifier (Vue 2.x) or v-model:current (Vue 3.x) to make it two-way binding | number\|string | -                                                 | 1                                                                                                                                                   |
| iconNext          | Icon to use for next button                                                                                   | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          | Icon pack to use                                                                                              | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                     |
| iconPrev          | Icon to use for previous button                                                                               | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                                                          | string         | -                                                 |                                                                                                                                                     |
| order             | Buttons order, optional                                                                                       | string         | `centered`, `right`, `left`                       |                                                                                                                                                     |
| override          |                                                                                                               | boolean        | -                                                 |                                                                                                                                                     |
| perPage           | Items count for each page                                                                                     | number\|string | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>               |
| rangeAfter        | Number of pagination items to show after current page                                                         | number\|string | -                                                 | 1                                                                                                                                                   |
| rangeBefore       | Number of pagination items to show before current page                                                        | number\|string | -                                                 | 1                                                                                                                                                   |
| rounded           | Rounded button styles                                                                                         | boolean        | -                                                 |                                                                                                                                                     |
| simple            | Simple style                                                                                                  | boolean        | -                                                 |                                                                                                                                                     |
| size              | Pagination size, optional                                                                                     | string         | `small`, `medium`, `large`                        |                                                                                                                                                     |
| total             | Total count of items                                                                                          | number\|string | -                                                 |                                                                                                                                                     |

## Events

| Event name     | Properties | Description |
| -------------- | ---------- | ----------- |
| update:active  |            |
| change         |            |
| update:current |            |

## Slots

| Name     | Description | Bindings   |
| -------- | ----------- | ---------- |
| previous |             | <br/><br/> |
| next     |             | <br/><br/> |
| default  |             | <br/><br/> |

## Style

| CSS Variable                                     | SASS Variable                              | Default                      |
| ------------------------------------------------ | ------------------------------------------ | ---------------------------- |
| --oruga-pagination-disabled-opacity              | \$pagination-disabled-opacity              | \$base-disabled-opacity      |
| --oruga-pagination-ellipsis-color                | \$pagination-ellipsis-color                | \$grey-light                 |
| --oruga-pagination-link-border-color             | \$pagination-link-border-color             | \$grey-lighter               |
| --oruga-pagination-link-border-radius            | \$pagination-link-border-radius            | \$base-border-radius         |
| --oruga-pagination-link-border                   | \$pagination-link-border                   | 1px solid transparent        |
| --oruga-pagination-link-color                    | \$pagination-link-color                    | #363636                      |
| --oruga-pagination-link-current-background-color | \$pagination-link-current-background-color | \$primary                    |
| --oruga-pagination-link-current-border-color     | \$pagination-link-current-border-color     | \$primary // !!!             |
| --oruga-pagination-link-current-color            | \$pagination-link-current-color            | #fff                         |
| --oruga-pagination-link-height                   | \$pagination-link-height                   | 2.25em                       |
| --oruga-pagination-link-hover-border-color       | \$pagination-link-hover-border-color       | \$grey-light                 |
| --oruga-pagination-link-line-height              | \$pagination-link-line-height              | \$base-line-height           |
| --oruga-pagination-link-margin                   | \$pagination-link-margin                   | .25rem                       |
| --oruga-pagination-link-min-width                | \$pagination-link-min-width                | 2.25em                       |
| --oruga-pagination-link-padding                  | \$pagination-link-padding                  | .5em .5em                    |
| --oruga-pagination-margin                        | \$pagination-margin                        | -.25rem                      |
| --oruga-pagination-rounded-border-radius         | \$pagination-rounded-border-radius         | \$base-rounded-border-radius |
