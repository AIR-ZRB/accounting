<template>
    <div class="monthContainer">
        <div class="calendar">
            <div class="statistics">
                <span>{{ FullYear }}年{{ month + 1 }}月{{ today }}</span>
                <span>总消费：{{ statisticsMoney }}</span>
            </div>
            <div class="monthHeader">
                <ul>
                    <li v-for="item in this.sevenWord" :key="item">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="monthDay">
                <ul>
                    <!-- 每個月前的空格 -->
                    <li
                        v-for="item in MonthFirstDayWeek"
                        :key="'emptyList' + item"
                    ></li>

                    <!-- 天數 -->
                    <li
                        v-for="(item, index) in this.MonthDays"
                        :class="[
                            { active: index === today - 1 && true },
                            { clickActive: index === clickToday && true },
                        ]"
                        :key="item"
                        @click="monthActive(index)"
                    >
                        <span>{{ item }}</span>    
                    </li>
                </ul>
            </div>
        </div>

        <div class="activeToday">
            <ul>
                <li
                    v-for="item in this.todayData"
                    :key="item.month + Math.random()"
                >
                    <img :src="require(`../icon/${item.typeEN}.svg`)" alt="" />
                    <span>{{ item.typeCN }}</span>
                    <span>{{ item.content }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { setStorage, getStorage } from "../store/store.js";

export default {
    data() {
        return {
            sevenWord: ["一", "二", "三", "四", "五", "六", "七"],
            today: 1,
            month: 1,
            MonthFirstDayWeek: 1,
            MonthDays: 1,
            FullYear: 2020,
            clickToday: null,
            todayData: [],
            statisticsMoney: 0,
        };
    },
    methods: {
        getMonth() {
            let date = new Date();

            // 获取今天几号1~31
            this.today = date.getDate();

            // 获得月0~11
            this.month = date.getMonth();

            this.FullYear = date.getFullYear();

            console.log(`${this.FullYear}.${this.month + 1}.${this.today}`);

            // 获得一个月又多少天
            this.MonthDays = new Date(
                this.FullYear,
                this.month + 1,
                0
            ).getDate();

            console.log("本月共有" + this.MonthDays);

            // 获取每个月第一天的星期，用来做渲染
            this.MonthFirstDayWeek = new Date(2020, this.month, 1).getUTCDay();
            console.log("本月第一天星期" + this.MonthFirstDayWeek);
        },
        monthActive(index) {
            // console.log(index);
            // 点击今天会变蓝，且显示今天的数据
            this.clickToday = index;

            let allData = getStorage("azureSky");

            // 计算本月总共消费
            let statisticsMoney = 0;
            allData.forEach((element) => {
                statisticsMoney += !isNaN(element.content)
                    ? parseInt(element.content)
                    : 0;
            });
            this.statisticsMoney = statisticsMoney;

            // 获取点击的那天的数据
            this.todayData = allData.filter((item, index) => {
                return item.today == this.clickToday + 1;
            });

            this.todayData = this.todayData.filter((item, index) => {
                return item.month == this.month + 1;
            });
        },
    },
    created() {
        // 初始化日历
        this.getMonth();
        this.monthActive(this.today - 1);
    },
};
</script>

<style lang="scss">
$subColor: #f0f1f3;
.monthContainer {
    width: 100%;
    height: 100%;

    .statistics {
        background: skyblue;
        text-align: center;
        color: $subColor;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        border-radius: 5px;
    }

    .monthHeaderPage {
        width: 100%;
        height: 50px;
        top: 0;
        left: 0;
        position: relative;
        text-align: center;

        p {
            line-height: 50px;
        }
        .icon-left,
        .icon-right {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 10px;
        }
    }

    .calendar {
        margin: 5px;
        border-radius: 5px;
        background: #fff;

        .monthHeader {
            width: 100%;

            ul {
                display: flex;
                justify-content: center;
                padding: 7px 0;
                border-bottom: 1px solid $subColor;
                li {
                    color: #ccc;
                    width: 14.2%;
                    text-align: center;
                }
            }
        }

        .monthDay {
            width: 100%;
            ul {
                display: flex;
                flex-wrap: wrap;
                padding: 7px 0;
                padding: 0;
                li {
                    color: #262a35;
                    border-bottom: 1px solid $subColor;
                    height: 60px;
                    width: 14.2%;
                    text-align: right;
                    position: relative;
                }
                .active {
                    background: #ffc653;
                    color: #fff;
                }
                .clickActive {
                    background: skyblue;
                }
                .hint-text {
                  color: skyblue;
                }
            }
        }
    }

    .activeToday {
        width: 100%;
        ul {
            padding: 0 10px;
            li {
                width: 100%;
                height: 50px;
                line-height: 50px;
                display: flex;
                align-items: center;
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 20px;
                }

                span {
                    &:last-child {
                        padding-left: 10px;
                    }
                }
            }
        }
    }
}
</style>
