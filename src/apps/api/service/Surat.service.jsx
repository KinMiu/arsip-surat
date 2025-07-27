import API_ENDPOINT from '../global'
import { api } from '../global/config'

const {
  // Surat Masuk
  GET_SURAT_MASUK,
  GET_BY_DISPOSISI,
  ADD_DISPOSISI,
  DELETE_DISPOSISI,
  GET_SURAT_MASUK_BY_ID,
  ADD_SURAT_MASUK,
  EDIT_SURAT_MASUK,
  ADD_SURAT_MASUK_EXCEL,
  DELETE_SURAT_MASUK,
  DELETE_ALL,

  // Surat Keluar
  GET_SURAT_KELUAR,
  GET_SURAT_KELUAR_BY_ID,
  ADD_SURAT_KELUAR,
  EDIT_SURAT_KELUAR,
  DELETE_SURAT_KELUAR,
  DELETE_SURAT_KELUAR_ALL,
} = API_ENDPOINT

class ServiceSurat {
  // ================= SURAT MASUK =================

  static async addSuratMasuk(data) {
    const response = await api.post(ADD_SURAT_MASUK, data)
    return response.data
  }

  static async editSuratMasuk(ID, data) {
    console.log(data)
    const response = await api.put(EDIT_SURAT_MASUK(ID), data)
    return response.data
  }

  static async addSuratMasukExcel(data) {
    const response = await api.post(ADD_SURAT_MASUK_EXCEL, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }

  static async getSuratMasuk() {
    const response = await api.get(GET_SURAT_MASUK)
    return response.data
  }

  static async getSuratMasukByDisposisi(id) {
    const response = await api.get(GET_BY_DISPOSISI(id))
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

  static async addDisposisi(id, data) {
    const response = await api.post(ADD_DISPOSISI(id), data)
    return response.data
  }

  static async deleteDisposisi(idSurat, idPegawai) {
    const response = await api.delete(DELETE_DISPOSISI(idSurat, idPegawai))
    return response.data
  }

  static async tandaiSudahDilihat(idSurat, idPegawai) {
    const response = await api.put(API_ENDPOINT.TANDAI_SUDAH_DILIHAT(idSurat), {
      idPegawai
    })
    return response.data
  }

  // ================= SURAT KELUAR =================

  static async addSuratKeluar(data) {
    const response = await api.post(ADD_SURAT_KELUAR, data)
    return response.data
  }

  static async editSuratKeluar(ID, data) {
    const response = await api.put(EDIT_SURAT_KELUAR(ID), data)
    return response.data
  }

  static async getSuratKeluar() {
    const response = await api.get(GET_SURAT_KELUAR)
    return response.data
  }

  static async getSuratKeluarByID(ID) {
    const response = await api.get(GET_SURAT_KELUAR_BY_ID(ID))
    return response.data
  }

  static async deleteSuratKeluar(id) {
    const response = await api.delete(DELETE_SURAT_KELUAR(id))
    return response.data
  }

  static async deleteAllSuratKeluar() {
    const response = await api.delete(DELETE_SURAT_KELUAR_ALL)
    return response.data
  }
}

export default ServiceSurat
