import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(pager) {
  let url = '/file-api'
  if (pager.page !== null && pager.size !== null) {
    url = url + '/page/' + pager.page + '/size/' + pager.size
  }
  if (pager.desc !== null && pager.order !== null) {
    url = url + '?desc=' + pager.desc + '&order=' + pager.order
  }
  return request({
    url,
    method: 'get'
  })
}
