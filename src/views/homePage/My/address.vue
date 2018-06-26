<template>
    <div class="warp">
        <div class="top">
            <span @click="callback">返回</span>
            <span>收货地址</span>
            <span></span>
        </div>
        <div class="lab">
            <label>用户名: </label>
            <input type="text" 
            placeholder="请输入用户名"
            v-model="name">
        </div>
        <div class="lab">
            <label>手机号 : </label>
            <input type="text" 
            placeholder="请输入手机号"
            v-model="phone">
        </div>
        <div class="mult">
            <multiselect v-model="selectedProvince" :options="province" @input="updatProvince">
            </multiselect>
        </div>
        <div class="mult">
            <multiselect v-model="selectedCity" :options="city" @input="updatCity">
            </multiselect>
        </div>
        <div class="mult">
            <multiselect v-model="selectedArea" :options="area" @input="updatArea">
            </multiselect>
        </div>
        <div class="lab">
            <label>详细信息: </label>
            <input type="text" 
            placeholder="请输入详细信息"
            v-model="info">
        </div>
        <button @click="keepClick">保存</button>
        <Toast ref='toa'></Toast>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from "axios"
export default {
    name: "Address",
    data() {
        return {
            province: [],
            city: [],
            area: [],
            data: [],
            name:'',
            phone:'',
            info:'',
            selectedProvince: null,
            selectedCity: null,
            selectedArea: null,
        }
    },
    mounted() {
        axios.get("/server/address/address.json").then(res => {
            this.data = res.data;
            this.data.map(val => {
                this.province.push(val.name);
            })
        })
    },
    methods: {
        updatProvince() {
            this.city = []
            this.data.map(val => {
                if (val.name === this.selectedProvince) {
                    val.city.map(item => {
                        this.city.push(item.name)
                    })
                }
            })
        },
        updatCity() {
            this.area = []
            this.data.map(val => {
                if (val.name === this.selectedProvince) {
                    val.city.map(item => {
                        if (this.selectedCity === item.name) {
                            item.area.map(value => {
                                this.area.push(value)
                            })
                        }
                    })
                }
            })
        },
        updatArea() {

        },
        callback() {
            this.$router.push({
                name: 'my'
            })
        },
        keepClick(){
            let reg = /^1[35789]\d{9}$/g;
            if(!
            this.name|| !this.phone || !this.selectedProvince || !this.selectedCity || !this.selectedArea || !this.info){
                this.$refs.toa.active('请补全信息');
                return;
            }else if(!reg.test(this.phone)){
                this.$refs.toa.active('请正确输入手机号');
                return;
            }else{
                this.$router.push({
                    name:"addAddre"
                });
                this.$store.commit('updateAddAddress',{
                    name:this.name,
                    phone:this.phone,
                    province:this.selectedProvince,
                    area:this.selectedCity,
                    city:this.selectedArea,
                    info:this.info                  
                })
            }
        }
    },
    components: {
        Multiselect
    },
}
</script>
<style scoped>
.warp {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.lab{
    width: 100%;
    border-bottom:1px solid #ccc;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 1rem;
}
.lab label{
    flex-shrink: 0;
} 
.lab input{
    width: 100%;
    flex-grow: 1;
    height: 70%;
    border: none;
}
.mult{
    margin: 20px 0;
    display: inline-block;
}
button{
    width: 1.5rem;
    height: .7rem;
    line-height: .7rem;
    margin: 0 auto;
    background: skyblue;
    color:#fff;
    border:none;
}
.multiselect{
    width: 100%;
    margin: 0 auto;
}
</style>
