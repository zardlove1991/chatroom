<template>
  <section class="container">
    <!--最外层容器-->
    <Header />
    <Flex class="left-aside">
      <section class="menu">
        <!--左边的容器-->
        <Menu :list="list" />
      </section>
      <section class="content-container">
        <router-view />
      </section>
    </Flex>
  </section>
</template>
<script>
import Menu from "./Menu.vue";
import Header from "./Header.vue";
import member from "@/config/member/menu.json";
import memberManage from '@/config/memberManage/menu.json';
export default {
    data() {
      return {
      };
    },
    mounted() {
      console.log(this.$router);
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      list () {
        const path = this.$route.path.split('/')[1];
        if (path == 'memberManage') {
          return memberManage.list;
        } else if (path == 'member'){
          return member.list;
        }
      }
    },
    components: {
        Menu,
        Header
    }
};
</script>

<style lang="scss" scoped>
  .content-container {
    width: calc(100vw - 200px);
    height: calc(100vh - 60px);
    overflow-y:auto;
    background-color:#fff;
  }
</style>