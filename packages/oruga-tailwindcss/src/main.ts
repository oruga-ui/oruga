import Vue from 'vue'
import App from './App.vue'
import router from './router'

// @ts-ignore
import Oruga from 'oruga';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import './assets/tailwindcss.css';
import './assets/oruga-tailwindcss.css';

Vue.config.productionTip = false

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Oruga, {
  iconPack: 'fas',
  iconComponent: 'vue-fontawesome',
  statusIcon: false,
  button: {
    override: true,
    rootClass: 'btn',
    roundedClass: 'btn-rounded',
    outlinedClass: 'btn-outlined',
    disabledClass: 'btn-disabled'
  },
  field: {
      override: true,
      labelClass: 'field-label',
      messageClass: 'text-xs italic',
      variantClass: 'field-'
  },
  input: {
      override: true,
      inputClass: 'input focus:outline-none focus:shadow-outline',
      roundedClass: 'rounded',
      variantClass: 'input-'
  },
  dropdown: {
      override: true,
      rootClass: 'dropdown',
      menuClass: 'dropdown-menu',
      itemClass: 'dropdown-item'
  },
  icon: {
      override: true
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
