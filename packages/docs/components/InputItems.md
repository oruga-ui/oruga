---
title: Inputitems
---

# Inputitems

> A simple item input field that can have autocomplete functionality

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/inputitems/examples/Inputitems.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field label="Add some tags">
      <o-inputitems v-model="tags" icon="tag" placeholder="Add a tag" aria-close-label="Delete this tag"> </o-inputitems>
    </o-field>
    <p class="content"><b>Tags:</b> {{ tags }}</p>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        tags: ['Auckland', 'Wellington', 'Very long string that would overflow']
      }
    }
  }
</script>
```

:::

### Autocomplete

::: demo

```html
<template>
  <section>
    <div class="block">
      <o-switch v-model="allowNew">
        Allow new tags
      </o-switch>
      <o-switch v-model="openOnFocus">
        Open on focus
      </o-switch>
    </div>
    <o-field label="Enter some tags">
      <o-inputitems
        v-model="tags"
        :data="filteredTags"
        autocomplete
        :allow-new="allowNew"
        :open-on-focus="openOnFocus"
        field="user.first_name"
        icon="tag"
        placeholder="Add a tag"
        @typing="getFilteredTags"
      >
      </o-inputitems>
    </o-field>
    <p class="content"><b>Tags:</b> {{ tags }}</p>
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
        filteredTags: data,
        tags: [],
        allowNew: false,
        openOnFocus: false
      }
    },
    methods: {
      getFilteredTags(text) {
        this.filteredTags = data.filter(option => {
          return (
            option.user.first_name
              .toString()
              .toLowerCase()
              .indexOf(text.toLowerCase()) >= 0
          )
        })
      }
    }
  }
</script>
```

:::

### Custom selected

::: demo

```html
<template>
  <section>
    <o-field label="Enter some items">
      <o-inputitems v-model="items" ref="input" icon="tag" placeholder="Add an item">
        <template #selected="{ items }">
          <o-button native-type="button" v-for="(item, index) in items" :key="index" :variant="getType(item)" rounded @click="$refs.input.removeItem(index, $event)">
            {{ item }}
          </o-button>
        </template>
      </o-inputitems>
    </o-field>
    <p class="content"><b>Items:</b> {{ items }}</p>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    methods: {
      getType(item) {
        const random = 'Z'.charCodeAt(0) - item.toUpperCase().charCodeAt(0)
        if (random >= 1 && random < 5) {
          return 'primary'
        } else if (random >= 6 && random < 10) {
          return 'danger'
        } else if (random >= 11 && random < 15) {
          return 'warning'
        } else if (random >= 15 && random < 20) {
          return 'success'
        } else if (random >= 20 && random < 25) {
          return 'info'
        }
      }
    }
  }
</script>
```

:::

### Limits

::: demo

```html
<template>
  <section>
    <o-field label="Limited to 10 characters">
      <o-inputitems maxlength="10" :value="['Oruga', 'Vue', 'CSS']"> </o-inputitems>
    </o-field>

    <o-field label="Limited to 5 tags">
      <o-inputitems maxitems="5" :value="['One', 'Two', 'Three', 'Four']"> </o-inputitems>
    </o-field>

    <o-field label="Limited to 10 characters and 5 tags">
      <o-inputitems maxlength="10" maxitems="5" :value="['Red', 'Green', 'Blue', 'White']"> </o-inputitems>
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_inputitems.scss)

<br />
<template>
	<div>
		<doc-wrapper>
			<template v-slot:default="s">
				<o-inputitems
					v-bind="s"
					v-model="tags"
					:data="filteredTags"
					autocomplete
					field="user.first_name"
					icon="tag"
					placeholder="Add a tag"
					@typing="getFilteredTags">
				</o-inputitems>
			</template>
		</doc-wrapper>
		<inspector :inspectData="inspectData"></inspector>
	</div>
</template>

<script>

 const data = [
	{"id":1,"user":{"first_name":"Jesse","last_name":"Simmons"},"date":"2016/10/15 13:43:27","gender":"Male"},
	{"id":2,"user":{"first_name":"John","last_name":"Jacobs"},"date":"2016/12/15 06:00:53","gender":"Male"},
	{"id":3,"user":{"first_name":"Tina","last_name":"Gilbert"},"date":"2016/04/26 06:26:28","gender":"Female"},
	{"id":4,"user":{"first_name":"Clarence","last_name":"Flores"},"date":"2016/04/10 10:28:46","gender":"Male"},
	{"id":5,"user":{"first_name":"Anne","last_name":"Lee"},"date":"2016/12/06 14:38:38","gender":"Female"},
	{"id":6,"user":{"first_name":"Sara","last_name":"Armstrong"},"date":"2016/09/23 18:50:04","gender":"Female"},
	{"id":7,"user":{"first_name":"Anthony","last_name":"Webb"},"date":"2016/08/30 23:49:38","gender":"Male"},
	{"id":8,"user":{"first_name":"Andrew","last_name":"Greene"},"date":"2016/11/20 14:57:47","gender":"Male"},
	{"id":9,"user":{"first_name":"Russell","last_name":"White"},"date":"2016/07/13 09:29:49","gender":"Male"},
	{"id":10,"user":{"first_name":"Lori","last_name":"Hunter"},"date":"2016/12/09 01:44:05","gender":"Female"},
	{"id":11,"user":{"first_name":"Ronald","last_name":"Wood"},"date":"2016/12/04 02:23:48","gender":"Male"},
	{"id":12,"user":{"first_name":"Michael","last_name":"Harper"},"date":"2016/07/27 13:28:15","gender":"Male"},
	{"id":13,"user":{"first_name":"George","last_name":"Dunn"},"date":"2017/03/07 12:26:52","gender":"Male"},
	{"id":14,"user":{"first_name":"Eric","last_name":"Rogers"},"date":"2016/06/07 05:41:52","gender":"Male"},
	{"id":15,"user":{"first_name":"Juan","last_name":"Meyer"},"date":"2017/02/01 04:56:34","gender":"Male"},
	{"id":16,"user":{"first_name":"Silvia","last_name":"Rosa"},"date":"2017/01/26 11:50:04","gender":"Female"},
	{"id":17,"user":{"first_name":"Lori","last_name":"Cunningham"},"date":"2016/05/01 10:00:56","gender":"Female"},
	{"id":18,"user":{"first_name":"Charles","last_name":"Graham"},"date":"2016/05/31 06:43:30","gender":"Male"},
	{"id":19,"user":{"first_name":"Henry","last_name":"Morrison"},"date":"2016/09/27 16:15:44","gender":"Male"},
	{"id":20,"user":{"first_name":"Albert","last_name":"Mendoza"},"date":"2016/08/08 05:29:24","gender":"Male"},
	{"id":21,"user":{"first_name":"Ruby","last_name":"Snyder"},"date":"2017/04/01 12:04:39","gender":"Female"},
	{"id":22,"user":{"first_name":"Jesse","last_name":"Warren"},"date":"2016/08/20 01:36:38","gender":"Male"},
	{"id":23,"user":{"first_name":"Carlos","last_name":"Ferguson"},"date":"2016/05/31 10:40:29","gender":"Male"},
	{"id":24,"user":{"first_name":"Melissa","last_name":"Peters"},"date":"2016/07/23 00:41:54","gender":"Female"},
	{"id":25,"user":{"first_name":"Arthur","last_name":"Garza"},"date":"2017/03/11 14:11:37","gender":"Male"},
	{"id":26,"user":{"first_name":"Joe","last_name":"Berry"},"date":"2016/07/09 15:16:56","gender":"Male"},
	{"id":27,"user":{"first_name":"Joseph","last_name":"Bishop"},"date":"2016/10/04 19:44:54","gender":"Male"},
	{"id":28,"user":{"first_name":"Sarah","last_name":"Harper"},"date":"2016/09/23 05:09:11","gender":"Female"},
	{"id":29,"user":{"first_name":"Christopher","last_name":"Fuller"},"date":"2016/04/12 00:05:35","gender":"Male"},
	{"id":30,"user":{"first_name":"Alan","last_name":"Mendoza"},"date":"2016/04/22 10:48:02","gender":"Male"},
	{"id":31,"user":{"first_name":"James","last_name":"Davis"},"date":"2017/01/16 15:17:03","gender":"Male"},
	{"id":32,"user":{"first_name":"Scott","last_name":"Welch"},"date":"2016/10/04 23:31:51","gender":"Male"},
	{"id":33,"user":{"first_name":"Mildred","last_name":"Myers"},"date":"2016/11/23 13:46:18","gender":"Female"},
	{"id":34,"user":{"first_name":"Victor","last_name":"Martinez"},"date":"2016/04/06 17:05:07","gender":"Male"},
	{"id":35,"user":{"first_name":"Susan","last_name":"Medina"},"date":"2016/12/09 10:33:37","gender":"Female"},
	{"id":36,"user":{"first_name":"Judy","last_name":"Long"},"date":"2016/07/26 16:19:04","gender":"Female"},
	{"id":37,"user":{"first_name":"Joan","last_name":"Myers"},"date":"2016/09/22 04:55:54","gender":"Female"},
	{"id":38,"user":{"first_name":"Rachel","last_name":"Gonzales"},"date":"2016/07/15 13:56:38","gender":"Female"},
	{"id":39,"user":{"first_name":"Roger","last_name":"Hunt"},"date":"2016/08/14 10:43:11","gender":"Male"},
	{"id":40,"user":{"first_name":"Dorothy","last_name":"Howard"},"date":"2016/06/19 05:34:49","gender":"Female"},
	{"id":41,"user":{"first_name":"Eugene","last_name":"Lynch"},"date":"2016/12/24 08:19:24","gender":"Male"},
	{"id":42,"user":{"first_name":"Kathy","last_name":"Webb"},"date":"2017/04/01 21:09:05","gender":"Female"},
	{"id":43,"user":{"first_name":"Antonio","last_name":"White"},"date":"2017/02/10 06:51:20","gender":"Male"},
	{"id":44,"user":{"first_name":"Louis","last_name":"Spencer"},"date":"2016/10/08 02:20:22","gender":"Male"},
	{"id":45,"user":{"first_name":"Andrea","last_name":"Marshall"},"date":"2016/09/04 10:59:57","gender":"Female"},
	{"id":46,"user":{"first_name":"Eugene","last_name":"Sims"},"date":"2017/03/15 06:39:48","gender":"Male"},
	{"id":47,"user":{"first_name":"Mildred","last_name":"Gibson"},"date":"2016/04/18 06:43:54","gender":"Female"},
	{"id":48,"user":{"first_name":"Joan","last_name":"Arnold"},"date":"2016/12/16 04:52:23","gender":"Female"},
	{"id":49,"user":{"first_name":"Jesse","last_name":"Schmidt"},"date":"2016/06/11 02:44:33","gender":"Male"},
	{"id":50,"user":{"first_name":"David","last_name":"Frazier"},"date":"2017/02/15 21:46:30","gender":"Male"},
	{"id":51,"user":{"first_name":"Nicholas","last_name":"Howell"},"date":"2016/11/01 15:08:31","gender":"Male"},
	{"id":52,"user":{"first_name":"Douglas","last_name":"Chapman"},"date":"2017/02/08 03:33:24","gender":"Male"},
	{"id":53,"user":{"first_name":"Bruce","last_name":"Simmons"},"date":"2016/07/14 12:11:17","gender":"Male"},
	{"id":54,"user":{"first_name":"Antonio","last_name":"George"},"date":"2016/11/07 19:12:55","gender":"Male"},
	{"id":55,"user":{"first_name":"Chris","last_name":"Marshall"},"date":"2016/07/03 12:11:45","gender":"Male"},
	{"id":56,"user":{"first_name":"Ashley","last_name":"Hudson"},"date":"2016/10/14 21:08:05","gender":"Female"},
	{"id":57,"user":{"first_name":"Alan","last_name":"Edwards"},"date":"2017/03/22 21:10:25","gender":"Male"},
	{"id":58,"user":{"first_name":"George","last_name":"Clark"},"date":"2016/04/28 03:15:05","gender":"Male"},
	{"id":59,"user":{"first_name":"Frank","last_name":"Porter"},"date":"2016/09/08 00:48:14","gender":"Male"},
	{"id":60,"user":{"first_name":"Christopher","last_name":"Palmer"},"date":"2016/05/24 08:58:12","gender":"Male"}
]

export default {
  	data() {
		return {
			filteredTags: data,
			tags: [ data[1] ],
			inspectData: [
				{
					class: "rootClass",
					description: "Class of the root element"
				},
				{
					class: "expandedClass",
					description: "Class of input when expanded",
					properties: ['expanded'],
					action: (cmp) => {
						cmp.data.expanded = true;
					}
				},
				{
					class: "variantClass",
					description: "Class of the entered item variant",
					properties: ["variant"],
					suffixes: ['primary', 'info', 'warning', 'danger'],
					action: (cmp) => {
						cmp.data.variant = 'warning';
					},
				},
				{
					class: "closeClass",
					properties: ["closable"],
					description: "Class of the close button of entered item",
					action: (cmp) => {
						cmp.data.closable = true;
					}
				},
				{
					class: "counterClass",
					description: "Class of the counter element",
					properties: ['hasCounter', 'maxitems'],
					action: (cmp) => {
						cmp.data.hasCounter = true;
						cmp.data.maxitems = 5;
					}
				},
				{
					class: "autocompleteClasses",
                    realClass: "autocompleteClasses.inputClass",
					description: "Classes to apply on internal autocomplete.",
                    componentRef: "Autocomplete"
				},
			],
		};
	},
  	methods: {
		getFilteredTags(text) {
			this.filteredTags = data.filter((option) => {
				return option.user.first_name
					.toString()
					.toLowerCase()
					.indexOf(text.toLowerCase()) >= 0
			})
		}
	}
};
</script>

<br />
<br />

## Props

| Prop name           | Description                                                                                                                                                                | Type           | Values                                                                          | Default                                                                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowDuplicates     | Allows adding the same item multiple time                                                                                                                                  | boolean        | -                                                                               | false                                                                                                                                                 |
| allowNew            | When autocomplete, it allow to add new items                                                                                                                               | boolean        | -                                                                               |                                                                                                                                                       |
| appendToBody        | Append autocomplete content to body                                                                                                                                        | boolean        | -                                                                               |                                                                                                                                                       |
| ariaCloseLabel      | Accessibility label for the close button                                                                                                                                   | string         | -                                                                               |                                                                                                                                                       |
| autocomplete        | Add autocomplete feature (if true, any Autocomplete props may be used too)                                                                                                 | boolean        | -                                                                               |                                                                                                                                                       |
| beforeAdding        | Function to validate the value of the item before adding                                                                                                                   | func           | -                                                                               | Default function (see source code)                                                                                                                    |
| checkInfiniteScroll | Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event                                                                           | boolean        | -                                                                               | false                                                                                                                                                 |
| closable            | Add close/delete button to the item                                                                                                                                        | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;closable: true<br>}</code>              |
| confirmKeys         | Array of keys<br>{@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values}<br>which will add a item when typing (default comma, tab and enter) | array          | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;confirmKeys: ['<br>}</code>             |
| createItem          | Function to create item item to push into v-model (items)                                                                                                                  | func           | -                                                                               | Default function (see source code)                                                                                                                    |
| data                | Items data                                                                                                                                                                 | array          | -                                                                               | []                                                                                                                                                    |
| disabled            | Input will be disabled                                                                                                                                                     | boolean        | -                                                                               |                                                                                                                                                       |
| expanded            | Makes input full width when inside a grouped or addon field                                                                                                                | boolean        | -                                                                               |                                                                                                                                                       |
| field               | Property of the object (if data is array of objects) to use as display text                                                                                                | string         | -                                                                               | 'value'                                                                                                                                               |
| groupField          | Property of the object (if data is array of objects) to use as display text of group                                                                                       | string         | -                                                                               |                                                                                                                                                       |
| groupOptions        | Property of the object (if data is array of objects) to use as key to get items array of each group, optional                                                              | string         | -                                                                               |                                                                                                                                                       |
| hasCounter          | Show counter when maxlength or maxtags props are passed                                                                                                                    | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;hasCounter: true<br>}</code>            |
| icon                | Icon name to be added                                                                                                                                                      | string         | -                                                                               |                                                                                                                                                       |
| iconPack            | Icon pack to use                                                                                                                                                           | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                                       |
| maxitems            | Limits the number of items, plus item counter                                                                                                                              | number\|string | -                                                                               |                                                                                                                                                       |
| maxlength           | Same as native maxlength, plus character counter                                                                                                                           | number\|string | -                                                                               |                                                                                                                                                       |
| nativeAutocomplete  |                                                                                                                                                                            | string         | -                                                                               |                                                                                                                                                       |
| onPasteSeparators   | Array of chars used to split when pasting a new string                                                                                                                     | array          | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;onPasteSeparators: ['<br>}</code>       |
| openOnFocus         | Opens a dropdown with choices when the input field is focused                                                                                                              | boolean        | -                                                                               |                                                                                                                                                       |
| override            | Override classes                                                                                                                                                           | boolean        | -                                                                               | false                                                                                                                                                 |
| removeOnKeys        | Allow removing last item when pressing given keys, if input is empty                                                                                                       | array          | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> inputitems: {<br>&nbsp;&nbsp;removeOnKeys: ['Backspace']<br>}</code> |
| rounded             | Makes the element rounded                                                                                                                                                  | boolean        | -                                                                               |                                                                                                                                                       |
| statusIcon          | Show status icon using field and variant prop                                                                                                                              | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                      |
| useHtml5Validation  | Enable html 5 native validation                                                                                                                                            | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>              |
| v-model             |                                                                                                                                                                            | array          | -                                                                               | []                                                                                                                                                    |
| validationMessage   | The message which is shown when a validation error occurs                                                                                                                  | string         | -                                                                               |                                                                                                                                                       |
| variant             | Color of the each items, optional                                                                                                                                          | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                       |

## Events

| Event name      | Properties | Description |
| --------------- | ---------- | ----------- |
| blur            |            |
| focus           |            |
| input           |            |
| add             |            |
| remove          |            |
| typing          |            |
| infinite-scroll |            |

## Slots

| Name     | Description | Bindings |
| -------- | ----------- | -------- |
| selected |             |          |
| header   |             |          |
| default  |             | <br>     |
| empty    |             |          |
| footer   |             |          |

## Style

| CSS Variable                             | SASS Variable                      | Default                          |
| ---------------------------------------- | ---------------------------------- | -------------------------------- |
| --oruga-inputitems-height                | \$inputitems-height                | calc(2em - 1px)                  |
| --oruga-inputitems-padding               | \$inputitems-padding               | calc(.275em - 1px) 0 0           |
| --oruga-inputitems-border-color          | \$inputitems-border-color          | \$grey-lighter                   |
| --oruga-inputitems-border-style          | \$inputitems-border-style          | solid                            |
| --oruga-inputitems-border-width          | \$inputitems-border-width          | 1px                              |
| --oruga-inputitems-border-radius         | \$inputitems-border-radius         | \$base-border-radius             |
| --oruga-inputitems-color                 | \$inputitems-color                 | #363636                          |
| --oruga-inputitems-line-height           | \$inputitems-line-height           | \$base-line-height               |
| --oruga-inputitems-box-shadow            | \$inputitems-box-shadow            | inset 0 1px 2px hsla(0,0%,4%,.1) |
| --oruga-inputitems-max-width             | \$inputitems-max-width             | 100%                             |
| --oruga-inputitems-width                 | \$inputitems-width                 | 100%                             |
| --oruga-inputitems-counter-font-size     | \$inputitems-counter-font-size     | .75rem                           |
| --oruga-inputitems-counter-margin        | \$inputitems-counter-margin        | .25rem 0 0 .5rem                 |
| --oruga-inputitems-item-background-color | \$inputitems-item-background-color | \$primary                        |
| --oruga-inputitems-item-color            | \$inputitems-item-color            | \$primary-invert                 |
| --oruga-inputitems-item-border-radius    | \$inputitems-item-border-radius    | \$base-border-radius             |
| --oruga-inputitems-item-margin           | \$inputitems-item-margin           | 0 0 0 0.275em                    |
| --oruga-inputitems-item-padding          | \$inputitems-item-padding          | 0 .75em 0 .75em                  |
| --oruga-inputitems-margin-icon-to-text   | \$inputitems-margin-icon-to-text   | .1875em                          |
