<template>
    <!-- 这个是主页面的公共区域 -->
    <!-- 公共样式也在这里写 -->

    <div class="container">
        <header>
            <p class="wife-name" @click="showTabs">星野日向</p>
            <p>
                <span class="month">2月</span>
                <span class="money">100收入 / 100支出</span>
            </p>
        </header>

       

        <router-view :dialogue="meDialogue"></router-view>


        <transition>
            <footer>
                <span @click="showSelect()">支出</span>
                <div class="frame">
                    <span class="type">{{type}}</span>
                    <input type="number" v-model="money" @keyup.enter="commit(type,money)" />
                </div>
            </footer>
        </transition>

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

        <transition name="broadside">
            <div class="tabs" v-if="tabs.isShow">
                <img src alt />
                <ul>
                    <li><a href="#/home">Home</a></li>
                    <li><a href="#/month">Month</a></li>
                    <li><a href="#/setting">Setting</a></li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">
$subjectColor: skyblue;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,
body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}

.container {
    // 公共头部区域
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    position: relative;
    padding: 50px 0;

    header {
        width: 100%;
        height: 50px;
        padding: 5px;
        // background: skyblue;
        position: fixed;
        top: 0;
        border-bottom: 1px solid #ccc;
        background: #fff;
        text-align: center;

        .wife-name {
            font-weight: 700;
        }

        .money,
        .month {
            font-size: 12px;
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
            // overflow: hidden;
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

    .tabs {
        width: 50%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        border-right: 1px solid #ccc;
        li {
            padding: 10px;
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            a {
                float: left;
                width: 100%;
                height: 100%;
                color: #000;
                text-decoration: none;
            }  
        }
         :nth-child(1) {
            border-top: 1px solid #ccc;
            background: $subjectColor;
        }
        
    }

    // tab栏动画
    .v-enter,
    .v-leave-to {
        transform: translateY(200px);
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s;
    }

    .broadside-enter,
    .broadside-leave-to {
        transform: translateX(-200px);
    }
    .broadside-enter-active,
    .broadside-leave-active {
        transition: all 0.5s;
    }
}
</style>

<script>
export default {
    data() {
        return {
            money: 0,
            type: "",
            show: false,
            types: [
                { name: "早餐", price: 0 },
                { name: "午餐", price: 0 },
                { name: "晚餐", price: 0 },
                { name: "其他", price: 0 },
                { name: "购物", price: 0 },
                { name: "零食", price: 0 }
            ],
            tabs: {
                isShow: false
            },
            nowFocusId: "",
            meDialogue: []
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
            this.meDialogue.push({ type, money });

            switch (type) {
                case "早餐":
                    console.log(11);
                    break;
                case "午餐":
                    console.log(22);
                    break;
                case "晚餐":
                    console.log(33);
                    break;
            }
        },
        nowClick() {
            document.addEventListener("click", event => {
                console.log(event.target.className);
                this.nowFocusId = event.target.calssName;
            });
        },
        showTabs() {
            console.log(this.nowFocusId);
            this.tabs.isShow = !this.tabs.isShow;
        
        }
    },
    created() {
        this.nowClick();
        
    }
};
</script>