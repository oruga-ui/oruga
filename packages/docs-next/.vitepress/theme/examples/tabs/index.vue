<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Custom header</h2>

	<ExampleViewer :component="CustomHeader" :code="CustomHeaderCode" />

	<h2>Long header</h2>

	<ExampleViewer :component="LongHeader" :code="LongHeaderCode" />

	<h2>Vertical</h2>

	<ExampleViewer :component="Vertical" :code="VerticalCode" />

	<h2>Types</h2>

	<ExampleViewer :component="Types" :code="TypesCode" />

	<h2>Position</h2>

	<ExampleViewer :component="Position" :code="PositionCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import CustomHeader from './custom-header.vue';
	import CustomHeaderCode from './custom-header.vue?raw';

	import LongHeader from './long-header.vue';
	import LongHeaderCode from './long-header.vue?raw';

	import Vertical from './vertical.vue';
	import VerticalCode from './vertical.vue?raw';

	import Types from './types.vue';
	import TypesCode from './types.vue?raw';

	import Position from './position.vue';
	import PositionCode from './position.vue?raw';
</script>
