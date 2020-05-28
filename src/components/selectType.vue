<template>
    <!-- 类型 -->
    <transition name="select">
        <div class="select-box" v-show="show" @click="getTypes">
            <div class="selectType">
                <ul>
                    <li
                        class="typesCircle"
                        v-for="item in types"
                        :key="item.name.CN"
                        @click="getType(item.name.CN, item.name.EN)"
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
            types: [
                { name: { CN: "早餐", EN: "breakfast" }, price: 0 },
                { name: { CN: "午餐", EN: "lunch" }, price: 0 },
                { name: { CN: "晚餐", EN: "supper" }, price: 0 },
                { name: { CN: "饮料", EN: "beverages" }, price: 0 },
                { name: { CN: "零食", EN: "snacks" }, price: 0 },
                { name: { CN: "水果", EN: "fruits" }, price: 0 },
                { name: { CN: "话费", EN: "telephoneCharge" }, price: 0 },
                { name: { CN: "购物", EN: "shoppingCart" }, price: 0 },
                { name: { CN: "其他", EN: "rests" }, price: 0 },
            ],
        };
    },
    methods: {
        // 事件委托？  
        getTypes(event){    
          event.target.className === "select-box" && this.$emit("update:show",false) ;
        },
        getType(typeCN, typeEN) {
            this.$emit("getType", typeCN, typeEN);
        },
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
        padding: 20px;
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

            .typesCircle {
                list-style: none;
                height: 80px;
                width: 25%;

                text-align: center;
                border-radius: 50%;
                // background: skyblue;
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
