import Homepage from './Homepage'
import Login from './LoginPage'
import SignupPage from './SignupPage'
import ChangeNamePage from './admin/ChangeName'
import ChangePasswordPage from './admin/ChangePassword'
import FormAddPegawaiPage from './admin/FormAddPegawaiPage'
import FormAddSuratKeluar from './admin/FormAddSuratKeluar'
import FormAddSuratMasuk from './admin/FormAddSuratMasuk'
import FormEditPegawaiPage from './admin/FormEditPegawaiPage'
import FormEditSuratKeluar from './admin/FormEditSuratKeluar'
import FormEditSuratMasuk from './admin/FormEditSuratMasuk'
import JabatanPage from './admin/JabatanPage'
import JenisSuratPage from './admin/JenisSuratPage'
import PegawaiPage from './admin/PegawaiPage'
import ProfilePage from './admin/ProfilePage'
import SuratKeluarPage from './admin/SuratKeluarPage'
import SuratMasukPage from './admin/SuratMasukPage'
import DashboardKaryawan from './pegawai/Homepage'
import SuratMasukPegawaiPage from './pegawai/SuratMasukPage'

export const page = {
  homepage: <Homepage />,
  DashboardKaryawan: <DashboardKaryawan />,
  ChangePasswordPage: <ChangePasswordPage />,
  ChangeNamePage: <ChangeNamePage />,
  ProfilePage: <ProfilePage />,
  loginpage: <Login />,
  signup: <SignupPage />,
  SuratMasukPage: <SuratMasukPage />,
  SuratMasukPegawaiPage: <SuratMasukPegawaiPage />,
  SuratKeluarPage: <SuratKeluarPage />,
  JabatanPage: <JabatanPage />,
  JenisSuratPage: <JenisSuratPage />,
  PegawaiPage: <PegawaiPage />,
  FormAddPegawaiPage: <FormAddPegawaiPage />,
  FormEditPegawaiPage: <FormEditPegawaiPage />,
  FormAddSuratMasuk: <FormAddSuratMasuk />,
  FormEditSuratMasuk: <FormEditSuratMasuk />,
  FormAddSuratKeluar: <FormAddSuratKeluar />,
  FormEditSuratKeluar: <FormEditSuratKeluar />,
}