<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import MinMaxDate from "./min-max-date.vue";
import MinMaxDateCode from "./min-max-date.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

import Granularity from "./granularity.vue";
import GranularityCode from "./granularity.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Inline

To render the component inline instead of a dropdown/modal use the `inline` prop.

<ExampleViewer :component="Inline" :code="InlineCode" />

### Min/Max date

Use the `min-time` and `max-time` props to define a limited time range for the user to choose from.

<ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

### Templates

The component has an additional `footer` template slot for customization.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Granularity

To define the granularity of the hours, minutes and seconds to select from use the `increment-hours`, `increment-minutes` and `increment-seconds` props.

<ExampleViewer :component="Granularity" :code="GranularityCode" />
