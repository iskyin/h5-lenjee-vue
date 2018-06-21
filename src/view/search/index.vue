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
</template>

<script type="text/babel">
// get 请求
import {  AjaxGet, AjaxPost } from '@/service/ajax.js';
export default {
  name: 'Skyin-Search',
  data () {
    return {
      searchPhoneNum:'',
    }
  },
  methods: {
    toSearch(){
      let self=this;
      console.log("---> ",this.searchPhoneNum);

      let appUrl=window.__APPINFO__.host+"/home/cms/get_list";

      let data={
        "openid":"xx",
      	"phone":this.searchPhoneNum,
      	"ticket":"test_openidxxx"
      };

      AjaxPost(self,appUrl,data,(res)=>{
        console.log('toSearch -> 返回值 : ', res );
        self.searchPhoneNum = res.data.msg;

        if(res.data.code==0){

        }
      });



    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
