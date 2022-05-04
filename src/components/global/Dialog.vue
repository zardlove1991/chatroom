<template>
  <div>
    <el-dialog
      :class="['modal', hide ? 'box-hide' : '']"
      :visible.sync="DialogVisible"
      :width="width"
      :custom-class="customClass"
      :close-on-click-modal="false"
    >
      <div 
        slot="title" 
        class="header-title"
      >
        <span class="title-name">{{ title }}</span>
      </div>
      <component
        :ref="`${name}-modal`"
        :is="name"
        v-if="name"
        :params.sync="params"
        :confirm-disabled.sync="confirmDisabled"
        :member-num.sync="memberNum"
        :visible.sync="DialogVisible"
        :resolve="resolve"
      />
      <Flex
        slot="footer"
        class="dialog-footer"
        :justify-content="position"
        v-if="footer.show"
      >
        <el-button
          class="cancel"
          @click="cancel()"
          v-if="cancelSetting.show"
        >
          {{
            cancelSetting.title
          }}
        </el-button>
        <el-button
          :disabled="confirmDisabled"
          :class="['confirm', { 'confirm-disabled': confirmDisabled }]"
          type="primary"
          v-if="confirmSetting.show"
          @click="confirm()"
        >
          {{ confirmSetting.title
          }}<span
            v-if="memberNum && !confirmDisabled && params.level == 1"
          >({{ memberNum }})</span>
        </el-button>
      </Flex>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DialogVisible: false,
      title: "提示",
      width: "600px",
      hide: false,
      name: "",
      customClass: "",
      params: {},
      memberNum: 0,
      position: "flex-end",
      cancelSetting: {
        show: true,
        title: "取 消",
      },
      confirmSetting: {
        show: true,
        title: "确 定",
      },
      footer: {
        show: true
      },
      confirmDisabled: false,
    };
  },
  methods: {
    cancel() {
      this.DialogVisible = false;
      if (this.cancelSetting?.onClick) {
        this.cancelSetting.onClick();
        return;
      }
      this.resolve({ type: "cancel", param: this.params });
    },
    async confirm() {
      if (this.customClass == "addMemberClass" && this.params.level == 1) {
        this.hide = true;
        setTimeout(() => {
          this.DialogVisible = false;
        }, 1000);
      } else {
        this.DialogVisible = false;
      }
      // 手动触发子组件的事件
      if (this.$refs[`${this.name}-modal`].beforeConfirm) {
        await this.$refs[`${this.name}-modal`].beforeConfirm();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.box-hide {
  display: none;
}
.modal {
  .confirm {
    @include defaultButton();
    // @include setGradient(315deg, #07b2ff, #037aff);
    background: #2468f2;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
  .confirm-disabled {
    opacity: 0.5;
  }
  .cancel {
    @include defaultButton();
    // background: #f6f6f6;
    // color: #666666;
    padding: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2468f2;
    background: #e7f0ff;
  }
  ::v-deep .el-form-item__label {
    color: #666666;
    font-size: $f14;
    margin-right: 31px;
  }
  ::v-deep .el-dialog {
    border-radius: 6px;
  }
  ::v-deep .el-dialog__footer {
    border-top: 1px solid #f6f6f6;
  }
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #e8ebf0;
    line-height: 57px;
    height: 57px;
    padding: 0 20px;
  }
  ::v-deep .el-dialog__title {
    font-size: $f16;
    color: #212d3f;
  }
}
</style>