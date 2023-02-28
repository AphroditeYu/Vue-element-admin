import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home'
import user from '@/api/mockServeData/user'
//定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getstatisticalData)
//用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)//增加用户
Mock.mock('/api/user/del', 'post', user.deleteUser)//删除用户
//正则表达式匹配所有以 "/api/user/getUser" 开头的 URL。
Mock.mock(/api\/user\/getUser/, 'get', user.getUserList)//获取列表
Mock.mock('/api/user/edit', 'post', user.updateUser)//修改用户
