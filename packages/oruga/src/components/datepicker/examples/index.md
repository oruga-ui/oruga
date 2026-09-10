<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import MinMaxDate from "./min-max-date.vue";
import MinMaxDateCode from "./min-max-date.vue?raw";

import Range from "./range.vue";
import RangeCode from "./range.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

import Events from "./events.vue";
import EventsCode from "./events.vue?raw";

import MonthPicker from "./month-picker.vue";
import MonthPickerCode from "./month-picker.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Min/Max date

Use the `min-date` and `max-date` props to define a limited date range for the user to choose from.

<ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

### Range

Let the user select a date range by setting the `range` prop.

<ExampleViewer :component="Range" :code="RangeCode" />

### Multiple

When the `multiple` prop is set, the user can select multiple dates at once. Also, the `modelValue` prop will be an array of date objects instead of a single date object.

<ExampleViewer :component="Multiple" :code="MultipleCode" />

### Events

To render the component inline instead of a dropdown/modal use the `inline` prop.

The calendar can display indicators for events on specific dates by passing a list to the `events` prop.

<ExampleViewer :component="Events" :code="EventsCode" />

### Templates

The component can be customized through several template slots, e.g. the HTML input can be replaced by a custom trigger to open the dropdown/modal through the `trigger` template slot. The header and footer can be overridden using the `header` and `footer` template slots.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Programmatically

The dorpdown/modal can be opened programmatically setting the `active` prop, which is also two-way bindable.

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

### Month picker

Instead of picking a full date by setting the `type` prop to "month", the component will only render a month selector.

<ExampleViewer :component="MonthPicker" :code="MonthPickerCode" />
