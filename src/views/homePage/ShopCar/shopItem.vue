<template>
    <li>
        <dl>
            <dt>
                <i :class="checkClass" @click="flag=!flag"></i>
                <img v-lazy="datas.pic_path">
            </dt>
            <dd>
                <p>{{datas.title}}</p>
                <span>
                    {{datas.priceWithRate }}
                </span>
                <Shop :data='datas' />
            </dd>
        </dl>
    </li>
</template>

<script>
import { getCookie, bus } from '@/utils/cookie.js';
import { mapMutations, mapState } from 'vuex';
import Shop from '@/components/Shop.vue';
export default {
    name: 'shopItem',
    props: ['datas'],
    data() {
        return {
            flag: false
        }
    },
    computed: {
        checkClass() {
            return this.flag ? "icon iconfont icon-xuanzhong-01" : "icon iconfont icon-weixuanzhong-01"
        }
    },
    mounted() {
        bus.$on("check-all", (check) => {
            this.flag = check
        })
    },
    components: {
        Shop
    },
    watch: {
        flag(n, o) {
            bus.$emit("checkItem",
                {
                    name: this.datas.title,
                    price: n ? this.datas.count * this.datas.priceWithRate : 0
                })
        },
        datas(n, o) {
            bus.$emit("checkItem",
                {
                    name: this.datas.title,
                    price: this.flag ? this.datas.count * this.datas.priceWithRate : 0
                })
        }
    },
    methods: {
        checkAll() {
            this.flag = !this.flag
            bus.$emit('check-all', this.flag)
        },
    }
}
</script>

<style scoped>
li {
    width: 100%;
    height: 3rem;
    margin: 10px 0;
}

dl {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}

dl dt {
    width: 40%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
}

dl dd {
    width: 50%;
    height: 100%;
    flex-shrink: 0;
}

dl dt img {
    width: 80%;
    height: auto;
}

dl dt i {
    display: block;
    width: 20%;
    height: auto;
}

dl dd p {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
