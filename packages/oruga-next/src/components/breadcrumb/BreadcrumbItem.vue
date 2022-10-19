<template>
	<li  :class="rootClasses">
     <o-icon
          v-if="iconLeft"
          :pack="iconPack"
          :icon="iconLeft"
          :both="iconBoth"
          :class="iconLeftClasses"
     />
		<component 
			    v-bind="$attrs"
          v-on="$listeners" 
          :is="tag"
        >
			<slot />
		</component>
    <o-icon
        v-if="iconRight"
        :pack="iconPack"
        :icon="iconRight"
        :both="iconBoth"
        :class="iconRightClasses"
     />
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseComponentMixin from '../../utils/BaseComponentMixin'

import Icon from '../icon/Icon.vue';
/**
 * @displayName Breadcrumb Item
 */

export default defineComponent ({

  name: 'OBreadcrumbItem',
  mixins: [BaseComponentMixin],
  components: {
      [Icon.name]: Icon
  },
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
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /**
     * Icon name to show on the left
     */
    iconLeft: String,
    /**
     * Icon name to show on the right
     */
    iconRight: String,
     /**
     * Icon size to show
     */
    iconSize: String,
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
    },

    iconClasses() {
        return [
            this.computedClass('iconClass', 'o-breadcrumb-item--icon'),
        ]
    },
    iconLeftClasses() {
        return [
            ...this.iconClasses,
            this.computedClass('iconLeftClass', 'o-breadcrumb-item--icon-left')
        ]
    },
    iconRightClasses() {
        return [
            ...this.iconClasses,
            this.computedClass('iconRightClass', 'o-breadcrumb-item--icon-right')
        ]
    },
  }
})
</script>

<style lang="css" scoped>
</style>