<template>
  <div>
    <el-aside
      width="200px"
    >
      <el-menu
        background-color="rgb(249, 250, 252)"
        text-color="#333"
        active-text-color="#fff"
        :default-active="currentActive"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
        @select="select"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
        >
          <el-submenu 
            v-if="item.children"
            :index="item.routeName"
          >
            <template slot="title">
              <SvgIcon
                :name="item.active ? item.iconHover : item.icon"
                :width="17"
                :height="17"
                class="icon"
              />
              <span :style="{color: item.active ? '#2468F2': ''}">{{ item.title }}</span>
            </template>
            
            <div v-if="item.children">
              <el-menu-item-group
                v-for="(cItem, cIndex) in item.children"
                :key="cIndex + 'children'"
              >
                <i style="width:20px;height:100%;" />
                <el-menu-item :index="`${cItem.routeName}`">
                  <span style="margin-left:20px;">{{ cItem.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </div>
          </el-submenu>
          <el-menu-item 
            v-else 
            :index="`${item.routeName}`"
          >
            <SvgIcon
              :name="currentActive == item.routeName ? item.iconHover : item.icon"
              :width="17"
              :height="17"
              class="icon"
            />
            <span>{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    currentActive() {
      return this.$route.meta.active || this.$route.name;
    }
  },
  methods: {
    handleOpen(index) {
      this.$set(this.list[0], 'active' , 1 );
    },
    handleClose(index) {
      this.$set(this.list[0], 'active' , 0 );
    },
    select(e) {
      this.$set(this.list[0], 'active' , 1 );
      this.$router.push({ name: e });
    }
  }
};

</script>
<style lang='scss'>
  .el-aside {
    height: calc(100vh - 60px);
    .el-menu {
      height: 100%;
      .el-submenu {
        margin-left: 10px;
        .el-submenu__title {
          font-size: 21px;
          width: 180px;
          height: 40px;
          border-radius: 6px;
          font-size: 14px;
          margin-top: 10px;
          display: flex;
          align-items: center;
        }
      }
      .el-menu-item {
        width: 180px;
        height: 40px;
        border-radius:6px ;
        font-size: 14px;
        margin: 10px 0 10px 10px;
        display: flex;
        align-items: center;
        min-width: unset!important;
        &.is-active {
          background-color: #2468F2 !important;
        }
      }
      .el-menu-item-group {
        .el-menu-item {
          margin: 0 !important;
          line-height: 60px;
          padding-left: 30px !important;
        }
      }
    }
    .icon {
      margin-right: 14.5px;
    }
  }
</style>