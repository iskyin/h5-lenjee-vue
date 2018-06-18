
import  Guide from "@/view/guide/index.vue";
import  Select from "@/view/select/index.vue";
import  List from "@/view/list/index.vue";
import  Detail from "@/view/detail/index.vue";
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
      {
          path: '/gklg',
          name: 'gklg', // 常识
          component: Gklg,
      },
      {
          path: '/select',
          name: 'select', // 选择大项
          component: resolve=>require(['@/view/select/index.vue'],resolve) // 懒加载
      },
      {
          path: '/list',
          name: 'list', // 列表
          component: resolve=>require(['@/view/list/index.vue'],resolve) // 懒加载
      },
      {
          path: '/detail',
          name: 'detail', // 举报详情
          component: resolve=>require(['@/view/detail/index.vue'],resolve) // 懒加载
      },
      {
          path: '/search',
          name: 'search', // 查询
          component: resolve=>require(['@/view/search/index.vue'],resolve) // 懒加载
      },
      {
          path: '/sucess',
          name: 'sucess', // 成功
          component: resolve=>require(['@/view/sucess/index.vue'],resolve) // 懒加载
      },
      {
          path: '/nodata',
          name: 'nodata', // 无数据
          component: resolve=>require(['@/view/nodata/index.vue'],resolve) // 懒加载
      }
  ]

export default {
  routes: RouterArr
}
