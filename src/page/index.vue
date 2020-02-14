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

        <conversation person="wife"></conversation>
   
        <conversation person="me"></conversation>

        </div>
        


        <footer>
            <span>支出</span>
            <input type="number">
        </footer>
    </div>
</template>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}

// 会话框
.center {
    padding: 5px;
}

.conversation {
    max-width: 90%;
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
        }
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


    footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #ccc;
        padding: 5px 10px;
        background: lightgreen;

        span {
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
        input {
            width: 80%;
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
</style>

<script>
export default {
    data() {
        return {
            // portrait: require("../images/portrait.png")
        };
    }
};
</script>