<template>
	<li class="o-breadcrumb-item" :class="{ 'o-breadcrumb-item--active': active, 'o-breadcrumb-item--disabled': disabled}">
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

import BaseComponentMixin from '../../utils/BaseComponentMixin'

export default {

  name: 'OBreadcrumbItem',

  props : {
  	/**
  	* HTML Tag of items, optional
  	* @values a, router-link
  	**/
  	tag : { 
  		type: String, 
  		default: 'a' 
  	},
  	/**
  	* item when it clicked, optional
  	* @values false, true
  	**/
  	active : { 
  		type: Boolean, 
  		default: false 
  	},
  	/**
  	* an item to be useless with no click events, optional
  	* @values false, true
  	**/
  	disabled : { 
  		type: Boolean, 
  		default: false 
  	}
  },
  inheritAttrs: false,

  data () {
    return {

    }
  },
  computed: {


  	rootClasses(){
  		return []
  	}

  }
}
</script>

<style lang="css" scoped>
</style>