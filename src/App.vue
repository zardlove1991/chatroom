<template>
  <div id="app">
    <!-- <button @click="haha()">点击</button> -->
    <router-view />
  </div>
</template>


<script>
export default {
  data() {
    return {
    };
  },
  beforeCreate() {
  },
  created() {

  },
  mounted() {

  },
  methods: {
    haha() {
      // this.$openModal({
      //   name: 'Ha',
      //   title: '帅哥是我',
      //   params: this.data
      // }).then((res) => {
      //   console.log(res);
      // });
    },
  }
};

</script>
<style lang='scss'>
</style>
