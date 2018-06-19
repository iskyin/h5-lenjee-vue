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
        appid:'wxd3483bd0cad2091c', // 'wx42a847bd1abb72e6', // 公众号的唯一标识
        appSecret:'779661c0da3da1a023c9c10d4b3f9ef5',// '5ca27721335bb0d6573f731616d88a45', //
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

        if(code==undefined||code==null){ // 获取 code
          this.getWeiXinCode();
        }else{

          // 注册 JS-SDK
          this.registJsSdk();

          let ck_openid=Cache.cookie.get("openid");
          console.log('ck_openid : ',ck_openid);

          if(ck_openid==undefined||ck_openid==null){
            this.userCookie(code);
          }

          // this.wxInfo.code=code;
          // this.wxInfo.state=this.$route.query.state;
          // this.getWeiXinToken(code);

        }

      }else{

        this.wxInfo=JSON.parse(cacheWxInfo);
        this.checkToken();

      }

    },
    registJsSdk(){ // 注册 JS-SDK
      let self=this;
      let appUrl=window.__APPINFO__.host+"/home/auth/get_sign?url="+window.location.href;
      console.log("registJsSdk -> ",appUrl);

      AjaxGet(this,appUrl,(res)=>{
        console.log('getWxGign -> 返回值 : ', res );

        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: self.wxInfo.appid, // 必填，公众号的唯一标识
            timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.result.nonceStr, // 必填，生成签名的随机串
            signature: res.data.result.sign,// 必填，签名
            jsApiList: ['chooseImage','previewImage','uploadImage','getLocalImgData','openLocation','getLocation'] // 必填，需要使用的JS接口列表
        });

        // wx.ready(function(){
        //   console.log('wx.ready ', res );
        //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        // });
        //
        // wx.error(function(res){
        //   console.log('wx.error ', res );
        //   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        // });


      });
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
