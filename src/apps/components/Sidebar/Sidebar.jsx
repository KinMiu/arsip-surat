import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GoHomeFill } from 'react-icons/go'
import { FaFileExport, FaFileImport, FaUserTie } from "react-icons/fa6"
import { IoMdExit } from "react-icons/io";
import SweetAlertService from '../../helper/sweetalertService';
import ServiceUser from '../../api/service/User.service';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MdBadge } from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';

const SidebarHomePage = () => {
  const [role, setToken] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const itemSidebarAdmin = [
    {
      name: "Dashboard",
      icon: GoHomeFill,
      path: '/dashboard'
    },
    {
      name: "Surat Masuk",
      icon: FaFileImport,
      path: '/surat-masuk-page'
    },
    {
      name: "Surat Keluar",
      icon: FaFileExport,
      path: '/surat-keluar-page'
    },
    {
      name: "Jenis Surat",
      icon: FaFileAlt,
      path: '/jenis-surat-page'
    },
    {
      name: "Jabatan",
      icon: MdBadge,
      path: '/jabatan-page'
    },
    {
      name: "Pegawai",
      icon: FaUserTie,
      path: '/pegawai-page'
    },
  ]
  const itemSidebarKaryawan = [
    {
      name: "Dashboard",
      icon: GoHomeFill,
      path: '/dashboard/pegawai'
    },
    {
      name: "Surat Masuk",
      icon: FaFileImport,
      path: '/surat-masuk-pegawai-page'
    },
  ]

  const handleLogout = async () => {
    try {
      const data = ''
      const response = await ServiceUser.logoutUser(data)
      // console.log(response)
      localStorage.removeItem('access-token')
      SweetAlertService.showSuccess("Success", response.message)
      navigate('/login')
      window.location.reload();
    } catch (error) {
      SweetAlertService.showError("Error", error.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access-token')
    const decodeToken = jwtDecode(token)
    setToken(decodeToken.ROLE)
  }, [])
  return(
    <>
      <div className="hidden md:flex flex-col w-64 p-2 border shadow-xl shadow-blue-gray-900/5 bg-white ">
        <div className='flex justify-center items-center gap-3 text-lg pb-5 py-3'>
          <GoHomeFill />
          <p className='font-semibold'>Selamat Datang</p>
        </div>
        <hr />
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-slate-100 overflow-x-hidden mt-2">
          <ul className=' flex flex-col gap-2'>
            {
              role === '2' 
              ? 
              itemSidebarKaryawan.map((item, index) => (
                <li key={index} className="rounded ">
                  <Link 
                  to={item.path} 
                  className={` flex gap-4 items-center rounded p-4 ${location.pathname === item.path ? 'bg-blue-400 text-white hover:bg-blue-300' : 'hover:bg-gray-200'} focus:bg-gray-200`}
                  >
                    <span className=''>
                      <item.icon/>
                    </span>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </Link>
                </li>
              ))
              :
              itemSidebarAdmin.map((item, index) => (
                <li key={index} className="rounded ">
                  <Link 
                  to={item.path} 
                  className={` flex gap-4 items-center rounded p-4 ${location.pathname === item.path ? 'bg-blue-400 text-white hover:bg-blue-300' : 'hover:bg-gray-200'} focus:bg-gray-200`}
                  >
                    <span className=''>
                      <item.icon/>
                    </span>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </Link>
                </li>
              ))

            }
          </ul>
        </div>
        <div className='mt-auto'>
          <button 
              type="button" 
              onClick={handleLogout}
              className="w-full flex items-center gap-1 rounded bg-gray-900 px-5 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-800 "
              >
                <IoMdExit className='text-3xl'/>
                <span>Keluar</span>
            </button>
        </div>
      </div>
    </>

  )
}

export default SidebarHomePage