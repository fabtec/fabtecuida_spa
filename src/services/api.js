import axios from 'axios'
import Cookies from 'js-cookie'

// TODO add env vars
const API_HOST = 'http://localhost:8000'

export default class Api {
  static setTokens ({ access, refresh }) {
    Cookies.set('jwt_access_token', access)
    Cookies.set('jwt_refresh_token', refresh)
  }

  static getTokens () {
    return {
      jwtAccessToken: Cookies.get('jwt_access_token'),
      jwtRefreshToken: Cookies.get('jwt_refresh_token')
    }
  }

  static getAuthHeaders () {
    const { jwtAccessToken } = Api.getTokens()
    if (!jwtAccessToken) {
      return {}
    }

    return {
      Authorization: `Bearer ${jwtAccessToken}`
    }
  }

  static loginUser ({ username, password }) {
    return axios({
      method: 'post',
      url: `${API_HOST}/api/token/`,
      data: {
        username,
        password
      }
    })
  }

  static async verifyUser () {
    const { jwtAccessToken } = Api.getTokens()
    if (!jwtAccessToken) {
      return false
    }

    return axios({
      method: 'post',
      url: `${API_HOST}/api/token/verify/`,
      data: {
        token: jwtAccessToken
      }
    })
      .then((res) => {
        return true
      })
      .catch(() => {
        return false
      })
  }

  static getEntities () {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'get',
      url: `${API_HOST}/api/entities/`
    })
      .then((res) => {
        return res.data
      })
  }

  static createOrder (data) {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'post',
      url: `${API_HOST}/api/orders/`,
      data
    })
      .then((res) => {
        return res.data
      })
  }
}
