import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import RouterArr from "./src/rootArr"

const RouterObj= new Router({
  // mode: 'history',
  routes: RouterArr.routes
})

/**
 * 在每次每一个路由改变的时候都得执行一遍
 * @param {to}[Route路由对象] 即将要进入的目标 路由对象
 * @param {from}[Route路由对象] 当前导航正要离开的路由
 * @param {next}[Route路由对象] 一定要调用该方法来 resolve 这个钩子
 */
RouterObj.beforeEach((to,from,next)=>{
  console.log('router beforeEach  to: ',to," from: ",from );

  /**
   *  next() 进行管道中的下一个钩子
   *    调用方法：next(参数或者空)  必须调用
   *
   *    next(无参数的时候):
   *      进行管道中的下一个钩子，如果走到最后一个钩子函数，
   *      那么导航的状态就是 confirmed （确认的）
   *    next('/') 或者 next({ path: '/' }):
   *      跳转到一个不同的地址。
   *      当前的导航被中断，然后进行一个新的导航。
   */
   next();
})

/**
 * after钩子 没有next方法，不能改变导航，
 * 代表已经确定好了导航怎么去执行后，附带的一个执行钩子函数
 */
RouterObj.afterEach((to, from) => {
  console.log('router afterEach  to: ',to," from: ",from );

});

export default RouterObj
