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
   .then(function (response) {
       console.log(' ------------ 请求成功 ------------- ');
       callback(response);
   }).catch(function (error) {
       console.log("报错: ",error);
       callback(error);
   });

 }

 export function AjaxGetObj (self , url , data , callback){
   console.log("### get obj 请求链接 -> ",url);
   self.$ajax.get(url,{
     params:data // 请求参数
   })
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
    self.$ajax.post(url,data,{
      headers:{
        'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
      }
    })
    .then(function (response) {
      console.log(' ------------ 请求成功 ------------- ');
      callback(response);
    })
    .catch(function (error) {
      console.log("报错: ",error);
      callback(error);
    });

  // // 将请求数据转换为form-data格式
  // // 这里不用qs，用FormData也可以，不赘述
  // let _data = qs.stringify(data);
  //
  // self.$ajax.post(url, _data,{
  //   headers: {
  //    'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // })
  // .then(function (response) {
  //   console.log(' ------------ 请求成功 ------------- ');
  //   callback(response);
  // })
  // .catch(function (error) {
  //   console.log("报错: ",error);
  //   callback(error);
  // });

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
      "Content-Type":" application/json"
    }
  })
  .then(function (response) {
    console.log(' ------------ 请求成功 ------------- ');
    callback(response);
  })
  .catch(function (error) {
    console.log("报错: ",error);
    callback(error);
  });

}
