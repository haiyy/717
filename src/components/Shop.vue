<template>
    <div>
        <span @click="addClick">+</span>
        <input type="text" v-model="data.count">
        <span @click="delClick">-</span>
    </div>
</template>

<script>
import { getCookie,bus } from '@/utils/cookie.js';
export default {
    name: 'Shop',
    props: ['data'],
    data() {
        return {
            count: this.data.count
        }
    },
    mounted() {
    },
    methods: {
        addClick() {
            this.$http.post('/api/shopcar/count', {
                token: getCookie('token'),
                count: ++ this.count,
                item: this.data.title
            }).then(res => {
                if (res.code === 1) {
                    res.msg.map(val => {
                        if (this.data.title === val.title) {
                            this.data.count = val.count;
                        }
                    })
                    this.$store.commit('updateShopItem',res.msg)
                }
            });
        },
        delClick() {
            if (this.count <= 0) return;
            this.$http.post('/api/shopcar/count', {
                token: getCookie('token'),
                count: -- this.count,
                item: this.data.title
            }).then(res => {
                if (res.code === 1) {
                    res.msg.map(val => {
                        if (this.data.title === val.title) {
                            this.data.count = val.count;
                        }
                    })
                    this.$store.commit('updateShopItem',res.msg)
                }
            });
        },
    }
}
</script>

<style scoped>
div {
    width: 100%;
    height: auto;
}

div span {
    display: inline-block
}

div input {
    width: 30px;
    height: 20px;
}
</style>
