import request from '@/utils/request'

export function login(data) {
  data.grant_type = 'password'
  return request({
    url: '/user-api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user-api/current',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user-api/logout',
    method: 'post'
  })
}
