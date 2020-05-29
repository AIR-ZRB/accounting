<template>
    <div class="about">
        <header>
            <img :src="this.$store.state.masterPicture" alt="" />
            <p>{{ this.$store.state.master }}</p>
        </header>

        <div class="content">
            <p v-for="item in dialog" :key="item">{{ item }}</p>
        </div>

        <div class="footer">
            <a href="https://github.com/AIR-ZRB">
                <img class="tabs-icon" src="../icon/social_github.svg" alt="" />
            </a>
            <a href="">
                <img class="tabs-icon" src="../icon/social_blog.svg" alt="" />
            </a>
            <a href="">
                <img class="tabs-icon" src="../icon/social_sina.svg" alt="" />
            </a>
        </div>
    </div>
</template>

<script>
import "../store/store.js";
export default {
    data() {
        return {
            dialog: [
                "本APP/SPA是由Vue全家桶写成的",
                "存储是用的H5的本地存储功能，在APP上数据可能会由随时消失的风险",
                "还有许多功能没有完善后续会持续更新",
            ],
        };
    },
};
</script>

<style lang="scss">
.about {
    width: 100%;
    overflow: hidden;
    display: grid;
    place-items: center;
    place-content: center;
    padding: 10px;
    header {
        img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
        }
        p {
            margin-top: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: 700;
        }
    }

    .content {
        text-align: center;
        p {
            font-size: 16px;
            font-weight: 700;
            line-height: 28px;
            margin: 15px;
        }
    }

    .footer {
        width: 100%;
        height: 50px;
        // position: absolute;
        bottom: 10px;
        display: flex;
        justify-content: center;
        a {
            display: block;
            margin-right: 20px;
            img {
                width: 40px;
                height: 40px;
            }
        }
    }
}
</style>
