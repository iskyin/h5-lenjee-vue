// 公共方法
import Common from '@/util/common';

export function GetWeiXinCode(wxInfo){ // 用户同意授权，获取code
  let wxUrl='https://open.weixin.qq.com/connect/oauth2/authorize?'
              +'appid='+wxInfo.appid
              +'&redirect_uri='+ Common.url.encode(wxInfo.redirect_uri)
              +'&response_type='+ wxInfo.response_type
              +'&scope='+ wxInfo.scope
              +'&state='+ wxInfo.state
              +'#wechat_redirect';
  console.log("wxUrl: ",wxUrl);
  window.location.href = wxUrl;
}
