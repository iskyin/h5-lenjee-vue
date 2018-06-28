<template>
  <div class="guide">
    <div class="img">
      <img src="@/assets/img/guide.jpg" alt="">
      <div class="next" @click="goSelect" ></div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: '',
  data () {
    return {

    }
  },
  methods: {
    goSelect:function(){
      this.$router.push('/select');
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
