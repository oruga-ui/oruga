import { createApp } from 'vue'
import App from './App.vue'

import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga-vars.css';

/*
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
*/

    /*
  library.add(fas);
  Vue.component('vue-fontawesome', FontAwesomeIcon);

  Vue.use(Oruga, {
      iconPack: 'fas',
      iconComponent: 'vue-fontawesome'
  });
 */

createApp(App).use(Oruga).mount('#app')
