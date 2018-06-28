<template>
  <keep-alive>
    <router-view class="router-view"/>
  </keep-alive>
</template>

<script type="text/babel">

// 初始化 公共配置
import initAppInfo from '@/config/app';
new initAppInfo({
  serverName:'prod', // 接口环境
  version:'00.00.0001', // 版本信息
  docWidth:750, // 设计图宽度
});

// 请求
import {  AjaxGet , AjaxGetObj} from '@/service/ajax.js';
// 缓存
import Cache from '@/util/cache';
// 公共方法
import Common from '@/util/common';

export default {
  name: 'App',
  data () {
    return {

    }
  },
  created(){
    this.initPage();
  },
  methods: {
    initPage:function(){
      let time=Common.time.ymdhms();
      console.log('time --> : ',time);
      // 验证cookie
      let ck_cookie=Cache.cookie.get("openid");
      console.log(' ck_cookie --> ',ck_cookie);
      if(ck_cookie==null){
        this.userCookie(time);
      }

    },
    userCookie:function(time){ // 验证cookie
      let self=this;
      let appUrl=window.__APPINFO__.host+"/home/auth/check_auth_code?code="+time;

      AjaxGet(this,appUrl,(res)=>{
        console.log('userCookie -> 返回值 : ', res ,' -> ',res.data.code);

        if(res.data.code ==0 ){
          let resVal=res.data.result;
          Cache.cookie.set('head_img',resVal.head_img,365);
          Cache.cookie.set('nickname',resVal.nickname,365);
          Cache.cookie.set('openid',resVal.openid,365);
          Cache.cookie.set('ticket',resVal.ticket,365);
          // 获取token
          self.userToken(resVal.openid,resVal.ticket);
        }

      });

    },
    userToken:function(openid,ticket){
      let appUrl=window.__APPINFO__.host+"/home/auth/get_token?"
                 + "&openid=" + openid
                 + "&ticket=" + ticket;
      let data={
        openid:openid,
        ticket:ticket
      };
      AjaxGetObj(this,appUrl,data,(res)=>{
        console.log('userToken -> 返回值 : ', res );
        Cache.cookie.set('access_token',res.data.result.access_token,365);
      });
    }

  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "../style/common/index.less";
</style>
