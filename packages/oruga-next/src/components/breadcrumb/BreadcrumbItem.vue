<template>
	<li class="o-breadcrumb-item" :class="{ 'o-breadcrumb-item--active': active, 'o-breadcrumb-item--disabled': disabled }">
		<component 
			    v-bind="$attrs"
          v-on="$listeners" 
          :is="tag"
        >
			<slot />
		</component>
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * @displayName Breadcrumb Item
 */

export default defineComponent ({

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
    },
    itemClass: [String, Function, Array],
    itemActiveClass: [String, Function, Array],
    itemDisabledClass: [String, Function, Array],
  },
  inheritAttrs: false,

  data () {
    return {

    }
  },
  computed: {
    isActive(){
      return this.active == true ? ' o-breadcrumb-item--active' : ''
    },
    isDisabled(){
      return this.disabled == true ? ' o-breadcrumb-item--disabled' : '';
    },

    rootClasses(){
      return ['o-breadcrumb-item']
    }

  }
})
</script>

<style lang="css" scoped>
</style>