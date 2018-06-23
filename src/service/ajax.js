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
   console.log("### get 请求链接 -> ",url);
   self.$ajax.get(url)
   .then((response)=>{
     console.log(' ------------ 请求成功 ------------- ');
     callback(response);
   })
   .catch((error)=>{
     console.log("报错: ",error);
     callback(error);
   });
 }

 /**
  * get 请求 带参数
  * @param       {[type]}   self     [description]
  * @param       {[type]}   url      [description]
  * @param       {Function} callback [description]
  * @constructor
  */
 export function AjaxGetObj (self , url , data , callback){
   console.log("### get obj 请求链接 -> ",url);
   self.$ajax.get(url,{
     params:data // 请求参数
   })
   .then((response)=>{
     console.log(' ------------ 请求成功 ------------- ');
     callback(response);
   })
   .catch((error)=>{
     console.log("报错: ",error);
     callback(error);
   });
 }

/**
 * post json
 * npm install axios的时候默认会安装qs
 * qs相关的问题请搜索"nodejs qs"或者看这里https://www.npmjs.com/package/qs
 * @param       {[type]}   self     [description]
 * @param       {[type]}   url      [description]
 * @param       {[type]}   data     [description]
 * @param       {Function} callback [description]
 * @constructor
 */
export function AjaxPostJson (self , url ,data, callback){
  console.log("### post json 请求链接 -> ",url);
  self.$ajax.post(url, data,{
    headers: {
      'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
  .then((response)=>{
    console.log(' ------------ 请求成功 ------------- ');
    callback(response);
  })
  .catch((error)=>{
    console.log("报错: ",error);
    callback(error);
  });
}

import qs from 'qs';
/**
 * post from 表单
 * npm install axios的时候默认会安装qs
 * qs相关的问题请搜索"nodejs qs"或者看这里https://www.npmjs.com/package/qs
 * @param       {[type]}   self     [description]
 * @param       {[type]}   url      [description]
 * @param       {[type]}   data     [description]
 * @param       {Function} callback [description]
 * @constructor
 */
export function AjaxPostForm (self , url ,data, callback){
    console.log("### post from 请求链接 -> ",url," data : ",data);
    self.$ajax.post(url,data,{headers: {'Content-Type': 'multipart/form-data'}})
    .then((response)=>{
      console.log(' ------------ 请求成功 ------------- ');
      callback(response);
    })
    .catch((error)=>{
      console.log("报错: ",error);
      callback(error);
    });

}
