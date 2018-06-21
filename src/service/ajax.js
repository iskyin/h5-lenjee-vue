/**
 * 微信 涉及 接口
 */

 /**
  * get 请求
  * @param       {[type]}   self     [description]
  * @param       {[type]}   url      [description]
  * @param       {Function} callback [description]
  * @constructor
  */
 export function AjaxGet (self , url , callback){

   self.$ajax.get(url)
   .then(function (response) {
       console.log(' ------------ 请求成功 ------------- ');
       callback(response);
   }).catch(function (error) {
       console.log("报错: ",error);
       callback(error);
   });

 }

import qs from 'qs';
/**
 * npm install axios的时候默认会安装qs
 * qs相关的问题请搜索"nodejs qs"或者看这里https://www.npmjs.com/package/qs
 * @param       {[type]}   self     [description]
 * @param       {[type]}   url      [description]
 * @param       {[type]}   data     [description]
 * @param       {Function} callback [description]
 * @constructor
 */
export function AjaxPost (self , url ,data, callback){

  // 将请求数据转换为form-data格式
  // 这里不用qs，用FormData也可以，不赘述
  let _data = qs.stringify(data);

  self.$ajax.post(url, _data,{
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(function (response) {
    console.log('返回值 : ', response );
    callback(response);
  })
  .catch(function (error) {
    console.log("报错: ",error);
    callback(error);
  });

}
