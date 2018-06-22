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
    <div>
      确认密码
      <input type="password" v-model="Rpassword" placeholder="请确认密码">
    </div>
    <button @click="gotoLgin">注册</button>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      Rpassword: ""
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
      if (this.password != this.Rpassword) {
        alert("两次密码不符");
        return;
      }
      if (this.username === "" || this.password === "" || this.Rpassword === "") {
        alert("请补全信息");
        return;
      }
      this.$router.push({
        name: "register"
      });
      this.$http.post("/api/user/login", {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res)
        if(res.code == 1){
          this.$router.push({
            name:'register'
          })
          return;
        }else{
          return false;
        }
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
  display: block;
  width: 35%;
  height: auto;
  margin: 0 auto;
  line-height: .5rem;
  background: #fc9cbe;
  color: aliceblue;
  border: none;
}
</style>
