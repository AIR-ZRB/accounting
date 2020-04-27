<template>
    <div>
       

        <ul>
            <optionsFilesList optionName="更换头像"></optionsFilesList>
            <optionsFilesList optionName="老婆头像"></optionsFilesList>
            <optionsList optionName="老婆名字" :default="this.wife" @click.native="edit"></optionsList>
        </ul>

        <div class="editBg" v-if="editShow">
            <div class="edit">
                <input type="text" v-model="wife" />
                <p>
                    <span class="sure" @click="editWifeName">确定</span>
                    <span class="cancel" @click="editCancel">取消</span>
                </p>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            wife: this.$store.state.wife,
            editShow: false
        };
    },
    methods: {

        goBack() {
            window.history.go(-1);
        },
        edit() {
            this.editShow = true;
        },
        editWifeName() {
            // 调用vuex修改内容
            this.$store.commit("revise", { name: "wife", value: this.wife });
            this.editCancel();
        },
        editCancel() {
            this.editShow = false;
        }
    },
    created() {
    
    }
 
};
</script>


<style lang="scss">

.optionList {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    position: relative;
    .right {
        float: right;
        height: 50px;

        img {
            margin: 5px 0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }




    }

    // 读取文件组件的样式
    #file {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }

    .editImage {
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        width: 100%;
        height: 100%;
        z-index: 999; 
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        span {
            color: skyblue;
        }
    }




}

.editBg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;

    .edit {
        width: 80%;
        height: 100px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        input {
            position: absolute;
            width: 90%;
            height: 30%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            border: 0;
            border-bottom: 1px solid skyblue;
            outline: none;
        }

        p {
            position: absolute;
            right: 10px;
            bottom: 5px;
            color: skyblue;

            span {
                margin-left: 10px;
            }
        }
    }
}
</style>