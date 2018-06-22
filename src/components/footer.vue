<template>
    <footer>
        <router-link :to="{name:'home'}" tag='div'>
            <i class='icon iconfont icon-shouye'></i>
            <span>首页</span>
        </router-link>
        <router-link :to="{name:'classify'}" tag='div'>
            <i class='icon iconfont icon-fenlei'></i>
            <span>分类</span>
        </router-link>
        <router-link :to="{name:'shopCar'}" tag='div'>
            <i class='icon iconfont icon-gouwuche'></i>
            <span>购物车</span>
        </router-link>
        <router-link :to="{name:'my'}" tag='div'>
            <i class='icon iconfont icon-wode'></i>
            <span>我的</span>
        </router-link>
    </footer>
</template>

<script>
export default {
    name: 'footers'
}
</script>

<style scoped>
footer {
    width: 100%;
    height: .9rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

footer div {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
