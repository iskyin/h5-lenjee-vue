/**
 * @author lenjee (lenjee@outlook.com)
 * @website www.lenjee.c
 * InitAppInfo 初始化APP信息
 *    接受参数：
 *    {
 *      serverName:'dev', // 服务器环境
 *      version:'00.00.0001', // 版本信息
 *      docWidth:750, // 设计图宽度
 *    }
 * 全局变量 __APPINFO__
**/
import { setRem } from './src/rem';
import { setHost } from './src/host';
import { getPlatform } from './src/platform';
class InitAppInfo {
  constructor(initInfo) {
    window.__APPINFO__={
      host:'', // 接口地址
      version:initInfo.version , // 设置版本号
      platform:'', // 系统平台信息
      width:initInfo.version, // 设计图宽度
    };
    // 把视觉稿中的px转换成rem
    setRem(window,initInfo.docWidth);
    // 设置 接口地址
    window.__APPINFO__.host = setHost(initInfo.serverName);
    // 获取系统信息
    window.__APPINFO__.platform = getPlatform();

    console.log('window.__APPINFO__ -> : ',window.__APPINFO__);
  }
}
export default InitAppInfo
