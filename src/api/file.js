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
