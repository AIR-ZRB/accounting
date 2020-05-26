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



</style>
