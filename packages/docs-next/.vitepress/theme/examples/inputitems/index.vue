<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Autocomplete</h2>

	<ExampleViewer :component="Autocomplete" :code="AutocompleteCode" />

	<h2>Custom selected</h2>

	<ExampleViewer :component="CustomSelected" :code="CustomSelectedCode" />

	<h2>Limits</h2>

	<ExampleViewer :component="Limits" :code="LimitsCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Autocomplete from './autocomplete.vue';
	import AutocompleteCode from './autocomplete.vue?raw';

	import CustomSelected from './custom-selected.vue';
	import CustomSelectedCode from './custom-selected.vue?raw';

	import Limits from './limits.vue';
	import LimitsCode from './limits.vue?raw';
</script>
