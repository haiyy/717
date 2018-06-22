<template>
    <dl>
        <dt @click="gotoListItem">
            <img v-lazy="data.pic_path">
        </dt>
        <dd>
            <p>{{data.title}}</p>
            <span style="color:red;float:left">{{data.priceShow.unit}}{{data.priceShow.price}}</span>
            <span>{{data.sold}}人已付款</span>
            <b class="icon iconfont icon-gouwuche" style="color:red;float:right" @click="()=>{shopClick(data)}"></b>
        </dd>
    </dl>
</template>

<script>
import { getCookie,bus } from '@/utils/cookie.js'
export default {
    name: 'contents',
    props: ["data"],
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        gotoListItem() {
            this.$router.push({
                name: "listItem",
                query: {
                    url: this.data.auctionURL,
                    data: this.data
                }
            })
        },
        shopClick() {
           this.$store.dispatch('fetchshops',this.data)
        }
    }
}
</script>

<style scoped>
dl {
    width: 100%;
    height: auto;
}

dl dt,
dl dd {
    width: 100%;
    height: auto;
}

dl dt img {
    width: 100%;
    height: auto;
}

dl dd p {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
