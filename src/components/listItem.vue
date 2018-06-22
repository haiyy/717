<template>
    <div>
        <header @click="callClick">返回</header>
        <section>
            <dl>
                <dt>
                    <img v-lazy="$route.query.data.pic_path">
                </dt>
                <dd>
                    <p>{{$route.query.data.title}}</p>
                    <span style="color:red;float:left">{{$route.query.data.priceShow.unit}}{{$route.query.data.priceShow.price}}</span>
                    <span>{{$route.query.data.sold}}人已付款</span>
                </dd>
            </dl>
        </section>
    </div>
</template>

<script>
export default {
    name: "listItem",
    mounted() {
        //this.$route.query
    },
    methods: {
        callClick() {
            this.$router.go(-1);
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
