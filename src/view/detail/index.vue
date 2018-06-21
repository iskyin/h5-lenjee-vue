<template>
  <div class="detail">
    <div class="frm-list">
      <yd-cell-group title="">
        <yd-cell-item>
            <yd-textarea slot="right" v-model='content' placeholder="举报内容:" maxlength="200"></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
    </div>

    <div class="frm-list">
      <yd-cell-group>
        <yd-cell-item>
            <span slot="left">从地图中选择：</span>
            <span slot="right">
              <div @click='getLoaction()' class="frm-list-right">
                <img src="@/assets/img/map.png" alt="">
                <div class="frm-addr-txt">{{wx_addr}}</div>
              </div>
            </span>
        </yd-cell-item>
      </yd-cell-group>
    </div>

    <div class="frm-list">
      <yd-cell-group>
        <yd-cell-item>
            <span slot="left">详细地址：</span>
            <input slot="right" type="text" v-model='user_addr' placeholder="">
        </yd-cell-item>
      </yd-cell-group>
    </div>

    <div class="frm-list bottom-line">
      <div class="frm-list-head">
        <div class="frm-list-head-l">
          现场图片：
        </div>
        <div class="frm-list-head-r">
          {{img.length}}/4
        </div>
      </div>
      <div class="frm-list-img">
        <div @click="openCamera()" class="frm-list-img-l">
          <img src="@/assets/img/photo.png" alt="">
        </div>

        <div class="frm-list-img-l" v-for='item in img'>
          <img :src="item" alt="">
        </div>

      </div>
    </div>

    <div  class="frm-list bottom-line">
      <div class="frm-list-head">
        <div class="frm-list-head-l">
          现场视频：
        </div>
        <div class="frm-list-head-r">
          {{video.length}}/1
        </div>
      </div>
      <div class="frm-list-img">
        <div @click="openMedia()" class="frm-list-img-l">
          <img src="@/assets/img/recording.png" alt="">
        </div>

        <div class="frm-list-img-l" v-for='item in video'>
          <img :src="item" alt="">
        </div>

      </div>
    </div>

    <div class="frm-list">
      <yd-cell-group>
        <yd-cell-item>
            <span slot="left">您的性别：</span>
            <div slot="right" class="frm-list-rado">
              <yd-radio-group v-model="sex">
                <yd-radio val="1">男士</yd-radio>
                <yd-radio val="2">女士</yd-radio>
              </yd-radio-group>
            </div>
        </yd-cell-item>
      </yd-cell-group>
    </div>

    <div class="frm-list">
      <yd-cell-group class="phoneNum">
          <yd-cell-item>
              <span slot="left">手机号：</span>
              <yd-input slot="right" v-model="phone" required :show-success-icon="false" :show-error-icon="false" regex="mobile" placeholder="请输入手机号码"></yd-input>
          </yd-cell-item>
      </yd-cell-group>
    </div>

    <div @click="submit()" class="frm-btn">
      提交线索
    </div>

  </div>
</template>

<script type="text/babel">
// 请求
import {  AjaxGet , AjaxPostForm , AjaxPostJson} from '@/service/ajax.js';
// 注册 js-sdk
import { RegistJsSdk } from '@/service/wechat_jssdk.js';
// 缓存
import Cache from '@/util/cache';
export default {
  name: 'Skyin-Search',
  data () {
    return {
      content:'',  // 举报内容
      phone:'',  // 手机号
      wx_addr:'点击选择', // 地理位置
      user_addr:'', // 详细地址
      sex: '1', // 性别
      img:[], // 图片地址 最多四张
      video:[], // 视频地址
    }
  },
  activated(){
    this.initPage();
  },
  methods: {
    initPage(){
      // 注册 js-sdk
      let lcUrl=window.location.href;
      RegistJsSdk(this,lcUrl);
    },
    getLoaction(){
      console.log("*********************************");
      console.log("获取地理位置");
      console.log("*********************************");
      let self=this;
      window.wx.ready(function () {

          // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
          window.wx.checkJsApi({
            jsApiList: [
              'getNetworkType',
              'previewImage'
            ],
            success: function (res) {
              console.log('***** 判断当前版本是否支持指定 JS 接口，支持批量判断 *****');
              console.log(JSON.stringify(res));

              // 7.2 获取当前地理位置
              window.wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  console.log('***** 获取当前地理位置 *****');
                  console.log(res);
                  self.addr=res;
                  wx.openLocation(res);

                  // let _res =JSON.stringify(res)
                  // console.log('***** 获取当前地理位置 *****');
                  // console.log(_res);
                  // console.log(_res.latitude); // 纬度，浮点数，范围为90 ~ -90
                  // console.log(_res.longitude); // 经度，浮点数，范围为180 ~ -180。
                  // console.log(_res.speed); // 速度，以米/每秒计
                  // console.log(_res.accuracy); // 位置精度
                  // // 7.1 查看地理位置
                  // window.wx.openLocation({
                  //   latitude: _res.latitude, // 纬度，浮点数，范围为90 ~ -90
                  //   longitude: _res.longitude,  // 经度，浮点数，范围为180 ~ -180。
                  //   name: '', // 位置名
                  //   address: '', // 地址详情说明
                  //   scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
                  //   infoUrl: 'http://weixin.qq.com' // 在查看位置界面底部显示的超链接,可点击跳转
                  // });

                },
                cancel: function (res) {
                  alert('用户拒绝授权获取地理位置');
                }
              });

            }
          });



      });

      window.wx.error(function (res) {
        console.log('***** JS-SDK 注册失败 *****');
        console.log(res);
      });

    },
    openCamera(){
      console.log("*********************************");
      console.log("获取图片");
      console.log("*********************************");
      let self=this;
      if(self.img.length>=4){
        console.log('最多上传四张');
        return;
      }

      let ck_ticket=Cache.cookie.get("ticket");
      let ck_openid=Cache.cookie.get("openid");

      window.wx.ready(function () {
          // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
          window.wx.checkJsApi({
            jsApiList: [
              'getNetworkType',
              'previewImage'
            ],
            success: function (res) {

              console.log('***** 判断当前版本是否支持指定 JS 接口，支持批量判断 *****');
              console.log(JSON.stringify(res));

              // 5.1 拍照、本地选图
              let images = {
                localId: [],
                serverId: []
              };
              window.wx.chooseImage({
                success: function (res) {
                  console.log('***** 拍照、本地选图 *****');
                  images.localId = res.localIds;
                  if (images.localId.length > 4) {
                       alert('最多只能选择四张图片');
                       return;
                  }

                  // 5.3 上传图片
                  let i = 0, length = images.localId.length;
                  function upload() {
                    wx.uploadImage({
                      localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                      isShowProgressTips: 1, // 默认为1，显示进度提示
                      success: function (res) {
                        console.log('uploadImage -> 上传返回值: ',res);
                        i++;
                        images.serverId.push(res.serverId);  // res.serverId 是 返回图片的服务器端ID

                        let localData = res.localData; // localData是图片的base64数据，可以用img标签显示

                        let url=window.__APPINFO__.host+"/home/tool/upload";

                        let formdata = new FormData();
                        formdata.append('file',localData); // 图片或者视频的字段
                        formdata.append('path',"img"); // 存储的路由; 图片上传时，path = img ; 视频上传时，path = vedio;
                        formdata.append('ticket',ck_ticket);
                        formdata.append('openid',ck_openid);

                        // 上传到服务器
                        AjaxPostJson(self,url,formdata,(res)=>{
                          console.log('上传到服务器 -> 返回值 : ', res );
                          if(res.data.code==0){
                            console.log('已上传：' + i + '/' + length);
                            self.img.push(res.data.result.url);

                          }else{
                            console.log('第：' + i + '/' + length+'上传失败');
                          }

                        })

                        if (i < length) {
                          upload();
                        }

                      },
                      fail: function (res) {
                        alert(JSON.stringify(res));
                      }
                    });
                  }
                  upload();

                }
              });

            }
          });

      });

      window.wx.error(function (res) {
        console.log('***** JS-SDK 注册失败 *****');
        console.log(res);
      });
    },
    openMedia(){
      console.log("*********************************");
      console.log("获取摄像");
      console.log("*********************************");
      let self=this;
      if(self.img.length>=1){
        console.log('最多上传1张');
        return;
      }

      let ck_ticket=Cache.cookie.get("ticket");
      let ck_openid=Cache.cookie.get("openid");

      window.wx.ready(function () {

          // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
          window.wx.checkJsApi({
            jsApiList: [
              'getNetworkType',
              'previewImage'
            ],
            success: function (res) {

              console.log('***** 判断当前版本是否支持指定 JS 接口，支持批量判断 *****');
              console.log(JSON.stringify(res));

              // 5.1 拍照、本地选图
              let images = {
                localId: [],
                serverId: []
              };
              window.wx.chooseImage({
                success: function (res) {
                  console.log('***** 拍照、本地选图 *****');
                  images.localId = res.localIds;
                  if (images.localId.length > 1) {
                       alert('最多只能选择1个视频');
                       return;
                  }
                  // 5.3 上传图片
                  let i = 0, length = images.localId.length;
                  function upload() {
                    wx.uploadImage({
                      localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                      isShowProgressTips: 1, // 默认为1，显示进度提示
                      success: function (res) {
                        console.log('uploadImage -> 上传返回值: ',res);
                        i++;
                        images.serverId.push(res.serverId);  // res.serverId 是 返回图片的服务器端ID

                        let localData = res.localData; // localData是图片的base64数据，可以用img标签显示

                        let url=window.__APPINFO__.host+"/home/tool/upload";

                        let formdata = new FormData();
                        formdata.append('file',localData); // 图片或者视频的字段
                        formdata.append('path',"vedio"); // 存储的路由; 图片上传时，path = img ; 视频上传时，path = vedio;
                        formdata.append('ticket',ck_ticket);
                        formdata.append('openid',ck_openid);

                        // 上传到服务器
                        AjaxPostJson(self,url,formdata,(res)=>{
                          console.log('上传到服务器 -> 返回值 : ', res );
                          if(res.data.code==0){
                            console.log('已上传：' + i + '/' + length);
                            self.img.push(res.data.result.url);

                          }else{
                            console.log('第：' + i + '/' + length+'上传失败');
                          }

                        })


                        if (i < length) {
                          upload();
                        }

                      },
                      fail: function (res) {
                        alert(JSON.stringify(res));
                      }
                    });
                  }
                  upload();

                }
              });

            }
          });

      });

      window.wx.error(function (res) {
        console.log('***** JS-SDK 注册失败 *****');
        console.log(res);
      });
    },
    submit(){
      console.log("--------- 提交数据 ----------");
      let self=this;
      if(this.phone==""){
        console.log('------ 手机号不能为空 ------ ')
        return;
      }
      let ck_ticket=Cache.cookie.get("ticket");
      let ck_openid=Cache.cookie.get("openid");
      let cname=self.$route.query.el;
      let data={
        img_list:this.img.join("|"), // 图片地址 数组最多四张
        desc:this.content,// 举报内容
      	"video_list":this.video.join("|"), // 视频地址
      	"wx_addr":this.wx_addr,
      	"user_addr":this.user_addr,
      	"sex":this.sex, // 性别
      	"phone":this.phone,  // 手机号
      	"cname":cname, // 举报类型
        "openid":ck_openid,
      	"ticket":ck_ticket
      }

      let url=window.__APPINFO__.host+"/home/cms/add";
      // 上传到服务器
      AjaxPostJson(self,url,data,(res)=>{
        console.log('上传到服务器 -> 返回值 : ', res );
        if(res.data.code==0){
          self.$router.push("/sucess");
        }
      });

    }

  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
