import Vue from "vue/dist/vue.js";

// 注册组件

// 弹窗
let alertComponent = `
    <div class="alert">
        <span> {{ this.information }} </span>
    </div>
`;

Vue.component("alertComponent", {
  template: alertComponent,
  props: ["information"],
});

// 1.对话组件
// 未解决的问题
// 1. 判断发送窗口是wife还是me(已解决)
// 2. 添加动画(无头绪)
let conversationTemplate = `
    <!-- 会话组件 -->
    <transition >
        <div :class="[pople,conversation]">
            <img :src="picture" alt="">
            <p class="dialogue">
                <span>{{this.type}}</span>
                <span>{{this.dialogue}}</span>
            </p>
        </div>
    </transition>
`;

Vue.component("conversation", {
  template: conversationTemplate,
  props: ["person", "dialogue", "type"],
  data() {
    return {
      pople: "wife",
      conversation: "conversation",
      picture: require("./images/portrait.png"),
    };
  },
  methods: {
    show() {
      // console.log(this.dialogue)
      return this.dialogue;
    },
    who() {
      // 判断是谁该输入
      if (this.person == "wife") {
        this.pople = this.person;
      } else {
        this.pople = this.person;
      }
    }
  },
  created() {
    this.who();
    this.show();
  },
});


// 读取文件的组件
let optionsFilesList = `
    <li class="optionList">
        <input type="file" id="file" accept="image/*" @change="uploadfile" class="selectImg"/>
        <span>{{this.optionName}}</span>
        <span class="right">
            <img src="" id="img" />
        </span>
        <div class="editImage"  v-show="isShowEditImg">

        </div>
    </li>
    
`;

// 文件上传组件
Vue.component("optionsFilesList", {
  template: optionsFilesList,
  data() {
    return {
      isShowEditImg: false,
    };
  },
  props: ["optionName", "default"],
  methods: {
    // 设置页面的换头像功能
    // 多个组件只有第一个生效
    uploadfile(event) {
      let _this = this;
      // console.log(this);
      let reads = new FileReader();
      let file = document.getElementById("file").files[0];
      reads.readAsDataURL(file);
      // console.log(reads);

      // console.log(event.target.parentNode.getElementsByTagName("img")[0]);
      reads.onloadend = function(e) {
        // console.log(event);

        console.log(this.result);
        event.target.parentNode.getElementsByTagName(
          "img"
        )[0].src = this.result;

        // 选择图片区域
        event.target.parentNode.getElementsByClassName(
          "editImage"
        )[0].style.backgroundImage = "url(" + this.result + ")";
        _this.isShowEditImg = true;
      };
    },
  },
});
