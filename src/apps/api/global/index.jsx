const API_ENDPOINT = {
  ADD_USER: "/user/create",
  LOGIN_USER: "/user/login",
  GET_BY_ID: (ID) =>  `/user/get/${ID}`,
  CHANGE_NAME: (ID) =>  `/user/change-name/${ID}`,
  CHANGE_PASSWORD: (ID) =>  `/user/change-password/${ID}`,
  LOGOUT_USER: "/user/logout",
  //Surat Masuk
  GET_SURAT_MASUK:`/surat-masuk/get`,
  GET_SURAT_MASUK_BY_ID: (ID) => `/surat-masuk/get/${ID}`,
  ADD_SURAT_MASUK: `/surat-masuk/create`,
  EDIT_SURAT_MASUK: (ID) => `/surat-masuk/edit/${ID}`,
  ADD_SURAT_MASUK_EXCEL: `/surat-masuk/create/excel`,
  DELETE_SURAT_MASUK: (id) => `/surat-masuk/delete/${id}`,
  DELETE_ALL: `/surat-masuk/delete-all`,
  // Surat Keluar
  GET_SURAT_KELUAR: '/surat-keluar/get',
  GET_SURAT_KELUAR_BY_ID: (id) => `/surat-keluar/get/${id}`,
  ADD_SURAT_KELUAR: '/surat-keluar/create',
  EDIT_SURAT_KELUAR: (id) => `/surat-keluar/edit/${id}`,
  DELETE_SURAT_KELUAR: (id) => `/surat-keluar/delete/${id}`,
  DELETE_SURAT_KELUAR_ALL: '/surat-keluar/delete-all',
  // Disposisi
  ADD_DISPOSISI: (id) => `/surat-masuk/disposisi/${id}`,
  GET_BY_DISPOSISI: (id) => `/surat-masuk/disposisi/get/${id}`,
  DELETE_DISPOSISI: (idSurat, idPegawai) => `/surat-masuk/disposisi/${idSurat}/${idPegawai}`,
  TANDAI_SUDAH_DILIHAT: (idSurat) => `/surat-masuk/disposisi/lihat/${idSurat}`,

  // Jabatan
  ADD_JABATAN: `/jabatan/create`,
  GET_JABATAN:`/jabatan/get`,
  //Jenis Surat
  ADD_JENIS_SURAT: `/jenis-surat/create`,
  GET_JENIS_SURAT: `/jenis-surat/get`,
  //Pegawai
  ADD_PEGAWAI: `/pegawai/create`,
  GET_PEGAWAI: `/pegawai/get`,
  GET_PEGAWAI_BY_ID: (ID) => `/pegawai/get/${ID}`,
  EDIT_PEGAWAI: (ID) => `/pegawai/edit/${ID}`,
  DELETE_PEGAWAI: (id) => `/pegawai/delete/${id}`,
}

export default API_ENDPOINT