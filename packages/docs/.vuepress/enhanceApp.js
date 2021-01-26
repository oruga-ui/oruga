import Oruga from '../../oruga/dist/oruga'
import '../../oruga/dist/oruga.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import DocWrapper from './DocWrapper.vue';
import Inspector from './Inspector.vue';

export default ({
  Vue
}) => {

  library.add(fas);
  Vue.component('vue-fontawesome', FontAwesomeIcon);
  Vue.component('doc-wrapper', DocWrapper)
  Vue.component('inspector', Inspector)

  Vue.use(Oruga, {
      iconPack: 'fas',
      iconComponent: 'vue-fontawesome'
  });

  // plugin-demo-block
  if (typeof window !== 'undefined') {
    window.Vue = Vue;
  }

}
