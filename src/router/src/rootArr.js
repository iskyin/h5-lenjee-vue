
import  _Bak from "@/view/_bak/index.vue";
import  Guide from "@/view/guide/index.vue";
import  List from "@/view/list/index.vue";
import  Search from "@/view/search/index.vue";
import  Sucess from "@/view/sucess/index.vue";
import  NoData from "@/view/nodata/index.vue";
import  Gklg from "@/view/general-knowledge/index.vue";

const RouterArr= [
      {
          path: '/',
          name: 'guide', // 引导页
          component: Guide,
      },
      // {
      //     path: '/',
      //     name: '_bak', // 备案专用
      //     component: _Bak
      // },
      {
          path: '/gklg',
          name: 'gklg', // 常识
          component: Gklg
      },
      {
          path: '/select',
          name: 'select', // 选择大项
          component: resolve=>require(['@/view/select/index.vue'],resolve) // 懒加载
      },
      {
          path: '/list',
          name: 'list', // 列表
          component:List
      },
      {
          path: '/detail',
          name: 'detail', // 举报详情
          component: resolve=>require(['@/view/detail/index.vue'],resolve) // 懒加载
      },
      {
          path: '/search',
          name: 'search', // 查询
          component: Search
      },
      {
          path: '/sucess',
          name: 'sucess', // 成功
          component: Sucess
      },
      {
          path: '/nodata',
          name: 'nodata', // 无数据
          component: NoData
      }
  ]

export default {
  routes: RouterArr
}
