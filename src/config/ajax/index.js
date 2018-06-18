/**
 * get/post请求
 * @type {String}
 */
// import fetch_get from './fetch/get.js';
import axios_get from './axios/get.js';
import axios_post from './axios/post.js';
export default {
  // fetch:{
  //   get:get,
  //   getBare:getBare,
  // }
  axios:{
    get:axios_get,
    post:axios_post,
  },
}
