/**
 * 设置 接口地址 + 系统版本号
 * @param hostName 接口名称
**/
export function setHost(hostName){
  let hostIP=''
  switch (hostName) {
    case 'local': // 本地数据模拟
      hostIP='api';
    break;
    case 'dev': // 开发 服务器 地址
      hostIP='http://119.29.230.189';
      break;
    case 'test': // 测试 服务器 地址
      hostIP='';
      break;
    case 'prod': // 生产 服务器 地址
      hostIP='http://wxapi.hgfdcscxx.com';
      break;
    default:
      hostIP='http://error';
  }
  // 配置 服务器地址
  return hostIP ;
}
