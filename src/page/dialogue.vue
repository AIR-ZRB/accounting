<template>
    <div>
        <div class="center" ref="screen">
            <!-- 对话组件 -->
            <transition-group name="dialog" tag="div" class="bind-dom">
                <conversation
                    :key="item.time"
                    :person="item.person"
                    :dialogue="item.content"
                    :type="item.typeCN"
                    v-for="item in this.Dialogue"
                    @touchstart.native="
                        (event) => selectDialog(event, item.time, +new Date())
                    "
                    @touchend.native="() => (touchData.end = +new Date())"
                ></conversation>
            </transition-group>
        </div>

        <!-- 弹出警告框 -->
        <alertComponent
            :information="showAlertMessage"
            :showAlert.sync="showAlert"
        ></alertComponent>

        <!-- 选择类型 -->
        <selectType
            :show.sync="show"
            :type.sync="type"
            :typeCN.sync="typeCN"
            :typeEN.sync="typeEN"
        ></selectType>

        <!-- 发消息组件 -->
        <footer>
            <span @click="() => (this.show = !this.show)">支出</span>
            <div class="frame">
                <span class="type">{{ typeCN }}</span>
                <input
                    type="number"
                    v-model="money"
                    @keyup.enter="() => commit(type, typeCN, typeEN, money)"
                />
            </div>
        </footer>
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
            type: "支出",
            typeCN: "",
            typeEN: "",
            show: false,
            showAlert: false,
            showAlertMessage: "请点击支出选择消费类型",
            Dialogue: [],
            touchData: {
                start: 0,
                end: 0,
                timer: null,
            },
        };
    },
    components: {
        alertComponent,
        conversation,
        selectType,
    },
    methods: {
        commit(type, typeCN, typeEN, money) {
            let warnText = (warnText) => {
                this.showAlertMessage = warnText;
                this.showAlert = !this.showAlert;
            };
            if (!typeCN) {
                warnText("请选择消费类型");
                return;
            } else if (
                money >= 1000 ||
                money <= 0 ||
                money === "" ||
                /^0+(.+)/.test(money)
            ) {
                money === "" && warnText("金额不能为空");
                money >= 1000 && warnText("单次消费不能超过1000");
                money <= 0 && warnText("单次消费不能低于或等于0");
                /^0+(.+)/.test(money) && warnText("请不要在金额前面加0");
                return;
            }

            let date = new Date();

            this.Dialogue.push({
                type,
                typeCN,
                typeEN,
                content: money,
                person: "me",
                month: date.getMonth() + 1,
                today: date.getDate(),
                time: +new Date(),
            });

            // 获取随机对话(根据类型)
            this.getWifeDialogue(this.typeEN);
            // 判断类型
            this.judgeType(this.typeEN, money);
        },
        // 用于删除聊天中的数据
        selectDialog(event, time, startTime) {
            this.touchData.timer && clearInterval(this.touchData.timer);

            // console.log(event.target.parentNode.parentNode);
            let divDom = "";

            if (event.target.className === "dialogue") {
                divDom = event.target.parentNode;
                divDom.classList.add("shrinkAnimation");
            } else if (event.target.parentNode.className === "dialogue") {
                divDom = event.target.parentNode.parentNode;
                divDom.classList.add("shrinkAnimation");
            }

            let endTime = this.touchData.end || +new Date();
            this.touchData.end = 0;
            this.touchData.timer = setInterval(() => {
                endTime = +new Date();
                if (endTime - startTime > 1000) {
                    const index = this.Dialogue.findIndex((element) => {
                        return element.time === time;
                    });
                    this.Dialogue.splice(index, 1);
                    clearInterval(this.touchData.timer);
                }

                if (this.touchData.end) {
                    if (this.touchData.end - startTime < 1000) {
                        clearInterval(this.touchData.timer);
                        divDom && divDom.classList.remove("shrinkAnimation");
                        this.touchData.end = 0;
                    }
                }
            }, 50);
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
                setTimeout(() => {
                    this.Dialogue.push({
                        content: res.data["breakfast"][randomDialogue],
                        person: "wife",
                        time: +new Date() + 1,
                    });
                }, 400);
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
            { content: "你好", person: "wife", time: +new Date() + 1 },
            {
                content: "长按对话即可删除",
                person: "wife",
                time: +new Date() + 2,
            },
            {
                content: "可以点击右上角的按钮进入其他页面",
                person: "wife",
                time: +new Date() + 3,
            },
        ];
    },
    mounted() {
        this.windowScrollBottom();
    },
    updated() {
        console.log(this.type);
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

.dialog-enter,
.dialog-leave-to {
    opacity: 0;
    transform: scale(2) translateX(1000px);
}

.dialog-enter-active,
.dialog-leave-active {
    transition: all 0.5s;
}

.shrinkAnimation {
    transform: scale(1.2);
}
</style>
