<template>
  <!-- 这个是主页面的公共区域 -->
  <!-- 公共样式也在这里写 -->

  <div class="container">
    <header class="index-header">
      <img src="../icon/arrow_left.svg" alt="" @click="goBack" />

      <span>。。</span>

      <img src="../icon/setting.svg" class="setting" alt="" />
    </header>

    <router-view></router-view>

    <transition name="broadside">
      <div class="tabs" v-show="tabs">
        <img :src="$store.state.wifePicture" />
        <p>{{ this.$store.state.meId }}</p>
        <ul>
          <li :class="{ tabActive: this.tabActive == '/home' ? true : false }">
            <img class="icon" src="../icon/list.svg" alt="" />
            <a href="#/home">Home</a>
          </li>
          <li :class="{ tabActive: this.tabActive == '/month' ? true : false }">
            <img class="icon" src="../icon/time.svg" alt="" />
            <a href="#/month">Month</a>
          </li>
          <li
            :class="{ tabActive: this.tabActive == '/setting' ? true : false }"
          >
            <img class="icon" src="../icon/setting.svg" alt="" />
            <a href="#/setting">Setting</a>
          </li>
          <li :class="{ tabActive: this.tabActive == '/about' ? true : false }">
            <img class="icon" src="../icon/user.svg" alt="" />
            <a href="#/about">about</a>
          </li>
        </ul>

        <div class="tab-bottom">
          <a href="https://github.com/AIR-ZRB">
            <img class="icon" src="../icon/social_github.svg" alt="" />
          </a>

          <a href>
            <img class="icon" src="../icon/social_sina.svg" alt="" />
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wife: this.$store.state.wife,
      tabs: false,
      tabActive: "/home",
    };
  },
  watch: {
    $route(to) {
      this.tabActive = to.path;
      console.log(to.path); //当前路由
    },
  },
  methods: {
    showBroadside() {
      this.tabs = !this.tabs;
    },
    nowClick() {
      let _this = this;
      document.addEventListener("click", (event) => {
        // tabs是否显示

        let clickNow = event.target.className;
        console.log(clickNow);
        if (clickNow == "setting" || clickNow == "tabs") {
          _this.tabs = true;
        } else {
          _this.tabs = false;
        }
      });
    },

    goBack() {
      window.history.go(-1);
    },
  },
  created() {
    this.nowClick();
  },
};
</script>

<style lang="scss">
$subjectColor: skyblue;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}
html,
body {
  width: 100%;
  // height: 100%;
  overflow-x: hidden;
}

.container {
  // 公共头部区域
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  // position: relative;
  padding: 0 0 50px 0;

  .index-header {
    width: 100%;
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .tabs {
    width: 250px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;

    padding-top: 20px;
    text-align: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    .icon {
      position: absolute;
      top: 10px;
      left: 20px;
      width: 30px;
      height: 30px;
    }

    p {
      padding-top: 5px;
      line-height: 50px;
      font-size: 18px;
      font-weight: 700;
    }

    ul {
      .tabActive {
        background: $subjectColor;
      }

      li {
        // padding: 10px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        overflow: hidden;

        position: relative;

        a {
          float: left;
          width: 100%;
          font-size: 18px;
          height: 100%;
          color: #000;
          text-decoration: none;
        }
      }
    }

    .tab-bottom {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 10px;
      display: flex;
      justify-content: center;
      a {
        display: block;
        width: 40px;
        height: 40px;
        margin-right: 20px;
      }
      .tabs-icon {
        width: 100%;
        height: 100%;
        position: static;
      }
    }
  }

  .broadside-enter,
  .broadside-leave-to {
    transform: translateX(-200px);
  }
  .broadside-enter-active,
  .broadside-leave-active {
    transition: all 0.5s;
  }
}
</style>
