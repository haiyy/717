<template>
    <div ref="wrap" @scroll="onScroll" class="wrap">
        <div class="swiper-container" ref="Rswiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../../assets/images/a.jpg" alt=""></div>
                <div class="swiper-slide"><img src="../../../assets/images/b.jpg" alt=""></div>
                <div class="swiper-slide"><img src="../../../assets/images/c.jpg" alt=""></div>
                <div class="swiper-slide"><img src="../../../assets/images/d.jpg" alt=""></div>
            </div>
            <div class="swiper-pagination"></div>
            <!--<div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>-->
        </div>
        <ul class="section" ref="cont">
            <li v-for="(item,index) in list" :key="index">
                <Contents v-bind:data="item"></Contents>
            </li>
        </ul>
        <p>{{load}}</p>
    </div>
</template>

<script>
import Swiper from 'swiper';
import jsonp from '../../../utils/jsonp/index.js';
import Contents from '@/components/Contents.vue';
export default {
    name: 'home',
    data() {
        return {
            // url: '',
            list: [],
            canIQuery: true,
            page: 1,
            load: "正在为你加载更多..."
        }
    },
    mounted() {
        let mySwiper = new Swiper(this.$refs.Rswiper, {
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        this.$http.get(`/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0?page=${this.page}`).then(res => {
            this.list = res.data.result[0].itemsArray;
        })
        // jsonp(this.url, 'mtopjsonp1').then((res) => {
        // })
    },
    methods: {
        onScroll() {
            let winH = this.$refs.wrap.offsetHeight;
            let doch = this.$refs.Rswiper.offsetHeight + this.$refs.cont.offsetHeight;
            let scorll = this.$refs.wrap.scrollTop;
            if (doch - winH - scorll < 30 && this.canIQuery) {
                // this.canIQuery=false;
                this.page++;
                if (this.page > 4) {
                    this.load = '没有更多数据';
                    return;
                }
                this.$http.get(`/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0?page=${this.page}`).then(res => {
                    if (res.code === 1000) {
                        this.load = '没有更多数据';
                    } else {
                        this.list = [...this.list, ...res.data.result[0].itemsArray];
                    }
                });
            }
        }
    },
    components: {
        Contents
    }
}
</script>

<style scoped>
.swiper-container {
    height: 3.5rem;
}

.swiper-slide img {
    width: 100%;
}

.wrap {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    overflow-y: scroll;
}

.section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}

.section li {
    width: 40%;
    height: auto;
    margin: 0 0 0 5%;
    text-align: center;
    padding: 10px 0;
}
</style>
