import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'

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

/**
 * Download file
 * @param file
 * @returns {AxiosPromise}
 */
export function download(file) {
  const url = '/file-api/file?path=' + file.path + '&fileName=' + file.fileName
  return axios({
    url,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Authorization': getToken()
    }
  })
}

/**
 * make new dir
 * @param dir
 * @returns {AxiosPromise}
 */
export function mkdir(dir) {
  return request({
    url: '/file-api/dir/' + dir.name,
    method: 'post',
    params: { path: dir.path }
  })
}

/**
 * upload single file
 * @param params
 * @returns {AxiosPromise}
 */
export function upload(params) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    /**
     * 此处必须添加这个配置，
     * 为了防止文件数据被拦截器自动转换成Object，
     * 否则会导致上传文件出现问题
     */
    transformRequest: [
      function(data) {
        return data
      }
    ]
  }
  return request.post('/file-api/upload', params, config)
}

export function remove(item) {
  return request({
    url: '/file-api/filename/' + item.fileName,
    method: 'delete',
    params: item
  })
}
