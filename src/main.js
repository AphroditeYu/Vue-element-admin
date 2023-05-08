import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'
Vue.config.productionTip = false
//按需引入
// import {Row,Button} from 'element-ui'
// Vue.use(Row)
// Vue.use(Button)

//添加全局前置导航守卫
router.beforeEach((to,from,next)=>{
  //判断token存在不存在,说明当前用户是否登录，应跳转至登录页
 const token= Cookie.get('token')
  if(!token&&to.name!=='login'){
    next({
      name:'login'
    })
  }else if(token&&to.name=='login'){
     next({
      name:'home'
     })
  }else{
    next()
  }
})
//全局引入
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
