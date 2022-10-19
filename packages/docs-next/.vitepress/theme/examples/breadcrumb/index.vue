<template>
	 
	 <h2>Base</h2>

   	 <ExampleViewer :component="Base" :code="BaseCode" />

   	 <h2>Alignnement</h2>

   	 <ExampleViewer :component="Alignnement" :code="AlignnementCode" />

   	 <h2>Icons</h2>

   	 <ExampleViewer :component="Icons" :code="IconsCode" />

   	 <h2>Separators</h2>

   	 <ExampleViewer :component="Separators" :code="SeparatorsCode" />


   	 <h2>Sizes</h2>

   	 <ExampleViewer :component="Sizes" :code="SizesCode" />

</template>

<script setup>
import Base from './base.vue';
import BaseCode from './base.vue?raw';

import Alignnement from './alignnement.vue';
import AlignnementCode from './alignnement.vue?raw';

import Icons from './icons.vue';
import IconsCode from './icons.vue?raw';

import Separators from './separators.vue';
import SeparatorsCode from './separators.vue?raw';

import Sizes from './sizes.vue';
import SizesCode from './sizes.vue?raw';


</script>
