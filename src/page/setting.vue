<template>
    <div>
        <ul>
            <optionsList
                optionName="我的名字"
                :defaultValue="this.$store.state.master"
                @click.native="() => edit('master')"
            ></optionsList>

            <optionsList
                optionName="老婆名字"
                :defaultValue="this.$store.state.wife"
                @click.native="() => edit('wife')"
            ></optionsList>

            <optionsFileList
                optionName="更换头像"
                who="master"
                :defaultValue="this.$store.state.masterPicture"
            ></optionsFileList>

            <optionsFileList
                optionName="老婆头像"
                 who="wife"
                :defaultValue="this.$store.state.wifePicture"
            ></optionsFileList>
        </ul>

        <div class="editBg" v-if="editShow" @click="editBox">
            <div class="edit">
                <input type="text" v-model="inputValue" v-focus />
                <p>
                    <span class="sure">确定</span>
                    <span class="cancel">取消</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { setStorage, getStorage, setStorageJSON } from "../store/store.js";
import {
    optionsList,
    optionsFileList,
} from "../components/exportComponents.js";

export default {
    data() {
        return {
            editShow: false,
            inputValue: "",
            currentType: "",
        };
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            },
        },
    },
    components: {
        optionsList,
        optionsFileList,
    },
    methods: {
        edit(type) {
            this.editShow = true;
            this.currentType = type;
        },
        editValue() {
            // 调用vuex修改内容
            this.$store.commit("revise", {
                name: this.currentType,
                value: this.inputValue,
            });
            this.inputValue = "";
            this.editCancel();
        },
        editCancel() {
            this.editShow = false;
        },
        editBox(event) {
            // 事件委托
            switch (event.target.className) {
                case "editBg":
                    this.editCancel();
                    break;
                case "sure":
                    this.editValue();
                    break;
                case "cancel":
                    this.editCancel();
                    break;
            }
        },
    },
    created() {},
};
</script>

<style lang="scss">
.editBg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;

    .edit {
        width: 80%;
        height: 150px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 5px;

        input {
            position: absolute;
            width: 90%;
            height: 30%;
            top: 0;
            bottom: 10px;
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
            bottom: 15px;
            color: skyblue;

            span {
                margin-left: 10px;
            }
        }
    }
}
</style>
