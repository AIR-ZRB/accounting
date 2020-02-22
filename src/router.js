
import VueRouter from "vue-router";

import dialogue from "./page/dialogue.vue";
import month from "./page/month.vue";
import setting from "./page/setting.vue";



export default new VueRouter({
	routes: [
		{path:"/",redirect:"home"},
		{path:"/home",component:dialogue},
		{path:"/month",component:month},
		{path:"/setting",component:setting},
	]
})