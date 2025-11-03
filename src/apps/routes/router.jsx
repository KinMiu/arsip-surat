import { createBrowserRouter } from "react-router-dom";
import { page } from '../pages'
import { RequireAuth, RequireRole } from "./utils/requireAuth";

const router = createBrowserRouter([
  {
    path: '/login',
    element: page.loginpage
  },
  {
    path: '/sign-up',
    element: page.signup
  },
  {
    path: '/',
    element: <RequireAuth/>,
    children: [
      {
        path: '/dashboard/pegawai',
        element: page.DashboardKaryawan
      },
      {
        path: '/surat-masuk-pegawai-page',
        element: page.SuratMasukPegawaiPage
      }
    ]
  },
  {
    path: '/',
    element: <RequireRole allowedRoles={['1']} redirectPath="/" />,
    children: [
      {
        path: '/dashboard',
        element: page.homepage
      },
      {
        path: '/profile/:id',
        element: page.ProfilePage
      },
      {
        path: '/profile/change-password/:id',
        element: page.ChangePasswordPage
      },
      {
        path: '/profile/change-name/:id',
        element: page.ChangeNamePage
      },
      {
        path: '/surat-masuk-page',
        element: page.SuratMasukPage
      },
      {
        path: '/surat-masuk-pegawai-page',
        element: page.SuratMasukPegawaiPage
      },
      {
        path: '/surat-masuk-page/add-surat',
        element: page.FormAddSuratMasuk
      },
      {
        path: '/surat-masuk-page/edit-surat/:idSuratMasuk',
        element: page.FormEditSuratMasuk
      },
      {
        path: '/surat-keluar-page',
        element: page.SuratKeluarPage
      },
      {
        path: '/surat-keluar-page/add-surat',
        element: page.FormAddSuratKeluar
      },
      {
        path: '/surat-keluar-page/edit-surat/:idSuratKeluar',
        element: page.FormEditSuratKeluar
      },
      {
        path: '/jenis-surat-page',
        element: page.JenisSuratPage
      },
      {
        path: '/jabatan-page',
        element: page.JabatanPage
      },
      {
        path: '/pegawai-page',
        element: page.PegawaiPage
      },
      {
        path: '/pegawai-page/add-pegawai',
        element: page.FormAddPegawaiPage
      },
      {
        path: '/pegawai-page/update-pegawai/:IDPEGAWAI',
        element: page.FormEditPegawaiPage
      },
    ]
  }
])

export default router