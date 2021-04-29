import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import router from "./router";
import session from "vue-session";
import store from './store'


var options = {
  persist: true
}

Vue.use(session,options);
Vue.config.productionTip = false;
Vue.prototype.http=Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
