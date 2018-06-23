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
import {  AjaxPostJson } from '@/service/ajax.js';
// 缓存
import Cache from '@/util/cache';
export default {
  name: 'Skyin-Search',
  data () {
    return {
      searchPhoneNum:'',
    }
  },
  methods: {
    toSearch(){
      if(this.searchPhoneNum==""){
        this.$dialog.toast({
            mes: '请输入手机号',
            timeout: 1500,
            icon: 'error',
        });
        return;
      }

      let self=this;
      console.log("---> ",this.searchPhoneNum);
      // 获取cookie
      let ck_openid=Cache.cookie.get("openid");
      let ck_ticket=Cache.cookie.get("ticket");

      let appUrl=window.__APPINFO__.host+"/home/cms/get_list";

      let data={
        "openid":ck_openid,
      	"phone":this.searchPhoneNum,
      	"ticket":ck_ticket
      };

      AjaxPostJson(self,appUrl,data,(res)=>{
        console.log('toSearch -> 返回值 : ', res );

        if(res.data.code==0){
          if(res.data.result.list.length==0){
            self.$router.push("/nodata");
          }else{
            Cache.localStorage.set('myList',JSON.stringify(res.data.result.list));
            self.$router.push('/mylist');
          }
        }

      });

    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
