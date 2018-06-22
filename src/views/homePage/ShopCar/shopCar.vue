<template>
    <div>
        <h2 v-show="flag">购物车中还没有内容,快去添加吧</h2>
        <ul>
            <ShopItem v-for="(item,ind) in shopItem" :key='ind' :datas='item'></ShopItem>
        </ul>
        <div class="foot">
            <label>
                <i :class="checkClass" @click="checkAll"></i>
                全选
            </label>
            <p>合计：￥{{total}}</p>
            <button @click="btnClick" class="btn">{{type}}</button>
        </div>
    </div>
</template>

<script>
import { getCookie, bus } from '@/utils/cookie.js';
import { mapMutations, mapState } from 'vuex';
import ShopItem from './shopItem.vue';
import Footers from "@/components/footer.vue";
export default {
    name: 'shopCar',
    data() {
        return {
            flag: false,
            total: 0,
            type: '结算',
            list: [],
            data: []
        }
    },
    computed: {
        ...mapState(['shopItem']),
        checkClass() {
            return this.flag ? "icon iconfont icon-xuanzhong-01" : "icon iconfont icon-weixuanzhong-01"
        }
    },
    created() {
    },
    mounted() {
        this.$http.post('/api/shop', {
            token: getCookie('token')
        }).then(res => {
            if (res.code === 0) {
                this.$router.push({
                    name: 'register',
                    query: {
                        from: 'shopcar'
                    }
                })
            }else if(res.code === 1){
                this.$store.dispatch('fetchshops', res.msg);
                console.log(res.msg)
                if(res.msg){
                    this.flag=false
                    // console.log(1)
                }else{
                    this.flag=true
                    // console.log(2)
                }
            }
        });
        bus.$on("checkItem", (res) => {
            this.list[res.name] = res.price
            this.sum();
        })
    },
    components: {
        ShopItem,
        Footers
    },
    methods: {
        checkAll() {
            this.flag = !this.flag
            bus.$emit('check-all', this.flag)
        },
        sum() {
            this.total = Object.values(this.list).reduce((init, item) => {
                return init + item
            }, 0).toFixed(2)
        },
        btnClick() {

        }
    }
}
</script>

<style scoped>
div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

ul {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.foot {
    flex-shrink: 0;
    width: 100%;
    height: .7rem;
    bottom: 0;
    background: #9e9e9e14;
    position: relative;
}

.foot label {
    width: 30%;
    height: 100%;
    line-height: .7rem;
    position: absolute;
    left: 0;
    top: 0;
}

.foot p {
    width: 50%;
    height: 100%;
    line-height: .7rem;
    position: absolute;
    left: 20%;
    top: 0;
}

.btn {
    width: 1.5rem;
    height: .7rem;
    line-height: .7rem;
    border: 1px solid #ccc;
    position: absolute;
    right: 0;
    top: 0;
    background: red;
    color: #fff
}
</style>
