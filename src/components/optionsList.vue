<template>
    <li class="optionList">
        <span>{{ this.optionName }}</span>
        <span class="right">{{ this.defaultValue }}</span>
    </li>
</template>

<script>
export default {
    props: {
        optionName: {
            type: String,
            default: "设置选项"
        },
        defaultValue: {
            type: String,
            default: "选项值"
        }
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
        height: 100%;
    }
}

</style>
