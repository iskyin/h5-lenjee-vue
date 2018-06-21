
/**
 * 获取当前时间
 * @param       {[type]} str [description]
 * @return 年月日时分秒
 */
const getYmdhms = function (str) {
  let _date = new Date();//获取系统当前时间

  let _year = _date.getFullYear().toString(); //获取完整的年份(4位,1970-????)
  let _month = _date.getMonth()+1 ; //获取当前月份(0-11,0代表1月)
  let _day = _date.getDate().toString(); //获取当前日(1-31)
  let _hours = _date.getHours().toString(); //获取当前小时数(0-23))
  let _minu = _date.getMinutes().toString(); //获取当前分钟数(0-59)
  let _secd = _date.getSeconds().toString(); //获取当前秒数(0-59)

  return _year+_month+_day+_hours+_minu+_secd;
}

export default {
  ymdhms:getYmdhms

}
