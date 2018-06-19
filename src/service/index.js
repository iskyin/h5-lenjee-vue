/**
 * 微信 涉及 接口
 */

 /**
  * 通过code换取网页授权access_token
  * @param  {[type]} param [description]
  * @return {[type]}       [description]
  */
 export function GetWxInfo (self , url , callback){

   self.$ajax.get(url)
   .then(function (response) {
       console.log(' ------------ 请求成功 ------------- ');
       callback(response);
   }).catch(function (error) {
       console.log("报错: ",error);
       callback(error);
   });

 }
