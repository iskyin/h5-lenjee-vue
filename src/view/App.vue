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
import {  AjaxGet } from '@/service/index.js';
// 缓存
import Cache from '@/util/cache';
// 公共方法
import Common from '@/util/common';

export default {
  name: 'App',
  data () {
    return {
      wxInfo:{
        appid:'wx3e138826635a57a3', // 'wx42a847bd1abb72e6', // 公众号的唯一标识
        appSecret:'c6ee1310d1add71f65e463c312988c90',// '5ca27721335bb0d6573f731616d88a45', //
        redirect_uri:'http://127.0.0.1:5555',// 'http://www.lenjee.com/index.html', // 授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
        response_type:'code', // 返回类型，请填写 code
        scope:'snsapi_userinfo', // 应用授权作用域， snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
        state:'STATE', // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
        code:'', // 用户同意授权，获取code
        openid:'', // 用户的唯一标识
        token:'',  // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
        refresh_token:'',  // 	用户刷新access_token
        ticket:'', // jsapi_ticket是公众号用于调用微信JS接口的临时票据
      },
      wxUsrInfo:{
        openid:'', // 	用户的唯一标识
        nickname:'', // 	用户昵称
        sex:'', // 	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
        province:'', // 	用户个人资料填写的省份
        city:'', // 	普通用户个人资料填写的城市
        country:'', // 	国家，如中国为CN
        headimgurl:'', // 	用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
        privilege:'', // 	用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
      }
    }
  },
  created(){

    this.initWXInfo();

  },
  methods: {
    initWXInfo(){

      let cacheWxInfo= Cache.localStorage.get("wxInfo") ;
      console.log('cacheWxInfo ----> ',cacheWxInfo);
      if(cacheWxInfo == null || cacheWxInfo==undefined || cacheWxInfo=="" ){
        let code=this.$route.query.code;
        console.log('code --> ',code);

        let ck_openid=Cache.cookie.get("openid");
        console.log('ck_openid : ',ck_openid);

        if(ck_openid==undefined||code==null){
          this.userCookie(code);
        }

        // if(code==undefined||code==null){ // 获取 code
        //   this.getWeiXinCode();
        // }else{
        //   this.wxInfo.code=code;
        //   this.wxInfo.state=this.$route.query.state;
        //   this.getWeiXinToken(code);
        // }

      }else{

        this.wxInfo=JSON.parse(cacheWxInfo);
        this.checkToken();

      }

    },
    checkToken(){ // 检验token是否有效
      let wxUrl='https://api.weixin.qq.com/sns/auth?'
                  + 'access_token=' + this.wxInfo.token // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
                  + '&openid=' + this.wxInfo.openid;
       AjaxGet(this,wxUrl,(res)=>{
          console.log('checkToken -> 返回值 : ', res );
          if(res.data.errcode==0){
            console.log("token 有效");
            this.getJsTicket(this.wxInfo.token);
            // this.refreshWeiXinCode();
          }else{
            Cache.localStorage.set("wxInfo",'');
            this.$router.go(0);
          }
        });
    },
    userCookie(code){ // cookie 不存在时调用此接口
      console.log("cookie 不存在时调用此接口 -> ");
      let appUrl=window.__APPINFO__.host+"/home/auth/check_auth_code?code="+code;
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
    getWeiXinToken(code){ // 用户同意授权，获取code
      console.log(" >>>>>> 通过code换取网页授权access_token");

      let wxUrl='https://api.weixin.qq.com/sns/oauth2/access_token?'
                  + 'appid=' + this.wxInfo.appid  // 公众号的唯一标识
                  + '&secret=' + this.wxInfo.appSecret // 公众号的appsecret
                  + '&code=' + code // 填写第一步获取的code参数
                  + '&grant_type=authorization_code';

       AjaxGet(this,wxUrl,(res)=>{
       console.log('getWeiXinToken -> 返回值 : ', res );
       let rtnObj= res.data;
       this.wxInfo.token = rtnObj.access_token;
       this.wxInfo.openid = rtnObj.openid;
       // 获取用户信息
       // this.getWeiXinUserInfo(rtnObj.access_token,rtnObj.openid);
       // 获取js ticket
       this.getJsTicket(rtnObj.access_token);
      });

    },
    refreshWeiXinCode(){ //  刷新access_token (如果需要
      let wxUrl='https://api.weixin.qq.com/sns/oauth2/refresh_token?'
                  + 'appid=' + this.wxInfo.appid  // 公众号的唯一标识
                  + '&grant_type=refresh_token'
                  + '&refresh_token=' + this.wxInfo.refresh_token; // 填写通过access_token获取到的refresh_token参数

        AjaxGet(this,wxUrl,(res)=>{
         console.log('refreshWeiXinCode -> 返回值 : ', res );
         let rtnObj= res.data;
         this.wxInfo.token = rtnObj.access_token;
         this.wxInfo.refresh_token=rtnObj.refresh_token;
         this.wxInfo.openid = rtnObj.openid;
         // 获取用户信息
         // this.getWeiXinUserInfo(rtnObj.access_token,rtnObj.openid);
         // 获取js ticket
         this.getJsTicket(rtnObj.access_token);
       });
    },
    getWeiXinUserInfo(token,openid){ //  拉取用户信息(需scope为 snsapi_userinfo)
      let wxUrl='https://api.weixin.qq.com/sns/userinfo?'
                  + 'access_token=' + token // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
                  + '&openid=' + openid // 用户的唯一标识
                  + '&lang=zh_CN';

       AjaxGet(this,wxUrl,(res)=>{
        console.log('getWeiXinUserInfo -> 返回值 : ', res );
        this.wxUsrInfo=res.data;
        // 将微信信息记录到 localstorage
        Cache.localStorage.set("wxInfo",JSON.stringify(this.wxInfo));
        // 将用户信息记录到 localstorage
        Cache.localStorage.set("wxUsrInfo",JSON.stringify(this.wxUsrInfo));

      });
    },
    registSDK(){ // 通过config接口注入权限验证配置
      window.wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: this.wxInfo.appid, // 必填，公众号的唯一标识
          timestamp:'' , // 必填，生成签名的时间戳
          nonceStr: '', // 必填，生成签名的随机串
          signature: '',// 必填，签名
          jsApiList: [] // 必填，需要使用的JS接口列表
      });
    },
    getJsTicket(token){ // 获取 jsapi_ticket
      let wxUrl='https://api.weixin.qq.com/cgi-bin/ticket/getticket?'
                  + 'access_token=' + token // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
                  + '&type=jsapi';
       AjaxGet(this,wxUrl,(res)=>{
        console.log('getJsTicket -> 返回值 : ', res );

        this.wxInfo.ticket=res.data.ticket;
        // 将微信信息记录到 localstorage
        Cache.localStorage.set("wxInfo",JSON.stringify(this.wxInfo));

      });

    },
    getSignature(){ // 签名 算法

    }

  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "../style/common/index.less";
</style>
