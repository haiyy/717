<template>
    <div class="warp">
        <header>
            <span @click="backClick">返回</span>
            <span>收货地址</span>
            <span></span>
        </header>
        <ul>
            <li v-for="(val,ind) in addAddress" :key="ind">
                <div>
                    <b>{{val.name}}</b>
                    <b>{{val.phone}}</b>
                </div>
                <p>{{val.province}}{{val.area}}{{val.city}}{{val.info}}</p>
                <div>
                    <label>
                        <input type="checkbox">
                        <span>默认地址</span>
                    </label>
                    <button @click="editClick">编辑</button>
                    <button>删除</button>
                </div>
            </li>
        </ul>
        <button @click="addClick" class="add">添加</button>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: 'addAddre',
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['addAddress'])
    },
    methods: {
        backClick() {
            this.$router.push({
                name: "my"
            })
        },
        editClick() {
            this.$router.push({
                name: "address"
            })
        },
        addClick() {
            console.log(this.$router)
            this.$router.push({
                name: "address"
            })
        }
    }
}
</script>

<style scoped>
.warp {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

header {
    width: 100%;
    height: .8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
}

ul {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

ul li {
    width: 100%;
    height: auto;
}

ul li div {
    width: 100%;
    height: auto;
    margin: 20px 0;
}

ul li div b {
    padding: 0 20px;
}

ul li p {
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    overflow: hidden;
    margin: 10px 0;
}

ul li div:last-child {
    display: flex;
}

ul li div:last-child label {
    width: 20%;
    flex-shrink: 0;
    line-height: .5rem;
}

ul li div:last-child button {
    width: 30%;
    height: .5rem;
    margin: 0 5%;
    border: none;
    background: skyblue;
    color: #fff;
    font-size: 16px;
}

.add {
    width: 100%;
    height: .8rem;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    border: none;
    background: skyblue;
    color: #fff;
    font-size: 20px;
}
</style>
