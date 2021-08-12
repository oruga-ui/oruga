
import Oruga from '../../oruga/dist/oruga';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import DocWrapper from './DocWrapper.vue';
import Inspector from './Inspector.vue';
import CarbonAds from './theme/components/CarbonAds.vue'
import Expo from './Expo.vue';

import toggleStyle from './theme/components/togglestyles.js'

export default ({
  Vue
}) => {

  library.add(fas);
  Vue.component('vue-fontawesome', FontAwesomeIcon);

  Vue.component('CarbonAds', CarbonAds);
  Vue.component('doc-wrapper', DocWrapper);
  Vue.component('inspector', Inspector);
  Vue.component('expo', Expo);

  Vue.use(Oruga, {
    iconPack: 'fas',
    iconComponent: 'vue-fontawesome'
  });

  if (process.env.NODE_ENV !== 'production') {
    import('../../oruga/dist/oruga-full-vars.css');
  }

  // plugin-demo-block
  if (typeof window !== 'undefined') {
    window.Vue = Vue;
    const value = localStorage.getItem('oruga.io_lite') === 'true';
    toggleStyle(value, true);
  }

}
