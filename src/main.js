// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/view/App'
import router from '@/router'

// swiper 引用
require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

// 引入公共组件
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
Vue.use(YDUI);
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
import {Input} from 'vue-ydui/dist/lib.rem/input';
Vue.component(Input.name, Input);
import {Radio, RadioGroup} from 'vue-ydui/dist/lib.rem/radio';
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);

// Ajax请求
import axios from 'axios';
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.prototype.$ajax = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>'
})