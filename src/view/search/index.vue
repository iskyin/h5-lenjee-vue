<template>
  <div class="search">
    <div class="search-head">
      <img src="@/assets/img/banner1.jpg" alt="">
    </div>

    <yd-cell-group class="phoneNum">
        <yd-cell-item>
            <span slot="left">手机号码：</span>
            <yd-input slot="right" v-model="searchPhoneNum" required :show-success-icon="false" :show-error-icon="false" regex="mobile" placeholder="请输入手机号码"></yd-input>
        </yd-cell-item>
    </yd-cell-group>

    <div @click="toSearch" class="btn">
      举报查询
    </div>
  </div>
</template> 举报查询

<script type="text/babel">
export default {
  name: 'Skyin-Search',
  data () {
    return {
      searchPhoneNum:''
    }
  },
  methods: {
    toSearch(){
      console.log("---> ",this.searchPhoneNum);
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
