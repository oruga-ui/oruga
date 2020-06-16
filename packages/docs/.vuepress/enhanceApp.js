  
import Oruga from 'oruga';

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faAngleUp, faCircleNotch, 
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faSearch, faTimesCircle,
    faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default ({
  Vue,
}) => {
  
  library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
      faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faAngleUp, faCircleNotch,
      faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faSearch, faTimesCircle,
      faMars, faVenus);
  Vue.component('vue-fontawesome', FontAwesomeIcon);

  Vue.use(Oruga, {
      iconPack: 'fas',
      iconComponent: 'vue-fontawesome'
  });
}
