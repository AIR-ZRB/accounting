<template>
    <!-- 这个是主页面的公共区域 -->
    <!-- 公共样式也在这里写 -->

    <div class="container">
        <header>
            <p class="wife-name">{{this.$store.getters.editWife}}</p>
            <p>
                <span class="month">2月</span>
                <span class="money">100收入 / {{this.$store.getters.editExpenditure}}支出</span>
            </p>
            <div class="setting"></div>
        </header>

        <router-view></router-view>

   
        <transition name="broadside">
            <div class="tabs" v-show="tabs.isShow">
                <img src alt />
                <ul>
                    <li>
                        <a href="#/home">Home</a>
                    </li>
                    <li>
                        <a href="#/month">Month</a>
                    </li>
                    <li>
                        <a href="#/setting">Setting</a>
                    </li>
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
        .setting {
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left: 0;
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
        ul {
            :nth-child(1) {
                border-top: 1px solid #ccc;
                background: $subjectColor;
            }
            li {
                padding: 10px;
                width: 100%;
                height: 50px;
                line-height: 50px;
                overflow: hidden;
                border-bottom: 1px solid #ccc;
                a {
                    float: left;
                    width: 100%;
                    height: 100%;
                    color: #000;
                    text-decoration: none;
                }
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
            wife: this.$store.state.wife,
            tabs: {
                isShow: false
            },
            nowFocusId: "",
           
        };
    },
    methods: {
        nowClick() {
            let _this = this;

            console.log(this.$store.state.wife);
            
            document.addEventListener("click", event => {

                // tabs是否显示
                let clickNow = event.target.className;
                if(clickNow == "setting" || clickNow == "tabs"){
                    _this.tabs.isShow = true;
                }else {
                     _this.tabs.isShow = false;
                }   
                console.log(clickNow);

            });





        },
        
    },
    created() {
        this.nowClick();
    }
};
</script>