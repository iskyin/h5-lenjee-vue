<template>
  <div class="select">
    <!-- Swiper -->
    <SwiperSpaceBetween></SwiperSpaceBetween>
    <div class="sel">
      <div @click="toReport" class="sel-btn blue">
        <img src="@/assets/img/ico-rl.png" alt="">
        <p>线索举报</p>
      </div>
      <div  @click="toSearch" class="sel-btn org">
        <img src="@/assets/img/ico-sc.png" alt="">
        <p>举报查询</p>
      </div>
      <div  @click=" " class="sel-btn gren">
        <img src="@/assets/img/ico-knlg.png" alt="">
        <p>公益诉讼常识</p>
      </div>
    </div>

    <div class="bottom">
      <p >
        copyright 2018 团风县人民检察院版权所有
      </p>
      <p >
        技术支持：湖北优尔易系统集成科技有限公司
      </p>
    </div>
  </div>
</template>

<script type="text/babel">

// 轮播图
import SwiperSpaceBetween from '@/components/swiper/space-between-100/index';

export default {
  name: 'SelectMenu',
  data () {
    return {

    }
  },
  components: {
    "SwiperSpaceBetween": SwiperSpaceBetween
  },
  methods: {
    toReport(){ // 举报
      this.$router.push("/list");
    },
    toSearch(){ // 查询
      this.$router.push("/search");
    },
    toRead(){ // 阅读
      this.$router.push("/gklg");
    },
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
