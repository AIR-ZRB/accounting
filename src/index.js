import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入数据管理模块
import Vuex from "vuex";
Vue.use(Vuex);

import axios from "axios";
Vue.prototype.$axios = axios;

import "./lib/font/iconfont.css";

import router from "./router.js";
import view from "./page/index.vue";

import "./component.js";



// vuex实例
// 打开软件渲染数据(没头绪)
const store = new Vuex.Store({
  state: {
    wife: "星野日向", // 老婆名字
    wifePicture: require("./images/portrait.png"), //老婆头像
    meId: "青空",
    allExpense: 0, // 总共花销
    todayExpense: 0, // 今日花销
    breakfast: 0,
    lunch: 0,
    supper: 0,
    beverages: 0,
    snacks: 0,
    fruits: 0,
    telephoneCharge: 0,
    rests: 0,
    isShowTabs: false,
  },
  mutations: {
    // vuex的第一个参数都是接收state
    addExpense(state) {},
    revise(state, values) {
      state[values.name] = values.value;
    },
  },
  getters: {
    editWife(state) {
      return state.wife;
    },
    editExpenditure(state) {
      return (
        parseInt(state.breakfast) +
        parseInt(state.lunch) +
        parseInt(state.supper)
      );
    },
  },
  created() {
    console.log(11);
  },
});

// vm实例
const vm = new Vue({
  el: "#app",
  data: {},
  methods: {},
  router,
  store,
  render: (createElement) => {
    return createElement(view);
  },
});
