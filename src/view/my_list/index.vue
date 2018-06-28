<template>
  <div class="my_list">

    <div class="list" v-for="item in list">
      <div class="list_head">
        <img :src="item.img_list.split('|')[0]" alt="">
        <div class="list_tit">

          <div class="list_tit_txt">
            {{item.desc}}
          </div>

          <div class="list_tit_time addmg">
            <span class="list_tit_time_ico"></span>
            <p> {{item.created}} </p>
          </div>

          <div class="list_tit_time">
            <span class="list_tit_addr_ico"></span>
            <p> {{item.wx_addr}} </p>
          </div>

        </div>
        <div class="list_tit_state0" v-if="item.status==0">
          未处理
        </div>
        <div class="list_tit_state1" v-if="item.status==1">
          已处理
        </div>
        <div class="clearfloat"></div>
      </div>

      <div v-show="item.status==1">
        <div class="list_state">
            <span class="list_state_tit">状态：</span>
            <span class="list_state_txt">{{item.status==1?'已处理':'未处理'}}</span>
        </div>

        <div class="list_state">
            <span class="list_state_tit">时间：</span>
            <span class="list_state_txt">{{item.created}}</span>
        </div>

        <div class="list_ans">
          <div class="list_ans_bg">
            <span class="list_state_tit">回复：</span>
            <span class="list_state_txt">{{item.reply}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/babel">
// 缓存
import Cache from '@/util/cache';
export default {
  name: 'Skyin-myList',
  data () {
    return {
      list:[
        {
          cname:"国土资源",
          created:"2018-06-23 09:53:36",
          desc:"举报内容-测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
          id:"9",
          img_list:"text.jpg",
          openid:"test_openid",
          phone:"12312312312",
          reply:"这里是反馈-测试",
          sex:"1",
          status:"0",
          user_addr:"地址-测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
          username:null,
          vedio_list:null,
          wx_addr:"广东省深圳市福田区华强北街道华强北路8号华联发大厦",
        }
      ],
    }
  },
  activated(){
    this.initPage();
  },
  methods: {
    initPage:function(){

      let mylist=Cache.localStorage.get('myList');
      console.log('获取 local ',mylist);
      if(mylist==undefined||mylist==''){
        this.$router.push("/nodata");
      }else{
        let _list=JSON.parse(mylist);
        console.log('JSON local ',_list);
        this.list=[];
        this.list=_list;
      }

    },
    goback:function(){
      this.$router.push("/select");
    }
  }
}
</script>

<style  lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
