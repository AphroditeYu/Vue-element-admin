<template>
  <div class="login-container">
   <el-form :model="form" :rules="rules">
       <h3 class="login-title">系统登录</h3>
       <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入密码"></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
       </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
       </el-form-item>
   </el-form>
  </div>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      form:{
        username:'',
        password:''
      },
      rules:{
         username:[
            { required:true, trigger: 'blur',message:'请输入用户名' },
          ],
          password:[
            { required:true, trigger: 'blur',message:'请输入密码' }
          ],
        }
    }
  },
     methods: {
    submit(){
     //token信息
     const token=Mock.Random.guid();
     //token信息存入cookie用于不同页面间的通信
     Cookie.set('token',token)
     //跳转到首页
     this.$router.push('/home')
    }
  },
}
</script>
<style lang="less" scoped>
  .login-container{
    width: 300px;
    height: 300px;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    padding: 35px 35px 15px 35px;
    margin: 180px auto;
    box-shadow: 0px 0px 25px #cac6c6;
    .el-form{
      .login-title{
        text-align: center;
       
      }
      .el-form-item{
        .el-button{
          margin-top: 10px;
          margin-left: 120px;
        }
      }
    }
  }
</style>