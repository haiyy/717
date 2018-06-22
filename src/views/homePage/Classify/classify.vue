<template>
    <div class="section">
        <ul class="left">
            <li v-for="item in data" :key="item.cid" @click="()=>{getData(item.cid)}" :class="item.cid===id?'active':''">
                <i class='icon iconfont'>&#xe649;</i>
                <a href="javascript:;" :title="item.title">{{item.title}}</a>
            </li>
        </ul>
        <div class="right">
            <ul>
                <li v-for="(val,ind) in dataList" :key="ind">
                    <h2>{{val.goodsTypeName}}</h2>
                    <dl v-for="(item,index) in val.goodsTypeList" :key="index*1000">
                        <dt>
                            <img v-lazy="item.goodsTypeImgUrl" alt="">
                        </dt>
                        <dd>
                            <h4>{{item.goodsTypeName}}</h4>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export default {
    name: 'classify',
    data() {
        return {
            data: [],
            img: '',
            id: 17951827
        }
    },
    computed: {
        ...mapState(['shoplist']),
        dataList(){
            return this.shoplist[this.id]
        },

    },
    mounted() {
        this.$http.get(`http://localhost:3000/classify`).then(res => {
            this.data = res
        });
        this.$store.dispatch('fetchList',this.id)
    },
    methods: {
        getData(cid) {
            this.id = cid
           this.$store.dispatch('fetchList',this.id)
        }
    }
}
</script>

<style scoped>
.section {
    width: 100%;
    height: 100%;
    display: flex;
}

.left {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;
}

.left li {
    width: 100%;
    height: .5rem;
    background: #e7e7e7;
    border-bottom: 1px solid #ffffff;
    text-align: center;
    line-height: .5rem;
}

.right {
    width: 70%;
    height: 100%;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll
}

.left li.active {
    background: #fff;
    color: red;
    border-left: 1px solid red;
}
a{
    text-decoration:none;
    -webkit-tap-highlight-color: rgba(0,0,0,0)
}
.left li.active a{
    color: red;
}
.left li:first-child {
    border-top: 1px solid #e7e7e7;
}

.right ul {
    width: 100%;
    height: 100%;
}

.right ul li {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
}

.right ul li h2 {
    width: 100%;
    height: auto;
    padding: 0 0 0 5%;
}

.right ul li dl {
    width: 25%;
    height: auto;
    background: #e7e7e7;
    margin: 2% 0 0 2%;
    padding: 2%;
}

.right ul li dl dt,
.right ul li dl dt {
    width: 100%;
    height: auto;
    text-align: center;
}

.right ul li dl dt img {
    width: 80%;
    height: auto;
}

.right ul li dl dd h4 {
    width: 100%;
    text-align: center;
}
</style>
