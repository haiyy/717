<template>
  <div class="from">
    <div>
      用户名
      <input type="number" v-model.trim="username" placeholder="请输入手机号码">
    </div>
    <div>
      密码
      <input type="password" v-model="password" placeholder="请输入密码">
    </div>
    <button @click="gotoLgin">登陆</button>
    <button @click="LClick">注册</button>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: "register",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    gotoLgin() {
      let useReg = /^1[3578]\d{9}$/g;
      let passReg = /\w{6,12}/g;
      if (!useReg.test(this.username)) {
        alert("请输入正确手机号");
        return;
      }
      if (!passReg.test(this.password)) {
        alert("请输入正确密码");
        return
      }
      if (this.username === "" || this.password === "" || this.Rpassword === "") {
        alert("请补全信息");
        return;
      }
      this.$http.post("/api/user/register", {
        username: this.username,
        passsword: this.password
      }).then(res => {
        if (res.code === 1) {
          document.cookie = `token=${res.token}`;
          this.$router.push({
            name: 'home' || this.$route.query.from
          });
          console.log(this.$route.query.from)
        } else {
          alert('该用户不存在,请重新登录')
          return;
        }
      })
    },
    LClick() {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style>
.from {
  width: 100%;
  height: 100px;
}

.from div {
  width: 60%;
  height: auto;
  margin: .5rem;
  text-align: right;
}

.from div input {
  height: .4rem;
}

button {
  display: inline-block;
  width: 35%;
  height: auto;
  margin-left: 10%;
  line-height: .5rem;
  background: #fc9cbe;
  color: aliceblue;
  border: none;
}
</style>
