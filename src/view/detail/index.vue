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
              <div class="frm-list-right">
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
export default {
  name: 'Skyin-Search',
  data () {
    return {
      phoneNum:'',
      textArea:'',
      imgNum:'0',
      videoNum:'0',
      radio: '1',
    }
  },
  methods: {

  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
