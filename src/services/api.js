import axios from 'axios'
import Cookies from 'js-cookie'
import dayjs from 'dayjs';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8000'

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

  static getOrders (params = null) {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'get',
      url: `${API_HOST}/api/orders/`,
      params: params || {}
    })
      .then((res) => res.data
        .map(order => ({
          ...order,
          title: `${order.entity.name}`
        }))
      )
  }

  static getRequestedOrders (params = null) {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'get',
      url: `${API_HOST}/api/orders/requested`,
      params: params || {}
    })
    .then((res) => res.data);
  }

  static getSuppliedOrders (params = null) {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'get',
      url: `${API_HOST}/api/orders/supplied`,
      params: params || {}
    })
    .then((res) => res.data);
  }

  static getSuppliedInventory (params = null) {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'get',
      url: `${API_HOST}/api/supplier-inventory/`,
      params: params || {}
    })
    .then((res) => res.data);
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

  static setOrdersSupplied ({ itemSelected, item_requested }) {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'post',
      url: `${API_HOST}/api/supplied-item/`,
      data: {
        'itemSelected': itemSelected, 
        'requested_item': item_requested
      }
    }).then((res) => {
      return res.data
    })
  }

  static PutOrdersSupplied (order_supplied_id, param) {
    return axios({
      headers: Api.getAuthHeaders(),
      method: 'patch',
      url: `${API_HOST}/api/orders-supplied/${order_supplied_id}/`,
      data: param
    }).then((res) => {
      return res.data
    })
  }
}
