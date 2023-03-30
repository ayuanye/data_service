import Vue from 'vue'


import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/icons' // icon
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './index.less'
import './components/main'

Vue.config.productionTip = false

Vue.use(ViewUI);

Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
