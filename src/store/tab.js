export default {
  state: {
    isCollapse: false,//控制菜单展开还是收起
    // 面包屑的数据
    tabList:[
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ]
  },
  mutations: {
    //修改菜单展开收起的方法
    handlemenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      console.log(val,'val');
      if(val.name!=='home'){
        const index=state.tabList.findIndex(item=>item.name===val.name)
        if(index===-1){
          state.tabList.push(val)
        }
      }
    },
     //删除指定的tag数据
     closeTag(state,item) {
      const index = state.tabList.findIndex(v => v.name === item.name);
      state.tabList.splice(index, 1);
    }
   }
}