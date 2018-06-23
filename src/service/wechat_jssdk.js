// get 请求
import {  AjaxGet } from '@/service/ajax.js';
// 注册 js-sdk
export function RegistJsSdk(_this,lcUrl){ // 注册 JS-SDK
  console.log("********** 注册 JS-SDK **********")
  let self=_this;
  // let appUrl=window.__APPINFO__.host+"/home/auth/get_sign?url="+window.location.href;
  let signUrl=window.__APPINFO__.host+'/home/auth/get_sign?'
  +"url="+lcUrl;
  console.log("registJsSdk -> ",signUrl);

  AjaxGet(self,signUrl,(res)=>{
    console.log('getWxGign -> 返回值 : ', res );

    if(res.data.code==0){

        window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.result.appId, // 必填，公众号的唯一标识
            timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.result.nonceStr, // 必填，生成签名的随机串
            signature: res.data.result.sign,// 必填，签名
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'translateVoice',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'onVoicePlayEnd',
              'pauseVoice',
              'stopVoice',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'
            ] // 必填，需要使用的JS接口列表
        });


      }
  });
}
