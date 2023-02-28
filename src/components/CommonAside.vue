<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
     
    >
    <h3>{{isCollapse?'后台':'后台管理系统'}}</h3>
      <el-menu-item
        v-for="item in nochildren"  
        :key="item.name"
        :index="item.name"
        @click="changemenu(item)"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in haschildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="subitem in item.children" :key="subitem.path" >
          <el-menu-item @click="changemenu(subitem)" :index="subitem.path">{{ subitem.label }}</el-menu-item>
         </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
       menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "s-shop",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "more",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changemenu(item){
      // console.log(item)
      this.$router.push(item.path)    
      this.$store.commit('selectMenu',item)

    },
  },
  
  computed: {
    //没有子菜单
    nochildren() {
      return this.menuData.filter((item) => !item.children);
    },
    haschildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse(){
     return this.$store.state.tab.isCollapse
    }
  },
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 107vh;
  border-right: none;
  h3{
    color:#fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: normal;
   }
}
</style>