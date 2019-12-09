import request from '@/utils/request'

/**
 * Get file list from path
 * @param path
 * @returns {AxiosPromise}
 */
export function list(path) {
  return request({
    url: '/file-api/list',
    data: { path }
  })
}
