import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
Vue.use(Vuex);

// vuex实例
// 打开软件渲染数据(没头绪)
export default new Vuex.Store({
    state: {
        wife: "星野日向", // 老婆名字
        wifePicture: require("../images/portrait.png"), //老婆头像
        meId: "青空",
        allExpense: 0,          // 总共花销
        todayExpense: 0,        // 今日花销
        breakfast: 0,           // 早餐
        lunch: 0,               // 午餐
        supper: 0,              // 晚餐
        beverages: 0,           // 饮料
        snacks: 0,              // 零食
        fruits: 0,              // 水果
        telephoneCharge: 0,     // 话费
        rests: 0,               // 其他
    },
    mutations: {
        // vuex的第一个参数都是接收state
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
});



export const setStorage = (storageName,value) => {
    localStorage.setItem(storageName, JSON.stringify(value));
};


export const setStorageJSON = (storageName,value) => {
    let storage = getStorage(storageName) || {};
    for(let key in value){
        storage[key] = value[key];
    }
    setStorage(storageName,storage);
}


export const getStorage = (storageName)=> {
    return JSON.parse(localStorage.getItem(storageName));
};