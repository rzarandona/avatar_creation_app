import Vue from 'vue'
import VueRouter from 'vue-router'
import AvatarBuilder from '../views/AvatarBuilder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AvatarBuilder',
    component: AvatarBuilder
  }  
]

const router = new VueRouter({
  routes
})

export default router
