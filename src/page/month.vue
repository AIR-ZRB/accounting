<template>
    <div class="monthContainer">
        <div class="calendar">
            <div class="monthHeader">
                <ul>
                    <li v-for="item in this.sevenWord" :key="item">{{item}}</li>
                </ul>
            </div>
            <div class="monthDay">
                <ul>
                    <li v-for="item in MonthFirstDayWeek" :key="'emptyList'+item"></li>
                    <li
                        :class="{active: index == (today-1) ? true : false }"
                        v-for="(item,index) in this.MonthDays"
                        :key="item"
                    >{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss" >
$subColor: #f0f1f3;
.monthContainer {
   
    width: 100%;
    height: 100%;
    background: #f3f4f8;

    .monthHeaderPage {
        width: 100%;
        height: 50px;
        // background: red;
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
}
.calendar {
    margin: 5px;
    // background: green;
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
            // justify-content: center;
            flex-wrap: wrap;
            padding: 7px 0;
            // border-bottom: 1px solid $subColor;
            padding: 0;
            li {
                color: #262a35;
                border-bottom: 1px solid $subColor;
                height: 60px;
                width: 14.2%;
                text-align: right;
            }
            .active {
                background: #ffc653;
                color: #fff;
            }
        }
    }
}
</style>
<script>
export default {
    data() {
        return {
            sevenWord: ["一", "二", "三", "四", "五", "六", "七"],
            today: 1,
            month: 1,
            MonthFirstDayWeek: 1,
            MonthDays: 1,
            FullYear: 2020
        };
    },
    methods: {
        goBack() {
            window.history.go(-1);
        },
        getMonth() {
            let date = new Date();
            // 获得日
            console.log(date.getDate());

            // 获取今天几号1~31
            this.today = date.getDate();

            // 获得月0~11
            this.month = date.getMonth();
            this.FullYear = date.getFullYear();
            console.log(this.FullYear);

            // 获得一个月又多少天
            this.MonthDays = new Date(2020, this.month + 1, 0).getDate();
            console.log(this.MonthDays);

            // 获取每个月第一天的星期，用来做渲染
            this.MonthFirstDayWeek = new Date(2020, this.month, 1).getUTCDay();
            console.log(this.MonthFirstDayWeek);
        }
    },
    created() {
        this.getMonth();
    }
};
</script>