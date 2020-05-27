<template>
    <!-- 这个是主页面的公共区域 -->
    <!-- 公共样式也在这里写 -->

    <div class="container">
        <!-- 头部分 -->
        <header class="index-header">
            <img
                src="../icon/arrow_left.svg"
                @click="goBack"
                v-show="tabActive.substring(1) === 'home' ? false : true"
            />
            <span>{{
                tabActive.substring(1, 2).toUpperCase() + tabActive.substring(2)
            }}</span>
            <img src="../icon/setting.svg" class="setting" alt="" />
        </header>

        <router-view></router-view>

        <!-- tabs列表 -->
        <transition name="broadside">
            <div class="tabs" v-show="tabs">
                <img :src="$store.state.masterPicture" />
                <p>{{ this.$store.state.master }}</p>
                <ul>
                    <li
                        v-for="item in tabsColumn"
                        :key="item.name"
                        :class="{
                            tabActive:
                                tabActive === '/' + item.name ? true : false,
                        }"
                    >
                        <img class="icon" :src="item.icon" />
                        <a :href="'#/' + item.name">{{
                            item.name.substring(0, 1).toUpperCase() +
                                item.name.substring(1)
                        }}</a>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    data() {
        return {
            wife: this.$store.state.wife,
            tabs: false,
            tabActive: "/home",
            tabsColumn: [
                {
                    name: "home",
                    icon: require("../icon/list.svg"),
                },
                {
                    name: "month",
                    icon: require("../icon/time.svg"),
                },
                {
                    name: "setting",
                    icon: require("../icon/setting.svg"),
                },
                {
                    name: "about",
                    icon: require("../icon/user.svg"),
                },
            ],
        };
    },
    
    watch: {
        $route(to) {
            this.tabActive = to.path;
        },
    },
    methods: {
        // 显示和隐藏tabs栏
        nowClick() {
            // tabs是否显示
            document.addEventListener("click", (event) => {
                let clickNow = event.target.className;
                // console.log("全局点击事件的Class" + clickNow);
                clickNow == "setting" || clickNow == "tabs"
                    ? (this.tabs = true)
                    : (this.tabs = false);
            });
        },
        goBack() {
            window.history.go(-1);
        },
    },
    created() {
        /**
         * 1. 一开始根据url重定向
         * 2. 注册全局点击事件
         */
        this.$router.push({path: this.$route.fullPath})   
        this.tabActive = this.$route.fullPath

        this.nowClick();
    },
};
</script>

<style lang="scss">
$subjectColor: skyblue;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

li {
    list-style: none;
}
html,
body {
    width: 100%;
    // height: 100%;
    overflow-x: hidden;
}

.container {
    // 公共头部区域
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    // position: relative;
    padding: 50px 0;

    .index-header {
        width: 100%;
        height: 50px;
        top: 0;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border-bottom: 1px solid #ccc;
        padding: 0 20px;
        text-align: center;
        font-size: 18px;

        img {
            width: 30px;
            height: 30px;
        }
    }

    .tabs {
        width: 250px;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;

        padding-top: 20px;
        text-align: center;

        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
        }

        .icon {
            position: absolute;
            top: 10px;
            left: 20px;
            width: 30px;
            height: 30px;
        }

        p {
            padding-top: 5px;
            line-height: 50px;
            font-size: 18px;
            font-weight: 700;
        }

        ul {
            .tabActive {
                background: $subjectColor;
            }

            li {
                // padding: 10px;
                width: 100%;
                height: 50px;
                line-height: 50px;
                overflow: hidden;

                position: relative;

                a {
                    float: left;
                    width: 100%;
                    font-size: 18px;
                    height: 100%;
                    color: #000;
                    text-decoration: none;
                }
            }
        }

      
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
