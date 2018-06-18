<template>
  <div class="list">
    <img src="@/assets/img/banner2.jpg" alt="">
    <div class="rp-list">
        <div @click="toReport('国土资源',$event)" class="rp-el gz">
          <p>国土资源</p>
        </div>
        <div @click="toReport('环境保护',$event)" class="rp-el hb ">
          <p>环境保护</p>
        </div>
        <div @click="toReport('食药安全',$event)" class="rp-el ya">
          <p>食药安全</p>
        </div>
        <div @click="toReport('国有财产',$event)" class="rp-el gc">
          <p>国有财产</p>
        </div>
        <div @click="toReport('更多',$event)" class="rp-el gd">
          <p>更多</p>
        </div>
        <div class="rp-el">
          <!-- <p>更多</p> -->
        </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'Skyin-List',
  data () {
    return {

    }
  },
  methods: {
    toReport(el,e){
      console.log("el: ",el," e: ",e);
      this.$router.push({
        path: '/detail',
        query: {
          "el":el
        }
      });
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
