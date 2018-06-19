/**
 * 微信信息
 * @type {String}
 */
export default {
  appid:'wx42a847bd1abb72e6', // 公众号的唯一标识
  appSecret:'5ca27721335bb0d6573f731616d88a45', //
  redirect_uri:'http://127.0.0.1:5555',// 'http://www.lenjee.com/index.html', // 授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
  response_type:'code', // 返回类型，请填写 code
  scope:'snsapi_userinfo', // 应用授权作用域， snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
  state:'STATE', // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
  code:'', // 用户同意授权，获取code
  openid:'', // 用户的唯一标识
  token:'',  // 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
  refresh_token:'',  // 	用户刷新access_token
  ticket:'', // jsapi_ticket是公众号用于调用微信JS接口的临时票据
}
