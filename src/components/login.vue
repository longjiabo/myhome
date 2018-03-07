<template>
  <el-container style="height: 100%">
    <el-main style="height: 100%">
      <el-row type="flex" justify="center" align="middle">
        <el-col :xs="24" :md="6">
          <el-card>
            <div slot="header" class=" login-header">
              <h3>小小球<sup>@</sup>家庭系统</h3>
            </div>
            <el-form :model="user" label-width="100px">
              <el-form-item :rules="{required: true, message: '用户名不能为空', trigger: 'blur'}" label="用户名" prop="username">
                <el-input v-model="user.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item :rules="{required: true, message: '密码不能为空', trigger: 'blur'}" label="密码" prop="password">
                <el-input type="password" v-model="user.password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button @click="onCancel">返回</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          username: null,
          password: null
        }
      }
    },
    methods: {
      onSubmit(){
        const f = new FormData();
        f.set("username", this.user.username)
        f.set("password", this.user.password)
        this.$http.post("login", {},{params:this.user}).then((response) => {
          this.$message.success("登录成功")
          this.$router.push("/admin")
          this.$store.dispatch("getUser")
        }, (response) => {
          this.$message.error("用户名或密码错误")
        })
      },
      onCancel(){
        this.$router.push("/")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

  .login-header {
    text-align: center;
  }

  div {
    border: none;
    color: white;
    background-color: rgba(0, 0, 0, 0);
  }

  .el-card, .el-card__body {
    border: none;
  }

  .el-card__body {
    border-top: none;
  }

</style>
<style>
  div.el-card__header {
    border-bottom: none;
  }

  /*label.el-form-item__label {*/
    /*color: white;*/
  /*}*/
</style>
