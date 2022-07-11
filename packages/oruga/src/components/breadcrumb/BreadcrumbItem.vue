<template>
	<li class="breadcrumb-item" :class="{ 'active': active }">
		<component 
			v-bind="$attrs"
            v-on="$listeners" 
            :is="tag"
        >
			<slot />
		</component>
	</li>
</template>

<script>
export default {

  name: 'OBreadcrumbItem',

  props : {
  	tag : { type: String, default: 'a' },
  	active : { type: Boolean, default: false }
  },
  inheritAttrs: false,

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>