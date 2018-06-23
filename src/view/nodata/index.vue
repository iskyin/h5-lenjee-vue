<template>
  <div class="nodata">
    <div @click='goback()' class="goback">
      返回主页
    </div>
    <img src="@/assets/img/nodata.jpg" alt="">
  </div>
</template>

<script type="text/babel">
export default {
  name: 'Skyin-NoData',
  data () {
    return {

    }
  },
  methods: {
    goback(){
      this.$router.push("/select");
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
