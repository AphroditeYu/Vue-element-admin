import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/Home.vue'
import User from '@/view/User.vue'
import Main from '@/view/Main.vue'
import Mall from '@/view/Mall.vue'
import PageOne from '@/view/PageOne.vue'
import PageTwo from '@/view/PageTwo.vue'

Vue.use(VueRouter)
//1.创建路由组件
//2.将路由与组件进行映射
const routes = [
  {
    path: '/',
    //重定向啦
    redirect:'/home',
    component: Main,
    children: [
      { path: '/home',name:'home', component: Home },
      { path: '/user',name:'user', component: User },
      { path: '/mall',name:'mall', component: Mall },
      { path: '/page1',name:'page1', component: PageOne },
      { path: '/page2',name:'page2', component: PageTwo }
    ]
  }
]
//解决路由重复跳转后报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => {})
};

//3.创建router实例
const router = new VueRouter({
  //把浏览器那个#去掉
  mode: 'history',
  routes 
})
//4.创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app')
//暴露出去
export default router