<template>
    <div>
        <div class="center" ref="screen">
            <!-- 路由部分 -->

            <conversation person="wife" dialogue="你好"></conversation>
            <!-- 给key传值需要修改 -->
            <conversation
                person="me"
                :dialogue="item.money"
                :type="item.type"
                v-for="item in this.meDialogue"
                :key="item.money"
            ></conversation>
        </div>

        <!-- 发消息组件 -->
        <footer>
            <span @click="showSelect()">支出</span>
            <div class="frame">
                <span class="type">{{type}}</span>
                <input type="number" v-model="money" @keyup.enter="commit(type,money)" />
            </div>
        </footer>

        <!-- 弹出警告框 -->
        <transition name="alert">
            <alertComponent information="没有选择类型" v-if="showAlert"></alertComponent>
        </transition>

        <!-- 类型 -->
        <transition>
            <div class="selectType" v-show="show">
                <ul>
                    <li
                        class="typesCircle"
                        v-for="item in types"
                        :key="item.name"
                        @click="getType(item.name)"
                    >{{item.name}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
// 会话框(组件的样式)
$subjectColor: skyblue;

.center {
    padding: 5px;
    overflow: scroll;
    // clear: both;
    .conversation {
        max-width: 90%;
        min-width: 70%;
        margin-bottom: 10px;
        height: auto;
        overflow-x: hidden;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            float: left;
        }
        p {
            padding: 5px 10px;
            min-height: 50px;
            max-width: 80%;
            margin-left: 5px;
            background: #f5f6fa;
            color: #9294a1;
            font-size: 16px;
            // line-height: 50px;
            float: left;
            margin-top: 6px;
            border-radius: 3px 15px 15px 15px;
        }
    }

    .me {
        float: right;

        img {
            float: right;
        }
        p {
            margin-right: 5px;
            float: right;
            border-radius: 15px 3px 15px 15px;
            background: skyblue;
            color: #fff;
            :nth-child(1) {
                margin-right: 10px;
            }
        }
    }
}

footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ccc;
    padding: 5px 10px;
    background: $subjectColor;

    > span {
        float: left;
        width: 40px;
        height: 40px;
        background: skyblue;
        border-radius: 50%;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        font-weight: 700;
        color: #fff;
    }
    .frame {
        position: relative;
        width: 80%;
        float: right;
        .type {
            position: absolute;
            left: 20px;
            // top: 5px;
            line-height: 40px;
            font-size: 14px;
        }
        input {
            width: 100%;
            height: 40px;
            border-radius: 20px;
            font-size: 16px;
            border: 0;
            outline: none;
            padding: 0 10px;
            text-align: right;
            margin-left: 20px;
            float: right;
        }
    }
}

.selectType {
    width: 100%;
    height: 150px;
    background: purple;
    position: absolute;
    bottom: 0;
    padding: 10px 15px;
    transform: translateY(0);

    ul {
        width: 100%;
        .typesCircle {
            list-style: none;
            flex: 1;
            width: 50px;
            margin: 0 20px 20px 0;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 50%;
            background: skyblue;
            float: left;
        }
        :nth-child(5n) {
            margin-right: 0px;
        }
    }
}

.alert {
    width: 60%;
    height: 100px;
    text-align: center;
    line-height: 20px;
    border-radius: 5px; 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #000;
    color: #fff;
    padding: 40px 20px;
}

.alert-enter,
.alert-leave-to {
    opacity: 0;
}

.alert-enter-active,
.alert-leave-active {
    transition: all 1s;
}

</style>
<script>
export default {
    data() {
        return {
            money: 0,
            type: "",
            show: false,
            showAlert: false,
            types: [
                { name: "早餐", price: 0 },
                { name: "午餐", price: 0 },
                { name: "晚餐", price: 0 },
                { name: "其他", price: 0 },
                { name: "购物", price: 0 },
                { name: "零食", price: 0 }
            ],
            meDialogue: [
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
                { type: "早餐", money: 0 },
            ]
        };
    },
    methods: {
        showSelect() {
            this.show = !this.show;
        },
        getType(type) {
            this.show = !this.show;
            this.type = type;
        },
        commit(type, money) {   
            // 发送消息告诉对方

            if(!type){
                // 如果没有选择类型则弹窗警告
                this.showAlert = !this.showAlert;
                let timer = setTimeout(()=>{
                    clearInterval(timer);
                    this.showAlert = !this.showAlert;
                },3000)
                return;
            }

            // 添加对话
            this.meDialogue.push({ type, money });

            // 添加到vuex
            switch (type) {
                case "早餐":
                    this.$store.commit("revise",{
                        name: "breakfast",
                        value: money
                    })
                    break;

                case "午餐":
                    this.$store.commit("revise",{
                        name: "lunch",
                        value: money
                    })
                    break;

                case "晚餐":
                    this.$store.commit("revise",{
                        name: "supper",
                        value: money
                    })
                    break;
            }

            // 获取网页的可视区域的高度
            // console.log(document.body.clientHeight);

            // console.log(this.$refs.screen.offsetHeight);
            // console.log(document.body.clientHeight);
            if(document.body.clientHeight - 100 <= this.$refs.screen.offsetHeight){
                // 监听滚动，如果内容大于screen就滚动到最底(没头绪)
                let scrollMove = this.$refs.screen.offsetHeight - document.body.clientHeight 
            
            }
        }
    },
    created(){
    
       
    },
    mounted(){
      document.body.scrollTop= "-200px";
    }
    // props: ["dialogue"]
};
</script>