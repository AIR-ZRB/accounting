
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


import dialogue from "../page/dialogue.vue";
import month from "../page/month.vue";
import setting from "../page/setting.vue";
import about from "../page/about.vue";



export default new VueRouter({
	routes: [
		{path:"/",redirect:"home"},
		{path:"/home",component:dialogue},
		{path:"/month",component:month},
		{path:"/setting",component:setting},
		{path:"/about",component:about},
	]
})