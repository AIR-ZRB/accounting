<template>
    <!-- 类型 -->
    <transition name="select">
        <div class="select-box" v-show="show" @click="getTypes">
            <div class="selectType">
                <ul>
                    <li>
                        <span
                            v-for="item in allTypes"
                            :key="item.type"
                            :class="item.type === currentSelect || 'active'"
                            >{{ item.type }}</span
                        >
                    </li>
                    <li
                        class="typesCircle"
                        v-for="item in types"
                        :key="item.name.CN"
                        :data-namecn="item.name.CN"
                        :data-nameen="item.name.EN"
                    >
                        <img
                            :src="require(`../icon/${item.name.EN}.svg`)"
                            alt=""
                        />
                        <p>{{ item.name.CN }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentSelect: "支出",
            allTypes: [
                {
                    type: "支出",
                    types: [
                        { name: { CN: "早餐", EN: "breakfast" }, price: 0 },
                        { name: { CN: "午餐", EN: "lunch" }, price: 0 },
                        { name: { CN: "晚餐", EN: "supper" }, price: 0 },
                        { name: { CN: "饮料", EN: "beverages" }, price: 0 },
                        { name: { CN: "零食", EN: "snacks" }, price: 0 },
                        { name: { CN: "水果", EN: "fruits" }, price: 0 },
                        { name: { CN: "买菜", EN: "vegetables" }, price: 0 },
                        { name: { CN: "衣服", EN: "clothing" }, price: 0 },
                        { name: { CN: "游戏", EN: "game" }, price: 0 },
                        { name: { CN: "旅游", EN: "travel" }, price: 0 },
                        {
                            name: { CN: "话费", EN: "telephoneCharge" },
                            price: 0,
                        },
                        { name: { CN: "购物", EN: "shoppingCart" }, price: 0 },
                        { name: { CN: "医院", EN: "hospital" }, price: 0 },
                        { name: { CN: "其他", EN: "rests" }, price: 0 },
                    ],
                },
                {
                    type: "收入",
                    types: [
                        { name: { CN: "工作", EN: "work" }, price: 0 },
                        { name: { CN: "兼职", EN: "partTime" }, price: 0 },
                        { name: { CN: "生活费", EN: "alimony" }, price: 0 },
                        { name: { CN: "报销", EN: "refund" }, price: 0 },
                        { name: { CN: "PY交易", EN: "transaction" }, price: 0 },
                        { name: { CN: "其他", EN: "rests" }, price: 0 },
                    ],
                },
            ],
            types: [],
        };
    },
    methods: {
        getTypes(event) {
            if (event.target.parentNode.dataset.namecn) {
                const name = event.target.parentNode.dataset;
                this.$emit("update:typeCN", name.namecn);
                this.$emit("update:typeEN", name.nameen);
                this.$emit("update:show", false);
            }

            const targetType = event.target.innerHTML;
            if (targetType === "支出" || targetType === "收入") {
                const index = this.allTypes.findIndex((element) => {
                    return element.type === event.target.innerHTML;
                });
                this.types = this.allTypes[index].types;
                this.currentSelect = this.allTypes[index].type;
            }

            event.target.className === "select-box" &&
                this.$emit("update:show", false);
        },
    },
    created() {
        this.types = this.allTypes[0].types;
    },
};
</script>

<style lang="scss">
.select-box {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    .selectType {
        width: 90%;
        height: 300px;
        padding: 0 0 20px 0;
        transform: translateY(0px);
        border-radius: 10px;
        opacity: 0.8;
        border-radius: 10px;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        overflow-y: scroll;
        background: #fff;

        ul {
            width: 100%;
            height: 100%;

            li {
                &:first-child {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    display: flex;
                    margin-bottom: 10px;
                    span {
                        width: 50%;
                        text-align: center;
                    }

                    span.active {
                        background: #eee;
                    }
                }
            }

            .typesCircle {
                list-style: none;
                height: 90px;
                width: 25%;
                text-align: center;
                border-radius: 50%;
                float: left;
                img {
                    width: 40px;
                    height: 40px;
                }
                p {
                    margin: 0;
                }
            }
        }
    }
}

.select-enter,
.select-leave-to {
    transform: translateY(1000px);
}

.select-enter-active,
.select-leave-active {
    transition: all 0.3s;
}
</style>
