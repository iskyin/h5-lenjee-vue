<template>
  <div class="detail">
    <div class="frm-list">
      <yd-cell-group title="">
        <yd-cell-item>
            <yd-textarea slot="right" v-model='textArea' placeholder="举报内容:" maxlength="200"></yd-textarea>
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
                <div class="frm-addr-txt">点击选择</div>
              </div>
            </span>
        </yd-cell-item>
      </yd-cell-group>
    </div>

    <div class="frm-list">
      <yd-cell-group>
        <yd-cell-item>
            <span slot="left">详细地址：</span>
            <input slot="right" type="text" placeholder="">
        </yd-cell-item>
      </yd-cell-group>
    </div>

    <div class="frm-list bottom-line">
      <div class="frm-list-head">
        <div class="frm-list-head-l">
          现场图片：
        </div>
        <div class="frm-list-head-r">
          {{imgNum}}/4
        </div>
      </div>
      <div class="frm-list-img">
        <div @click="openCamera()" class="frm-list-img-l">
          <img src="@/assets/img/photo.png" alt="">
        </div>
        <div class="frm-list-img-l">
          <img src="@/assets/img/photo.png" alt="">
        </div>
        <div class="frm-list-img-l">
          <img src="@/assets/img/photo.png" alt="">
        </div>
        <div class="frm-list-img-l">
          <img src="@/assets/img/photo.png" alt="">
        </div>
        <div class="frm-list-img-l">
          <img src="@/assets/img/photo.png" alt="">
        </div>
      </div>
    </div>

    <div  class="frm-list bottom-line">
      <div class="frm-list-head">
        <div class="frm-list-head-l">
          现场视频：
        </div>
        <div class="frm-list-head-r">
          {{videoNum}}/1
        </div>
      </div>
      <div class="frm-list-img">
        <div class="frm-list-img-l">
          <img src="@/assets/img/recording.png" alt="">
        </div>

        <div class="frm-list-img-l">
          <img src="@/assets/img/recording.png" alt="">
        </div>

      </div>
    </div>

    <div class="frm-list">
      <yd-cell-group>
        <yd-cell-item>
            <span slot="left">您的性别：</span>
            <div slot="right" class="frm-list-rado">
              <yd-radio-group v-model="radio">
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
              <yd-input slot="right" v-model="phoneNum" required :show-success-icon="false" :show-error-icon="false" regex="mobile" placeholder="请输入手机号码"></yd-input>
          </yd-cell-item>
      </yd-cell-group>
    </div>

    <div class="frm-btn">
      提交线索
    </div>

  </div>
</template>

<script type="text/babel">
// 请求
import {  AjaxGet , AjaxPost } from '@/service/ajax.js';
// 注册 js-sdk
import { RegistJsSdk } from '@/service/wechat_jssdk.js';

export default {
  name: 'Skyin-Search',
  data () {
    return {
      textArea:'',  // 举报内容
      phoneNum:'',  //
      imgNum:'0',
      videoNum:'0',
      radio: '1',
    }
  },
  activated(){
    this.initPage();
  },
  methods: {
    initPage(){
      // 注册 js-sdk
      RegistJsSdk(this);

    },
    getLoaction(){

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
                success: function (res) {
                  let _res =JSON.stringify(res)
                  console.log('***** 获取当前地理位置 *****');
                  console.log(_res);

                  console.log(_res.latitude); // 纬度，浮点数，范围为90 ~ -90
                  console.log(_res.longitude); // 经度，浮点数，范围为180 ~ -180。
                  console.log(_res.speed); // 速度，以米/每秒计
                  console.log(_res.accuracy); // 位置精度

                  // 7.1 查看地理位置
                  window.wx.openLocation({
                    latitude: 23.099994, // 纬度，浮点数，范围为90 ~ -90
                    longitude: 113.324520,  // 经度，浮点数，范围为180 ~ -180。
                    name: 'TIT 创意园', // 位置名
                    address: '广州市海珠区新港中路 397 号', // 地址详情说明
                    scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: 'http://weixin.qq.com' // 在查看位置界面底部显示的超链接,可点击跳转
                  });

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
                  alert('已选择 ' + res.localIds.length + ' 张图片');
                }
              });

            }
          });



      });

      window.wx.error(function (res) {
        console.log('***** JS-SDK 注册失败 *****');
        console.log(res);
      });
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
