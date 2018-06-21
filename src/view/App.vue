<template>
  <keep-alive>
    <router-view class="router-view"/>
  </keep-alive>
</template>

<script type="text/babel">

// 初始化 公共配置
import initAppInfo from '@/config/app';
new initAppInfo({
  serverName:'dev', // 开发环境
  version:'00.00.0001', // 版本信息
  docWidth:750, // 设计图宽度
});

// 请求
import {  AjaxGet } from '@/service/ajax.js';
// 注册 js-sdk
import { RegistJsSdk } from '@/service/wechat_jssdk.js';
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

    this.initWXInfo();

  },
  methods: {
    initWXInfo(){
      RegistJsSdk(this);
    },
    userCookie(code){ // 验证cookie

      let appUrl=window.__APPINFO__.host+"/home/auth/check_auth_code?code="+code;
      console.log("userCookie -> ",appUrl);

      AjaxGet(this,appUrl,(res)=>{
        console.log('userCookie -> 返回值 : ', res );
      });

    },
    userToken(openid,ticket){
      let appUrl=window.__APPINFO__.host+" /home/auth/get_token?openid="
                +openid+"&ticket="
                +ticket+"&oepnid="
                +code;
      console.log("userCookie -> ",appUrl);

      AjaxGet(this,appUrl,(res)=>{
        console.log('userCookie -> 返回值 : ', res );
      });
    },
    getWeiXinCode(){ // 用户同意授权，获取code
      let wxUrl='https://open.weixin.qq.com/connect/oauth2/authorize?'
                  +'appid='+this.wxInfo.appid
                  +'&redirect_uri='+ Common.url.encode(this.wxInfo.redirect_uri)
                  +'&response_type='+ this.wxInfo.response_type
                  +'&scope='+ this.wxInfo.scope
                  +'&state='+ this.wxInfo.state
                  +'#wechat_redirect';
      console.log("wxUrl: ",wxUrl);
      window.location.href = wxUrl;
    },

  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "../style/common/index.less";
</style>
