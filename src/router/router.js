import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/homePage/Home/home.vue';
import Classify from '../views/homePage/Classify/classify.vue';
import My from '../views/homePage/My/my.vue';
import ShopCar from '../views/homePage/ShopCar/shopCar.vue';
import Index from '../views/homePage/Index/index.vue';
import Search from '../views/Search/search.vue';
import ListItem from '../components/listItem.vue';
import Login from '../views/Login/login.vue';
import Register from '../views/Register/register.vue';
import Address from '@/views/homePage/My/address.vue';
import AllMsg from '@/views/homePage/My/allMsg.vue';
import AllStatus from '@/views/homePage/My/allStatus.vue';
import Money from '@/views/homePage/My/money';
import Service from '@/views/homePage/My/service';
import Set from '@/views/homePage/My/set.vue';
import Balance from '@/views/homePage/My/balance.vue';
import Customer from '@/views/homePage/My/customer.vue';
import AddAddre from "@/views/homePage/My/addAddre.vue";
import {
  getCookie
} from '@/utils/cookie.js';

Vue.use(Router);

let router = new Router({
  mode:'history',
  routes: [{
    path: '/',
    redirect: '/index/home'
  }, {
    path: "/login",
    name: "login",
    component: Login
  }, {
    path: "/register",
    name: "register",
    component: Register
  }, {
    path: '/index',
    name: 'index',
    component: Index,
    children: [{
      path: 'home',
      name: 'home',
      component: Home
    }, {
      path: 'classify',
      name: 'classify',
      component: Classify
    }, {
      path: 'shopCar',
      name: 'shopCar',
      component: ShopCar
    }, {
      path: 'my',
      name: 'my',
      component: My
    }]
  }, {
    path: "/search",
    name: "search",
    component: Search
  }, {
    path: "/listItem",
    name: "listItem",
    component: ListItem
  },{
    path:"/address",
    name:"address",
    component:Address
  },{
    path:"/allMsg",
    name:"allMsg",
    component:AllMsg
  },{
    path:"/allStatus",
    name:"allStatus",
    component:AllStatus
  },{
    path:"/money",
    name:"money",
    component:Money
  },{
    path:"/service",
    name:"service",
    component:Service
  },{
    path:"/set",
    name:"set",
    component:Set
  },{
    path:"/balance",
    name:"balance",
    component:Balance
  },{
    path:"/addAddre",
    name:"addAddre",
    component:AddAddre
  }]
})
router.beforeEach((to, from, next) => {
  if (to.name === 'my' || to.name === 'shopCar') {
    let token = getCookie('token')
    if (!token) {
      next({
        name: 'register',
        query: {
          from: to.name || 'home'
        }
      })
      alert("请先登陆")
    } else {
      next()
    }
  } else {
    next()
  }
  next()
})
export default router;
