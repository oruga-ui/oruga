import Oruga from '../../oruga/dist/oruga'
import '../../oruga/dist/oruga-vars.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default ({
  Vue
}) => {

  library.add(fas);
  Vue.component('vue-fontawesome', FontAwesomeIcon);

  Vue.use(Oruga, {
      iconPack: 'fas',
      iconComponent: 'vue-fontawesome'
  });

  // plugin-demo-block
  if (typeof window !== 'undefined') {
    window.Vue = Vue;
  }

}
