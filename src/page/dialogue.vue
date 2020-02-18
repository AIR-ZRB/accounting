<template>
    <div>
        <div class="center">
            <!-- 路由部分 -->

            <conversation person="wife" dialogue="gghjgjhghgjg"></conversation>
            <!-- 给key传值需要修改 -->
            <conversation
                person="me"
                :dialogue="item.money"
                :type="item.type"
                v-for="item in dialogue"
                :key="item.money"
            ></conversation>
        </div>
    </div>
</template>
<style lang="scss">
// 会话框(组件的样式)
.center {
    padding: 5px;

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
</style>
<script>
export default {
    data(){
        return {}
    },
    props:["dialogue"]
};
</script>