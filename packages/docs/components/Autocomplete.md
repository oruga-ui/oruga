---
title: Autocomplete
---

# Autocomplete

> Extended input that provide suggestions while the user types

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/autocomplete/examples/Autocomplete.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a JS framework">
      <o-autocomplete rounded expanded v-model="name" :data="filteredDataArray" placeholder="e.g. jQuery" icon="search" clearable @select="option => selected = option">
        <template slot="empty">No results found</template>
      </o-autocomplete>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: ['Angular', 'Angular 2', 'Aurelia', 'Backbone', 'Ember', 'jQuery', 'Meteor', 'Node.js', 'Polymer', 'React', 'RxJS', 'Vue.js'],
        name: '',
        selected: null
      }
    },
    computed: {
      filteredDataArray() {
        return this.data.filter(option => {
          return (
            option
              .toString()
              .toLowerCase()
              .indexOf(this.name.toLowerCase()) >= 0
          )
        })
      }
    }
  }
</script>
```

:::

### Object array

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-switch v-model="openOnFocus">Open dropdown on focus</o-switch>
      <o-switch v-model="keepFirst">Keep-first</o-switch>
    </o-field>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a name">
      <o-autocomplete
        v-model="name"
        placeholder="e.g. Anne"
        :keep-first="keepFirst"
        :open-on-focus="openOnFocus"
        :data="filteredDataObj"
        field="user.first_name"
        @select="option => selected = option"
      >
      </o-autocomplete>
    </o-field>
  </section>
</template>

<script>
  const data = [
    { id: 1, user: { first_name: 'Jesse', last_name: 'Simmons' }, date: '2016/10/15 13:43:27', gender: 'Male' },
    { id: 2, user: { first_name: 'John', last_name: 'Jacobs' }, date: '2016/12/15 06:00:53', gender: 'Male' },
    { id: 3, user: { first_name: 'Tina', last_name: 'Gilbert' }, date: '2016/04/26 06:26:28', gender: 'Female' },
    { id: 4, user: { first_name: 'Clarence', last_name: 'Flores' }, date: '2016/04/10 10:28:46', gender: 'Male' },
    { id: 5, user: { first_name: 'Anne', last_name: 'Lee' }, date: '2016/12/06 14:38:38', gender: 'Female' },
    { id: 6, user: { first_name: 'Sara', last_name: 'Armstrong' }, date: '2016/09/23 18:50:04', gender: 'Female' },
    { id: 7, user: { first_name: 'Anthony', last_name: 'Webb' }, date: '2016/08/30 23:49:38', gender: 'Male' },
    { id: 8, user: { first_name: 'Andrew', last_name: 'Greene' }, date: '2016/11/20 14:57:47', gender: 'Male' },
    { id: 9, user: { first_name: 'Russell', last_name: 'White' }, date: '2016/07/13 09:29:49', gender: 'Male' },
    { id: 10, user: { first_name: 'Lori', last_name: 'Hunter' }, date: '2016/12/09 01:44:05', gender: 'Female' },
    { id: 11, user: { first_name: 'Ronald', last_name: 'Wood' }, date: '2016/12/04 02:23:48', gender: 'Male' },
    { id: 12, user: { first_name: 'Michael', last_name: 'Harper' }, date: '2016/07/27 13:28:15', gender: 'Male' },
    { id: 13, user: { first_name: 'George', last_name: 'Dunn' }, date: '2017/03/07 12:26:52', gender: 'Male' },
    { id: 14, user: { first_name: 'Eric', last_name: 'Rogers' }, date: '2016/06/07 05:41:52', gender: 'Male' },
    { id: 15, user: { first_name: 'Juan', last_name: 'Meyer' }, date: '2017/02/01 04:56:34', gender: 'Male' },
    { id: 16, user: { first_name: 'Silvia', last_name: 'Rosa' }, date: '2017/01/26 11:50:04', gender: 'Female' },
    { id: 17, user: { first_name: 'Lori', last_name: 'Cunningham' }, date: '2016/05/01 10:00:56', gender: 'Female' },
    { id: 18, user: { first_name: 'Charles', last_name: 'Graham' }, date: '2016/05/31 06:43:30', gender: 'Male' },
    { id: 19, user: { first_name: 'Henry', last_name: 'Morrison' }, date: '2016/09/27 16:15:44', gender: 'Male' },
    { id: 20, user: { first_name: 'Albert', last_name: 'Mendoza' }, date: '2016/08/08 05:29:24', gender: 'Male' },
    { id: 21, user: { first_name: 'Ruby', last_name: 'Snyder' }, date: '2017/04/01 12:04:39', gender: 'Female' },
    { id: 22, user: { first_name: 'Jesse', last_name: 'Warren' }, date: '2016/08/20 01:36:38', gender: 'Male' },
    { id: 23, user: { first_name: 'Carlos', last_name: 'Ferguson' }, date: '2016/05/31 10:40:29', gender: 'Male' },
    { id: 24, user: { first_name: 'Melissa', last_name: 'Peters' }, date: '2016/07/23 00:41:54', gender: 'Female' },
    { id: 25, user: { first_name: 'Arthur', last_name: 'Garza' }, date: '2017/03/11 14:11:37', gender: 'Male' },
    { id: 26, user: { first_name: 'Joe', last_name: 'Berry' }, date: '2016/07/09 15:16:56', gender: 'Male' },
    { id: 27, user: { first_name: 'Joseph', last_name: 'Bishop' }, date: '2016/10/04 19:44:54', gender: 'Male' },
    { id: 28, user: { first_name: 'Sarah', last_name: 'Harper' }, date: '2016/09/23 05:09:11', gender: 'Female' },
    { id: 29, user: { first_name: 'Christopher', last_name: 'Fuller' }, date: '2016/04/12 00:05:35', gender: 'Male' },
    { id: 30, user: { first_name: 'Alan', last_name: 'Mendoza' }, date: '2016/04/22 10:48:02', gender: 'Male' },
    { id: 31, user: { first_name: 'James', last_name: 'Davis' }, date: '2017/01/16 15:17:03', gender: 'Male' },
    { id: 32, user: { first_name: 'Scott', last_name: 'Welch' }, date: '2016/10/04 23:31:51', gender: 'Male' },
    { id: 33, user: { first_name: 'Mildred', last_name: 'Myers' }, date: '2016/11/23 13:46:18', gender: 'Female' },
    { id: 34, user: { first_name: 'Victor', last_name: 'Martinez' }, date: '2016/04/06 17:05:07', gender: 'Male' },
    { id: 35, user: { first_name: 'Susan', last_name: 'Medina' }, date: '2016/12/09 10:33:37', gender: 'Female' },
    { id: 36, user: { first_name: 'Judy', last_name: 'Long' }, date: '2016/07/26 16:19:04', gender: 'Female' },
    { id: 37, user: { first_name: 'Joan', last_name: 'Myers' }, date: '2016/09/22 04:55:54', gender: 'Female' },
    { id: 38, user: { first_name: 'Rachel', last_name: 'Gonzales' }, date: '2016/07/15 13:56:38', gender: 'Female' },
    { id: 39, user: { first_name: 'Roger', last_name: 'Hunt' }, date: '2016/08/14 10:43:11', gender: 'Male' },
    { id: 40, user: { first_name: 'Dorothy', last_name: 'Howard' }, date: '2016/06/19 05:34:49', gender: 'Female' },
    { id: 41, user: { first_name: 'Eugene', last_name: 'Lynch' }, date: '2016/12/24 08:19:24', gender: 'Male' },
    { id: 42, user: { first_name: 'Kathy', last_name: 'Webb' }, date: '2017/04/01 21:09:05', gender: 'Female' },
    { id: 43, user: { first_name: 'Antonio', last_name: 'White' }, date: '2017/02/10 06:51:20', gender: 'Male' },
    { id: 44, user: { first_name: 'Louis', last_name: 'Spencer' }, date: '2016/10/08 02:20:22', gender: 'Male' },
    { id: 45, user: { first_name: 'Andrea', last_name: 'Marshall' }, date: '2016/09/04 10:59:57', gender: 'Female' },
    { id: 46, user: { first_name: 'Eugene', last_name: 'Sims' }, date: '2017/03/15 06:39:48', gender: 'Male' },
    { id: 47, user: { first_name: 'Mildred', last_name: 'Gibson' }, date: '2016/04/18 06:43:54', gender: 'Female' },
    { id: 48, user: { first_name: 'Joan', last_name: 'Arnold' }, date: '2016/12/16 04:52:23', gender: 'Female' },
    { id: 49, user: { first_name: 'Jesse', last_name: 'Schmidt' }, date: '2016/06/11 02:44:33', gender: 'Male' },
    { id: 50, user: { first_name: 'David', last_name: 'Frazier' }, date: '2017/02/15 21:46:30', gender: 'Male' },
    { id: 51, user: { first_name: 'Nicholas', last_name: 'Howell' }, date: '2016/11/01 15:08:31', gender: 'Male' },
    { id: 52, user: { first_name: 'Douglas', last_name: 'Chapman' }, date: '2017/02/08 03:33:24', gender: 'Male' },
    { id: 53, user: { first_name: 'Bruce', last_name: 'Simmons' }, date: '2016/07/14 12:11:17', gender: 'Male' },
    { id: 54, user: { first_name: 'Antonio', last_name: 'George' }, date: '2016/11/07 19:12:55', gender: 'Male' },
    { id: 55, user: { first_name: 'Chris', last_name: 'Marshall' }, date: '2016/07/03 12:11:45', gender: 'Male' },
    { id: 56, user: { first_name: 'Ashley', last_name: 'Hudson' }, date: '2016/10/14 21:08:05', gender: 'Female' },
    { id: 57, user: { first_name: 'Alan', last_name: 'Edwards' }, date: '2017/03/22 21:10:25', gender: 'Male' },
    { id: 58, user: { first_name: 'George', last_name: 'Clark' }, date: '2016/04/28 03:15:05', gender: 'Male' },
    { id: 59, user: { first_name: 'Frank', last_name: 'Porter' }, date: '2016/09/08 00:48:14', gender: 'Male' },
    { id: 60, user: { first_name: 'Christopher', last_name: 'Palmer' }, date: '2016/05/24 08:58:12', gender: 'Male' }
  ]

  export default {
    data() {
      return {
        data,
        keepFirst: false,
        openOnFocus: false,
        name: '',
        selected: null
      }
    },
    computed: {
      filteredDataObj() {
        return this.data.filter(option => {
          return (
            option.user.first_name
              .toString()
              .toLowerCase()
              .indexOf(this.name.toLowerCase()) >= 0
          )
        })
      }
    }
  }
</script>
```

:::

### Groups

::: demo

```html
<template>
  <section>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a food">
      <o-autocomplete v-model="name" group-field="type" group-options="items" open-on-focus :data="filteredDataObj" field="user.first_name" @select="option => (selected = option)">
      </o-autocomplete>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            type: 'Fruit',
            items: ['Apple', 'Banana', 'Watermelon']
          },
          {
            type: 'Vegetables',
            items: ['Carrot', 'Broccoli', 'Cucumber', 'Onion']
          }
        ],
        name: '',
        selected: null
      }
    },
    computed: {
      filteredDataObj() {
        const newData = []
        this.data.forEach(element => {
          const items = element.items.filter(item => item.toLowerCase().indexOf(this.name.toLowerCase()) >= 0)
          if (items.length) {
            newData.push({ type: element.type, items })
          }
        })
        return newData
      }
    }
  }
</script>
98
```

:::

### Infinite Scroll

::: demo

```html
<template>
  <section>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a movie">
      <o-autocomplete
        :data="data"
        placeholder="e.g. Fight Club"
        field="title"
        :loading="isFetching"
        check-infinite-scroll
        :debounce-typing="500"
        @typing="getAsyncData"
        @select="option => selected = option"
        @infinite-scroll="getMoreAsyncData"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`" />
            </div>
            <div class="media-content">
              {{ props.option.title }}
              <br />
              <small> Released at {{ props.option.release_date }}, rated <b>{{ props.option.vote_average }}</b> </small>
            </div>
          </div>
        </template>
        <template slot="footer">
          <span v-show="page > totalPages" class="has-text-grey"> Thats it! No more movies found. </span>
        </template>
      </o-autocomplete>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        selected: null,
        isFetching: false,
        name: '',
        page: 1,
        totalPages: 1
      }
    },
    methods: {
      getAsyncData(name) {
        // String update
        if (this.name !== name) {
          this.name = name
          this.data = []
          this.page = 1
          this.totalPages = 1
        }
        // String cleared
        if (!name.length) {
          this.data = []
          this.page = 1
          this.totalPages = 1
          return
        }
        // Reached last page
        if (this.page > this.totalPages) {
          return
        }
        this.isFetching = true
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}&page=${this.page}`)
          .then(response => response.json())
          .then(data => {
            data.results.forEach(item => this.data.push(item))

            this.page++
            this.totalPages = data.total_pages
          })
          .catch(error => {
            throw error
          })
          .finally(() => {
            this.isFetching = false
          })
      },
      getMoreAsyncData() {
        this.getAsyncData(this.name)
      }
    }
  }
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_autocomplete.scss)

<br />
<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
      <o-autocomplete v-bind="s" group-field="type" group-options="items" placeholder="e.g. Vue.js" :data="filtered" icon="search" clearable @select="option => selected = option">
        <template slot="empty">No results found</template>
      </o-autocomplete>
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>
export default {
    data() {
        return {
            filtered: [
                {
                    type: 'Frameworks',
                    items: ['Vue.js']
                }
            ],
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element",
                },
                {
                    class: "menuClass",
                    description: "Class of the autocomplete menu",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
                {
                    class: "expandedClass",
                    description: "Class of the autocomplete menu expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    },
                },
                {
                    class: "menuPositionClass",
                    description: "Class of the autocomplete menu position",
                    properties: ["menu-position"],
                    suffixes: ["auto", "top", "bottom"],
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
                {
                    class: "itemClass",
                    description: "Class of the menu items.",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
                {
                    class: "itemHoverClass",
                    description: "Class of the menu items on hover.",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, keyCode : 40,  charCode : 40, ctrlKey : false, altKey: false, shiftKey: false, metaKey: false}));
                        setTimeout(() => {
                            el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, keyCode : 40,  charCode : 40, ctrlKey : false, altKey: false, shiftKey: false, metaKey: false}));
                            el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, keyCode : 40,  charCode : 40, ctrlKey : false, altKey: false, shiftKey: false, metaKey: false}));
                        }, 500);
                    },
                },
                {
                    class: "itemGroupTitleClass",
                    description: "Class of the menu items group title.",
                    action: (cmp) => {
                        let el = cmp.$el.querySelector('input')
                        el.dispatchEvent(new Event('focus'));
                        el.dispatchEvent(new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true}));
                    },
                },
            ],
        };
    }
}
</script>

<br />
<br />

## Props

| Prop name           | Description                                                                                                                                            | Type           | Values                                            | Default                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| animation           | Transition name to apply on dropdown list                                                                                                              | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> autocomplete: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| appendToBody        | Append autocomplete content to body                                                                                                                    | boolean        | -                                                 |                                                                                                                                               |
| autocomplete        | Native options to use in HTML5 validation                                                                                                              | string         | -                                                 |                                                                                                                                               |
| checkInfiniteScroll | Makes the component check if list reached scroll end and emit infinite-scroll event.                                                                   | boolean        | -                                                 |                                                                                                                                               |
| clearOnSelect       | Clear input text on select                                                                                                                             | boolean        | -                                                 |                                                                                                                                               |
| clearable           | Add a button/icon to clear the inputed text                                                                                                            | boolean        | -                                                 |                                                                                                                                               |
| confirmKeys         | Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) | array          | -                                                 | ['Tab', 'Enter']                                                                                                                              |
| customFormatter     | Function to format an option to a string for display in the input as alternative to field prop)                                                        | func           | -                                                 |                                                                                                                                               |
| data                | Options / suggestions                                                                                                                                  | array          | -                                                 | []                                                                                                                                            |
| debounceTyping      | Number of milliseconds to delay before to emit typing event                                                                                            | number         | -                                                 |                                                                                                                                               |
| expanded            | Makes input full width when inside a grouped or addon field                                                                                            | boolean        | -                                                 |                                                                                                                                               |
| field               | Property of the object (if data is array of objects) to use as display text, and to keep track of selected option                                      | string         | -                                                 | 'value'                                                                                                                                       |
| groupField          | Property of the object (if <code>data</code> is array of objects) to use as display text of group                                                      | string         | -                                                 |                                                                                                                                               |
| groupOptions        | Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional                             | string         | -                                                 |                                                                                                                                               |
| icon                | Icon name to be added                                                                                                                                  | string         | -                                                 |                                                                                                                                               |
| iconPack            | Icon pack to use                                                                                                                                       | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                               |
| iconRight           | Icon name to be added on the right side                                                                                                                | string         | -                                                 |                                                                                                                                               |
| iconRightClickable  | Clickable icon right if exists                                                                                                                         | boolean        | -                                                 |                                                                                                                                               |
| keepFirst           | The first option will always be pre-selected (easier to just hit enter or tab)                                                                         | boolean        | -                                                 |                                                                                                                                               |
| keepOpen            | Keep open dropdown list after select                                                                                                                   | boolean        | -                                                 |                                                                                                                                               |
| maxHeight           | Max height of dropdown content                                                                                                                         | string\|number | -                                                 |                                                                                                                                               |
| maxlength           | Same as native maxlength, plus character counter                                                                                                       | number\|string | -                                                 |                                                                                                                                               |
| menuPosition        | Position of dropdown                                                                                                                                   | string         | `auto`, `top`, `bottom`                           | 'auto'                                                                                                                                        |
| openOnFocus         | Open dropdown list on focus                                                                                                                            | boolean        | -                                                 |                                                                                                                                               |
| override            | Override classes                                                                                                                                       | boolean        | -                                                 | false                                                                                                                                         |
| rounded             | Makes the element rounded                                                                                                                              | boolean        | -                                                 |                                                                                                                                               |
| size                | Vertical size of input, optional                                                                                                                       | string         | `small`, `medium`, `large`                        |                                                                                                                                               |
| statusIcon          | Show status icon using field and variant prop                                                                                                          | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>              |
| useHtml5Validation  | Enable html 5 native validation                                                                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>      |
| v-model             |                                                                                                                                                        | number\|string | -                                                 |                                                                                                                                               |
| validationMessage   | The message which is shown when a validation error occurs                                                                                              | string         | -                                                 |                                                                                                                                               |

## Events

| Event name       | Properties                                                                  | Description |
| ---------------- | --------------------------------------------------------------------------- | ----------- |
| icon-click       |                                                                             |
| blur             |                                                                             |
| focus            |                                                                             |
| input            |                                                                             |
| select           | **selected** `Object` - selected option<br>**event** `Event` - native event |
| infinite-scroll  |                                                                             |
| typing           |                                                                             |
| icon-right-click |                                                                             |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| header  |             |          |
| group   |             | <br>     |
| default |             | <br>     |
| empty   |             |          |
| footer  |             |          |

## Style

| CSS Variable                                     | SASS Variable                              | Default                                                              |
| ------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------- |
| --oruga-autocomplete-item-color                  | \$autocomplete-item-color                  | #000000                                                              |
| --oruga-autocomplete-item-disabled-opacity       | \$autocomplete-item-disabled-opacity       | \$base-disabled-opacity                                              |
| --oruga-autocomplete-item-font-size              | \$autocomplete-item-font-size              | \$base-font-size                                                     |
| --oruga-autocomplete-item-hover-background-color | \$autocomplete-item-hover-background-color | #f5f5f5                                                              |
| --oruga-autocomplete-item-hover-color            | \$autocomplete-item-hover-color            | #000000                                                              |
| --oruga-autocomplete-item-line-height            | \$autocomplete-item-line-height            | \$base-line-height                                                   |
| --oruga-autocomplete-item-padding                | \$autocomplete-item-padding                | .375rem 1rem                                                         |
| --oruga-autocomplete-menu-background             | \$autocomplete-menu-background             | #ffffff                                                              |
| --oruga-autocomplete-menu-border-radius          | \$autocomplete-menu-border-radius          | \$base-border-radius                                                 |
| --oruga-autocomplete-menu-box-shadow             | \$autocomplete-menu-box-shadow             | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| --oruga-autocomplete-menu-margin                 | \$autocomplete-menu-margin                 | 0                                                                    |
| --oruga-autocomplete-menu-max-height             | \$autocomplete-menu-max-height             | 200px                                                                |
| --oruga-autocomplete-menu-padding                | \$autocomplete-menu-padding                | .5rem 0 .5rem 0                                                      |
| --oruga-autocomplete-menu-zindex                 | \$autocomplete-menu-zindex                 | 20                                                                   |
