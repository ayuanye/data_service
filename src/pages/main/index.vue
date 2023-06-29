<template>
  <div class="layout">
    <Layout class="layout-menu">
      <Sider
        class="computer-show"
        ref="side1"
        :width="250"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        v-show="showLeftMenu"
      >
        <r-menu :isCollapsed="isCollapsed" @sideRotate="sideRotate" />
      </Sider>
      <Layout style="z-index: 1">
        <Header class="layout-header-bar">
          <r-headNav
            style="width: 100%"
            :isCollapsed="isCollapsed"
            @sideRotate="sideRotate"
          />
          <div>
            <r-tag />
          </div>
        </Header>
        <br /><br />
        <Content :class="{ content: true }">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { Layout, Sider } from "view-design";
import tag from "./components/tag";
import leftMenu from "./leftMenu";
import headNav from "./headNav";
import { mapGetters } from "vuex";
export default {
  components: {
    "r-headNav": headNav,
    "r-menu": leftMenu,
    "r-tag": tag,
    Layout,
    Sider,
  },
  data() {
    return {
      isCollapsed: false,
      screenWidth: null,
    };
  },
  watch: {
    screenWidth: function (n, o) {
      if (n <= 1000) {
        this.isCollapsed = true;
      } else if (this.isCollapsed === false) {
        this.isCollapsed = false;
      }
    },
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      //屏幕尺寸变化
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
  computed: {
    ...mapGetters(["showLeftMenu"]),
  },
  methods: {
    sideRotate() {
      this.$refs.side1.toggleCollapse();
      this.screenWidthFlag = !this.screenWidthFlag;
    },
  },
};
</script>
<style lang="stylus" scoped>
@media screen and (max-width: 1000px) {
  .layout {
    height: 100%;
  }

  .layout-menu {
    height: 100%;
  }

  .computer-show {
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    background: transparent;
  }
}

.layout /deep/ .ivu-menu-dark {
  background: rgba(0, 0, 0, 0.3);
}

.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.layout-menu {
  height: 100%;

  .float-sider {
    position: absolute;
    height: 100%;
    opacity: 0.8;
    z-index: 99;
  }
}

.content {
  height: 100%;
  overflow-y: auto;
}

.nomenu-content {
  height: auto;
  margin: 20px 0 0 0;
}

.ivu-layout-header {
  padding: 0px;
}

.layout-header-bar {
  margin-bottom: 10px;
}
</style>
