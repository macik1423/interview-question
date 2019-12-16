import Vue from 'vue';
import App from './App.vue';
import router from "./routes";
import axios from 'axios';
import store from './stores/store'
//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSeedling, faLeaf} from '@fortawesome/free-solid-svg-icons'; //fas 
import { faFontAwesome, faJava } from '@fortawesome/free-brands-svg-icons'; //fab e.g. fab fa-java
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vuetify from './plugins/vuetify';
library.add(faUserSecret, faSeedling, faLeaf); //fas
library.add(faFontAwesome, faJava); //fab
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://localhost:8443/";

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
