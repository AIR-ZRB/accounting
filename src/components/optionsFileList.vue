<template>
    <li class="optionList">
        <input
            type="file"
            id="file"
            ref="fileInput"
            accept="image/*"
            @change="uploadfile"
            class="selectImg"

        />
        <span>{{ this.optionName }}</span>
        <span class="right">
            <img :src="defaultValue" id="img" />
        </span>
        <!-- <div class="editImage" v-show="isShowEditImg"></div>
         -->

    </li>
</template>

<script>
import { setStorage,getStorage } from "../store/store.js";

export default {
    data() {
        return {
            isShowEditImg: false,
        };
    },
    props: {
        optionName: {
            type: String,
            default: "设置选项",
        },
        defaultValue: {
            type: String,
            default: ""
        },
        who: {
            type: String,
            default: "master"
        }
    },
    methods: {
        // 设置页面的换头像功能
        // 多个组件只有第一个生效
        uploadfile(event) {
            let _this = this;
            let reads = new FileReader();
            let file = this.$refs.fileInput.files[0];
            reads.readAsDataURL(file);
            reads.onloadend = function(e) {
                console.log(_this.who);
                const nowPicture = _this.who+ "Picture";
                _this.$store.commit("revise",{
                    name: nowPicture,
                    value: this.result
                });
                // 选择图片区域
                // event.target.parentNode.getElementsByClassName(
                //     "editImage"
                // )[0].style.backgroundImage = "url(" + this.result + ")";
                // _this.isShowEditImg = true;

                const getSetting = getStorage("azureSkySetting") || {};

                getSetting[nowPicture] =  this.result;
                setStorage("azureSkySetting",getSetting);

            };
        },
    },
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
</style>
