// const WechatInfo={
//   appid:'wx42a847bd1abb72e6', // 公众号的唯一标识
//   appSecret:'5ca27721335bb0d6573f731616d88a45', //
//   redirect_uri:'http://127.0.0.1:5555',// 'http://www.lenjee.com/index.html', // 授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
//   response_type:'code', // 返回类型，请填写 code
//   scope:'snsapi_userinfo', // 应用授权作用域， snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
//   state:'STATE', // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
//   code:'', // 用户同意授权，获取code
//   openid:'', // 用户的唯一标识
//   token:'',  // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
// };
//
// const WechatUsrInfo = {
//   openid:'', // 	用户的唯一标识
//   nickname:'', // 	用户昵称
//   sex:'', // 	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
//   province:'', // 	用户个人资料填写的省份
//   city:'', // 	普通用户个人资料填写的城市
//   country:'', // 	国家，如中国为CN
//   headimgurl:'', // 	用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
//   privilege:'', // 	用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
// }
//
// getWeiXinCode(){ // 用户同意授权，获取code
//   let wxUrl='https://open.weixin.qq.com/connect/oauth2/authorize?'
//               +'appid='+this.wxInfo.appid
//               +'&redirect_uri='+ Common.url.encode(this.wxInfo.redirect_uri)
//               +'&response_type='+ this.wxInfo.response_type
//               +'&scope='+ this.wxInfo.scope
//               +'&state='+ this.wxInfo.state
//               +'#wechat_redirect';
//
//   console.log("wxUrl: ",wxUrl);
//   window.location.href = wxUrl;
// },
// getWeiXinToken(code){ // 用户同意授权，获取code
//   console.log(" >>>>>> 通过code换取网页授权access_token");
//
//   let wxUrl='https://api.weixin.qq.com/sns/oauth2/access_token?'
//               + 'appid=' + this.wxInfo.appid  // 公众号的唯一标识
//               + '&secret=' + this.wxInfo.appSecret // 公众号的appsecret
//               + '&code=' + code // 填写第一步获取的code参数
//               + '&grant_type=authorization_code';
//
//    GetWxInfo(this,wxUrl,(res)=>{
//      console.log('getWeiXinToken -> 返回值 : ', res );
//      let rtnObj= res.data;
//      this.wxInfo.token = rtnObj.access_token;
//      this.wxInfo.openid = rtnObj.openid;
//      // 获取用户信息
//      this.getWeiXinUserInfo(rtnObj.access_token,rtnObj.openid);
//    });
//
// },
// refreshWeiXinCode(){ //  刷新access_token (如果需要
//   console.log(" >>>>>> 刷新access_token (如果需要)");
//   // this.getWeiXinUserInfo();
// },
// getWeiXinUserInfo(token,openid){ //  拉取用户信息(需scope为 snsapi_userinfo)
//   console.log(" >>>>>> 拉取用户信息(需scope为 snsapi_userinfo)");
//   console.log('token: ',token," openid: ",openid);
//
//   let wxUrl='https://api.weixin.qq.com/sns/userinfo?'
//               + 'access_token=' + token // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
//               + '&openid=' + openid // 用户的唯一标识
//               + '&lang=zh_CN';
//
//   GetWxInfo(this,wxUrl,(res)=>{
//     console.log('getWeiXinUserInfo -> 返回值 : ', res );
//     this.wxUsrInfo=res.data;
//     // 将微信信息记录到 localstorage
//     Cache.localStorage.set("wxInfo",JSON.stringify(this.wxInfo));
//     // 将用户信息记录到 localstorage
//     Cache.localStorage.set("wxUsrInfo",JSON.stringify(this.wxUsrInfo));
//   });
// },
