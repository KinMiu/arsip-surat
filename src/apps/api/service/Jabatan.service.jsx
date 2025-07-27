import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  GET_JABATAN, 
  GET_SURAT_MASUK_BY_ID, 
  ADD_JABATAN, 
  EDIT_SURAT_MASUK,
  ADD_SURAT_MASUK_EXCEL, 
  DELETE_SURAT_MASUK,
  DELETE_ALL
} = API_ENDPOINT

class ServiceJabatan {
  static async addJabatan(data) {
    const response = await api.post(ADD_JABATAN, data)
    return response.data
  }
  static async editSuratMasuk(ID, data) {
    const response = await api.put(EDIT_SURAT_MASUK(ID), data)
    return response.data
  }
  static async addSuratMasukExcel(data) {
    const response = await api.post(ADD_SURAT_MASUK_EXCEL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
  static async getJabatan() {
    const response = await api.get(GET_JABATAN)
    return response.data
  }
  static async getSuratMasukByID(ID) {
    const response = await api.get(GET_SURAT_MASUK_BY_ID(ID))
    return response.data
  }
  static async deleteSuratMasuk(id) {
    const response = await api.delete(DELETE_SURAT_MASUK(id))
    return response.data
  }
  static async deleteAll() {
    const response = await api.delete(DELETE_ALL)
    return response.data
  }
}

export default ServiceJabatan