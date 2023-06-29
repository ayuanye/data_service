// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/enter'

import store from './store'
import 'styles/reset.css'
import 'styles/iconfont.css'
import 'styles/init.css'
import 'view-design/dist/styles/iview.css'
import 'static/mock/index'
import '@/theme/my-theme.less'
import VueRouter from 'vue-router';
import {setTime,dateDiff,getTop,getChild,setTimePlus} from '@/pages/global'
// import { Button, Table, Page, Icon, Message, Input, Modal, DatePicker } from 'view-design'
import ViewUI from 'view-design'
import zh from '@/assets/lang/zh.json'
import en from '@/assets/lang/en.json'
import VueI18n from 'vue-i18n'
import 'styles/iconfonts/iconfont.css'
import Editor from 'vue2-ace-editor'
Vue.component('editor', Editor)
Vue.use(ViewUI)

Vue.use(VueRouter);
Vue.use(VueI18n)


const messages = {
  zh,
  en
}

const i18n = new VueI18n({
  locale: 'zh',
  messages
})
Vue.prototype.setTime = setTime
Vue.prototype.dateDiff = dateDiff
Vue.prototype.getTop = getTop
Vue.prototype.getChild = getChild
Vue.prototype.setTimePlus = setTimePlus
// Vue.prototype.$Message = Message
// Vue.component('Page', Page)
// Vue.component('Button', Button)
// Vue.component('Table', Table)
// Vue.component('Icon', Icon)
// Vue.component('Input', Input)
// Vue.component('Modal', Modal)
// Vue.component('DatePicker', DatePicker)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  ViewUI,
  components: { App },
  template: '<App/>'
})
