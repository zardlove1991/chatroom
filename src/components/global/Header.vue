<template>
  <Flex
    class="header"
    align-item="center"
    justify-content="space-between"
    :style="{ 'background': bgColor}"
  >
    <Flex
      class="logo"
      align-item="center"
    >
      <img
        src="images/logo.png"
        alt=""
        class="logo_left"
      >
      <img
        src="images/logo_text.png"
        alt=""
        class="logo_text"
      >
      <span
        class="vip"
        v-if="title"
      >{{ title }}</span>
    </Flex>
    <Flex
      class="right"
      align-item="center"
    >
      <el-avatar
        class="user_img"
        :src="avatar"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ real_name || member_mobile || userInfo.account }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginOut()">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </Flex>
  </Flex>
</template>

<script>
export default {
    data() {
        return {
            type: this.$route.path.split('/')[1],
            data: null,
            avatar: new URL('../../assets/images/sm_avatar.png', import.meta.url).href,
            real_name: '',
            member_avatar: '',
            member_mobile: '',
            id: '',
        };
    },
    props:{
        title: {
            type: String,
            default: ""
        },
        bgColor: {
            type: String,
            default: "#2468f2"
        }
    },
    created() {
        if (this.type == 'member' && !this.id) {
            this.getPersonalInfo();
        }
    },
    computed: {
        userInfo() {
            return JSON.parse(localStorage.getItem(`${this.type}UserInfo`));
        },
    },
    methods: {
        loginOut() {
            localStorage.removeItem(`${this.type}UserInfo`);
            this.$router.push({
                name: `${this.type}Login`
            });
        },
        getPersonalInfo() {
            this.$http("member/getPersonalInfo")({}).then((res) => {
                if (res.error_code == 0) {
                    this.data = res.result;
                }
                this.avatar = this.data.member_avatar,
                this.real_name = this.data?.info?.real_name ?? '';
                this.member_avatar = this.data.member_avatar;
                this.member_mobile = this.data.member_mobile || userInfo.account;
                this.id = this.data.id;
            });
        },
    },
};

</script>
<style lang='scss'>
    .header {
        height: 60px;
        width: 100%;
        // background: #2468f2;
        .logo {
            height: 100%;
            margin-left: 25px;
        }
        .logo_left {
            width: 36px;
            height: 36px;
            margin-right: 6.8px;
        }
        .logo_text {
            width: 123px;
        }
        .vip {
            width: 106px;
            height: 32px;
            background: url("images/vip@2x.png") no-repeat;
            background-size: 100% 100%;
            margin-left: 46.5px;
            line-height: 32px;
            text-align: center;
            font-size: 16px;
            color: #fff;
            padding-left: 16px;
        }
        .right {
            margin-right: 25px;
            .user_img {
                margin-right: 12.5px;
                width: 28px;
                height: 28px;
            }
            .el-dropdown-link {
                cursor: pointer;
                color: #409EFF;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
        }
    }
</style>