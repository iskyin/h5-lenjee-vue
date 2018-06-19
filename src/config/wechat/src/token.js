import ajax from '@/config/ajax';
/**
 * 获取token
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
 export function GetWeiXinToken(code,wxInfo){ // 用户同意授权，获取code
  let wxUrl='https://api.weixin.qq.com/sns/oauth2/access_token?'
              + 'appid=' + wxInfo.appid  // 公众号的唯一标识
              + '&secret=' + wxInfo.appSecret // 公众号的appsecret
              + '&code=' + code // 填写第一步获取的code参数
              + '&grant_type=authorization_code';

   console.log("通过 code 换取网页授权 access_token wxUrl :",wxUrl);

   this.$ajax.get(uri, {
       params:data,
   }).then(function (response) {
       console.log(' ---------- 请求成功 ---------- ');
       callback(response);
   }).catch(function (error) {
       console.log(' ---------- 失败 ---------- ');
       console.log("报错: ",error);
       callback(error);
   });

   ajax.axios.get.bare(wxUrl,'',(res)=>{
     console.log('getWeiXinToken -> 返回值 : ', res );
     let rtnObj= res.data;
     wxInfo.token = rtnObj.access_token;
     wxInfo.openid = rtnObj.openid;
     // 获取用户信息
     // this.getWeiXinUserInfo(rtnObj.access_token,rtnObj.openid);
     // 获取js ticket
     // this.getJsTicket(rtnObj.access_token);
   });

}
