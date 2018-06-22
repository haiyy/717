<template>
    <header>
        <span>111</span>
        <div class='inpBox'>
            <i class='icon iconfont icon-fangdajing'></i>
            <input type="text" placeholder='请输入你要购买的商品' @click="togoSearch" />
        </div>
        <div>
            <i class='icon iconfont icon-iconhuidaoshouye'></i>
            <p>我的店铺</p>
        </div>
        <div>
            <i class='icon iconfont icon-xiaoxi'></i>
            <p>消息</p>
        </div>
    </header>
</template>

<script>
export default {
    name: 'headers',
    methods: {
        togoSearch() {
            this.$router.push({
                name: 'search'
            })
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    height: .9rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

header>span {
    color: red;
    display: block;
    width: 5%;
    height: auto;
}

header .inpBox {
    width: auto;
    height: 50%;
    border:1px solid #ccc;
    border-radius: 7px;
}

header .inpBox input {
    width: 80%;
    height: 100%;
    border: none;
}

header .inpBox i{
   display: inline-block;
   width: 15%;
   height: 100%;
}

header>.icon-fangdajing {
    position: absolute;
    top: 15px;
    left: 60px;
    z-index: 3;
}

header div {
    text-align: center;
    color: red;
}
</style>
