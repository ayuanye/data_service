<template>
  <div
    class="menu-wrapper"
    :style="{
      left: left,
      top: top,
      opacity: dropDownOpacity,
      transform: rotateX,
    }"
    ref="dropdown"
  >
    <ul class="menu-ul">
      <template v-if="menu.children">
        <li
          v-for="(item, index) in menu.children"
          :key="item.name"
          @mouseenter="iconHover($event, true, index)"
          @mouseleave="iconHover($event, false, index)"
          @click.stop="goto(item)"
        >
          <miniMenu
            :left="miniLeft"
            :top="miniTop"
            :dropDownOpacity="mOpacity[index]"
            :rotateX="mRotateX[index]"
            :menu="item"
            :key="item.name"
          />
          <span>
            <!-- {{item.meta.name}} -->
            {{ $t("main." + item.meta.globalName) }}
          </span>
          <Icon class="font" type="ios-arrow-forward" v-if="item.children" />
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { debounce } from "@/utils/tools";
import { mapGetters } from "vuex";
export default {
  name: "miniMenu",
  props: ["left", "dropDownOpacity", "rotateX", "menu", "top"],
  data() {
    return {
      miniLeft: "0",
      miniTop: "0",
      mOpacity: ["0"],
      mRotateX: ["rotateX(90deg)"],
    };
  },
  watch: {
    menu: {
      immediate: true,
      handler(val) {
        if (val && val.children) {
          let len = val.children.length;
          for (let i = 0; i < len; i++) {
            this.$set(this.mOpacity, i, "0");
            this.$set(this.mRotateX, i, "rotateX(90deg)");
          }
        }
      },
    },
    // 当鼠标移动至左侧菜单时主动关闭minimenu
    isLeftMenuHover(val) {
      for (let i = 0; i < this.mOpacity.length; i++) {
        if (this.mOpacity[i] !== "0") {
          this.closeMiniMenu(i);
        }
      }
    },
  },
  computed: {
    ...mapGetters(["isLeftMenuHover"]),
  },
  methods: {
    goto(item) {
      if (!item.children && this.$route.name !== item.name) {
        this.$router.push({
          name: item.name,
        });
      }
    },
    handleMiniHover(index) {
      if (this.menu.children) {
        for (let i = 0; i < this.menu.children.length; i++) {
          if (i !== index) {
            this.$set(this.mOpacity, i, "0");
            this.$set(this.mRotateX, i, "rotateX(90deg)");
          }
        }
      }
    },
    iconHover: debounce(function (ev, val, index) {
      let i = index;
      if (val) {
        this.handleMiniHover("handleMiniHover", index);
        this.$nextTick(() => {
          this.miniLeft = ev.target.offsetWidth + 2 + "px";
          this.miniTop = ev.target.offsetTop + "px";
          this.$set(this.mOpacity, i, "1");
          this.$set(this.mRotateX, i, "rotateX(0)");
        });
      } else {
        this.closeMiniMenu(i);
      }
    }, 300),
    closeMiniMenu(index) {
      this.$set(this.mOpacity, index, "0");
      this.$set(this.mRotateX, index, "rotateX(90deg)");
    },
  },
};
</script>
<style lang="stylus" scoped>
.menu-wrapper {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  transition: 0.5s;
  border-radius: 2px;
  transform-origin: top center;

  li {
    position: relative;
    border-bottom: 1px solid #ccc;
    height: 40px;
    padding: 0 10px;
    white-space: nowrap;
    color: white;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 150px;

    &:hover {
      background: #666;
    }

    .font {
      margin-left: 50px;
    }
  }
}
</style>
