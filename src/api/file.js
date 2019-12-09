import request from '@/utils/request'

/**
 * Get file list from path
 * @param path
 * @returns {AxiosPromise}
 */
export function list(path) {
  return request({
    method: 'get',
    url: '/file-api/list',
    params: { path }
  })
}
