import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  ADD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CHANGE_NAME,
  CHANGE_PASSWORD,
  GET_BY_ID
} = API_ENDPOINT

class ServiceUser {
  static async addUser(data) {
    const response = await api.post(ADD_USER, data)
    return response.data
  }
  static async loginUser(data) {
    const response = await api.post(LOGIN_USER, data)
    return response.data
  }
  static async getById(ID) {
    const response = await api.get(GET_BY_ID(ID))
    return response.data
  }
  static async changeName(ID, data) {
    const response = await api.put(CHANGE_NAME(ID), data)
    return response.data
  }
  static async changePassword(ID, data) {
    const response = await api.put(CHANGE_PASSWORD(ID), data)
    return response.data
  }
  static async logoutUser(data) {
    const response = await api.post(LOGOUT_USER, data)
    return response.data
  }
}

export default ServiceUser