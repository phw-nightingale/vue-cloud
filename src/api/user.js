import request from '@/utils/request'

export function login(data) {
  data.grant_type = 'password'
  return request({
    url: '/user-api/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user-api/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user-api/logout',
    method: 'post'
  })
}
