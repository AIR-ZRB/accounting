import Vue from "vue/dist/vue.js";

// 数据请求
import axios from "axios";
Vue.prototype.$axios = axios;


// 路由模块
import router from "./router/router.js";
// 状态管理模块
import store from "./store/store.js";


// 主页
import view from "./page/index.vue";



// Vue实例
const vm = new Vue({
  el: "#app",
  router,
  store,
  render: (createElement) => {
    return createElement(view);
  },
});
