<template>
  <keep-alive>
    <router-view class="router-view"/>
  </keep-alive>
</template>

<script type="text/babel">

// 初始化 公共配置
import initAppInfo from '@/config/app';
new initAppInfo({
  serverName:'mock', // 开发环境
  version:'00.00.0001', // 版本信息
  docWidth:750, // 设计图宽度
});

// 请求
import { GetWxInfo } from '@/service/index.js';

// 缓存
import SetCache from '@/util/cache';
// 公共方法
import Common from '@/util/common';



export default {
  name: 'App',
  data () {
    return {
      wxInfo:{
        appid:'wx3e138826635a57a3', // 公众号的唯一标识
        appSecret:'c6ee1310d1add71f65e463c312988c90', //
        redirect_uri:'http://119.29.230.189', // 授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
        response_type:'code', // 返回类型，请填写 code
        scope:'snsapi_userinfo', // 应用授权作用域， snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
        state:'STATE', // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
      },
      wxCode:'', // 用户同意授权，获取code
      wxState:'',
    }
  },
  created(){

    this.initWXInfo();

  },
  methods: {
    initWXInfo(){
      console.log("------ 初始化微信相关信息 ------");

      let code=this.$route.query.code;
      console.log('code --> ',code);

      if(code==undefined||code==null){ // 获取 code
        this.getWeiXinCode();
      }else{
        this.wxCode=code;
        this.wxState=this.$route.query.state;
        this.getWeiXinToken();
      }

      // 刷新 token
      // this.refreshWeiXinCode();
    },
    getWeiXinCode(){ // 用户同意授权，获取code
      let wxUrl='https://open.weixin.qq.com/connect/oauth2/authorize?'
                  +'appid='+this.wxInfo.appid
                  +'&redirect_uri='+ Common.url.encode(this.wxInfo.redirect_uri)
                  +'&response_type='+this.wxInfo.response_type
                  +'&scope='+this.wxInfo.scope
                  +'&state='+this.wxInfo.state
                  +'#wechat_redirect';

      console.log("wxUrl: ",wxUrl);
      window.location.href = wxUrl;
    },
    getWeiXinToken(){ // 用户同意授权，获取code
      console.log("> 通过code换取网页授权access_token");

      let wxUrl='https://api.weixin.qq.com/sns/oauth2/access_token?'
                  +'appid='+this.wxInfo.appid  // 公众号的唯一标识
                  +'&secret='+ this.wxInfo.appSecret // 公众号的appsecret
                  +'&code='+this.wxCode // 填写第一步获取的code参数
                  +'&grant_type=authorization_code';

       GetWxInfo(this,wxUrl,(res)=>{
          console.log('返回值 : ', res );
          let rtnObj={
            "access_token":"ACCESS_TOKEN",
            "expires_in":7200,
            "refresh_token":"REFRESH_TOKEN",
            "openid":"OPENID",
            "scope":"SCOPE"
          };
         // 获取用户信息
         this.getWeiXinUserInfo(rtnObj.access_token,rtnObj.openid);
       });

    },
    refreshWeiXinCode(){ //  刷新access_token (如果需要
      console.log("> 刷新access_token (如果需要)");
      this.getWeiXinUserInfo();
    },
    getWeiXinUserInfo(token,openid){ //  拉取用户信息(需scope为 snsapi_userinfo)
      console.log("> 拉取用户信息(需scope为 snsapi_userinfo)");
      let wxUrl='https://api.weixin.qq.com/sns/userinfo?'
                  +'access_token=' + token // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
                  +'&openid='+ openid // 用户的唯一标识
                  +'&lang=zh_CN';

      GetWxInfo(this,wxUrl,(res)=>{
        console.log('返回值 : ', res );
      });

    },

  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "../style/common/index.less";
</style>
