<template>
    <div>
        <div class="center" ref="screen">
            <!-- 路由部分 -->
            <!-- 对话组件 -->
            <conversation
                :key="item.money"
                :person="item.person"
                :dialogue="item.content"
                :type="item.typeCN"
                v-for="item in this.Dialogue"
            ></conversation>
        </div>

        <!-- 发消息组件 -->
        <footer>
            <span @click="() => (this.show = !this.show)">支出</span>
            <div class="frame">
                <span class="type">{{ typeCN }}</span>
                <input
                    type="number"
                    v-model="money"
                    @keyup.enter="()=>commit(typeCN, typeEN, money)"
                />
            </div>
        </footer>

        <!-- 弹出警告框 -->

        <alertComponent
            information="没有选择类型,请按支出来选择类型"
            v-if="showAlert"
        ></alertComponent>

        <selectType :show="show" @getType="getType"></selectType>
    </div>
</template>
<script>
import { setStorage, getStorage } from "../store/store.js";
import {
    alertComponent,
    conversation,
    selectType,
} from "../components/exportComponents.js";

export default {
    data() {
        return {
            money: 0,
            typeCN: "",
            typeEN: "",
            show: false,
            showAlert: false,
            Dialogue: [],
        };
    },
    components: {
        alertComponent,
        conversation,
        selectType,
    },
    methods: {
        getType(typeCN, typeEN) {
            this.show = !this.show;
            this.typeCN = typeCN;
            this.typeEN = typeEN;
        },
        commit(typeCN, typeEN, money) {
            // 发送消息告诉对方

            if (!typeCN) {
                // 如果没有选择类型则弹窗警告
                this.showAlert = !this.showAlert;
                let timer = setTimeout(() => {
                    clearInterval(timer);
                    this.showAlert = !this.showAlert;
                }, 1000);
                return;
            }

            let date = new Date();

            this.Dialogue.push({
                typeCN,
                typeEN,
                content: money,
                person: "me",
                month: date.getMonth() + 1,
                today: date.getDate(),
            });

            // 获取随机对话(根据类型)
            this.getWifeDialogue(this.typeEN);
            // 判断类型
            this.judgeType(this.typeEN, money);
        },

        // 让wife随机对话
        getWifeDialogue(type, money) {
            // 获取本地文件的语录
            this.$axios.get("./data/dialogue.json").then((res) => {
                // 获取随机对话的索引

                let randomDialogue = parseInt(
                    Math.random() * res.data["breakfast"].length
                );

                // 添加到对话中去
                this.Dialogue.push({
                    content: res.data["breakfast"][randomDialogue],
                    person: "wife",
                });
            });
        },
        // 添加到vuex里去
        judgeType(type, money) {
            this.$store.commit("revise", {
                name: type,
                value: money,
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
    },
    created() {
        this.Dialogue = getStorage("azureSky") || [
            { content: "你好", person: "wife" },
        ];
    },
    updated() {
        // 让页面始终再最底部
        this.windowScrollBottom();
        // 写入localStorage对象里
        setStorage("azureSky", this.Dialogue);
    },
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

.list-enter,
.list-leave-to {
    transform: translateY(1000px);
}

.list-enter-active,
.list-leave-active {
    transition: all 0.3s;
}
</style>
