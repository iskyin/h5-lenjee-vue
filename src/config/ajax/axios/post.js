/**
 * get请求
 * @param  {[type]} uri 接口相对地址
 * @return {[type]}     请求结果
 */
const post =  function (uri,data,callback) {
  console.log("get ->  uri: ",uri," data: ",data);

  this.$ajax.get(uri, data)
  .then(function (response) {

      console.log('返回值 : ', response );
      callback(response);

  }).catch(function (error) {

      console.log("报错: ",error);
      callback(error);

  });

}

/**
 *  post 请求 带header内容
 * @param  {[type]} uri 接口相对地址
 * @return {[type]}     请求结果
 */
const postHeader = function (uri,data,callback){
  let URL = window.__APPINFO__.HOST + encodeURI(encodeURI(uri));
  console.log('get请求 不带header内容 ： host ',window.__APPINFO__.HOST , 'URL ',URL);

  this.$ajax.get(uri, data,
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(function (response) {

      console.log('返回值 : ', response );
      callback(response);

  }).catch(function (error) {

      console.log("报错: ",error);
      callback(error);

  });


}

export default {
  post,
  postHeader,
}
