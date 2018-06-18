
/**
 * 编码
 * @param       {[type]} str [description]
 * @return
 */
const UrlEncode = function (str) {
  let ret=encodeURI(str);
  return ret;
}

/**
 * 解码
 * @param       {[type]} str [description]
 * @return
 */
const UrlDecode = function (str) {
  let ret=decodeURI(str);
  return ret;
}

export default {
  encode:UrlEncode,
  decode:UrlDecode
}
