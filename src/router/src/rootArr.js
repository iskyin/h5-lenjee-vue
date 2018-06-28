
import  _Bak from "@/view/_bak/index.vue";
import  Guide from "@/view/guide/index.vue";
import  List from "@/view/list/index.vue";
import  Search from "@/view/search/index.vue";
import  Sucess from "@/view/sucess/index.vue";
import  NoData from "@/view/nodata/index.vue";
import  Gklg from "@/view/general_knowledge/index.vue";
import  MyList from "@/view/my_list/index.vue";
import  Detail from "@/view/detail/index.vue";
import  Select from "@/view/select/index.vue";

const RouterArr= [
      {
          path: '/',
          name: 'Guide', // 引导页
          component: Guide,
      },
      // {
      //     path: '/',
      //     name: '_bak', // 备案专用
      //     component: _Bak
      // },
      {
          path: '/gklg',
          name: 'Gklg', // 常识
          component: Gklg
      },
      {
          path: '/mylist',
          name: 'MyList', // 用户举报列表
          component: MyList
      },
      {
          path: '/select',
          name: 'Select', // 选择大项
          component: Select
      },
      {
          path: '/list',
          name: 'List',
          component:List
      },
      {
          path: '/detail',
          name: 'Detail', // 举报详情
          component: Detail
      },
      {
          path: '/search',
          name: 'Search', // 查询
          component: Search
      },
      {
          path: '/sucess',
          name: 'sucess', // 成功
          component: Sucess
      },
      {
          path: '/nodata',
          name: 'NoData', // 无数据
          component: NoData
      }
  ]

export default {
  routes: RouterArr
}
