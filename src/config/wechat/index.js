/**
 * 微信相关验证
 */

// 缓存
import Cache from '@/util/cache';
// 公共方法
import Common from '@/util/common';
// 配置信息
import wxInfo from './src/config';
// code
import { GetWeiXinCode } from './src/code';
import { GetWeiXinToken } from './src/token';



/**
 * 配置微信相关信息
 * @return {[type]} [description]
 */
const ConfigWechat=function(self){
  console.log(" >>>>>> 初始化微信相关信息 <<<<<< ");

  let cacheWxInfo= Cache.localStorage.get("wxInfo") ;

  console.log('cacheWxInfo ----> ',cacheWxInfo);

  if(cacheWxInfo == null || cacheWxInfo==undefined || cacheWxInfo=="" ){

    let code=self.$route.query.code;
    console.log('code --> ',code);

    if(code==undefined||code==null){ // 获取 code
      GetWeiXinCode(wxInfo);
    }else{
      wxInfo.code=code;
      wxInfo.state=self.$route.query.state;
      // 记录 缓存
      Cache.localStorage.set("wxInfo",JSON.stringify(wxInfo));
      GetWeiXinToken(code,wxInfo);
    }

  }else{

    // wxInfo=JSON.parse(cacheWxInfo);
    // checkToken();

  }
}


 export default ConfigWechat
