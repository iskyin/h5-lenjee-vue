<template>
  <div class="list">
    <img src="@/assets/img/banner2.jpg" alt="">
    <div class="rp-list">
        <div @click="toReport('国土资源')" class="rp-el gz">
          <p>国土资源</p>
        </div>
        <div @click="toReport('环境保护')" class="rp-el hb ">
          <p>环境保护</p>
        </div>
        <div @click="toReport('食药安全')" class="rp-el ya">
          <p>食药安全</p>
        </div>
        <div @click="toReport('国有财产')" class="rp-el gc">
          <p>国有财产</p>
        </div>
        <div @click="toReport('更多')" class="rp-el gd">
          <p>更多</p>
        </div>
        <div class="rp-el">
          <!-- <p>更多</p> -->
        </div>
    </div>
  </div>
</template>

<script type="text/babel">
// 缓存
import Cache from '@/util/cache';

export default {
  name: 'Skyin-List',
  data () {
    return {

    }
  },
  methods: {
    toReport:function(el){
      console.log("el: ",el);
      Cache.localStorage.set('type',el);
      console.log(this.$router);
      this.$router.push('/detail');
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
