<template>
	<li  :class="rootClasses">
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
  mixins: [BaseComponentMixin],
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
      return this.active == true ? this.activeClass : ''
    },
    isDisabled(){
      return this.disabled == true ? this.disabledClass : '';
    },


    activeClass() {
      return [
        this.computedClass('itemActiveClass', 'o-breadcrumb-item__active')
      ]
    },
    disabledClass() {
      return [
        this.computedClass('itemDisabledClass', 'o-breadcrumb-item__disabled')
      ]
    },
    rootClasses(){
      return [
        this.computedClass('itemClass', 'o-breadcrumb-item'),
        this.isActive,
        this.isDisabled
      ]
    }
  }
})
</script>

<style lang="css" scoped>
</style>