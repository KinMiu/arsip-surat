import { Link, useLocation } from 'react-router-dom'
import { GoHomeFill } from 'react-icons/go'
import { FaUserTie } from "react-icons/fa6"
import { AiOutlineBulb } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Drawer = ({ closeDrawer }) => {
  const [role, setToken] = useState('')
  const location = useLocation()
  const [isExiting, setIsExiting] = useState(false)
  const itemSidebarAdmin = [
    {
      name: "Home",
      icon: GoHomeFill,
      path: '/'
    },
    {
      name: "Surat Masuk",
      icon: FaUserTie,
      path: '/surat-masuk-page'
    },
    {
      name: "Surat Keluar",
      icon: AiOutlineBulb,
      path: '/surat-keluar-page'
    },
  ]

  const handleCloseDrawer = () => {
    setIsExiting(true)
    setTimeout(() => {
      closeDrawer()
      setIsExiting(false)
    }, 100)
  }

  useEffect(() => {
    const token = localStorage.getItem('access-token')
    const decodeToken = jwtDecode(token)
    setToken(decodeToken.ROLE)
  }, [])
  return(
    <div className='fixed inset-0 z-50 flex no-print'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity' onClick={handleCloseDrawer}>
        <div 
          className={`relative flex flex-col w-64 bg-white p-2 border h-full shadow-xl shadow-blue-gray-900/5 transform transition-transform duration-300 ease-in-out ${isExiting ? 'drawer-exit-active' : 'drawer-enter-active'}`}
          onClick={(e) => e.stopPropagation()}
          style={{ transform: 'translateX(0%)' }}
        >
          <div className='flex justify-center items-center gap-3 text-lg pb-5 py-3'>
            <GoHomeFill />
            <p className='font-semibold'>Dashboard</p>
          </div>
          <hr />
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-slate-100 overflow-x-hidden mt-2">
            <ul className=' flex flex-col gap-2'>
              {
                role === '2' 
                ? 
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
        </div>
      </div>
    </div>
  )
}

export default Drawer