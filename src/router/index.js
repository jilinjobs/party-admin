import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login' && !router.app.login) {
    next({path: '/login'})
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router