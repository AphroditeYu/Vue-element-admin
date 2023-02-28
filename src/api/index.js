import http from "@/util/request";
//请求首页数据
export const getData = (params) => {
  return http({
    url: '/home/getData',
    method: 'get',
    params
  })
}
// export const getData = () => {
//   return http.get('/home/getData')
// }

//用户列表数据
export const getUser = (params) => {

  return http({
    url: '/user/getUser',
    method: 'get',
    params
  })
}
export const addUser = (data) => {
  return http({
    url: '/user/add',
    method: 'post',
    data
  })
}
// export const addUser = (data) => {
//   return http.post('/user/add', data)
// }
export const deleteUser = (data) => {
  return http({
    url: '/user/del',
    method: 'post',
    data
  })
}
// export const deleteUser = (data) => {
//   return http.post('/user/del', data)
// }
export const updateUser = (data) => {
  return http({
    url: '/user/edit',
    method: 'post',
    data
  })
}
// export const updateUser = (data) => {
//   return http.post('/user/edit', data)
// }