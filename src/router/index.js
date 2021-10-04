import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/login.vue')
  },
  {
    path:'/myHome',
    name:'MyHome',
    component:()=>import('../views/MyHome.vue'),
    children:[
      {
        path:'/chatList',
        name:'ChatList',
        component:()=>import('../views/ChatList.vue')
      },
      {
        path:'/myFriends',
        name:'MyFriends',
        component:()=>import('../views/MyFriends.vue')
      },
      {
        path:'/myLife',
        name:'MyLife',
        component:()=>import('../views/MyLife.vue')
      },
      {
        path:'/mySetting',
        name:'MySetting',
        component:()=>import('../views/MySetting.vue')
      },
    ]
  },
  {
    path:'/chating',
    name:'Chating',
    component:()=>import('../views/Chating.vue')
  },
  {
    path:'/addFriend',
    name:'AddFriend',
    component:()=>import('../views/AddFriend.vue')
  },
  {
    path:'/myFriendApply',
    name:'MyFriendApply',
    component:()=>import('../views/MyFriendApply.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
