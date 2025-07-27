
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react"
import SweetAlertService from "../../helper/sweetalertService"
import ServiceUser from "../../api/service/User.service"
import { CiMenuBurger } from "react-icons/ci"
import Drawer from "../Drawer"

const Navbar = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const token = localStorage.getItem('access-token')

  const getProfile = () => {
    if (token) {
      const decode = jwtDecode(token)
      console.log(decode)
      setProfile(decode)
    }
  }
  
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

  const toLogin = () => {
    navigate('/login')
  }

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
      setIsOpen(false);
  };

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const closeDrawer = () => {
    setIsOpenDrawer(false);
  };

  useEffect(() => {
    getProfile()
  }, [])
  return(
    <div className={`bg-white py-3 px-5 w-full shadow-sm border flex items-center justify-between`}>
      <div className="flex flex-row justify-between gap-7 items-center">
        <button type="button" onClick={toggleDrawer} className="text-xl flex md:hidden">
          <CiMenuBurger />
        </button>
        {
          isOpenDrawer && ( <Drawer closeDrawer={closeDrawer} /> )
        }
        <Link to={'/'}>
          <h1 className="font-bold text-base">Pengarsipan Surat</h1>
        </Link>
      </div>
      <div>
        <ul className="flex gap-3">
          {
            token ? (
              <li className="flex gap-2">
                <button
                    type="button"
                    className="px-3 py-2 text-white bg-blue-400 hover:bg-blue-300 focus:ring-2 focus:outline-none focus:ring-blue-600 font-medium rounded text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    {profile.NAME} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="origin-top-right absolute right-0 top-12 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    href={`/profile/${profile.IDUSER}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Setting
                                </a>
                            </li>
                            <hr />
                            <li>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
              </li>
            ) : (
              <li className="flex gap-2">
                <button 
                  className="bg-green-700 hover:bg-green-300 px-3 py-1 rounded text-white text-sm" 
                  onClick={toLogin}
                >Login</button>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar