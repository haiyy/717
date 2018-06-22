import Vue from "vue";
import Vuex from "vuex";
import {
  httpInstance as http
} from "@/utils/request.js";
import {
  getCookie
} from '@/utils/cookie.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    shoplist: {},
    shopItem: [],
    //ShopList:[]
  },
  mutations: {
    updateList(state, payload) {
      let o = { ...state.shoplist
      };
      o[payload.code] = payload.data.secondLevelCategories
      state.shoplist = o
    },
    updateShopItem(state, payload) {
      console.log(payload)
      let arr = [];
      payload.map(val=>{
        if(val.title){
          arr.push(val)
        }
      })
      console.log(arr)
      state.shopItem = arr
    },
    // updaShopList(state,payload){
    //   state.ShopList = payload
    // }
  },
  actions: {
    fetchList({
      commit
    }, payload) {
      http.get(`http://localhost:3000/classify/Item?cid=${payload}`).then(res => {
        commit('updateList', {
          data: res,
          code: payload
        })
      })
    },
    fetchshops({commit},payload){
       http.post('/api/shopcar', {
            token: getCookie('token'),
            item: payload,
            count: 1
        }).then(res => {
            if (res.code === 1) {
                commit('updateShopItem',res.msg)
            } else {
                console.log('写入失败')
            }
        })
    }
    // fetchShopList({commit}, payload) {
    //   this.$http.post('/api/shopcar', {
    //     token: getCookie('token'),
    //     item: payload,
    //     count: 1
    //   }).then(res => {
    //     if (res.code === 1) {
    //       commit('updaShopList',res.msg)
    //     }
    //   })
    // }
  },
  getters: {},
  modules: {}
})
export default store;
