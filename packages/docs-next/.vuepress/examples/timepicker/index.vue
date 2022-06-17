<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Min/Max date</h2>

	<ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

	<h2>Footer</h2>

	<ExampleViewer :component="Footer" :code="FooterCode" />

	<h2>Granularity</h2>

	<ExampleViewer :component="Granularity" :code="GranularityCode" />

	<h2>Inline</h2>

	<ExampleViewer :component="Inline" :code="InlineCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import MinMaxDate from './min-max-date.vue';
	import MinMaxDateCode from './min-max-date.vue?raw';

	import Footer from './footer.vue';
	import FooterCode from './footer.vue?raw';

	import Granularity from './granularity.vue';
	import GranularityCode from './granularity.vue?raw';

	import Inline from './inline.vue';
	import InlineCode from './inline.vue?raw';
</script>
