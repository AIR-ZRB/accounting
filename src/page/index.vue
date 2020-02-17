<template>
    <!-- 这个是主页面的公共区域 -->
    <!-- 公共样式也在这里写 -->

    <div class="container">
        <header>
            <p class="wife-name">星野日向</p>
            <p>
                <span class="month">2月</span>
                <span class="money">100收入 / 100支出</span>
            </p>
        </header>

        <div class="center">
            <!-- 路由部分 -->

            <conversation person="wife" dialogue="gghjgjhghgjg"></conversation>
            <!-- 给key传值需要修改 -->
            <conversation person="me" :dialogue="item.money" :type="item.type" v-for="item in meDialogue" :key="item.money"></conversation>
        </div>

        <transition>
            <footer>
                <span @click="showSelect()">支出</span>
                <div class="frame">
                    <span class="type">{{type}}</span>
                    <input type="number" v-model="money" @keyup.enter="commit(type,money)"/>
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
    </div>
</template>

<style lang="scss">
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

    // 会话框(组件的样式)
    .center {
        padding: 5px;

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
        background: lightgreen;

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

    // tab栏动画
    .v-enter,
    .v-leave-to {
        transform: translateY(200px);
    }
    .v-enter-active,
    .v-leave-active {
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
            meDialogue: [
              
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
        commit(type,money){

            // 发送消息告诉对方
            this.meDialogue.push({type,money})


            switch(type){
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
        }
    }
};
</script>