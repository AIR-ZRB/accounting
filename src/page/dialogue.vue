<template>
    <div>

        <div class="center" ref="screen">
            <!-- 路由部分 -->

            <!-- 对话组件 -->
            <conversation
                :person="item.person"
                :dialogue="item.content"
                :type="item.type"
                :key="item.money"
                v-for="item in this.Dialogue"
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
                <!-- <div class="selectType"> -->
                <ul>
                    <li
                        class="typesCircle"
                        v-for="item in types"
                        :key="item.name.CN"
                        @click="getType(item.name.CN)"
                    >{{item.name.CN}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            money: 0,
            type: "",
            show: false,
            showAlert: false,
            types: [
                { name: { CN: "早餐", EN: "breakfast" }, price: 0 },
                { name: { CN: "午餐", EN: "lunch" }, price: 0 },
                { name: { CN: "晚餐", EN: "supper" }, price: 0 },
                { name: { CN: "饮料", EN: "beverages" }, price: 0 },
                { name: { CN: "零食", EN: "snacks" }, price: 0 },
                { name: { CN: "水果", EN: "fruits" }, price: 0 },
                { name: { CN: "话费", EN: "telephoneCharge" }, price: 0 },
                { name: { CN: "其他", EN: "rests" }, price: 0 }
            ],
            Dialogue: [{ content: "你好", person: "wife" }]
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

            if (!type) {
                // 如果没有选择类型则弹窗警告
                this.showAlert = !this.showAlert;
                let timer = setTimeout(() => {
                    clearInterval(timer);
                    this.showAlert = !this.showAlert;
                }, 1000);
                return;
            }

            this.Dialogue.push({ type, content: money, person: "me" });

            this.types.forEach((item, index) => {
                // 获取随机对话(根据类型)
                item.name.CN == type
                    ? this.getWifeDialogue(item.name.EN)
                    : null;
                // 判断类型
                item.name.CN == type
                    ? this.judgeType(item.name.EN, money)
                    : null;
            });
        },
        // 让屏幕一直处于最底下
        windowScrollBottom() {
            // 获取网页的可视区域的高度
            if (window.screen.height - 234 <= this.$refs.screen.offsetHeight) {
                // 监听滚动，如果内容大于screen就滚动到最底
                let scrollMove =
                    this.$refs.screen.offsetHeight + 336 - window.screen.height;
                window.scrollTo(0, scrollMove);
            }
        },
        // 让wife随机对话
        getWifeDialogue(type, money) {
            // 获取本地文件的语录
            this.$axios.get("./data/dialogue.json").then(res => {

                // 获取随机对话的索引
                let randomDialogue = parseInt(
                    Math.random() * res.data[type].length
                );
                console.log(res.data[type[randomDialogue]]);
                // 添加到对话中去
                this.Dialogue.push({
                    content: res.data[type][randomDialogue],
                    person: "wife"
                });
            });
        },
        // 添加到vuex里去
        judgeType(type, money) {
            this.$store.commit("revise", {
                name: type,
                value: money
            });
        },
        // 写入localStorage
        writeLocalStorage() {
            window.localStorage.setItem();
        }
    },

    // 生命周期函数
    created() {
        window.localStorage.setItem("asdklfjlaskd", "hello");
    },
    mounted() {},
    updated() {
        // 让页面始终再最底部
        this.windowScrollBottom();
    }
};
</script>


<style lang="scss">
// 会话框(组件的样式)
$subjectColor: skyblue;

.dialogueHeader {
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
    .setting {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
}

.center {
    padding: 5px;
    overflow: hidden;
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
        width: 85%;
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
    padding: 10px 20px;
    transform: translateY(0px);
    border-radius: 10px 10px 0 0;
    opacity: 0.5;

    ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-wrap: wrap;

        .typesCircle {
            list-style: none;

            width: 15%;
            margin: 0 30px 0 0;
            // margin: 10px 10px 10px 10px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 50%;
            background: skyblue;
            float: left;
        }
    }
}

.alert {
    width: 60%;
    height: 100px;
    text-align: center;
    line-height: 20px;
    border-radius: 10px;
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

// tab栏动画

.alert-enter,
.alert-leave-to {
    opacity: 0;
}

.alert-enter-active,
.alert-leave-active {
    transition: all 1s;
}
</style>