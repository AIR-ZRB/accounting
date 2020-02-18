import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入数据管理模块
import Vuex from "vuex";
Vue.use(Vuex);




import router from "./router.js"
import view from "./page/index.vue";
import "file-saver";

// 测试代码，一进来就下载文件
// var file = new File(["hello world"], "hello world.txt", {type: "text/plain;charset=utf-8"});
// saveAs(file);

// 注册组件
// 1.对话组件

// 未解决的问题
	// 1. 判断发送窗口是wife还是me(已解决)
let conversationTemplate = `
<!-- 会话组件 -->
<div :class="[pople,conversation]">
	<img :src="picture" alt="">
	<p class="dialogue">
		<span>{{this.type}}</span>
		<span>{{this.dialogue}}</span>
	</p>
</div>
`;


Vue.component("conversation",{
	template: conversationTemplate,
	props:["person","dialogue","type"],
	data(){
		return {
			pople: "wife",
			conversation: "conversation",
			picture: require("./images/portrait.png"),
		}
	},
	methods:{
		show(){
			console.log(this.dialogue)
			return this.dialogue;
		},
		who(){
			// 判断是谁该输入
			if(this.person == "wife"){
				this.pople = this.person;
			}else {
				this.pople = this.person;
			}
		}
	},
	created(){
		this.who();
		this.show();
	}
});




// vuex实例
const store = new Vuex.Store({
	state: {
		allExpense: 0,		// 总共花销
		todayExpense: 0,	// 今日花销
		breakfast: 0,
		lunch: 0,
		supper: 0
	},
	mutations: {
		addExpense(type,money){

		},	
	}
})



// vm实例
const vm = new Vue({
	el: "#app",
	data: {},
	methods: {},
	router,
	store,
	render:(createElement)=>{
		return createElement(view);
	}
})