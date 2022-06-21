<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Min/Max date</h2>

	<ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

	<h2>Range</h2>

	<ExampleViewer :component="Range" :code="RangeCode" />

	<h2>Multiple</h2>

	<ExampleViewer :component="Multiple" :code="MultipleCode" />

	<h2>Trigger</h2>

	<ExampleViewer :component="Trigger" :code="TriggerCode" />

	<h2>Programmatically</h2>

	<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

	<h2>Footer slot</h2>

	<ExampleViewer :component="FooterSlot" :code="FooterSlotCode" />

	<h2>Header slot</h2>

	<ExampleViewer :component="HeaderSlot" :code="HeaderSlotCode" />

	<h2>Events</h2>

	<ExampleViewer :component="Events" :code="EventsCode" />

	<h2>Month picker</h2>

	<ExampleViewer :component="MonthPicker" :code="MonthPickerCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import MinMaxDate from './min-max-date.vue';
	import MinMaxDateCode from './min-max-date.vue?raw';

	import Range from './range.vue';
	import RangeCode from './range.vue?raw';

	import Multiple from './multiple.vue';
	import MultipleCode from './multiple.vue?raw';

	import Trigger from './trigger.vue';
	import TriggerCode from './trigger.vue?raw';

	import Programmatically from './programmatically.vue';
	import ProgrammaticallyCode from './programmatically.vue?raw';

	import FooterSlot from './footer-slot.vue';
	import FooterSlotCode from './footer-slot.vue?raw';

	import HeaderSlot from './header-slot.vue';
	import HeaderSlotCode from './header-slot.vue?raw';

	import Events from './events.vue';
	import EventsCode from './events.vue?raw';

	import MonthPicker from './month-picker.vue';
	import MonthPickerCode from './month-picker.vue?raw';
</script>
