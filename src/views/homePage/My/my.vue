<template>
    <div class="warp">
        <div>
            <header class="header">
                <i class="icon iconfont icon-shezhi" @click="DClick"></i>
                <span @click="UClick">我的717商城</span>
                <i class="icon iconfont icon-xiaoxi"></i>
            </header>
            <div class="top">
                <div class="img">
                    <img src="../../../assets/images/user.jpg" alt="">
                    <p>路飞</p>
                </div>
            </div>
            <div class="shop">
                <span>
                    <i class="icon iconfont icon-iconhuidaoshouye"></i>
                    我的店铺
                </span>
                <i class="icon iconfont icon-youjiantou-01"></i>
            </div>
            <ul class="order">
                <router-link to="/money" tag="li">
                    <i class="icon iconfont icon-qiaquan"></i>
                    <span>待付款</span>
                </router-link>
                <router-link to="/allMsg" tag="li">
                    <i class="icon iconfont icon-daishouhuo-01"></i>
                    <span>待收货</span>
                </router-link>
                <router-link to="/allStatus" tag="li">
                    <i class="icon iconfont icon-faxiandingdan"></i>
                    <span>代发货</span>
                </router-link>
                <router-link to="/customer" tag="li">
                    <i class="icon iconfont icon-kefu"></i>
                    <span>售后</span>
                </router-link>
                <router-link to="/set" tag="li">
                    <i class="icon iconfont icon-wodedingdan"></i>
                    <span>我的订单</span>
                </router-link>
            </ul>
            <ul class="list">
                <router-link to="/balance" tag="li">
                    <p>
                        <i class="icon iconfont icon-zhifu-01"></i>
                        <span>账号余额</span>
                    </p>
                    <i class="icon iconfont icon-webicon213"></i>
                </router-link>
                <router-link to="/addAddre" tag="li">
                    <p>
                        <i class="icon iconfont icon-dizhi-01"></i>
                        <span>地址管理</span>
                    </p>
                    <i class="icon iconfont icon-webicon213"></i>
                </router-link>
                <router-link to="/service" tag="li">
                    <p>
                        <i class="icon iconfont icon-kefu"></i>
                        <span>我的客服</span>
                    </p>
                    <i class="icon iconfont icon-webicon213"></i>
                </router-link>
            </ul>
        </div>
        <Toast ref='toa'></Toast>
        <Delog ref='delog'></Delog>
    </div>
</template>

<script>
import { getCookie, bus } from '@/utils/cookie.js';

export default {
    name: 'my',
    data() {
        return {

        }
    },
    methods:{
        DClick(){
            this.$refs.toa.active('确定修改')
        },
        UClick(){
            this.$refs.delog.active('','是否却确认','home')
        }
    },
    mounted() {
        this.$http.post('/api/shop', {
            token: getCookie('token')
        }).then(res => {
            if (res.code === 0) {
                this.$router.push({
                    name: 'register',
                    query: {
                        from: 'my'
                    }
                })
            }
        });
    }
}
</script>

<style scoped>
.warp{
    width: 100%;
    height: 100%;
}
.header {
    height: 1rem;
    line-height: .8rem;
    display: flex;
    justify-content: space-between;
    width: 90%;
   margin: 0 0 0 5%; 
}

.top {
    height: 80px;
    width: 100%;
    background:#fa5a32;
}

.shop {
    width: 90%;
    display: flex;
    justify-content: space-between;
    height: 2rem;
    font-size: 20px;
    line-height: 2rem;
    color: #fc4141;
    margin: 0 0 0 5%;
}

.shop span i.icon {
    font-size: 55px;
}

.order {
    display: flex;
    justify-content: space-around;
    height: 60px;
    padding: .3rem 0;
    border-top:1px solid #ccc;
}

.order li {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 30px;
}

.order li i.icon {
    font-size: 25px;
}
.list{
    padding:  .3rem 0;
    border-top:.3rem solid #ccc;
    border-bottom:.3rem solid #ccc;
}
.list li {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
}

.img {
    width: 60px;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
}

.img img {
    width: 80%;
    border-radius: 50%;
}

.img p {
    text-align: center;
    line-height: 20px;
    color: #fff;
}
</style>
