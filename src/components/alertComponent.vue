<template>
    <transition name="alert">
        <div class="alert">
            <span> {{ this.information }} </span>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        information: {
            type: String,
            default: "这是一条提示消息",
        },
    },
};
</script>

<style lang="scss">
.alert {
    width: 50%;
    height: 60px;
    text-align: center;
    line-height: 20px;
    border-radius: 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #000;
    color: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
}

.alert-enter,
.alert-leave-to {
    opacity: 0;
}

.alert-enter-active,
.alert-leave-active {
    transition: all 2s;
}
</style>
