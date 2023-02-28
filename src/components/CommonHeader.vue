<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="changeclick"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
       </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="@/assets/img/user.jpg" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    changeclick() {
      this.$store.commit("handlemenu");
    },
  },
  computed:{
    ...mapState({
      tags:state=>state.tab.tabList
    })
  },
  // mounted() {
  //   console.log(this.tags,'tags')
  // },
};
</script>
<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-content {
    padding: 0 20px;
    display: flex;
    align-items: center;
    .text {
      color: #fff;
      font-size: 14px;
      margin-left: 14px;
    }
    .el-breadcrumb{
      margin-left: 20px;
      /deep/ .el-breadcrumb__inner{
        font-weight: normal;
        cursor: pointer;
            &.is-link{
              color:#666
            }
            &.is-link:hover{
              color: #4091ff;
            }
            
        }
    }
  
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>