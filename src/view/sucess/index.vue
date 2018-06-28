<template>
  <div class="sucess">
    <div @click='goback()' class="goback">
      返回主页
    </div>
    <img src="@/assets/img/sucess.jpg" alt="">
  </div>
</template>

<script type="text/babel">
export default {
  name: 'Skyin-Sucess',
  data () {
    return {

    }
  },
  methods: {
    goback:function(){
      this.$router.push("/select");
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
