/**
 * get/post请求
 * @type {String}
 */
// import fetch_get from './fetch/get.js';
import { bare , head } from './axios/get.js';
import axios_post from './axios/post.js';
export default {
  // fetch:{
  //   get:get,
  //   getBare:getBare,
  // }
  axios:{
    get:{
      bare,
      head
    },
    post:axios_post,
  },
}
