---
title: Datepicker
---

# Datepicker

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/datepicker/examples/Datepicker.md" class="docgen-edit-link">edit on github</a>

## Examples

::: demo
<template>
<section>
<o-field grouped group-multiline>
<o-field>
<o-select v-model="locale" placeholder="Locale">
<option :value="undefined"></option>
<option value="de-DE">de-DE</option>
<option value="en-CA">en-CA</option>
<option value="en-GB">en-GB</option>
<option value="en-US">en-US</option>
<option value="es-ES">es-ES</option>
<option value="es-MX">es-MX</option>
<option value="fr-CA">fr-CA</option>
<option value="fr-FR">fr-FR</option>
<option value="it-IT">it-IT</option>
<option value="ja-JP">ja-JP</option>
<option value="pt-BR">pt-BR</option>
<option value="ru-RU">ru-RU</option>
</o-select>
</o-field>
<o-field>
<o-switch v-model="showWeekNumber">Show week number</o-switch>
</o-field>
</o-field>
<o-field label="Select a date">
<o-datepicker
                v-model="selected"
                :show-week-number="showWeekNumber"
                :locale="locale"
                placeholder="Click to select..."
                icon="calendar"
                trap-focus>
</o-datepicker>
</o-field>
</section>
</template>

<script>
    export default {
        data() {
            return {
                selected: new Date(),
                showWeekNumber: false,
                locale: undefined // Browser locale
            }
        }
    }
</script>

:::

### Min/Max date

::: demo
<template>
<o-field label="Select a date">
<o-datepicker
            placeholder="Click to select..."
            icon="calendar"
            :min-date="minDate"
            :max-date="maxDate">
</o-datepicker>
</o-field>
</template>

<script>
    export default {
        data() {
            const today = new Date()

            return {
                date: new Date(),
                minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()  - 7),
                maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
            }
        }
    }
</script>

:::

### Range

::: demo
<template>
<o-field label="Select a date">
<o-datepicker
            placeholder="Click to select..."
            icon="calendar"
            v-model="dates"
            range>
</o-datepicker>
</o-field>
</template>

<script>
export default {
    data() {
        return {
            dates: []
        }
    }
}
</script>

:::

### Multiple

::: demo
::: demote>
<o-field label="Select a date">
<o-datepicker
            placeholder="Click to select..."
            v-model="dates"
            multiple>
</o-datepicker>
</o-field>
</template>

<script>
export default {
    data() {
        return {
            dates: []
        }
    }
}
</script>

:::

### Trigger

::: demo
<template>
<section>
<o-field label="Select a date" grouped>
<o-datepicker v-model="selected" :mobile-native="false">
<template v-slot:trigger>
<o-button
                        icon-left="calendar"
                        type="primary" />
</template>
</o-datepicker>
<o-input readonly :value="selectedString" />
</o-field>
</section>
</template>

<script>
export default {
    data() {
        return {
            selected: null
        }
    },
    computed: {
        selectedString() {
            return this.selected ? this.selected.toDateString() : ''
        }
    }
}
</script>

:::

### Programmatically

::: demo
<template>
<section>
<o-field>
<o-datepicker
                ref="datepicker"
                expanded
                placeholder="Select a date">
</o-datepicker>
<o-button
@click="\$refs.datepicker.toggle()"
icon-left="calendar"
type="primary" />
</o-field>
</section>
</template>

<script>
export default {
}
</script>

:::
::: Footer slot

::: demo
<template>
<o-field label="Select a date">
<o-datepicker v-model="date"
            :first-day-of-week="1"
            placeholder="Click to select...">

            <o-button variant="primary"
                @click="date = new Date()">
                <o-icon icon="calendar"></o-icon>
                <span>Today</span>
            </o-button>

            <o-button variant="danger"
                @click="date = null">
                <o-icon icon="times"></o-icon>
                <span>Clear</span>
            </o-button>
        </o-datepicker>
    </o-field>

</template>

<script>
    export default {
        data() {
            return {
                date: new Date()
            }
        }
    }
</script>

:::

:::
::: demo
<template>
<o-field label="Select a date">
<o-datepicker :focused-date="date"
            :first-day-of-week="1"
            placeholder="Click to select...">

            <template slot="header">
                <o-field>
                    <o-autocomplete
                        open-on-focus
                        readonly
                        v-model="month"
                        :data="months"
                        field="name"
                        @select="selectMonth">
                    </o-autocomplete>
                    <o-button disabled>{{ date.getFullYear() }}</o-button>
                </o-field>
            </template>

        </o-datepicker>
    </o-field>

</template>

<script>
    export default {
        data() {
            return {
                date: new Date(),
                month: null,
                months: [
                    { name: 'January', value: 0 },
                    { name:'February', value: 1 },
                    { name:'March', value: 2 },
                    { name:'April', value: 3 },
                    { name:'May', value: 4 },
                    { name:'June', value: 5 },
                    { name:'July', value: 6 },
                    { name:'August', value: 7 },
                    { name:'September', value: 8 },
                    { name:'October', value: 9 },
                    { name:'November', value: 10 },
                    { name:'December', value: 11 }
                ]
            }
        },
        methods: {
            selectMonth(option) {
                if (option) {
                    this.date = new Date(this.date)
                    this.date.setMonth(option.value)
                }
            }
        },
        mounted() {
            this.month = this.months.filter((item) =>
                item.value == this.date.getMonth()
            )[0].name
        }
    }
</script>

:::

### Events

::: demo
<template>
<span>
<o-field>
<o-switch v-model="bars">Bars</o-switch>
</o-field>
<o-datepicker
            inline
            v-model="date"
            :events="events"
            :indicators="indicators">
</o-datepicker>
</span>
</template>

<script>
    const thisMonth = new Date().getMonth()

    export default {
        computed: {
            indicators() {
                return this.bars ? 'bars' : 'dots'
            }
        },
        data() {
            return {
                date: new Date(2017, thisMonth, 1),
                events: [
                    new Date(2017, thisMonth, 2),
                    new Date(2017, thisMonth, 6),
                    {
                        date: new Date(2017, thisMonth, 6),
                        type: 'info'
                    },
                    {
                        date: new Date(2017, thisMonth, 8),
                        type: 'danger'
                    },
                    {
                        date: new Date(2017, thisMonth, 10),
                        type: 'success'
                    },
                    {
                        date: new Date(2017, thisMonth, 10),
                        type: 'link'
                    },
                    new Date(2017, thisMonth, 12),
                    {
                        date: new Date(2017, thisMonth, 12),
                        type: 'warning'
                    },
                    {
                        date: new Date(2017, thisMonth, 16),
                        type: 'danger'
                    },
                    new Date(2017, thisMonth, 20),
                    {
                        date: new Date(2017, thisMonth, 29),
                        type: 'success'
                    },
                    {
                        date: new Date(2017, thisMonth, 29),
                        type: 'warning'
                    },
                    {
                        date: new Date(2017, thisMonth, 29),
                        type: 'info'
                    }
                ],
                bars: false
            }
        }
    }
</script>

:::

### Month picker

::: demo
<template>
<o-field label="Select a month">
<o-datepicker
            placeholder="Click to select..."
            icon="calendar"
            type="month"
            v-model="dates">
</o-datepicker>
</o-field>
</template>

<script>
export default {
    data() {
        return {
            dates: undefined
        }
    }
}
</script>

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datepicker.scss)

<br />

<br />
<br />

## Props

| Prop name                 | Description                                                 | Type           | Values                                            | Default                                                                                                                                                     |
| ------------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody              |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| ariaNextLabel             |                                                             | string         | -                                                 |                                                                                                                                                             |
| ariaPreviousLabel         |                                                             | string         | -                                                 |                                                                                                                                                             |
| autocomplete              | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                                             |
| closeOnClick              |                                                             | boolean        | -                                                 | true                                                                                                                                                        |
| dateCreator               |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dateFormatter             |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dateParser                |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dayNames                  |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;dayNames: undefined<br>}</code>               |
| disabled                  |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| editable                  |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| events                    |                                                             | array          | -                                                 |                                                                                                                                                             |
| expanded                  | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                                             |
| firstDayOfWeek            |                                                             | number         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;firstDayOfWeek: 0<br>}</code>                 |
| focusedDate               |                                                             | Date           | -                                                 |                                                                                                                                                             |
| icon                      | Icon name to be added                                       | string         | -                                                 |                                                                                                                                                             |
| iconNext                  |                                                             | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code>         |
| iconPack                  | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                             |
| iconPrev                  |                                                             | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>          |
| iconRight                 |                                                             | string         | -                                                 |                                                                                                                                                             |
| iconRightClickable        |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| indicators                |                                                             | string         | -                                                 | 'dots'                                                                                                                                                      |
| inline                    |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| locale                    |                                                             | string\|array  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>                             |
| maxDate                   |                                                             | Date           | -                                                 |                                                                                                                                                             |
| maxlength                 | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                                             |
| minDate                   |                                                             | Date           | -                                                 |                                                                                                                                                             |
| mobileBreakpoint          | Mobile breakpoint as max-width value                        | string         | -                                                 |                                                                                                                                                             |
| mobileModal               |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                 |
| mobileNative              |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                |
| modelValue                |                                                             | date\|array    | -                                                 |                                                                                                                                                             |
| monthNames                |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;monthNames: undefined<br>}</code>             |
| multiple                  |                                                             | boolean        | -                                                 | false                                                                                                                                                       |
| nearbyMonthDays           |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbyMonthDays: true<br>}</code>             |
| nearbySelectableMonthDays |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbySelectableMonthDays: false<br>}</code>  |
| openOnFocus               |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| override                  |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| placeholder               |                                                             | string         | -                                                 |                                                                                                                                                             |
| position                  |                                                             | string         | -                                                 |                                                                                                                                                             |
| range                     |                                                             | boolean        | -                                                 | false                                                                                                                                                       |
| rounded                   | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                                             |
| rulesForFirstWeek         |                                                             | number         | -                                                 | Default function (see source code)                                                                                                                          |
| selectableDates           |                                                             | array          | -                                                 |                                                                                                                                                             |
| showWeekNumber            |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;showWeekNumber: false<br>}</code>             |
| size                      | Size of button, optional                                    | string         | `small`, `medium`, `large`                        |                                                                                                                                                             |
| statusIcon                | Show status icon using field and variant prop               | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                            |
| trapFocus                 |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                   |
| type                      |                                                             | string         | -                                                 |                                                                                                                                                             |
| unselectableDates         |                                                             | array          | -                                                 |                                                                                                                                                             |
| unselectableDaysOfWeek    |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;unselectableDaysOfWeek: undefined<br>}</code> |
| useHtml5Validation        | Enable html 5 native validation                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>                    |
| validationMessage         | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                                             |
| weekNumberClickable       |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;weekNumberClickable: false<br>}</code>        |
| yearsRange                |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;yearsRange: [-100, 10]<br>}</code>            |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| icon-right-click  |            |
| range-start       |            |
| range-end         |            |
| blur              |            |
| focus             |            |
| update:modelValue |            |
| change-month      |            |
| change-year       |            |
| active-change     |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| header  |             |          |
| table   |             |          |
| footer  |             |          |
