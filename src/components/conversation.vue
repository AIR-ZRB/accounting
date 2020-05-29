<template>
    <div :class="[pople, conversation]">
        <img :src="picture" alt="" />
        <p class="dialogue">
            <span>{{ this.type }}</span>
            <span>{{ this.dialogue }}</span>
        </p>
    </div>
</template>

<script>
import "../store/store.js";
export default {
    props: ["person", "dialogue", "type"],
    data() {
        return {
            pople: "wife",
            conversation: "conversation",
            picture: require("../images/wifePortrait.jpg"),
        };
    },
    methods: {
        show() {
            return this.dialogue;
        },
        who() {
            // 判断是谁该输入
            if (this.person === "wife") {
                this.pople = this.person;
                this.picture = this.$store.state.wifePicture;
            } else {
                this.pople = this.person;
                this.picture = this.$store.state.masterPicture;
            }
        },
    },
    created() {
        this.who();
        this.show();
    },
};
</script>

<style lang="scss">
.conversation {
    max-width: 90%;
    min-width: 70%;
    margin-bottom: 10px;
    height: auto;
    overflow-x: hidden;
    transition: all .5s;
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
</style>
