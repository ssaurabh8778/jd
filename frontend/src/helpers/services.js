import axios from 'axios'
import { parseCookies, destroyCookie } from 'nookies'

export const HttpRequest = (type, url, data = {}, headers = {}, others = {}) => {
  const BaseUrl = 'http://localhost:3001'

  return new Promise((resolve, reject) => {
    axios({
      method: type,
      responseType: 'json',
      url: BaseUrl + url,
      data,
      params: type === 'get' ? data : '',
      headers: headers,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          destroyCookie(null, 'accessToken')
        }
        reject(error)
      })
  })
}
